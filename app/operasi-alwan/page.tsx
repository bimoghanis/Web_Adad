import type {Metadata} from 'next';
import {Campaign} from '@/components/campaign/campaign';
import './campaign.css';
export const metadata:Metadata={title:'Operasi: Takhta Tuan Alwan — ADAD Arcade',description:'Campaign arcade fiksi ADAD: 6 wilayah, 30 puzzle, artefak koleksi, dan penobatan Tuan Alwan. Checkpoint lokal, tanpa login.'};
export default function CampaignPage(){return <Campaign/>}
