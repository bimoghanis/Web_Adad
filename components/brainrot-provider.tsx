'use client';
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {MotionConfig} from 'motion/react';
const Context=createContext({brainrot:false,toggle:()=>{}});
export const useBrainrot=()=>useContext(Context);
export function BrainrotProvider({children}:{children:ReactNode}){const[brainrot,setBrainrot]=useState(false);const[toast,setToast]=useState(false);const shown=useRef(false);useEffect(()=>{try{setBrainrot(localStorage.getItem('adad-brainrot')==='on')}catch{}},[]);useEffect(()=>{document.documentElement.dataset.brainrot=String(brainrot)},[brainrot]);useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(false),4500);return()=>clearTimeout(t)},[toast]);function toggle(){const next=!brainrot;setBrainrot(next);try{localStorage.setItem('adad-brainrot',next?'on':'off')}catch{}if(next&&!shown.current){setToast(true);shown.current=true}}return <Context.Provider value={{brainrot,toggle}}><MotionConfig reducedMotion="user">{children}<div className={`toast ${toast?'show':''}`} role="status">{toast?'Selamat. Akal sehat berhasil dinonaktifkan.':''}</div></MotionConfig></Context.Provider>}
