/* ---------- Figuras nuevas de 6.º ---------- */
Object.assign(fig,{
 cart(s){ // plano cartesiano, primer cuadrante
  const gw=s.gw||8,gh=s.gh||6,c=s.c||24,L=24,T=8,X=x=>L+x*c,Y=y=>T+(gh-y)*c;let b='';
  for(let i=0;i<=gw;i++)b+='<line x1="'+X(i)+'" y1="'+Y(0)+'" x2="'+X(i)+'" y2="'+Y(gh)+'" stroke="#c6cfdc" stroke-width=".8"/>'+txt(X(i),Y(0)+15,i,{fs:10});
  for(let j=0;j<=gh;j++)b+='<line x1="'+X(0)+'" y1="'+Y(j)+'" x2="'+X(gw)+'" y2="'+Y(j)+'" stroke="#c6cfdc" stroke-width=".8"/>'+(j?txt(X(0)-8,Y(j)+4,j,{fs:10,a:'end'}):'');
  b+='<line x1="'+X(0)+'" y1="'+Y(0)+'" x2="'+(X(gw)+8)+'" y2="'+Y(0)+'" '+sw+'/><line x1="'+X(0)+'" y1="'+Y(0)+'" x2="'+X(0)+'" y2="'+(Y(gh)-6)+'" '+sw+'/>';
  b+=txt(X(gw)+10,Y(0)+4,'x',{fs:11,b:1,a:'start'})+txt(X(0),Y(gh)-9,'y',{fs:11,b:1});
  if(s.poly){const d='M'+s.poly.map(([x,y])=>X(x)+' '+Y(y)).join('L')+'Z';b+='<path d="'+d+'" fill="var(--tint)" opacity=".7"/><path d="'+d+'" fill="none" stroke="#2b3850" stroke-width="2"/>'}
  (s.pts||[]).forEach(p=>{b+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="5" fill="var(--acc)" stroke="#fff" stroke-width="1.5"/>'+(p[2]?txt(X(p[0])+9,Y(p[1])-7,p[2],{fs:12,b:1,a:'start'}):'')});
  return svg(X(gw)+22,Y(0)+20,b,'plano cartesiano');
 },
 rpoly(s){ // polígono regular con lado y apotema
  const n=s.n,r=s.r||48,c=r+22,a0=-Math.PI/2+(n%2?0:Math.PI/n),P=[...Array(n)].map((_,i)=>[c+r*Math.cos(a0+2*Math.PI*i/n),c+r*Math.sin(a0+2*Math.PI*i/n)]);
  const d='M'+P.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')+'Z';let b='<path d="'+d+'" fill="var(--tint)" opacity=".75"/><path d="'+d+'" fill="none" stroke="#2b3850" stroke-width="2"/>';
  const [p0,p1]=[P[n-1],P[0]],[q0,q1]=n%2?[P[Math.floor(n/2)],P[Math.floor(n/2)+1]]:[P[n/2-1],P[n/2]];
  const mx=(q0[0]+q1[0])/2,my=(q0[1]+q1[1])/2;
  if(s.lado)b+=txt(mx+(mx-c)*.28,my+(my-c)*.28+4,s.lado,{fs:11,b:1});
  if(s.ap){b+='<circle cx="'+c+'" cy="'+c+'" r="2.5" fill="#18243a"/><line x1="'+c+'" y1="'+c+'" x2="'+mx.toFixed(1)+'" y2="'+my.toFixed(1)+'" stroke="#2b3850" stroke-width="1.6" stroke-dasharray="4 3"/>'+txt((c+mx)/2+12,(c+my)/2,s.ap,{fs:10.5,b:1,a:'start'})}
  return svg(2*c,2*c,b,'polígono regular de '+n+' lados');
 },
 tree(s){ // diagrama de árbol de dos etapas
  const A=s.a,B=s.b,leaves=A.length*B.length,dy=22,w=210,h=leaves*dy+10,x0=12,x1=80,x2=150;let b='<circle cx="'+x0+'" cy="'+h/2+'" r="4" fill="#18243a"/>';
  A.forEach((a,i)=>{const ya=(i+.5)*B.length*dy+5;b+='<line x1="'+x0+'" y1="'+h/2+'" x2="'+(x1-12)+'" y2="'+ya+'" '+sw+'/>'+txt(x1,ya+4,a,{fs:12,b:1});
   B.forEach((bb,j)=>{const yb=(i*B.length+j+.5)*dy+5;b+=s.hide?'':'<line x1="'+(x1+12)+'" y1="'+ya+'" x2="'+(x2-12)+'" y2="'+yb+'" '+sw+'/>'+txt(x2,yb+4,bb,{fs:12,b:1})+txt(x2+16,yb+4,a+bb,{fs:11,a:'start'})})});
  return svg(w,h,b,'diagrama de árbol');
 },
 circg(s){ // gráfica circular con leyenda
  const r=s.r||52,c=r+4,tot=s.vals.reduce((x,y)=>x+y,0),pats=['pDot','pHatch','pCross',null,'pDot'],fills=['var(--tint)','var(--tint2)','#fff','#fff','#e8edf4'];let a=-Math.PI/2,b='',lg='';
  s.vals.forEach((v,i)=>{const a1=a+2*Math.PI*v/tot,big=a1-a>Math.PI?1:0,p='M'+c+' '+c+'L'+(c+r*Math.cos(a)).toFixed(1)+' '+(c+r*Math.sin(a)).toFixed(1)+'A'+r+' '+r+' 0 '+big+' 1 '+(c+r*Math.cos(a1)).toFixed(1)+' '+(c+r*Math.sin(a1)).toFixed(1)+'Z';
   b+='<path d="'+p+'" fill="'+fills[i]+'"/>'+(pats[i]?'<path d="'+p+'" fill="url(#'+pats[i]+')" opacity=".5"/>':'')+'<path d="'+p+'" fill="none" '+sw+'/>';
   if(s.lab!==false){const am=(a+a1)/2;b+='<rect x="'+(c+r*.6*Math.cos(am)-15)+'" y="'+(c+r*.6*Math.sin(am)-9)+'" width="30" height="15" rx="3" fill="#fff" opacity=".9"/>'+txt(c+r*.6*Math.cos(am),c+r*.6*Math.sin(am)+3,(s.pct?Math.round(v/tot*100)+'%':v),{fs:10.5,b:1})}
   lg+='<rect x="'+(2*c+10)+'" y="'+(10+i*20)+'" width="14" height="12" fill="'+fills[i]+'" '+sw+'/>'+(pats[i]?'<rect x="'+(2*c+10)+'" y="'+(10+i*20)+'" width="14" height="12" fill="url(#'+pats[i]+')" opacity=".5"/>':'')+txt(2*c+30,20+i*20,s.cats[i],{fs:11,a:'start'});a=a1});
  return svg(2*c+110,Math.max(2*c,s.vals.length*20+14),b+lg,'gráfica circular');
 },
 cubes(s){ // prisma de cubitos (largo × ancho × alto)
  const u=s.u||16,dx=u*.5,dy=u*.4,W2=s.l*u+s.w*dx+4,H2=s.h*u+s.w*dy+4;let b='';
  const cube=(x,y)=>{const X=2+x,Y=H2-2-y;return '<path d="M'+X+' '+Y+'h'+u+'v'+(-u)+'h'+(-u)+'Z" fill="var(--tint)" stroke="#2b3850" stroke-width="1"/>'+
   '<path d="M'+X+' '+(Y-u)+'l'+dx+' '+(-dy)+'h'+u+'l'+(-dx)+' '+dy+'Z" fill="#fff" stroke="#2b3850" stroke-width="1"/>'+
   '<path d="M'+(X+u)+' '+Y+'l'+dx+' '+(-dy)+'v'+(-u)+'l'+(-dx)+' '+dy+'Z" fill="var(--wash)" stroke="#2b3850" stroke-width="1"/>'};
  for(let k=s.w-1;k>=0;k--)for(let z=0;z<s.h;z++)for(let i=0;i<s.l;i++)b+=cube(i*u+k*dx,z*u+k*dy);
  return svg(W2,H2,b,'prisma formado con cubos');
 },
 box(s){ // prisma rectangular con medidas
  const sc=s.sc||14,l=s.l*sc,h=s.h*sc,dx=s.w*sc*.5,dy=s.w*sc*.4,x=10,y=10+dy;let b='<path d="M'+x+' '+y+'h'+l+'v'+h+'h'+(-l)+'Z" fill="var(--tint)" opacity=".8" stroke="#2b3850" stroke-width="2"/>'+
  '<path d="M'+x+' '+y+'l'+dx+' '+(-dy)+'h'+l+'l'+(-dx)+' '+dy+'Z" fill="#fff" stroke="#2b3850" stroke-width="2"/><path d="M'+(x+l)+' '+(y+h)+'l'+dx+' '+(-dy)+'v'+(-h)+'l'+(-dx)+' '+dy+'Z" fill="var(--wash)" stroke="#2b3850" stroke-width="2"/>';
  b+=txt(x+l/2,y+h+15,s.ll||'',{fs:11,b:1})+txt(x+l+dx+6,y+h/2-dy/2,s.lh||'',{fs:11,b:1,a:'start'})+txt(x+l+dx/2+6,y+h+4-dy/2,s.lw||'',{fs:11,b:1,a:'start'});
  return svg(x+l+dx+60,y+h+22,b,'prisma rectangular con medidas');
 },
 dots(s){ // datos como puntos sobre recta (diagrama de puntos)
  const vals=s.vals,mn=s.min,mx=s.max,u=s.u||30,w=(mx-mn)*u+30,cnt={};let b='<line x1="10" y1="'+(s.h||90)+'" x2="'+(w-10)+'" y2="'+(s.h||90)+'" '+sw+'/>';const y0=s.h||90;
  for(let v=mn;v<=mx;v++)b+='<line x1="'+(15+(v-mn)*u)+'" y1="'+(y0-4)+'" x2="'+(15+(v-mn)*u)+'" y2="'+(y0+4)+'" '+sw+'/>'+txt(15+(v-mn)*u,y0+17,v,{fs:11});
  vals.forEach(v=>{cnt[v]=(cnt[v]||0)+1;b+='<circle cx="'+(15+(v-mn)*u)+'" cy="'+(y0-4-cnt[v]*12)+'" r="5" fill="var(--acc)"/>'});
  return svg(w,y0+22,b,'diagrama de puntos');
 }
});
