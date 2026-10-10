import test from 'node:test';
import assert from 'node:assert/strict';
import {missions,chapters,shuffle,signalSequence,createSwitchPuzzle,toggleBoard,switchHint,createMaze,mazePath,cipherFeedback,freshSave,parseSave,unlocked,chapterCleared,aura} from '../lib/campaign.ts';

test('30 unique missions cover five mechanics in every region',()=>{
 assert.equal(missions.length,30);assert.equal(new Set(missions.map(m=>m.id)).size,30);
 for(const c of chapters)assert.equal(new Set(missions.filter(m=>m.chapter===c.id).map(m=>m.kind)).size,5);
});

test('all switch puzzles start unsolved and hint path solves even after wrong moves',()=>{
 for(const m of missions.filter(m=>m.kind==='switches')){
  const size=m.chapter===0?3:m.chapter<4?4:5;
  const puzzle=createSwitchPuzzle(m.seed,size);assert.ok(!puzzle.board.every(Boolean));
  let board=puzzle.board;const clicked=[0,1,2,0];for(const i of clicked)board=toggleBoard(board,i,size);
  for(let step=0;!board.every(Boolean)&&step<100;step++){const hint=switchHint(puzzle.solution,clicked);assert.notEqual(hint,null);board=toggleBoard(board,hint,size);clicked.push(hint)}
  assert.ok(board.every(Boolean),m.id);
 }
});

test('every maze exit and seal is reachable by legal orthogonal steps',()=>{
 for(const m of missions.filter(m=>m.kind==='route')){
  const maze=createMaze(m.seed,9+m.chapter*2);let position=maze.start;
  assert.equal(new Set(maze.seals).size,maze.seals.length);
  for(const target of [...maze.seals,maze.exit]){const path=mazePath(maze,position,target);assert.ok(path.length>0);for(const cell of path){assert.ok(maze.open.includes(cell));assert.equal(Math.abs(Math.floor(position/maze.size)-Math.floor(cell/maze.size))+Math.abs(position%maze.size-cell%maze.size),1);position=cell}assert.equal(position,target)}
 }
});

test('cipher feedback distinguishes exact, displaced, and absent digits',()=>{
 assert.deepEqual(cipherFeedback([1,2,3,4],[1,2,3,4]),{exact:4,misplaced:0});
 assert.deepEqual(cipherFeedback([1,2,3,4],[4,3,2,1]),{exact:0,misplaced:4});
 assert.deepEqual(cipherFeedback([1,2,3,4],[1,4,5,6]),{exact:1,misplaced:1});
});

test('memory decks and signal sequences are reproducible and valid',()=>{
 for(const m of missions){if(m.kind==='memory'){const pairs=6+m.chapter;const deck=shuffle(Array.from({length:pairs},(_,i)=>[i,i]).flat(),m.seed);assert.deepEqual(deck,shuffle(Array.from({length:pairs},(_,i)=>[i,i]).flat(),m.seed));for(let i=0;i<pairs;i++)assert.equal(deck.filter(n=>n===i).length,2)}if(m.kind==='signal'){for(let round=0;round<3;round++){const length=3+m.chapter+round;const seq=signalSequence(m.seed+round*73,length);assert.equal(seq.length,length);assert.ok(seq.every(n=>n>=0&&n<4))}}}
});

test('progress unlocks in order and survives serialization, final reward is earned once',()=>{
 let save=freshSave();assert.ok(unlocked(save,0));assert.ok(!unlocked(save,1));
 for(const chapter of chapters){assert.ok(unlocked(save,chapter.id));for(const m of missions.filter(m=>m.chapter===chapter.id))save.completed[m.id]={assisted:false,moves:12};assert.ok(chapterCleared(save,chapter.id));save=parseSave(JSON.stringify(save))}
 assert.equal(aura(save),3000);save.finished=true;assert.equal(aura(parseSave(JSON.stringify(save))),3500);
 save.completed[missions[0].id].assisted=true;assert.equal(aura(save),3475);
});

test('malformed storage recovers safely and cannot prematurely finish campaign',()=>{
 for(const bad of [null,'bad json','null','{}','{"version":2}','{"version":1,"completed":null}'])assert.equal(Object.keys(parseSave(bad).completed).length,0);
 const save=parseSave(JSON.stringify({version:1,finished:true,effects:'evil',worship:999,completed:{'fake-id':{moves:1,assisted:false},[missions[0].id]:{moves:-1,assisted:false}}}));
 assert.equal(save.finished,false);assert.equal(save.effects,'epic');assert.equal(save.worship,12);assert.equal(Object.keys(save.completed).length,0);
});
