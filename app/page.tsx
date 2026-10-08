import {Hero} from '@/components/hero';
import {Navbar} from '@/components/navbar';
import {BrainrotProvider} from '@/components/brainrot-provider';
import {SquadSection} from '@/components/squad-section';
import {GameArena} from '@/components/game-arena';
import {ClipArchive} from '@/components/clip-archive';
import {BrainrotLab} from '@/components/brainrot-lab';
import {Footer} from '@/components/footer';
export default function Page(){return <BrainrotProvider><a className="skip-link" href="#main">Lewati ke konten</a><Navbar/><main id="main"><Hero/><div className="ticker" aria-label="Teori S-tier. Rotasi eksperimental. Aim dalam evaluasi. Fahri masih dicari."><div aria-hidden="true">TEORI S-TIER ✳ ROTASI EKSPERIMENTAL ✳ AIM DALAM EVALUASI ✳ FAHRI MASIH DICARI ✳ TEORI S-TIER ✳ ROTASI EKSPERIMENTAL ✳ AIM DALAM EVALUASI ✳ FAHRI MASIH DICARI ✳</div></div><SquadSection/><GameArena/><ClipArchive/><BrainrotLab/><Footer/></main></BrainrotProvider>}
