/* ---------- Aritmética de fracciones ---------- */
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const F=(n,d)=>{if(!Number.isInteger(n)||!Number.isInteger(d)||d<=0)throw Error("Fracción inválida "+n+"/"+d);return{n,d}};
const lcm=(a,b)=>a/gcd(a,b)*b;
/* Resultado con el mínimo común denominador, como lo haría el alumno */
const add=(a,b)=>{const d=lcm(a.d,b.d);return F(a.n*d/a.d+b.n*d/b.d,d)};
const sub=(a,b)=>{const d=lcm(a.d,b.d);return F(a.n*d/a.d-b.n*d/b.d,d)};
const mul=(a,k)=>F(a.n*k,a.d);
const simp=a=>{const g=gcd(a.n,a.d)||1;return F(a.n/g,a.d/g)};
const cmp=(a,b)=>Math.sign(a.n*b.d-b.n*a.d);
const to=(a,d)=>{if((d*a.n)%a.d)throw Error("No se puede llevar "+a.n+"/"+a.d+" a /"+d);return F(a.n*d/a.d,d)};
const val=a=>a.n/a.d;
/* Texto: {3/4} se dibuja como fracción vertical */
const t=s=>s.replace(/\{(\d+)\/(\d+)\}/g,'<span class="fr"><span>$1</span><span>$2</span></span>');
const fs=a=>"{"+a.n+"/"+a.d+"}";
const mixed=a=>{const s=simp(a),w=Math.floor(s.n/s.d),r=s.n%s.d;return w&&r?w+" "+fs(F(r,s.d)):w?String(w):fs(s)};
const dec=x=>String(Math.round(x*10000)/10000);
const cmpWord=(a,b)=>["menor que","igual a","mayor que"][cmp(a,b)+1];

