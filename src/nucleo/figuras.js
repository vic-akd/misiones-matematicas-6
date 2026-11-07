/* ---------- Figuras para los demás temas ---------- */
const R4=x=>Math.round(x*10000)/10000;
const N=x=>R4(x).toLocaleString('es-MX',{maximumFractionDigits:4});
const txt=(x,y,s,o)=>'<text x="'+x+'" y="'+y+'" font-size="'+((o&&o.fs)||13)+'" text-anchor="'+((o&&o.a)||'middle')+'" fill="#18243a"'+((o&&o.b)?' font-weight="700"':'')+'>'+s+'</text>';
Object.assign(fig,{
 bar2(s){ // tira con etiqueta de total arriba
  return '<div style="text-align:center;font-size:13px;font-weight:600">'+s.lab+'</div>'+fig.bar(s);
 },
 ptab(s){ // tabla de valor posicional
  const cw=s.cw||30,n=s.cols.length,w=n*cw,h=62;let b='';
  (s.groups||[]).forEach(([from,len,name])=>{b+='<rect x="'+(2+from*cw)+'" y="2" width="'+len*cw+'" height="16" fill="var(--wash)" stroke="#2b3850" stroke-width="1"/>'+txt(2+from*cw+len*cw/2,14,name,{fs:10,b:1})});
  s.cols.forEach((c,i)=>{const x=2+i*cw,hl=s.hl===i;
   b+='<rect x="'+x+'" y="18" width="'+cw+'" height="16" fill="#fff" stroke="#2b3850" stroke-width="1"/>'+txt(x+cw/2,30,c,{fs:10.5,b:1});
   b+='<rect x="'+x+'" y="34" width="'+cw+'" height="26" fill="'+(hl?'var(--tint)':'#fff')+'" stroke="#2b3850" stroke-width="'+(hl?2.5:1)+'"/>';
   if(s.d&&s.d[i]!=null&&s.d[i]!=='')b+=txt(x+cw/2,53,s.d[i],{fs:17,b:1});
  });
  return svg(w+4,h,b,'tabla de valor posicional');
 },
 nl(s){ // recta numérica general; valores reales
  const w=s.w||300,x0=14,y=s.jumps?52:30,n=Math.round((s.max-s.min)/s.step),u=w/n,X=v=>x0+((v-s.min)/s.step)*u;let b='<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" '+sw+'/>';
  for(let i=0;i<=n;i++){const big=i%(s.every||1)===0;b+='<line x1="'+(x0+i*u)+'" y1="'+(y-(big?9:5))+'" x2="'+(x0+i*u)+'" y2="'+(y+(big?9:5))+'" '+sw+'/>';if(big&&!s.nolab)b+=txt(x0+i*u,y+24,N(s.min+i*s.step),{fs:s.lfs||11})}
  (s.jumps||[]).forEach(([a,z],j)=>{const xa=X(a),xz=X(z),mx=(xa+xz)/2,top=y-30-(j%2)*7;b+='<path d="M'+xa+' '+(y-4)+'Q'+mx+' '+top+' '+xz+' '+(y-4)+'" fill="none" stroke="#2b3850" stroke-width="2" '+(j%2?'stroke-dasharray="5 3"':'')+'/><path d="M'+xz+' '+(y-4)+'l'+(z>a?-7:7)+' -5l'+(z>a?1:-1)+' 8z" fill="#2b3850"/>'});
  if(s.pt!=null)b+='<circle cx="'+X(s.pt)+'" cy="'+y+'" r="6" fill="var(--acc)" stroke="#fff" stroke-width="1.5"/>';
  return svg(w+28,y+30,b,'recta numérica');
 },
 ruler(s){ // regla en cm con un lápiz
  const cm=s.cm,u=s.u||18,w=cm*u,b0=28;let b='<rect x="4" y="'+b0+'" width="'+(w+12)+'" height="34" rx="3" fill="#fffbe8" '+sw+'/>';
  for(let i=0;i<=cm*10;i++){const x=10+i*u/10,big=i%10===0,mid=i%5===0;b+='<line x1="'+x+'" y1="'+b0+'" x2="'+x+'" y2="'+(b0+(big?14:mid?10:6))+'" stroke="#2b3850" stroke-width="'+(big?1.4:.8)+'"/>';if(big)b+=txt(x,b0+27,i/10,{fs:10})}
  const L=s.len*u;b+='<path d="M10 6h'+(L-14)+'l14 9l-14 9H10z" fill="var(--tint)" '+sw+'/><path d="M10 6h'+(L-14)+'l14 9l-14 9H10z" fill="url(#pDot)" opacity=".5"/>';
  return svg(w+20,b0+38,b,'regla en centímetros con un lápiz');
 },
 jar(s){ // jarra graduada
  const H=100,W2=70,top=8,lev=s.level/s.cap*H;let b='<rect x="30" y="'+(top+H-lev)+'" width="'+W2+'" height="'+lev+'" fill="var(--tint)"/><rect x="30" y="'+(top+H-lev)+'" width="'+W2+'" height="'+lev+'" fill="url(#pDot)" opacity=".5"/>';
  b+='<path d="M30 '+top+'V'+(top+H)+'H'+(30+W2)+'V'+top+'" fill="none" '+sw+'/>';
  for(let v=0;v<=s.cap;v+=s.step){const y=top+H-v/s.cap*H;b+='<line x1="'+(30+W2-14)+'" y1="'+y+'" x2="'+(30+W2)+'" y2="'+y+'" stroke="#2b3850" stroke-width="1.3"/>'+txt(30+W2+6,y+4,N(v)+' '+s.unit,{fs:10,a:'start'})}
  return svg(170,H+top+6,b,'jarra graduada');
 },
 poly(s){ // figuras sobre cuadrícula (1 cuadro = 1 unidad)
  const c=s.c||18,w=s.gw*c,h=s.gh*c;let b='';
  for(let i=0;i<=s.gw;i++)b+='<line x1="'+(2+i*c)+'" y1="2" x2="'+(2+i*c)+'" y2="'+(2+h)+'" stroke="#b9c3d3" stroke-width=".8"/>';
  for(let j=0;j<=s.gh;j++)b+='<line x1="2" y1="'+(2+j*c)+'" x2="'+(2+w)+'" y2="'+(2+j*c)+'" stroke="#b9c3d3" stroke-width=".8"/>';
  s.shapes.forEach(sh=>{const d='M'+sh.pts.map(([x,y])=>(2+x*c)+' '+(2+y*c)).join('L')+'Z';b+='<path d="'+d+'" fill="var(--tint)"/><path d="'+d+'" fill="url(#'+(sh.p||'pDot')+')" opacity=".55"/><path d="'+d+'" fill="none" stroke="#2b3850" stroke-width="2"/>';
   if(sh.lab){const [lx,ly]=sh.lab;b+='<rect x="'+(2+lx*c-9)+'" y="'+(2+ly*c-10)+'" width="18" height="16" rx="3" fill="#fff" stroke="#2b3850"/>'+txt(2+lx*c,2+ly*c+3,sh.name,{fs:12,b:1})}
   (sh.h||[]).forEach(([x1,y1,x2,y2])=>b+='<line x1="'+(2+x1*c)+'" y1="'+(2+y1*c)+'" x2="'+(2+x2*c)+'" y2="'+(2+y2*c)+'" stroke="#2b3850" stroke-width="1.6" stroke-dasharray="4 3"/>');
  });
  return svg(w+4,h+4,b,'figuras sobre cuadrícula');
 },
 solid(s){ // cuerpos geométricos en perspectiva
  const P={
   prismRect:{v:[[20,40],[110,40],[110,100],[20,100],[50,15],[140,15],[140,75],[50,75]],e:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[0,4],[1,5],[2,6]],h:[[6,7],[7,4],[3,7]]},
   prismTri:{v:[[20,100],[90,100],[55,40],[60,80],[130,80],[95,20]],e:[[0,1],[1,2],[2,0],[1,4],[2,5],[4,5],[0,3]],h:[[3,4],[3,5]]},
   pyrSq:{v:[[20,95],[100,95],[130,70],[50,70],[75,10]],e:[[0,1],[1,2],[0,4],[1,4],[2,4]],h:[[2,3],[3,0],[3,4]]},
   pyrTri:{v:[[20,95],[110,95],[80,65],[65,10]],e:[[0,1],[0,3],[1,3],[2,3],[1,2]],h:[[0,2]]},
   cube:{v:[[25,45],[90,45],[90,110],[25,110],[55,15],[120,15],[120,80],[55,80]],e:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[0,4],[1,5],[2,6]],h:[[6,7],[7,4],[3,7]]},
   prismHex:{v:[[30,95],[55,105],[85,105],[110,95],[85,85],[55,85],[30,35],[55,45],[85,45],[110,35],[85,25],[55,25]],e:[[0,1],[1,2],[2,3],[6,7],[7,8],[8,9],[9,10],[10,11],[11,6],[0,6],[1,7],[2,8],[3,9]],h:[[3,4],[4,5],[5,0],[4,10],[5,11]]}
  }[s.t];
  const L=([a,z],dash)=>'<line x1="'+P.v[a][0]+'" y1="'+P.v[a][1]+'" x2="'+P.v[z][0]+'" y2="'+P.v[z][1]+'" stroke="#2b3850" stroke-width="2"'+(dash?' stroke-dasharray="5 4"':'')+'/>';
  const face=s.t==='pyrSq'?'M20 95L100 95L75 10Z':s.t==='pyrTri'?'M20 95L110 95L65 10Z':s.t==='prismTri'?'M20 100L90 100L55 40Z':'M'+P.v[0].join(' ')+'L'+P.v[1].join(' ')+'L'+P.v[2].join(' ')+'L'+P.v[3].join(' ')+'Z';
  return svg(150,115,'<path d="'+face+'" fill="var(--tint)" opacity=".7"/>'+P.h.map(e=>L(e,1)).join('')+P.e.map(e=>L(e)).join(''),'cuerpo geométrico');
 },
 net(s){ // desarrollos planos
  const c=s.c||22,cells={
   cubeCross:[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]],
   rect2x3:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],
   line6:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]]
  }[s.t];
  let b='';
  if(cells){const mx=Math.max(...cells.map(p=>p[0]))+1,my=Math.max(...cells.map(p=>p[1]))+1;cells.forEach(([x,y])=>b+='<rect x="'+(2+x*c)+'" y="'+(2+y*c)+'" width="'+c+'" height="'+c+'" fill="var(--tint)" stroke="#2b3850" stroke-width="1.6"/>');return svg(mx*c+4,my*c+4,b,'desarrollo plano')}
  if(s.t==='prismRect'){ // caja 3×2×1 (en cuadros)
   const R=(x,y,w,h)=>'<rect x="'+(2+x*c)+'" y="'+(2+y*c)+'" width="'+w*c+'" height="'+h*c+'" fill="var(--tint)" stroke="#2b3850" stroke-width="1.6"/>';
   b=R(1,0,3,1)+R(0,1,1,2)+R(1,1,3,2)+R(4,1,1,2)+R(5,1,3,2)+R(1,3,3,1);return svg(8*c+4,4*c+4,b,'desarrollo plano')}
  if(s.t==='pyrSq'){const x0=2+1.6*c,y0=2+1.6*c,L=2.2*c,T=(p)=>'<path d="'+p+'" fill="var(--tint)" stroke="#2b3850" stroke-width="1.6"/>';
   b='<rect x="'+x0+'" y="'+y0+'" width="'+L+'" height="'+L+'" fill="var(--tint)" stroke="#2b3850" stroke-width="1.6"/>'+
   T('M'+x0+' '+y0+'L'+(x0+L)+' '+y0+'L'+(x0+L/2)+' '+(y0-1.5*c)+'Z')+T('M'+x0+' '+(y0+L)+'L'+(x0+L)+' '+(y0+L)+'L'+(x0+L/2)+' '+(y0+L+1.5*c)+'Z')+
   T('M'+x0+' '+y0+'L'+x0+' '+(y0+L)+'L'+(x0-1.5*c)+' '+(y0+L/2)+'Z')+T('M'+(x0+L)+' '+y0+'L'+(x0+L)+' '+(y0+L)+'L'+(x0+L+1.5*c)+' '+(y0+L/2)+'Z');
   return svg(x0*2+L,y0*2+L,b,'desarrollo plano')}
 },
 circ(s){ // círculo con radio, diámetro, cuerdas o puntos
  const r=s.R||38,c=r+18;let b='<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="var(--wash)" '+sw+'/>';
  if(s.inner)b+='<circle cx="'+c+'" cy="'+c+'" r="'+s.inner+'" fill="none" '+sw+'/>';
  b+='<circle cx="'+c+'" cy="'+c+'" r="3" fill="#18243a"/>'+txt(c-9,c-7,'O',{fs:11,b:1});
  if(s.show==='r')b+='<line x1="'+c+'" y1="'+c+'" x2="'+(c+r)+'" y2="'+c+'" stroke="#2b3850" stroke-width="2.4"/>'+txt(c+r/2+4,c+15,s.lab||'',{fs:11,b:1});
  if(s.show==='d')b+='<line x1="'+(c-r)+'" y1="'+c+'" x2="'+(c+r)+'" y2="'+c+'" stroke="#2b3850" stroke-width="2.4"/>'+txt(c+r/2,c+15,s.lab||'',{fs:11,b:1});
  if(s.show==='chord'){const a=r*Math.cos(1.1),bb=r*Math.sin(1.1);b+='<line x1="'+(c-r)+'" y1="'+c+'" x2="'+(c+r)+'" y2="'+c+'" stroke="#2b3850" stroke-width="2.2"/>'+txt(c-r-8,c+4,'A',{fs:12,b:1})+txt(c+r+8,c+4,'B',{fs:12,b:1})+
   '<line x1="'+(c-a)+'" y1="'+(c-bb)+'" x2="'+(c+a)+'" y2="'+(c-bb)+'" stroke="#2b3850" stroke-width="2.2"/>'+txt(c-a-8,c-bb-4,'C',{fs:12,b:1})+txt(c+a+8,c-bb-4,'D',{fs:12,b:1})}
  if(s.show==='pts'){const pts=[['A',c+r*Math.cos(-.6),c+r*Math.sin(-.6)],['B',c-r*0.45,c+r*0.3],['C',c+r*0.95,c+r*0.95]];pts.forEach(([n,x,y])=>b+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="3.5" fill="var(--acc)"/>'+txt(x+10,y-4,n,{fs:12,b:1}))}
  if(s.show==='two')b+='<line x1="'+c+'" y1="'+c+'" x2="'+(c+s.inner)+'" y2="'+c+'" stroke="#2b3850" stroke-width="2.2"/>'+txt(c+s.inner/2,c-5,s.lab||'',{fs:11,b:1});
  return svg(2*c,2*c,b,'círculo');
 },
 map(s){ // croquis: calles en cuadrícula, norte arriba
  const u=58,x0=46,y0=18,V=['Pino','Roble','Cedro','Olmo'],H=['Av. Sol','Luna','Mar'],X=x=>x0+x*u,Y=y=>y0+(2-y)*u;let b='';
  for(let i=0;i<4;i++)b+='<line x1="'+X(i)+'" y1="'+(y0-8)+'" x2="'+X(i)+'" y2="'+(Y(0)+8)+'" stroke="#9aa6b8" stroke-width="7"/>'+txt(X(i),Y(0)+24,V[i],{fs:11,b:1});
  for(let j=0;j<3;j++)b+='<line x1="'+(x0-8)+'" y1="'+Y(j)+'" x2="'+(X(3)+8)+'" y2="'+Y(j)+'" stroke="#9aa6b8" stroke-width="7"/>'+txt(x0-12,Y(j)+4,H[j],{fs:10.5,b:1,a:'end'});
  PLACES.forEach(([n,x,y])=>b+='<rect x="'+(X(x)+4)+'" y="'+(Y(y)-22)+'" width="'+(n.length*7+8)+'" height="17" rx="3" fill="var(--tint)" stroke="#2b3850"/>'+txt(X(x)+8,Y(y)-9,n,{fs:11,b:1,a:'start'})+'<circle cx="'+X(x)+'" cy="'+Y(y)+'" r="4" fill="#18243a"/>');
  if(s.path){let d='M'+X(s.path[0][0])+' '+Y(s.path[0][1]);s.path.slice(1).forEach(([x,y])=>d+='L'+X(x)+' '+Y(y));b+='<path d="'+d+'" fill="none" stroke="var(--acc)" stroke-width="3.5" stroke-dasharray="7 4"/>'}
  b+='<g transform="translate('+(X(3)+52)+','+(y0+16)+')"><path d="M0 -14L5 0L0 -3L-5 0Z" fill="#18243a"/>'+txt(0,-17,'N',{fs:11,b:1})+'<line x1="0" y1="0" x2="0" y2="14" stroke="#18243a"/><line x1="-12" y1="2" x2="12" y2="2" stroke="#18243a"/>'+txt(-18,6,'O',{fs:10})+txt(18,6,'E',{fs:10})+txt(0,27,'S',{fs:10})+'</g>';
  return svg(X(3)+90,Y(0)+32,b,'croquis de calles');
 },
 chart(s){ // gráfica de barras
  const bw=38,gap=16,h=110,top=10,left=34,n=s.cats.length,w=left+n*(bw+gap)+8,Y=v=>top+h-v/s.max*h;let b='';
  for(let v=0;v<=s.max;v+=s.step)b+='<line x1="'+left+'" y1="'+Y(v)+'" x2="'+(w-4)+'" y2="'+Y(v)+'" stroke="#c6cfdc" stroke-width=".8"/>'+txt(left-5,Y(v)+4,v,{fs:10,a:'end'});
  s.cats.forEach((cn,i)=>{const x=left+gap/2+i*(bw+gap);if(!s.empty){const v=s.vals[i];b+='<rect x="'+x+'" y="'+Y(v)+'" width="'+bw+'" height="'+(h+top-Y(v))+'" fill="var(--tint)" stroke="#2b3850" stroke-width="1.4"/><rect x="'+x+'" y="'+Y(v)+'" width="'+bw+'" height="'+(h+top-Y(v))+'" fill="url(#pDot)" opacity=".45"/>'}
   b+=txt(x+bw/2,top+h+15,cn,{fs:10.5,b:1})});
  b+='<line x1="'+left+'" y1="'+top+'" x2="'+left+'" y2="'+(top+h)+'" '+sw+'/><line x1="'+left+'" y1="'+(top+h)+'" x2="'+(w-4)+'" y2="'+(top+h)+'" '+sw+'/>';
  return svg(w,top+h+22,b,'gráfica de barras');
 },
 table(s){ // tabla de datos (HTML)
  return '<table style="border-collapse:collapse;font-size:13px;margin:auto">'+[s.head].concat(s.rows).map((r,i)=>'<tr>'+r.map(c=>'<'+(i?'td':'th')+' style="border:1.5px solid #2b3850;padding:3px 9px;text-align:center;'+(i?'':'background:var(--wash)')+'">'+c+'</'+(i?'td':'th')+'>').join('')+'</tr>').join('')+'</table>';
 },
 spin(s){ // ruleta de partes iguales; etiquetas con trama distinta
  const r=48,c=r+4,n=s.parts.length,pat={R:'pDot',A:'pHatch',V:null,B:null};let b='';
  s.parts.forEach((lab,i)=>{const a0=-Math.PI/2+2*Math.PI*i/n,a1=a0+2*Math.PI/n,p='M'+c+' '+c+'L'+(c+r*Math.cos(a0)).toFixed(1)+' '+(c+r*Math.sin(a0)).toFixed(1)+'A'+r+' '+r+' 0 0 1 '+(c+r*Math.cos(a1)).toFixed(1)+' '+(c+r*Math.sin(a1)).toFixed(1)+'Z',pt=(s.pat||{})[lab]||pat[lab];
   b+='<path d="'+p+'" fill="'+(pt?'var(--tint)':'#fff')+'"/>'+(pt?'<path d="'+p+'" fill="url(#'+pt+')" opacity=".55"/>':'')+'<path d="'+p+'" fill="none" '+sw+'/>';
   const am=(a0+a1)/2;b+='<rect x="'+(c+r*.62*Math.cos(am)-8)+'" y="'+(c+r*.62*Math.sin(am)-9)+'" width="16" height="15" rx="3" fill="#fff"/>'+txt(c+r*.62*Math.cos(am),c+r*.62*Math.sin(am)+3,lab,{fs:11,b:1})});
  b+='<path d="M'+c+' '+c+'L'+(c+6)+' '+(c-22)+'" stroke="#18243a" stroke-width="3"/><circle cx="'+c+'" cy="'+c+'" r="4" fill="#18243a"/>';
  return svg(2*c,2*c,b,'ruleta de '+n+' partes iguales');
 }
});
const PLACES=[['Casa',0,0],['Escuela',2,2],['Parque',3,1],['Tienda',1,2],['Mercado',3,0]];
