'use client';
import {useState} from 'react';
import {GameIcon} from './game-icons';
import {members} from '@/lib/data';
export function GameArena(){
  const [hoveredVal,setHoveredVal]=useState<string|null>(null);
  const [hoveredMl,setHoveredMl]=useState<string|null>(null);
  return <section id="arena" className="section arena-section">
    <div className="section-kicker mono"><span>02 / DUA CABANG PENELITIAN</span><span>PILIH MEDAN PERDEBATAN</span></div>
    <div className="section-heading">
      <h2>BEDA ARENA.<br/>SAMA-SAMA <span className="outline">YAKIN.</span></h2>
      <p>Level intelektual superior.<br/>Eksekusi situasional.</p>
    </div>
    <div className="arena-grid">
      <article id="valorant" className="arena-panel valorant">
        <div className="arena-top mono"><span>DEPARTEMEN 01 / TACTICAL FPS</span><span>4 PENELITI</span></div>
        <div className="arena-name"><span className="arena-symbol" aria-hidden="true"><GameIcon game="valorant"/></span><h3>VALORANT</h3></div>
        <p>Laboratorium aim dan komunikasi terlambat.</p>
        <div className="arena-members">
          {members.filter(m=>m.agent).map(m=><div key={m.id}
            className={`arena-member-row${hoveredVal===m.id?' arena-member-glow':''}`}
            onMouseEnter={()=>setHoveredVal(m.id)}
            onMouseLeave={()=>setHoveredVal(null)}
          ><b>{m.name}</b><span>{m.rank} <i>/</i> {m.agent}</span></div>)}
        </div>
        <p className="arena-note mono">"Empat agent. Minimal enam pendapat."</p>
      </article>
      <article id="mobile-legends" className="arena-panel mobile-legends">
        <div className="arena-top mono"><span>DEPARTEMEN 02 / MOBILE MOBA</span><span>{members.filter(m=>m.ml).length} PENELITI</span></div>
        <div className="arena-name"><span className="arena-symbol" aria-hidden="true"><GameIcon game="mlbb"/></span><h3>MOBILE<br/>LEGENDS</h3></div>
        <p>Pusat studi rotasi dan kepercayaan diri.</p>
        <div className="arena-members">
          {members.filter(m=>m.ml).map(m=><div key={m.id}
            className={`arena-member-row${hoveredMl===m.id?' arena-member-glow':''}`}
            onMouseEnter={()=>setHoveredMl(m.id)}
            onMouseLeave={()=>setHoveredMl(null)}
          ><b>{m.name}</b><span>{m.ml}{m.mlRole?<em className="arena-role-badge">{m.mlRole}</em>:''}</span></div>)}
        </div>
        <p className="arena-note mono">Hero & role tercatat. Rank belum dilaporkan ke administrasi.</p>
      </article>
    </div>
  </section>
}
