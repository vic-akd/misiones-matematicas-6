/* ========== LÓGICA: comprobar respuestas en pantalla ==========
 No guarda nada: el avance vive solo en la ficha abierta. */
const Resp=(()=>{
 const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9ñ,.\s]/g,' ').replace(/(\d),(\d{3})/g,'$1$2').replace(/[.,]+(\s|$)/g,'$1').replace(/\s+/g,' ').trim();
 const textoPlano=s=>String(s).replace(/\{(\d+)\/(\d+)\}/g,'$1/$2').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]+>/g,'');
 /* Lee un número escrito por un niño: 1,234 · 1234 · 0.5 · .5 · 0,5 · 3/4 · 1 3/4 · $8.75 · 25% · 7.5 cm */
 function leer(s){
  s=String(s).replace(/[$%]/g,' ').replace(/[^\d.,\/\s-]/g,' ').trim().replace(/\s*\/\s*/g,'/').replace(/\s+/g,' ');
  let m;
  if((m=s.match(/^(\d+) (\d+)\/(\d+)$/))&&+m[3]>0)return{v:+m[1]+m[2]/m[3],fr:{n:+m[1]*m[3]+ +m[2],d:+m[3]},mixto:true};
  if((m=s.match(/^(\d+)\/(\d+)$/))&&+m[2]>0)return{v:m[1]/m[2],fr:{n:+m[1],d:+m[2]}};
  s=s.replace(/\s/g,'');
  if(/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))s=s.replace(/,/g,'');
  else if(/^\d*,\d+$/.test(s))s=s.replace(',','.');
  if(/^(\d+\.?\d*|\.\d+)$/.test(s))return{v:parseFloat(s),fr:null};
  return null;
 }
 const frac=v=>{const[a,b]=v.split('/').map(Number);return{n:a,d:b}};
 const igual=(p,F)=>p.fr?p.fr.n*F.d===F.n*p.fr.d:Math.abs(p.v-F.n/F.d)<1e-9;
 /* Devuelve true, false, 'auto' (autoevaluación) o null (vacío) */
 function campo(c,val){
  if(c.k==='op')return val===''?null:Number(val)===c.c;
  if(c.k==='ord')return val.some(x=>x==='')?null:val.every((x,i)=>Number(x)===c.c[i]);
  if(c.k==='dos'){if(val.some(x=>x.trim()===''))return null;const F=frac(c.v),p=val.map(leer);
   return p.every(x=>x&&x.fr&&igual(x,F))&&!(p[0].fr.n===p[1].fr.n&&p[0].fr.d===p[1].fr.d);}
  if(String(val).trim()==='')return null;
  if(c.k==='tx'){const v=norm(val);return c.ok.some(o=>norm(o)===v)?true:'auto';}
  const p=leer(val);if(!p)return false;
  if(c.k==='n')return Math.abs(p.v-c.v)<1e-9&&!(c.dec&&p.fr);
  if(c.k==='ent')return p.v>c.a&&p.v<c.b;
  if(c.k==='f'){const F=frac(c.v);return c.exacta?!!(p.fr&&!p.mixto&&p.fr.n===F.n&&p.fr.d===F.d):igual(p,F);}
  return false;
 }
 /* Una respuesta correcta de cada campo, para pruebas */
 function ejemplo(c){
  if(c.k==='op')return String(c.c);if(c.k==='ord')return c.c.map(String);
  if(c.k==='dos'){const F=frac(c.v);return[c.v,(F.n*2)+'/'+(F.d*2)];}
  if(c.k==='tx')return c.ok[0]||'cualquier texto';if(c.k==='ent')return String((c.a+c.b)/2);
  return String(c.v);
 }
 /* Una respuesta incorrecta de cada campo, para pruebas */
 function errada(c){
  if(c.k==='op')return String((c.c+1)%c.ops.length);if(c.k==='ord')return c.c.slice().reverse().map(String);
  if(c.k==='dos')return[c.v,c.v];if(c.k==='tx')return null;if(c.k==='ent')return String(c.b+1);
  if(c.k==='f'){const F=frac(c.v);return (F.n+1)+'/'+F.d;}
  return String(c.v+1);
 }
 return{campo,leer,norm,textoPlano,ejemplo,errada};
})();
