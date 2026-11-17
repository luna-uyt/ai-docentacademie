'use strict';
window.COURSE_STATE = {
  empty(lessons) {
    const s={version:1,reflection:{},cases:{},practice:{},answers0:{},answers1:{},match:{},lesson:{},checked0:false,checked1:false,matchChecked:false};
    for(const lesson of lessons){s.lesson[lesson.id]={done:[],step:0,completed:false};if(lesson.id>=2){s['work'+lesson.id]={};s['answers'+lesson.id]={};s['checked'+lesson.id]=false;}}
    return s;
  },
  normalize(raw,lessons) {
    if(!raw||raw.version!==1||typeof raw!=='object'||Array.isArray(raw))throw new Error('Ongeldig voortgangsbestand');
    const s={...this.empty(lessons),...raw};
    for(const key of ['reflection','cases','practice','answers0','answers1','match',...lessons.filter(l=>l.id>=2).flatMap(l=>['work'+l.id,'answers'+l.id])]){
      if(!s[key]||typeof s[key]!=='object'||Array.isArray(s[key]))s[key]={};
    }
    s.lesson={};
    for(const l of lessons){
      const old=raw.lesson?.[l.id];
      const done=Array.isArray(old?.done)?[...new Set(old.done.filter(n=>Number.isInteger(n)&&n>=0&&n<l.steps.length))]:[];
      s.lesson[l.id]={done,step:Number.isInteger(old?.step)?Math.max(0,Math.min(old.step,l.steps.length-1)):0,completed:!!old?.completed&&done.length===l.steps.length,...(typeof old?.completedAt==='string'?{completedAt:old.completedAt}:{})};
    }
    return s;
  }
};
