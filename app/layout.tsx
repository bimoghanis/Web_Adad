import type { Metadata } from 'next';
import './globals.css';
import {AmbientBackground} from '@/components/ambient-background';
export const metadata: Metadata = {title:'ADAD Esport — Intelektual Superior',description:'ADAD Institute of Questionable Gaming Decisions. Lima anggota, dua game, banyak teori. Markas digital ADAD Esport.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="id"><body><AmbientBackground/>{children}</body></html>}
