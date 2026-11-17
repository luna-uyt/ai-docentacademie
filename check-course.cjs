const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['content.js','lessons.js','state.js','toolkit.js','course-engine.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
const C=ctx.window.COURSE,store=ctx.window.COURSE_STATE;
assert.equal(C.lessons.length,9);
assert.equal(new Set(C.lessons.map(l=>l.id)).size,9);
const legacy={version:1,reflection:{experience:'Mijn eerste ervaring'},initialReflection:{experience:'Ongewijzigd begin'},initialAnswers0:{0:1},practice:{learningGoal:'Mijn bestaande leerdoel'},lesson:{0:{done:[0,1,2,3,4,5,6],step:6,completed:true},1:{done:[0,1],step:1,completed:false}}};
const migrated=store.normalize(legacy,C.lessons);
assert.equal(migrated.reflection.experience,legacy.reflection.experience);
assert.equal(migrated.initialReflection.experience,legacy.initialReflection.experience);
assert.equal(migrated.practice.learningGoal,legacy.practice.learningGoal);
assert.equal(migrated.lesson[0].completed,true);
for(let id=2;id<=8;id++){assert.deepEqual(Array.from(migrated.lesson[id].done),[]);assert.ok(migrated['work'+id]);assert.ok(migrated['answers'+id]);assert.equal(migrated.lesson[id].completed,false);}
const damaged=store.normalize({...legacy,lesson:{0:{done:[0,0,-1,99,'1'],step:99,completed:true}}},C.lessons);
assert.deepEqual(Array.from(damaged.lesson[0].done),[0]);assert.equal(damaged.lesson[0].step,6);assert.equal(damaged.lesson[0].completed,false);
assert.throws(()=>store.normalize({version:99},C.lessons));
for(const l of C.lessons.filter(l=>l.id>=2)){
 const m=C.extended[l.id];assert.equal(l.steps.length,6);assert.ok(m.theory.length>=3);assert.ok(m.fields.length>=3);assert.equal(m.quiz.length,3);
 for(const q of [m.activity,...m.quiz]){assert.ok(q.a.length>=3);assert.ok(q.correct>=0&&q.correct<q.a.length);assert.ok(q.feedback.length>30);}
}
const payload='</script><img src=x onerror=alert(1)>';
const html=ctx.window.LEARNING_TOOLKIT.createHtml({prototypeTitle:payload});
assert.ok(!html.includes(payload),'Prototype must not interpolate raw HTML');
assert.equal((html.match(/<script>/g)||[]).length,1);
assert.equal((html.match(/<\/script>/g)||[]).length,1,'Generated HTML must close its script');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(script);
assert.ok(html.includes('textContent'));
let testingState=store.empty(C.lessons);
const ui=ctx.window.COURSE_UI.create({C,state:()=>testingState,page:()=>({id:2}),icon:()=>'',esc:String,field:(group,f)=>`<label>${f.label}<textarea></textarea></label>`,hint:t=>`<aside>${t}</aside>`,href:()=>'',portfolioField:()=>'',save:()=>{},toast:()=>{},download:()=>{},render:()=>{}});
for(let id=2;id<=8;id++){
 const w=testingState['work'+id];
 assert.ok(ui.validate(id,0));w.opening='Mijn concrete vertrekvraag';assert.equal(ui.validate(id,0),'');
 assert.ok(ui.validate(id,2));w.exercise='Mijn toepassing';w.activityChecked=true;assert.equal(ui.validate(id,2),'');
 assert.ok(ui.validate(id,3));for(const f of C.extended[id].fields)w[f.key]='Een uitgewerkte praktijksituatie';assert.equal(ui.validate(id,3),'');
 assert.ok(ui.validate(id,4));testingState['checked'+id]=true;assert.equal(ui.validate(id,4),'');
 w.reflection='Mijn volgende stap';if(id===8)w.confidenceEnd='3';assert.ok(ui.validate(id,5),'Cannot complete by jumping straight to the last step');
 testingState.lesson[id].done=[0,1,2,3,4];assert.equal(ui.validate(id,5),'');
 for(let step=0;step<6;step++)assert.ok(ui.view(id,step).length>100,'All lesson steps render');
}
assert.ok(ui.exportLines().join('\n').includes('LES 8'));
console.log('Passed: nine lesson definitions and all new page renderers; preserved legacy progress; required exercises and completion checks; full portfolio export; standalone prototype syntax and injection escaping.');
