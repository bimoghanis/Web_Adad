'use client';

import {useEffect,useRef,useState} from 'react';
import {quizQuestions,quizVerdicts,questionablePlans,commsScenarios,baperVerdicts,academicDictionary,type ArenaChoice} from '@/lib/data';
import {useBrainrot} from './brainrot-provider';

function CopyResult({text,label='Salin hasil'}:{text:string;label?:string}) {
  const [feedback,setFeedback]=useState('');
  useEffect(()=>setFeedback(''),[text]);
  async function copy(){try{await navigator.clipboard.writeText(text);setFeedback('Tersalin. Silakan dipertanggungjawabkan di grup.')}catch{setFeedback('Salin otomatis tidak tersedia. Pilih teks hasil untuk menyalin.')}}
  return <div className="result-copy"><button className="button secondary" onClick={copy}>{label}</button><span role="status">{feedback}</span></div>;
}

function IntellectualQuiz(){
  const [answers,setAnswers]=useState<number[]>([]);
  const [choice,setChoice]=useState<number|null>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const done=answers.length===quizQuestions.length;
  const question=quizQuestions[Math.min(answers.length,quizQuestions.length-1)];
  const score=answers.reduce((sum,answer,i)=>sum+quizQuestions[i].options[answer].points,0);
  const verdict=[...quizVerdicts].reverse().find(v=>score>=v.min)!;
  function next(){if(choice===null)return;setAnswers(a=>[...a,choice]);setChoice(null);heading.current?.focus()}
  function back(){if(!answers.length)return;setChoice(answers[answers.length-1]);setAnswers(a=>a.slice(0,-1));heading.current?.focus()}
  function reset(){setAnswers([]);setChoice(null);heading.current?.focus()}
  return <article className="intellect-exam" id="uji-intelektual"><div className="experiment-eyebrow mono"><span>04 / UJIAN MASUK INSTITUT</span><span>BUKAN TES IQ SUNGGUHAN</span></div><div className="exam-title"><h3 ref={heading} tabIndex={-1}>SEBERAPA RUSAK<br/><span>PENALARANMU?</span></h3><span className="exam-seal">ADAD<br/>QUALIFIED*</span></div>
    <div className="quiz-progress" role="progressbar" aria-valuemin={0} aria-valuemax={quizQuestions.length} aria-valuenow={answers.length} aria-label={`Progres kuis: ${answers.length} dari ${quizQuestions.length} pertanyaan selesai`}>{quizQuestions.map((_,i)=><span key={i} className={i<answers.length?'complete':i===answers.length?'current':''}/>)}</div>
    {done?<div className="quiz-result" role="status"><p className="mono">SERTIFIKAT TIDAK DIAKUI DI MANA PUN</p><h4>{verdict.title}</h4><strong>{verdict.degree}</strong><p>{verdict.copy}</p><span className="score-label mono">SKOR NGACO: {score}/{quizQuestions.length*2} · HASIL DARI PILIHANMU</span><CopyResult text={`Sertifikasi ADAD: ${verdict.title}. ${verdict.degree}. Skor ngaco ${score}/${quizQuestions.length*2}. ${verdict.copy} (Kuis humor, bukan tes IQ.)`} label="Salin sertifikat"/><button className="text-action" onClick={reset}>Ujian ulang tanpa belajar</button></div>:<><p className="question-count mono">PERTANYAAN {answers.length+1} / {quizQuestions.length}</p><h4 className="quiz-question">{question.question}</h4><fieldset className="quiz-choices"><legend className="sr-only">Pilih satu jawaban</legend>{question.options.map((option,i)=><label key={option.text} className={choice===i?'selected':''}><input type="radio" name={`question-${answers.length}`} checked={choice===i} onChange={()=>setChoice(i)}/><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{option.text}</span></label>)}</fieldset><div className="quiz-response" role="status">{choice===null?'Pilih jawaban. Tidak ada yang menjamin masa depanmu.':question.options[choice].reply}</div><div className="quiz-navigation">{answers.length>0&&<button className="text-action" onClick={back}>Soal sebelumnya</button>}<button className="button primary" disabled={choice===null} onClick={next}>{answers.length===quizQuestions.length-1?'Terbitkan Sertifikat':'Pertanyaan Berikutnya'}</button></div></>}
  </article>;
}

