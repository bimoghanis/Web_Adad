'use client';
import {useState,useRef,useCallback,type CSSProperties,type MouseEvent as ReactMouseEvent} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {members,type Member} from '@/lib/data';
import {Modal} from './modal';
import {useBrainrot} from './brainrot-provider';

function useCardTilt(){
  const ref=useRef<HTMLElement>(null);
  const [style,setStyle]=useState<CSSProperties>({});
  const onMove=useCallback((e:ReactMouseEvent)=>{
    const el=ref.current;if(!el)return;
    const rect=el.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    setStyle({transform:`perspective(600px) rotateY(${x*25}deg) rotateX(${-y*25}deg) scale3d(1.04,1.04,1.04)`,transition:'transform .12s ease'});
  },[]);
  const onLeave=useCallback(()=>{setStyle({transform:'perspective(600px) rotateY(0) rotateX(0) scale3d(1,1,1)',transition:'transform .45s ease'});},[]);
  return {ref,style,onMove,onLeave};
}

export function Avatar({member}:{member:Member}){return <div className="avatar" role="img" aria-label={`Avatar ilustrasi original ${member.name}${member.name==='FAHRI'?', siluet dengan tanda tanya':''}`} style={member.name === 'ALWAN' ? {backgroundImage:"url('/alwan-blue.png')",backgroundSize:'cover',backgroundPosition:'center'} : {backgroundPosition:`${member.avatar*25}% center`}}/>}

export function MemberCard({member:m,onOpen}:{member:Member;onOpen:()=>void}){
  const {brainrot}=useBrainrot();
  const tilt=useCardTilt();
  const [sparks,setSparks]=useState(0);
  const reduced=useReducedMotion();
  function handleClick(){
    setSparks(s=>s+1);
    onOpen();
  }
  return <article
    ref={tilt.ref as React.RefObject<HTMLElement>}
    className={`member-card member-${m.avatar}${brainrot?' brainrot-card':''}`}
    style={{'--member-color':m.color,...(reduced?{}:tilt.style)} as CSSProperties}
    onMouseMove={reduced?undefined:tilt.onMove}
    onMouseLeave={reduced?undefined:tilt.onLeave}
  >
    <div className="member-number mono"><span>{m.id}</span><span>◎</span></div>
    <div className="avatar-wrap">
      <Avatar member={m}/>
      {m.badge&&<span className="member-badge mono">{m.badge}</span>}
      {m.mlRole&&<span className="member-role-tag mono">{m.mlRole}</span>}
    </div>
    <div className="member-content">
      <h3>{m.name}</h3>
      <span className="member-title">{m.title}</span>
      <div className="member-games mono">
        {m.rank?<>
          <span>VAL <b>{m.rank} / {m.agent}</b></span>
          {m.ml&&<span>MLBB <b>{m.ml}{m.mlRole?` — ${m.mlRole}`:''}</b></span>}
        </>:<span>STATUS <b>Hilang*</b></span>}
      </div>
      <p>{m.description}</p>
      <span className="superior-stamp">INTELEKTUAL SUPERIOR</span>
      <button className="open-file" onClick={handleClick} aria-label={`Buka Berkas ${m.name}`}>
        Buka Berkas <span aria-hidden="true">＋</span>
      </button>
      {m.name==='FAHRI'&&<a href="/laboratorium/#fahri-locator" className="find-fahri">Cari Fahri</a>}
    </div>
    {sparks>0&&!reduced&&<div key={sparks} className="card-sparks" aria-hidden="true">
      <i/><i/><i/><i/><i/><i/>
    </div>}
  </article>
}

export function MemberModal({member:m,onClose}:{member:Member;onClose:()=>void}){
  return <Modal title={m.name} onClose={onClose} className="member-modal-3d">
    <div className="member-modal-grid">
      <Avatar member={m}/>
      <div>
        <p className="mono">{m.id} / FAKTA ANGGOTA</p>
        {m.rank?<dl className="facts">
          <div><dt>Valorant</dt><dd>{m.rank}</dd></div>
          <div><dt>Main agent</dt><dd>{m.agent}{m.name==='DARRYL'?' (one-trick)':''}</dd></div>
          {m.ml?<>
            <div><dt>Mobile Legends</dt><dd>{m.ml}</dd></div>
            {m.mlRole&&<div><dt>Role MLBB</dt><dd className="role-highlight">{m.mlRole}</dd></div>}
            <div><dt>Rank MLBB</dt><dd>Belum tercatat</dd></div>
          </>:<div><dt>Mobile Legends</dt><dd>Belum tercatat</dd></div>}
          {m.name==='NABIL'&&<div><dt>Julukan</dt><dd>Gigon</dd></div>}
          {m.name==='DARRYL'&&<div><dt>Spesialisasi MLBB</dt><dd>Invade buff lawan, farming hutan penuh keyakinan</dd></div>}
          {m.name==='NABIL'&&<div><dt>Spesialisasi MLBB</dt><dd>Late game carry, early game farming simulator</dd></div>}
        </dl>:<p>Status inside joke: Hilang.<br/>Rank dan game favorit belum diketahui.<br/>Last seen: dalam pencarian.</p>}
      </div>
    </div>
    <div className="lore">
      <p className="mono">LORE KREATIF / BUKAN KUTIPAN NYATA</p>
      <h3>{m.title}</h3>
      <blockquote>"{m.quote}"</blockquote>
      <p>{m.description}</p>
      <p><strong>Spesialisasi:</strong> {m.specialty}</p>
    </div>
    <h3 className="stats-title">Stat ngaco versi squad</h3>
    <dl className="fake-stats">
      {[['Intelektual','Superior'],['Teori','S-tier'],['Eksekusi','Dalam evaluasi'],['Alasan kalah','Tidak terbatas']].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  </Modal>
}

export function SquadSection(){
  const[filter,setFilter]=useState('Semua');
  const[selected,setSelected]=useState<Member|null>(null);
  const reduce=useReducedMotion();
  const shown=members.filter(m=>filter==='Semua'||(filter==='Valorant'?m.agent:m.ml));
  return <motion.section id="para-pemikir" className="section squad"
    initial={{opacity:0.85,y:reduce?0:12}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true,amount:0.1}}
    transition={{duration:reduce?0:.35}}
  >
    <div className="section-kicker mono">
      <span>01 / ISI PARTY PALING BERISIK</span>
      <span>5 ANGGOTA. 0 KONSENSUS.</span>
    </div>
    <div className="section-heading">
      <div>
        <h2>LIMA OTAK.<br/><span className="acid">SATU PUN BELUM SYNC.</span></h2>
        <p>Ini orang-orangnya. Kalau kalah, jangan percaya versi cerita mereka.</p>
      </div>
      <span className="round-stamp">SQUAD<br/><b>APPROVED</b><br/>BY THE SQUAD</span>
    </div>
    <div className="section-toolbar">
      <div className="filters" aria-label="Filter anggota">
        {['Semua','Valorant','Mobile Legends'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}
      </div>
      <span className="mono" role="status">{shown.length} BERKAS DITEMUKAN</span>
    </div>
    <div className="roster">
      {shown.map(m=><MemberCard member={m} key={m.id} onOpen={()=>setSelected(m)}/>)}
    </div>
    <p className="data-note mono">DATA GAME: SESUAI CATATAN SQUAD. AVATAR & JABATAN: LORE KREATIF. *FAHRI HILANG ADALAH INSIDE JOKE.</p>
    {selected&&<MemberModal member={selected} onClose={()=>setSelected(null)}/>}
  </motion.section>
}
