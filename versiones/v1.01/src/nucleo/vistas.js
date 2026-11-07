/* ---------- Orden de temas de 6.º ---------- */
const ALL=TEMAS;
const EJE={num:'Números',ope:'Operaciones',fra:'Fracciones',pro:'Proporcionalidad',geo:'Geometría',med:'Medición',dat:'Datos y azar'};

/* ---------- Construcción de las fichas ---------- */
const STAGE=["Con apoyo","Práctica","Práctica","Misión con pista","Comprobación"];
function stg(n,i){return n===10?stageOf(i):i}
function stagedS(list,s,exNo){
 const strip=x=>{const y=Object.assign({},x);['m','add','cross','pt','jumps','path'].forEach(k=>delete y[k]);return y};
 const lvl=exNo===1?[0,1,1,2,3][s]:[0,1,2,3,3][s];
 if(lvl===3)return [{k:'blank'}];
 return list.map(x=>lvl===0?x:lvl===1?strip(x):Object.assign(strip(x),{outline:true}));
}
const icons={
 num:'<text x="32" y="32" font-size="16" font-weight="700" text-anchor="middle" fill="var(--acc)">1,234</text>',
 ope:'<text x="32" y="33" font-size="14" font-weight="700" text-anchor="middle" fill="var(--acc)">+ − × ÷</text>',
 fra:'<circle cx="32" cy="25" r="16" fill="var(--tint)" stroke="var(--acc)" stroke-width="2"/><path d="M32 9V41M16 25H48" stroke="var(--acc)" stroke-width="2"/>',
 pro:'<text x="32" y="33" font-size="19" font-weight="700" text-anchor="middle" fill="var(--acc)">25%</text>',
 geo:'<path d="M14 40L32 10L50 40Z" fill="var(--tint)" stroke="var(--acc)" stroke-width="2"/><circle cx="46" cy="18" r="8" fill="none" stroke="var(--acc)" stroke-width="2"/>',
 med:'<rect x="9" y="19" width="46" height="13" fill="var(--tint)" stroke="var(--acc)" stroke-width="2"/><path d="M15 19v6M21 19v4M27 19v6M33 19v4M39 19v6M45 19v4M51 19v6" stroke="var(--acc)" stroke-width="1.5"/>',
 dat:'<path d="M14 40V26h8v14M28 40V14h8v26M42 40V22h8v18" fill="var(--tint)" stroke="var(--acc)" stroke-width="2"/>'
};
const icon2=e=>'<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="2" y="2" width="60" height="46" rx="9" fill="#fff" stroke="var(--acc)" stroke-width="2"/>'+icons[e]+'</svg>';
/* ---------- Contestar en pantalla (se oculta al imprimir) ---------- */
function campoHTML(id,c,i){
 const nom='r'+id.replace(/\./g,'_')+'_'+i,lab=t(c.l);
 if(c.k==='op')return '<fieldset class="int-c"><legend>'+lab+'</legend>'+c.ops.map((o,k)=>'<label class="int-op"><input type="radio" name="'+nom+'" value="'+k+'" data-c="'+i+'"> '+t(o)+'</label>').join('')+'</fieldset>';
 if(c.k==='ord')return '<fieldset class="int-c"><legend>'+lab+'</legend>'+c.c.map((_,k)=>'<label class="int-ord">'+(k+1)+'.º <select data-c="'+i+'" data-p="'+k+'"><option value="">—</option>'+c.ops.map((o,q)=>'<option value="'+q+'">'+o+'</option>').join('')+'</select></label>').join('')+'</fieldset>';
 const inp=(p,al)=>'<input type="text" autocomplete="off" spellcheck="false" inputmode="'+(c.k==='n'||c.k==='ent'?'decimal':'text')+'" data-c="'+i+'"'+(p!=null?' data-p="'+p+'"':'')+' aria-label="'+al+'">';
 if(c.k==='dos')return '<div class="int-c"><span>'+lab+'</span>'+inp(0,'Primer nombre')+'<span>=</span>'+inp(1,'Segundo nombre')+'</div>';
 return '<label class="int-c"><span>'+lab+'</span>'+inp(null,Resp.textoPlano(c.l))+'</label>';
}
function intHTML(id,e){
 const cs=e.R;if(!cs)throw Error('Falta la respuesta en pantalla de '+id);
 return '<div class="int" data-id="'+id+'" data-intentos="0">'+cs.map((c,i)=>campoHTML(id,c,i)).join('')+
 '<div class="int-acc"><button type="button" class="va-btn" data-accion="comprobar">Comprobar</button><button type="button" class="va-btn va-sec" data-accion="ver" hidden>Ver respuesta</button></div>'+
 '<p class="int-msg" role="status" aria-live="polite"></p>'+
 '<div class="int-auto" hidden><p>Compara con la respuesta: <b>'+t(e.a)+'</b></p><button type="button" class="va-btn" data-accion="bien">Lo tuve bien</button> <button type="button" class="va-btn va-sec" data-accion="mal">Lo tuve mal</button></div>'+
 '<p class="int-pista" hidden><b>Pista:</b> '+t(e.h)+'</p><p class="int-sol" hidden><b>Respuesta:</b> '+t(e.a)+'</p></div><!--/int-->';
}
function make2(tema,ti,i){
 const row=tema.rows[i],n=tema.rows.length,s=stg(n,i);
 if(row.e.length!==3)throw Error("Cada ficha necesita 3 ejercicios: "+row.t);
 const exs=row.e.map((e,j)=>{
  const list=(e.fixed||j===0)?e.f:stagedS(e.f,s,j);
  const tip=(s===3&&j>0)?'<div class="tip"><b>Pista:</b> '+t(e.h)+'</div>':'';
  const fg=list.length?figs(list,e.col&&list[0].k!=='blank'):'<div class="figs"><div class="blank"><span>Haz aquí tus cuentas</span></div></div>';
  return '<section class="ex"><h3><span class="num">'+(j+1)+'</span>'+titles[j]+'</h3><div class="q"><p>'+t(e.q)+'</p>'+tip+'<div class="resp">Respuesta:</div>'+intHTML((ti+1)+'.'+(i+1)+'.'+(j+1),e)+'</div>'+fg+'</section>';
 }).join('');
 const keys=row.e.map((e,j)=>'<div class="ans">'+(e.k&&e.k.length?figs(e.k,e.col,true):'<div></div>')+'<div><p><b>'+(j+1)+'. '+t(e.a)+'</b></p><p><b>Pista</b> '+t(e.h)+'</p>'+track+'</div></div>').join('');
 return '<article class="sheet" data-eje="'+tema.eje+'"><div class="top"><header class="head"><div><span class="badge">6.º · México · '+EJE[tema.eje]+' · '+tema.title+' · '+(n===10?stageName(i):STAGE[i])+'</span><h2>'+row.t+'</h2><p class="meta">Tema '+(ti+1)+' · Ficha '+(i+1)+' de '+n+' &nbsp;·&nbsp; Nombre ______________________ &nbsp; Fecha ________</p></div>'+icon2(tema.eje)+'</header>'+'<div class="int-marc"><span role="status" aria-live="polite">Correctas: <b class="int-cuenta">0</b> de 3</span><button type="button" class="va-btn va-sec" data-accion="reiniciar">Volver a intentar la ficha</button></div><!--/marc-->'+exs+'</div>'+
 '<div class="key"><div class="cut">✂ Dobla o recorta por esta línea</div><h4>Respuestas para revisar juntos</h4>'+keys+legend+'</div></article>';
}
/* Campos de respuesta por ejercicio, para comprobar en pantalla */
const RESPID={};ALL.forEach((tm,ti)=>tm.rows.forEach((r,i)=>r.e.forEach((e,j)=>{RESPID[(ti+1)+'.'+(i+1)+'.'+(j+1)]=e.R})));
const IDX=[],markup=[];
ALL.forEach((tm,ti)=>{if(tm.rows.length!==5&&tm.rows.length!==10)throw Error("Tema con fichas inválidas");tm.rows.forEach((r,i)=>{IDX.push([ti,i]);markup.push(make2(tm,ti,i))})});