function DecisionRoulette(){
  const [game,setGame]=useState<ArenaChoice>('Valorant');
  const [spinning,setSpinning]=useState(false);
  const [index,setIndex]=useState<number|null>(null);
  useEffect(()=>{if(!spinning)return;const t=setTimeout(()=>{setIndex(previous=>{const available=questionablePlans[game].map((_,i)=>i).filter(i=>i!==previous);return available[Math.floor(Math.random()*available.length)]});setSpinning(false)},1000);return()=>clearTimeout(t)},[spinning,game]);
  const plan=index===null?null:questionablePlans[game][index];
  return <article className="decision-machine" id="roulette"><div className="experiment-eyebrow mono"><span>05 / MESIN KEPUTUSAN</span><span>RNG, BUKAN WAHYU</span></div><h3>STRATEGI<br/>TURUN DARI<br/><span> LANGIT.</span></h3><p>Daripada debat 20 menit, serahkan ke mesin yang sama tidak kompetennya.</p><label className="game-select mono">ARENA PENELITIAN<select value={game} disabled={spinning} onChange={e=>{setGame(e.target.value as ArenaChoice);setIndex(null)}}><option>Valorant</option><option>Mobile Legends</option></select></label><div className={`roulette-result ${spinning?'is-spinning':''}`} role="status" aria-live="polite" aria-atomic="true"><span className="roulette-mark" aria-hidden="true">✳</span>{spinning?<div><strong>KONSULTASI KE AWAN…</strong><p>Awan juga bingung.</p></div>:plan?<div><strong>{plan.title}</strong><p>{plan.instruction}</p><small>{plan.footnote}</small></div>:<div><strong>MENUNGGU PETUNJUK</strong><p>Mesin belum memutuskan siapa yang harus disalahkan.</p></div>}</div><button className="button dark" disabled={spinning} onClick={()=>setSpinning(true)}>{spinning?'Mengolah ketidakyakinan…':'Putar Nasib Squad'}</button>{plan&&!spinning&&<CopyResult text={`${game} — ${plan.title}. ${plan.instruction} ${plan.footnote}`} label="Salin strategi"/>}<small className="mono">TANTANGAN MABAR LOKAL. BUKAN PREDIKSI KEMENANGAN.</small></article>;
}

function CommsSimulator(){
  const [scenarioId,setScenarioId]=useState(commsScenarios[0].id);
  const [visible,setVisible]=useState(0);
  const [running,setRunning]=useState(false);
  const scenario=commsScenarios.find(s=>s.id===scenarioId)!;
  const [replay,setReplay]=useState(0);
  useEffect(()=>{if(!running)return;if(visible>=scenario.lines.length){setRunning(false);return}const t=setTimeout(()=>setVisible(v=>v+1),750);return()=>clearTimeout(t)},[running,visible,scenario,replay]);
  const finished=visible===scenario.lines.length;
  const started=replay>0;
  function start(){setVisible(0);setRunning(true);setReplay(n=>n+1)}
  return <article className="comms-console" id="simulasi-comms"><div className="console-bar"><span className="mono">06 / COMMS.EXE</span><span className="mono">CHAT FIKSI · TANPA MIKROFON</span></div><div className="console-body"><h3>SATU SQUAD.<br/><span>BEDA REALITAS.</span></h3><p>Simulasi voice comms, minus suara.<br/>Kekacauan tetap terdengar.</p><div className="scenario-picker" aria-label="Pilih skenario komunikasi">{commsScenarios.map(s=><button key={s.id} disabled={running} aria-pressed={scenarioId===s.id} onClick={()=>{setScenarioId(s.id);setVisible(0);setRunning(false);setReplay(0)}}>{s.label}</button>)}</div><div className="comms-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Transkrip simulasi squad">{visible===0?<div className="console-idle mono">{running?'> Menghubungkan ego masing-masing…':'> Pilih skenario, lalu buka komunikasi.'}</div>:scenario.lines.slice(0,visible).map((line,i)=><div className={`chat-line ${line.speaker==='SISTEM'?'system-line':''}`} key={`${replay}-${scenarioId}-${i}`}><span className="chat-speaker mono">{line.speaker}</span><p>{line.message}</p></div>)}</div><div className="comms-verdict mono" role="status">{finished?scenario.verdict:running?'KOMUNIKASI SEDANG MEMBURUK…':started?'SIMULASI DIJEDA. EGO DIBERI WAKTU BERPIKIR.':'SEMUA DIALOG DI ATAS ADALAH LORE BUATAN.'}</div><div className="comms-controls"><button className="button primary" onClick={()=>{if(started&&!finished)setRunning(!running);else start()}}>{running?'Jeda Simulasi':started&&!finished?'Lanjutkan Simulasi':finished?'Ulangi Kekacauan':'Buka Komunikasi'}</button>{!finished&&started&&<button className="text-action" onClick={()=>{setRunning(false);setVisible(scenario.lines.length)}}>Tampilkan semua</button>}</div></div></article>;
}

