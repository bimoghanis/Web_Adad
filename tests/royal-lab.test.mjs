import test from 'node:test';
import assert from 'node:assert/strict';
import {readBook,targetAt,mergeBooks} from '../lib/royal-lab.ts';
test('daily targets are reproducible, bounded and never repeat the previous cell',()=>{
 for(const seed of [20261010,20261011,123]){let previous=4;for(let i=0;i<500;i++){const n=targetAt(seed,i,previous);assert.equal(n,targetAt(seed,i,previous));assert.ok(n>=0&&n<9);assert.notEqual(n,previous);previous=n}}
});
test('record book rejects corrupt or invalid records and deduplicates collection',()=>{
 assert.equal(readBook('{').best,0);
 const b=readBook(JSON.stringify({best:-1,plays:'oops',scanned:[0,0,2,8,-1,'3'],daily:{'2026-10-10':300,'bad':99,'2026-10-11':-1}}));
 assert.equal(b.best,0);assert.equal(b.plays,0);assert.deepEqual(b.scanned,[0,2]);assert.deepEqual(b.daily,{'2026-10-10':300});
 const valid={best:300,plays:4,scanned:[1,2],daily:{'2026-10-10':250}};assert.deepEqual(readBook(JSON.stringify(valid)),valid);
});

test("parallel tabs preserve unlocked collections and best scores",()=>{const a={best:300,plays:2,scanned:[1],daily:{"2026-10-10":200}};const b={best:100,plays:1,scanned:[2],daily:{"2026-10-10":50}};const m=mergeBooks(a,b);assert.equal(m.best,300);assert.equal(m.daily["2026-10-10"],200);assert.deepEqual(m.scanned,[1,2]);});
