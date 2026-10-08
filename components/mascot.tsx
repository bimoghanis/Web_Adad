'use client';
import {useBrainrot} from './brainrot-provider';
export function Mascot(){const{brainrot}=useBrainrot();return <><img className="mascot" src={brainrot?'/brainrot.png':'/mascot.png'} alt={brainrot?'Maskot ADAD dengan senyum absurd, headset, dan clipboard':'Maskot ADAD ber-headset dan jas laboratorium, membawa clipboard dengan penuh percaya diri'} width="1179" height="1334" fetchPriority="high"/><span className="iq-sticker">200 IQ<small>HASIL MENYUSUL</small></span>{brainrot&&<span className="extra-sticker mono">LOGIKA AFK.</span>}</>}
