import type {Metadata} from 'next';
import {BrainrotProvider} from '@/components/brainrot-provider';
import {BrainrotLab} from '@/components/brainrot-lab';
export const metadata:Metadata={title:'Laboratorium — ADAD Esport'};
export default function LabPage(){return <BrainrotProvider><a className="skip-link" href="#laboratorium">Lewati ke eksperimen</a><header className="lab-page-nav"><a href="/" className="brand">ADAD<span>ESPORT</span></a><a href="/">← Kembali ke markas</a><a href="/operasi-alwan/">ADAD Arcade ↗</a></header><main><BrainrotLab/></main></BrainrotProvider>}
