import test from 'node:test';
import assert from 'node:assert/strict';

test('source references resolve for every metric and team member', async () => {
 const {sources}=await import('../src/content/sources.js');
 const {metrics}=await import('../src/content/security.js');
 const {people}=await import('../src/content/people.js');
 for(const item of [...metrics,...people]) for(const id of item.sourceIds) assert.ok(sources[id],id);
 assert.ok(people.find(p=>p.id==='xjm').profileUrl);
});
test('historical funding is dated and includes subsequent sponsorship',async()=>{
 const {people}=await import('../src/content/people.js'); const xjm=people.find(p=>p.id==='xjm');
 assert.equal(xjm.historicalFunding.asOf,'2026-10-28'); assert.equal(xjm.historicalFunding.currentStatusSourceId,'vardot');
 const withoutImage={...xjm,portrait:undefined}; assert.ok(withoutImage.name); assert.ok(withoutImage.role); assert.ok(withoutImage.profileUrl);
});