/* ---------- Figuras SVG ---------- */
const W=300;
const cls=k=>k===1?'class="m1"':k===2?'class="m2"':k===3?'class="m3"':'';
function cellFill(x,y,w,h,k){
 // k: 0 vacío, 1 marcada (color + puntos), 2 agregada (rayas), 3 quitada (cruces)
 if(!k)return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="#fff"/>';
 const base=k===3?'#fff':k===2?'var(--tint2)':'var(--tint)',pat=k===1?'pDot':k===2?'pHatch':'pCross';
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+base+'"/><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="url(#'+pat+')"/>';
}
function stateArr(n,s){ // s: {m,add,cross} → arreglo de estados por parte
 const a=Array(n).fill(0),m=s.m||0,ad=s.add||0,cr=s.cross||0;
 for(let i=0;i<m;i++)a[i]=1;
 for(let i=m;i<m+ad;i++)a[i]=2;
 for(let i=m-cr;i<m;i++)a[i]=3; // se tacha desde el final de lo marcado
 return a;
}
const svg=(w,h,body,label)=>'<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" role="img" aria-label="'+label+'" style="width:'+w+'px;max-width:100%;height:auto">'+body+'</svg>';
const sw='stroke="#2b3850" stroke-width="1.6"';
const fig={
 bar(s){ // tira de d partes
  const h=s.h||34,w=s.w||W,st=stateArr(s.d,s);let b='';
  if(s.outline)return svg(w+4,h+4,'<rect x="2" y="2" width="'+w+'" height="'+h+'" fill="#fff" '+sw+'/>','tira sin dividir');
  for(let i=0;i<s.d;i++)b+=cellFill(2+i*w/s.d,2,w/s.d,h,st[i]);
  for(let i=1;i<s.d;i++)b+='<line x1="'+(2+i*w/s.d)+'" y1="2" x2="'+(2+i*w/s.d)+'" y2="'+(2+h)+'" '+sw+'/>';
  b+='<rect x="2" y="2" width="'+w+'" height="'+h+'" fill="none" '+sw+'/>';
  return svg(w+4,h+4,b,'tira de '+s.d+' partes iguales');
 },
 pie(s){
  const r=s.r||46,c=r+3,st=stateArr(s.d,s);let b='';
  if(s.outline)return svg(2*c,2*c,'<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="#fff" '+sw+'/>','círculo sin dividir');
  for(let i=0;i<s.d;i++){
   const a0=-Math.PI/2+2*Math.PI*i/s.d,a1=-Math.PI/2+2*Math.PI*(i+1)/s.d;
   const p='M'+c+' '+c+'L'+(c+r*Math.cos(a0)).toFixed(2)+' '+(c+r*Math.sin(a0)).toFixed(2)+'A'+r+' '+r+' 0 0 1 '+(c+r*Math.cos(a1)).toFixed(2)+' '+(c+r*Math.sin(a1)).toFixed(2)+'Z';
   const k=st[i],base=k===3?'#fff':k===2?'var(--tint2)':k===1?'var(--tint)':'#fff';
   b+='<path d="'+p+'" fill="'+base+'"/>'+(k?'<path d="'+p+'" fill="url(#'+(k===1?'pDot':k===2?'pHatch':'pCross')+')"/>':'')+'<path d="'+p+'" fill="none" '+sw+'/>';
  }
  return svg(2*c,2*c,b,'círculo de '+s.d+' partes iguales');
 },
 grid(s){ // rejilla r×c, se llena por filas
  const cw=s.cw||(s.c>6?24:34),w=s.c*cw,h=s.r*cw,n=s.r*s.c,st=stateArr(n,s);let b='';
  if(s.outline)return svg(w+4,h+4,'<rect x="2" y="2" width="'+w+'" height="'+h+'" fill="#fff" '+sw+'/>','rectángulo sin dividir');
  for(let i=0;i<n;i++){const x=2+(s.byCol?Math.floor(i/s.r):i%s.c)*cw,y=2+(s.byCol?i%s.r:Math.floor(i/s.c))*cw;b+=(s.plain?'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="'+cw+'" fill="'+(st[i]?'var(--acc)':'#fff')+'" fill-opacity="'+(st[i]?0.55:1)+'"/>':cellFill(x,y,cw,cw,st[i]))+'<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="'+cw+'" fill="none" stroke="#2b3850" stroke-width="'+(s.c>6?0.9:1.6)+'"/>'}
  b+='<rect x="2" y="2" width="'+w+'" height="'+h+'" fill="none" '+sw+'/>';
  return svg(w+4,h+4,b,'rejilla de '+n+' cuadros iguales');
 },
 hex(s){ // hexágono de 6 triángulos
  const r=48,c=r+3,st=stateArr(6,s);let b='';
  const P=i=>[(c+r*Math.cos(Math.PI/3*i-Math.PI/2)).toFixed(2),(c+r*Math.sin(Math.PI/3*i-Math.PI/2)).toFixed(2)];
  for(let i=0;i<6;i++){const a=P(i),z=P(i+1),p='M'+c+' '+c+'L'+a.join(' ')+'L'+z.join(' ')+'Z';const k=st[i];
   b+='<path d="'+p+'" fill="'+(k===2?'var(--tint2)':k===1?'var(--tint)':'#fff')+'"/>'+(k?'<path d="'+p+'" fill="url(#'+(k===1?'pDot':k===2?'pHatch':'pCross')+')"/>':'')+'<path d="'+p+'" fill="none" '+sw+'/>'}
  return svg(2*c,2*c,b,'hexágono de 6 triángulos iguales');
 },
 set(s){ // conjunto de objetos
  const per=s.n>6?Math.ceil(s.n/2):s.n,sz=34,w=per*(sz+8),h=Math.ceil(s.n/per)*(sz+8);let b='';
  const shapes={
   star:(x,y)=>'M'+[0,1,2,3,4,5,6,7,8,9].map(i=>{const r=i%2?7:16,a=-Math.PI/2+i*Math.PI/5;return (x+17+r*Math.cos(a)).toFixed(1)+' '+(y+18+r*Math.sin(a)).toFixed(1)}).join('L')+'Z',
   fish:(x,y)=>'M'+(x+3)+' '+(y+17)+'Q'+(x+15)+' '+(y+3)+' '+(x+26)+' '+(y+17)+'Q'+(x+15)+' '+(y+31)+' '+(x+3)+' '+(y+17)+'ZM'+(x+26)+' '+(y+17)+'L'+(x+33)+' '+(y+9)+'L'+(x+33)+' '+(y+25)+'Z',
   coin:(x,y)=>'M'+(x+17)+' '+(y+2)+'a15 15 0 1 0 0.01 0Z',
   drop:(x,y)=>'M'+(x+17)+' '+(y+2)+'C'+(x+17)+' '+(y+12)+' '+(x+30)+' '+(y+18)+' '+(x+30)+' '+(y+24)+'A13 11 0 0 1 '+(x+4)+' '+(y+24)+'C'+(x+4)+' '+(y+18)+' '+(x+17)+' '+(y+12)+' '+(x+17)+' '+(y+2)+'Z'
  };
  for(let i=0;i<s.n;i++){const x=4+(i%per)*(sz+8),y=4+Math.floor(i/per)*(sz+8),p=shapes[s.shape](x,y),k=i<(s.m||0)?1:0;
   b+='<path d="'+p+'" fill="'+(k?'var(--tint)':'#fff')+'"/>'+(k?'<path d="'+p+'" fill="url(#pDot)"/>':'')+'<path d="'+p+'" fill="none" '+sw+'/>'}
  return svg(w+4,h+4,b,'conjunto de '+s.n+' objetos');
 },
 line(s){ // recta numérica de 0 a max con d divisiones por unidad
  const max=s.max||1,w=s.w||280,x0=12,y=s.jumps?52:30,u=w/max;let b='<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" '+sw+'/>';
  if(!s.outline)for(let i=0;i<=s.d*max;i++){const x=x0+i*u/s.d,big=i%s.d===0;b+='<line x1="'+x+'" y1="'+(y-(big?10:6))+'" x2="'+x+'" y2="'+(y+(big?10:6))+'" '+sw+'/>'}
  else for(let k=0;k<=max;k++)b+='<line x1="'+(x0+k*u)+'" y1="'+(y-10)+'" x2="'+(x0+k*u)+'" y2="'+(y+10)+'" '+sw+'/>';
  for(let k=0;k<=max;k++)b+='<text x="'+(x0+k*u)+'" y="'+(y+26)+'" font-size="14" text-anchor="middle" fill="#18243a">'+k+'</text>';
  (s.labels||[]).forEach(([i,txt])=>b+='<text x="'+(x0+i*u/s.d)+'" y="'+(y+26)+'" font-size="12" text-anchor="middle" fill="#18243a">'+txt+'</text>');
  (s.jumps||[]).forEach(([a,z],j)=>{const xa=x0+a*u/s.d,xz=x0+z*u/s.d,mx=(xa+xz)/2,top=y-30-(j%2)*8;b+='<path d="M'+xa+' '+(y-4)+'Q'+mx+' '+top+' '+xz+' '+(y-4)+'" fill="none" stroke="#2b3850" stroke-width="2" '+(j?'stroke-dasharray="5 3"':'')+'/><path d="M'+xz+' '+(y-4)+'l-7 -5l1 8z" fill="#2b3850"/>'});
  if(s.pt!=null){const x=x0+s.pt*u/s.d;b+='<circle cx="'+x+'" cy="'+y+'" r="6" fill="var(--acc)" stroke="#fff" stroke-width="1.5"/>'}
  return svg(w+24,y+32,b,'recta numérica de 0 a '+max);
 },
 g100(s){ // cuadrícula de 100, se llena por columnas (décimos)
  return fig.grid({r:10,c:10,cw:s.cw||10,m:s.m,byCol:true,outline:s.outline,plain:true});
 },
 uneq(s){ // rectángulo con partes desiguales
  const w=s.w||150,h=60;let x=2,b='';
  s.parts.forEach((p,i)=>{const pw=w*p;b+=cellFill(x,2,pw,h,i===s.mark?1:0)+'<rect x="'+x+'" y="2" width="'+pw+'" height="'+h+'" fill="none" '+sw+'/>';x+=pw});
  return svg(w+4,h+4,b,'rectángulo con partes de distinto tamaño');
 },
 blank(){return '<div class="blank"><span>Dibuja tu modelo aquí</span></div>'}
};
const draw=s=>s.k==='choice'
 ?'<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">'+s.items.map((it,i)=>'<div style="text-align:center">'+draw(it)+'<div style="font-weight:700">'+"ABCD"[i]+'</div></div>').join('')+'</div>'
 :fig[s.k](s);
const figs=(list,col,small)=>'<div class="figs'+(col?' col':'')+'">'+list.map(s=>small?draw(Object.assign({},s,s.k==='bar'?{w:Math.min(s.w||200,200),h:Math.min(s.h||22,22)}:s.k==='pie'?{r:30}:s.k==='line'?{w:200}:s.k==='grid'&&!s.cw?{cw:s.c>6?16:20}:{})):draw(s)).join('')+'</div>';

/* Ayudas que bajan: etapa 0 (fichas 1-2) … 4 (fichas 9-10) */
const stageOf=i=>i<2?0:i<4?1:i<6?2:i<8?3:4;
function staged(list,i,exNo){
 const s=stageOf(i),strip=x=>{const y=Object.assign({},x);delete y.m;delete y.add;delete y.cross;delete y.pt;delete y.jumps;return y};
 const lvl=exNo===1?[0,1,1,2,3][s]:[0,1,2,3,3][s]; // 0 tal cual, 1 dividida sin marcas, 2 solo contorno, 3 hoja en blanco
 if(lvl===3)return [{k:'blank'}];
 return list.map(x=>lvl===0?x:lvl===1?strip(x):Object.assign(strip(x),{outline:true}));
}
