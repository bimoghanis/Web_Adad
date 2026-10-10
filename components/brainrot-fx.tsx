'use client';
import {useEffect,useState,useCallback} from 'react';
import {useReducedMotion} from 'motion/react';
import {useBrainrot} from './brainrot-provider';

const impactTexts=['PEER REVIEW DITOLAK.','RESTU TUAN TURUN.','NEURON MELAKUKAN FLANK.','ABSOLUTE PENELITIAN.','SATCHEL KE DIMENSI LAIN.','BUFF DICURI. EGO NAIK.','FARM DULU. CARRY NANTI.','INVADE BUFF TANPA IZIN.'];

export function BrainrotFX(){
  const{brainrot}=useBrainrot(),reduced=useReducedMotion();
  const[hit,setHit]=useState(0);
  const[clickPos,setClickPos]=useState({x:0,y:0});
  const[trail,setTrail]=useState<{x:number;y:number;id:number}[]>([]);

  const handleLabClick=useCallback((e:MouseEvent)=>{
    const target=e.target;
    if(target instanceof Element&&target.closest('#laboratorium button:not(:disabled), .member-card .open-file, .filters button')){
      setHit(n=>n+1);
      setClickPos({x:e.clientX,y:e.clientY});
    }
  },[]);

  useEffect(()=>{
    if(!brainrot||reduced)return;
    document.addEventListener('click',handleLabClick);
    return()=>document.removeEventListener('click',handleLabClick);
  },[brainrot,reduced,handleLabClick]);

  useEffect(()=>{
    if(!brainrot||reduced)return;
    let id=0;
    const handleMove=(e:MouseEvent)=>{
      id++;
      setTrail(t=>[...t.slice(-6),{x:e.clientX,y:e.clientY,id}]);
    };
    window.addEventListener('mousemove',handleMove);
    return()=>window.removeEventListener('mousemove',handleMove);
  },[brainrot,reduced]);

  useEffect(()=>{
    if(!trail.length)return;
    const t=setTimeout(()=>setTrail(tr=>tr.slice(1)),600);
    return()=>clearTimeout(t);
  },[trail]);

  return brainrot&&!reduced?<div className="brainrot-fx" aria-hidden="true">
    <div className="brainrot-orbit orbit-a"/>
    <div className="brainrot-orbit orbit-b"/>
    <div className="brainrot-orbit orbit-c"/>
    <div className="scanline-overlay"/>
    {trail.map(t=><span key={t.id} className="cursor-trail" style={{left:t.x,top:t.y}}/>)}
    {hit>0&&<div key={hit} className="brainrot-impact" style={{left:clickPos.x-120,top:clickPos.y-60}}>
      <span>{impactTexts[hit%impactTexts.length]}</span>
      <i/><i/><i/><i/><i/>
      <div className="impact-ring"/>
    </div>}
  </div>:null
}