function BaperHearing(){
  const [level,setLevel]=useState(0);
  const verdict=[...baperVerdicts].reverse().find(v=>level>=v.min)!;
  return <article className="baper-hearing" id="sidang-baper"><div className="experiment-eyebrow mono"><span>07 / SIDANG PERASAAN</span><span>KHUSUS TUAN ALWAN</span></div><span className="baper-stamp">DILARANG<br/>BAPER*</span><h3>TUAN TIDAK<br/>BOLEH <span>BAPER.</span></h3><p>Karena paling baperan.<br/>Recon musuh terdeteksi. Intonasi teman dicurigai.</p><label htmlFor="baper-level" className="mono">INTENSITAS “GUE SANTAI” <strong>{level}%</strong></label><input id="baper-level" type="range" min="0" max="100" step="25" value={level} onChange={e=>setLevel(Number(e.target.value))} aria-valuetext={`${level} persen, ${verdict.title}`}/><div className="baper-reading" role="status" aria-live="polite"><h4>{verdict.title}</h4><p>{verdict.copy}</p></div><div className="baper-actions"><button className="button dark" disabled={level===100} onClick={()=>setLevel(l=>Math.min(100,l+25))}>Bilang “nice try, Wan”</button><button className="text-action" disabled={level===0} onClick={()=>setLevel(0)}>Tenangkan tuan</button></div><small className="mono">*METER HUMOR YANG KAMU ATUR. BUKAN KONDISI EMOSI ALWAN SUNGGUHAN.</small></article>;
}

export function AdvancedLab(){const {brainrot}=useBrainrot();return <div className="advanced-lab"><div className="restricted-strip"><span className="mono">AREA PENELITIAN LANJUTAN</span><strong>{brainrot?'AKAL SEHAT TIDAK MEMILIKI IZIN AKSES.':'MASUK DENGAN RISIKO MENJADI LORE.'}</strong><span className="mono">PROTOKOL ADAD / V.02</span></div><nav className="experiment-nav" aria-label="Eksperimen lanjutan"><a href="#uji-intelektual">04 — Ujian Intelektual</a><a href="#roulette">05 — Roulette Strategi</a><a href="#simulasi-comms">06 — Comms Simulator</a><a href="#sidang-baper">07 — Sidang Baper</a></nav><div className="research-grid"><IntellectualQuiz/><DecisionRoulette/><CommsSimulator/><BaperHearing/></div><div className="dictionary"><div><span className="mono">LAMPIRAN / PEDOMAN BAHASA</span><h3>KAMUS<br/>ANTI <span>TANGGUNG JAWAB.</span></h3><p>Ganti istilahnya.<br/>Masalahnya tetap sama.</p></div><div className="dictionary-entries">{academicDictionary.map(([term,translation,note])=><details key={term}><summary><span>{term}</span><span aria-hidden="true">＋</span></summary><div><strong>{translation}</strong><p>{note}</p></div></details>)}</div></div></div>}
