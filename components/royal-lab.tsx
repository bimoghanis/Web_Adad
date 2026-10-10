'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {useReducedMotion} from 'motion/react';
import './royal-lab.css';

const relics=[
 {symbol:'♜',name:'MAHKOTA SUPERIOR',quote:'Rank boleh Gold. Kepercayaan diri harus intergalaksi.'},
 {symbol:'◎',name:'RECON MAHA TAHU',quote:'Tuan sudah tahu semuanya. Eksekusi masih tahap penelitian.'},
 {symbol:'◇',name:'PERISAI ANTI BAPER',quote:'Menahan peluru? Belum tentu. Menahan “nice try”? Sedang diperbaiki.'},
 {symbol:'⌘',name:'KOMPAS FEELING',quote:'Utara mengikuti Tuan. GPS hanya memberi saran.'},
 {symbol:'✦',name:'STEMPEL RESTU',quote:'Disetujui tanpa revisi. Karena yang merevisi juga Tuan.'},
 {symbol:'▥',name:'KITAB PEMBELAAN',quote:'Bukan salah strategi. Realitas belum membaca briefing.'},
];
import {empty,readBook,mergeBooks,today,targetAt,type RecordBook} from '@/lib/royal-lab';

export function RoyalLab({calm=false}:{calm?:boolean}){
 const reduced=useReducedMotion(),[quiet,setQuiet]=useState(false);const still=calm||!!reduced||quiet;
 const[book,setBook]=useState<RecordBook>(empty),[ready,setReady]=useState(false),[saveError,setSaveError]=useState(false),[date,setDate]=useState('');
 const[face,setFace]=useState(0),[spin,setSpin]=useState(true),[angle,setAngle]=useState(0),[pulse,setPulse]=useState(0);
 const[mode,setMode]=useState<'practice'|'daily'>('practice'),[phase,setPhase]=useState<'idle'|'play'|'done'>('idle'),[left,setLeft]=useState(20),[target,setTarget]=useState(4),[score,setScore]=useState(0),[hits,setHits]=useState(0),[misses,setMisses]=useState(0),[combo,setCombo]=useState(0);
 const run=useRef({end:0,score:0,hits:0,misses:0,combo:0,seed:1,index:0,target:4,active:false,mode:'practice' as 'practice'|'daily',date:''});
 const drag=useRef<{x:number;angle:number}|null>(null);
 useEffect(()=>{try{setBook(readBook(localStorage.getItem('adad-royal-lab-v1')))}catch{setSaveError(true)}setDate(today());setReady(true)},[]);
 useEffect(()=>{if(!ready)return;try{localStorage.setItem('adad-royal-lab-v1',JSON.stringify(mergeBooks(readBook(localStorage.getItem('adad-royal-lab-v1')),book)));setSaveError(false)}catch{setSaveError(true)}},[book,ready]);
 useEffect(()=>{const sync=(e:StorageEvent)=>{if(e.key==='adad-royal-lab-v1')setBook(b=>{const merged=mergeBooks(b,readBook(e.newValue));return JSON.stringify(merged)===JSON.stringify(b)?b:merged})};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[]);
 function finish(){const r=run.current;if(!r.active)return;r.active=false;setPhase('done');setLeft(0);setBook(b=>({...b,best:Math.max(b.best,r.score),plays:b.plays+1,daily:r.mode==='daily'?{...b.daily,[r.date]:Math.max(b.daily[r.date]||0,r.score)}:b.daily}))}
 useEffect(()=>{if(phase!=='play')return;const id=setInterval(()=>{const n=Math.max(0,Math.ceil((run.current.end-performance.now())/1000));setLeft(n);if(n===0)finish()},100);const hide=()=>{if(document.hidden&&run.current.active){run.current.active=false;setPhase('idle');setLeft(20)}};document.addEventListener('visibilitychange',hide);return()=>{clearInterval(id);document.removeEventListener('visibilitychange',hide)}},[phase]);
 function start(){const day=today();setDate(day);const seed=mode==='daily'?Number(day.replaceAll('-','')):Math.floor(Math.random()*100000);run.current={end:performance.now()+20000,score:0,hits:0,misses:0,combo:0,seed,index:0,target:targetAt(seed,0,4),active:true,mode,date:day};setTarget(run.current.target);setScore(0);setHits(0);setMisses(0);setCombo(0);setLeft(20);setPhase('play')}
 function hit(index:number){const r=run.current;if(!r.active)return;if(performance.now()>=r.end){finish();return}if(index===r.target){r.hits++;r.combo++;r.score+=10+Math.min(10,r.combo-1)*2;r.index++;r.target=targetAt(r.seed,r.index,r.target);setTarget(r.target);setPulse(p=>p+1)}else{r.misses++;r.combo=0;r.score=Math.max(0,r.score-5)}setScore(r.score);setHits(r.hits);setMisses(r.misses);setCombo(r.combo)}
 function scan(){setBook(b=>({...b,scanned:[...new Set([...b.scanned,face])]}));setPulse(p=>p+1)}
 const badges=[{name:'ARSIP TERBUKA',desc:'Scan satu hologram',done:book.scanned.length>0},{name:'KURATOR TUAN',desc:'Scan semua 6 hologram',done:book.scanned.length===6},{name:'TANGAN DIRESTUI',desc:'Raih skor 300',done:book.best>=300},{name:'LOYALIS HARIAN',desc:'Selesaikan tantangan harian',done:Object.keys(book.daily).length>0}];
 return <section className={`royal-lab ${still?'lab-still':''}`} id="holo-lab">
 <div className="holo-heading"><div><span className="mono">EXPANSION 02 / REALITAS TAMBAHAN</span><h2>LABORATORIUM<br/><em>RESTU 3D.</em></h2><p>Tuan Alwan telah memasuki dimensi ketiga.<br/>Akal sehat masih antre di dimensi pertama.</p></div><button className="holo-control" aria-pressed={quiet} onClick={()=>setQuiet(v=>!v)}>{quiet?'Gerakan: tenang':'Gerakan: aktif'}</button></div>
 <div className="holo-layout"><article className="holo-chamber"><div className="holo-top mono"><span>ARSIP HOLOGRAM</span><span>0{face+1} / 06</span></div>
 <div className="holo-stage" onPointerDown={e=>{if(e.target instanceof Element&&e.target.closest('button'))return;drag.current={x:e.clientX,angle};e.currentTarget.setPointerCapture(e.pointerId);setSpin(false)}} onPointerMove={e=>{if(drag.current)setAngle(drag.current.angle+(e.clientX-drag.current.x)*.7)}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
 <div className="holo-grid"/><div className="holo-ring ring-1"/><div className="holo-ring ring-2"/>
 <div className={`holo-axis ${spin&&!still?'auto-spin':''}`} style={{'--turn':`${angle}deg`} as CSSProperties}><div className="holo-cube">{['front','back','left','right','top','bottom'].map((side,i)=><div key={side} className={`cube-face ${side}`}><span>{relics[face].symbol}</span><small>{i===0?'ALWAN APPROVED':'ABSOLUTE RESTU'}</small></div>)}</div></div><div className="holo-pedestal"/><span className="holo-coordinate mono">X: {Math.round(angle)}° / AURA: TAK TERUKUR</span></div>
 <div className="holo-controls"><button aria-label="Putar hologram ke kiri" onClick={()=>{setSpin(false);setAngle(a=>a-45)}}>↶</button><button aria-pressed={spin} onClick={()=>setSpin(s=>!s)}>{spin?'Jeda rotasi':'Rotasi otomatis'}</button><button aria-label="Putar hologram ke kanan" onClick={()=>{setSpin(false);setAngle(a=>a+45)}}>↷</button></div><small className="holo-help">Geser untuk memutar · tombol tersedia untuk keyboard</small>
 <div className="holo-selector" aria-label="Pilih hologram">{relics.map((r,i)=><button key={r.name} aria-label={r.name} aria-pressed={face===i} onClick={()=>setFace(i)}>{r.symbol}{book.scanned.includes(i)&&<small>✓</small>}</button>)}</div>
 <h3>{relics[face].name}</h3><p className="holo-lore">“{relics[face].quote}”</p><button className="button primary" disabled={!ready||book.scanned.includes(face)} onClick={scan}>{book.scanned.includes(face)?'Tersimpan di Codex ✓':'Scan & simpan ke Codex'}</button><p className="mono holo-counter" role="status">{book.scanned.length}/6 HOLOGRAM DIARSIPKAN</p>
 </article>
 <article className="reflex-console"><div className="holo-top mono"><span>RECON RUSH</span><span>MINI-GAME / 20 DETIK</span></div><h3>KEJAR RESTU.<br/><em>JANGAN SALAH TAP.</em></h3><p>Tekan radar biru secepatnya. Combo menaikkan skor, salah tap −5. Angka 1–9 juga bisa dipakai saat arena fokus.</p><div className="rush-modes">{(['practice','daily'] as const).map(m=><button disabled={phase==='play'} aria-pressed={mode===m} key={m} onClick={()=>setMode(m)}>{m==='daily'?'Tantangan harian':'Latihan bebas'}</button>)}</div><p className="rush-daily mono">{mode==='daily'?`${date||'MEMUAT…'} · URUTAN SAMA UNTUK SEMUA · RESET WIB`:'LATIHAN TANPA BATAS · REKOR DISIMPAN LOKAL'}</p>
 <div className="rush-stats" aria-label="Statistik permainan"><div><small>SKOR</small><strong>{score}</strong></div><div><small>SISA</small><strong>{left}s</strong></div><div><small>COMBO</small><strong>×{combo}</strong></div></div>
 <div className="rush-board" role="group" aria-label="Arena Recon Rush, tombol 1 sampai 9" tabIndex={0} onKeyDown={e=>{if(/^[1-9]$/.test(e.key)&&!e.repeat){e.preventDefault();hit(Number(e.key)-1)}}}>{Array.from({length:9},(_,i)=><button key={i} disabled={phase!=='play'} aria-label={`Radar ${i+1}${phase==='play'&&target===i?', target aktif':''}`} className={phase==='play'&&target===i?'rush-target':''} onClick={()=>hit(i)}><span aria-hidden="true">{phase==='play'&&target===i?'◎':'+'}</span><small>{i+1}</small></button>)}</div>
 {phase==='play'?<button className="holo-control rush-start" onClick={()=>{run.current.active=false;setPhase('idle');setLeft(20)}}>Batalkan ronde</button>:<button className="button primary rush-start" disabled={!ready} onClick={start}>{phase==='done'?'Main lagi, Tuan':'Mulai Recon Rush →'}</button>}
 <div className="rush-result" role="status">{phase==='done'?`RESTU DITERIMA! ${hits} tepat · ${misses} meleset · akurasi ${hits+misses?Math.round(hits/(hits+misses)*100):0}%. ${score>=300?'Tangan direstui Tuan.':'Tuan menyarankan latihan lagi.'}`:phase==='play'?'Radar aktif. Tuan memperhatikan.':'Pindah tab membatalkan ronde aktif. Rekor sebelumnya tetap aman.'}</div><div className="rush-record mono"><span>REKOR {book.best}</span><span>HARI INI {book.daily[date]||0}</span><span>{book.plays} RONDE</span></div>
 </article></div>
 <div className="holo-achievements"><div><span className="mono">CODEX PENGABDIAN</span><h3>{badges.filter(b=>b.done).length}/4 GELAR TERBUKA</h3><small>{saveError?'Penyimpanan diblokir. Data hanya tersimpan selama sesi ini.':'Rekor & koleksi otomatis tersimpan di browser ini.'}</small></div>{badges.map(b=><div key={b.name} className={`holo-badge ${b.done?'earned':''}`}><span aria-hidden="true">{b.done?'✦':'◇'}</span><strong>{b.name}</strong><small>{b.desc}</small><span className="mono">{b.done?'DIRESTUI':'TERKUNCI'}</span></div>)}</div>
 {pulse>0&&!still&&<div key={pulse} className="holo-flare" aria-hidden="true"/>}
 </section>
}
