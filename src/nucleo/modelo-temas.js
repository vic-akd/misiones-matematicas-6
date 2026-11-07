/* ========== MODELO: temas de 6.º ==========
 E(q, f, a, h, o): q pregunta, f figuras, a respuesta del solucionario, h pista-pregunta.
 o.R: campos para contestar en pantalla (ver logica-respuestas.js). o.model=true: las figuras bajan con las etapas. */
const E=(q,f,a,h,o)=>Object.assign({q,f:f||[],k:(o&&o.k)||f||[],a,h,fixed:!(o&&o.model)},o||{});
const n=(v,l,o)=>Object.assign({k:'n',v,l:l||'Respuesta'},o||{});
const fr=(v,l,o)=>Object.assign({k:'f',v,l:l||'Fracción'},o||{});
const sn=(c,l)=>({k:'op',ops:['Sí','No'],c,l:l||'¿Sí o no?'});
const op=(ops,c,l)=>({k:'op',ops,c,l:l||'Elige'});
const SI=b=>b?'Sí':'No',SIc=b=>b?0:1;
const M=x=>N(x),P=x=>'$'+R4(x).toLocaleString('es-MX',{minimumFractionDigits:Number.isInteger(R4(x))?0:2,maximumFractionDigits:2});
const fx=a=>{const s=simp(a);return s.n>=s.d&&s.n%s.d?fs(a)+' = '+mixed(a):s.n%s.d===0?fs(a)+' = '+(s.n/s.d):fs(a)}; // texto de una fracción
const Fs=a=>a.n+'/'+a.d; // fracción para el campo de respuesta
const Mx=(w,n2,d)=>F(w*d+n2,d); // número mixto
const ms=a=>mixed(a); // texto de mixto
const TEMAS=[];

/* 1. NÚMEROS GRANDES Y DECIMALES */
(()=>{const L=[
 {t:'La regla del laboratorio',nl:{min:1.2,max:1.3,step:0.01,every:5,pt:1.26},v:1.26,
  op:E('Redondea 4.738 a los centésimos.',[],'4.74','¿Qué cifra está en los milésimos? ¿Es 5 o más?',{R:[n(4.74)]}),
  re:E('Un frasco tiene 0.6 L y otro 0.58 L. Rita dice que el de 0.58 L tiene más porque tiene más cifras. ¿Tiene razón?',[],'No. 0.6 = 0.60, que es mayor que 0.58.','¿Cuántos centésimos son 0.6?',{R:[sn(1,'¿Tiene razón?')]})},
 {t:'El censo nacional',nl:{min:10000000,max:20000000,step:1000000,every:5,pt:16000000,w:320,lfs:9},v:16000000,
  op:E('Redondea 27,486,300 a los millones.',[],'27,000,000','¿Qué cifra hay en las centenas de millar?',{R:[n(27000000)]}),
  re:E('La ciudad A tiene 12,050,300 habitantes y la B 12,503,000. ¿Cuál tiene más?',[],'La B. Desde las centenas de millar: B tiene 5 y A tiene 0.','¿Desde qué cifra son diferentes, de izquierda a derecha?',{R:[op(['La A','La B'],1,'¿Cuál tiene más?')]})},
 {t:'Carrera de 100 metros',nl:{min:0.5,max:0.6,step:0.01,every:5,pt:0.53},v:0.53,
  op:E('Escribe con cifras: doce millones cuatrocientos mil ocho.',[],'12,400,008','¿Cuántos grupos de tres cifras necesitas?',{R:[n(12400008)]}),
  re:E('Un corredor hizo 12.08 s y otro 12.8 s. Gana quien hace menos tiempo. ¿Quién gana?',[],'El de 12.08 s: 12.08 es menor que 12.80.','¿Cuántos centésimos son 12.8?',{R:[op(['El de 12.08 s','El de 12.8 s'],0,'¿Quién gana?')]})},
 {t:'Boletos para el estadio',nl:{min:45000000,max:46000000,step:100000,every:5,pt:45300000,w:320,lfs:9},v:45300000,
  op:E('Redondea 0.4951 a los milésimos.',[],'0.495','¿Qué cifra está en los diezmilésimos?',{R:[n(0.495)]}),
  re:E('Una receta pide <b>más de</b> 2.5 kg de harina. Hay 2.495 kg. ¿Alcanza?',[],'No. 2.495 es menor que 2.500.','Escribe los dos con tres decimales.',{R:[sn(1,'¿Alcanza?')]})},
 {t:'El récord del salto',nl:{min:3.4,max:3.5,step:0.01,every:5,pt:3.48},v:3.48,
  op:E('Escribe con cifras: tres enteros cuarenta y cinco milésimos.',[],'3.045','¿Cuántas cifras van después del punto para llegar a milésimos?',{R:[n(3.045)]}),
  re:E('Ordena de menor a mayor los saltos: 3.405 m, 3.45 m, 3.045 m.',[],'3.045 &lt; 3.405 &lt; 3.45','Escribe todos con tres decimales.',{R:[n(3.045,'1.º'),n(3.405,'2.º'),n(3.45,'3.º')]})}
];
TEMAS.push({eje:'num',title:'Números grandes y decimales',rows:L.map(x=>({t:x.t,e:[
 E('¿Qué número marca el punto?',[Object.assign({k:'nl'},x.nl)],M(x.v),'¿Cuánto vale cada rayita?',{R:[n(x.v)]}),x.op,x.re]}))});})();

/* 2. MULTIPLICAR CON DECIMALES */
(()=>{const area=[[0.4,0.3],[0.5,0.6],[0.7,0.2],[0.8,0.5],[0.9,0.3]],calc=[[2.5,1.4],[3.2,0.5],[1.25,0.8],[4.6,2.5],[0.35,1.2]];
const nombres=['Huerto de cuadritos','La tela del disfraz','Gasolina para el viaje','El queso de la tienda','¿Mayor o menor?'];
const retos=[
 (()=>{const c=R4(96.5*1.5);return E('El kilo de queso cuesta $96.50. ¿Te alcanzan $150 para 1.5 kg?',[],SI(c<=150)+'. 96.50 × 1.5 = '+P(c)+'.','¿Cuánto es 1 kg más medio kilo?',{R:[sn(SIc(c<=150),'¿Alcanza?')]})})(),
 (()=>{const c=R4(48.6*2.5);return E('Una tela cuesta $48.60 el metro. Compras 2.5 m y pagas con $120. ¿Te alcanza? Si no, ¿cuánto falta?',[],SI(c<=120)+'. 48.60 × 2.5 = '+P(c)+'; faltan '+P(c-120)+'.','¿Cuánto cuestan 2 m? ¿Y medio metro?',{R:[sn(SIc(c<=120),'¿Te alcanza?'),n(R4(c-120),'¿Cuánto falta? $')]})})(),
 E('Sara dice que 0.5 × 0.4 = 2. Encuentra el error y corrígelo.',[],'0.5 × 0.4 = 0.2. Son 5 décimos por 4 décimos = 20 centésimos.','Si multiplicas décimos por décimos, ¿qué obtienes?',{R:[n(0.2,'Resultado correcto')]}),
 (()=>{const c=R4(0.08*120);return E('Un auto gasta 0.08 L de gasolina por kilómetro. ¿Le alcanzan 10 L para 120 km?',[],SI(c<=10)+'. 0.08 × 120 = '+M(c)+' L.','¿Cuánto gasta en 100 km? ¿Y en 20 km?',{R:[sn(SIc(c<=10),'¿Alcanza?')]})})(),
 E('Sin calcular primero: ¿8 × 0.75 da más o menos que 8? Después calcula.',[],'Menos, porque 0.75 es menor que 1. 8 × 0.75 = 6.','¿Qué pasa al multiplicar por un número menor que 1?',{R:[op(['Más que 8','Menos que 8','Igual a 8'],1,'¿Da más o menos?'),n(6,'Resultado')]})
];
TEMAS.push({eje:'ope',title:'Multiplicar con decimales',rows:area.map(([a,b],i)=>{const p=R4(a*b),c=R4(calc[i][0]*calc[i][1]);return{t:nombres[i],e:[
 E('Cada cuadrito vale 0.01. ¿Qué multiplicación muestra el rectángulo sombreado y cuánto da?',[{k:'poly',gw:10,gh:10,c:12,shapes:[{pts:[[0,0],[a*10,0],[a*10,b*10],[0,b*10]]}]}],M(a)+' × '+M(b)+' = '+M(p),'¿Cuántos décimos mide cada lado? ¿Cuántos cuadritos hay?',{R:[n(p,'Resultado')]}),
 E('Calcula '+M(calc[i][0])+' × '+M(calc[i][1])+'.',[],M(c),'Multiplica sin el punto y después cuenta los decimales de los dos números.',{R:[n(c)]}),
 retos[i]]}})});})();

/* 3. DIVIDIR CON DECIMALES */
(()=>{const tiras=[[7.5,5],[9,4],[4.8,6],[10,8],[3.6,3]],calc=[[15.6,4],[7,8],[25.5,5],[9.36,3],[1,4]];
const nombres=['La cuerda del columpio','Jugo para la fiesta','El examen de Iván','Jugos en paquete','Cortes de cuerda'];
const retos=[
 (()=>{const c=R4(437.5/5);return E('Cinco amigos pagan $437.50 en partes iguales. Cada uno trae $90. ¿Les alcanza?',[],SI(c<=90)+'. 437.50 ÷ 5 = '+P(c)+' cada uno.','¿Cuánto es 400 ÷ 5? ¿Y 37.50 ÷ 5?',{R:[sn(SIc(c<=90),'¿Alcanza?'),n(c,'Cada uno paga $')]})})(),
 (()=>{const c=R4(2/8);return E('Se reparten 2 L de jugo en 8 vasos iguales. ¿Cada vaso tiene más de 0.3 L?',[],SI(c>0.3)+'. 2 ÷ 8 = '+M(c)+' L, que es menor que 0.3 L.','¿Cuánto es 2 ÷ 8? Piensa en cuartos.',{R:[sn(SIc(c>0.3),'¿Más de 0.3 L?')]})})(),
 E('Iván dice que 4.5 ÷ 9 = 2. ¿Tiene razón? Corrígelo.',[],'No. 4.5 ÷ 9 = 0.5, porque 9 × 0.5 = 4.5.','¿Qué número por 9 da 4.5?',{R:[sn(1,'¿Tiene razón?'),n(0.5,'Resultado correcto')]}),
 (()=>{const c=R4(57/6);return E('Un paquete de 6 jugos cuesta $57. Un jugo suelto cuesta $10. ¿Conviene el paquete?',[],SI(c<10)+'. 57 ÷ 6 = '+P(c)+' por jugo, menos que $10.','¿Cuánto cuesta un jugo del paquete?',{R:[sn(SIc(c<10),'¿Conviene?'),n(c,'Precio de uno en el paquete $')]})})(),
 (()=>{const c=R4(12.6/4);return E('Una cuerda de 12.6 m se corta en 4 partes iguales. ¿Cada parte mide más de 3 m?',[],SI(c>3)+'. 12.6 ÷ 4 = '+M(c)+' m.','¿Cuánto es 12 ÷ 4? ¿Y 0.6 ÷ 4?',{R:[sn(SIc(c>3),'¿Más de 3 m?')]})})()
];
TEMAS.push({eje:'ope',title:'Dividir con decimales',rows:tiras.map(([L,k],i)=>{const p=R4(L/k),c=R4(calc[i][0]/calc[i][1]);return{t:nombres[i],e:[
 E('La tira mide '+M(L)+' m y está dividida en '+k+' partes iguales. ¿Cuánto mide cada parte?',[{k:'bar2',lab:M(L)+' m',d:k}],M(L)+' ÷ '+k+' = '+M(p)+' m','¿Cuántas veces cabe la parte en la tira?',{R:[n(p,'Cada parte mide m')]}),
 E('Calcula '+M(calc[i][0])+' ÷ '+calc[i][1]+'.',[],M(c),'Si no alcanza, agrega un cero después del punto y sigue dividiendo.',{R:[n(c)]}),
 retos[i]]}})});})();

/* 4. FRACCIONES: SUMAR Y RESTAR CON MIXTOS (10 fichas) */
(()=>{const lee=[[1,3,4],[2,1,3],[1,5,8],[2,2,5],[1,1,6],[3,1,2],[1,7,10],[2,3,8],[1,2,3],[2,5,6]];
const ops=[[Mx(1,1,2),1,Mx(2,1,4)],[Mx(2,2,3),-1,Mx(1,1,3)],[Mx(1,3,4),1,F(1,8)],[Mx(3,1,2),-1,Mx(1,3,4)],[Mx(2,1,5),1,Mx(1,3,10)],[F(4,1),-1,Mx(1,2,3)],[Mx(1,5,6),1,Mx(1,1,3)],[Mx(2,3,8),-1,Mx(1,1,2)],[Mx(1,2,5),1,Mx(2,7,10)],[Mx(5,1,4),-1,Mx(2,5,6)]];
const nombres=['Harina para el pastel','La cinta del regalo','La caminata','La suma de Pepe','El puesto de fruta','Tablas para la repisa','La resta de Mónica','Tarea y juego','¿Cuál da 4?','El costal de maíz'];
const R=(a,b,s)=>s>0?add(a,b):sub(a,b);
const retos=[
 (()=>{const s=add(Mx(1,3,4),F(3,4)),need=Mx(2,1,2),ok=cmp(s,need)>=0;return E('Para un pastel se necesitan 2 {1/2} tazas de harina. Tienes un recipiente con 1 {3/4} y otro con {3/4} de taza. ¿Alcanza?',[],SI(ok)+'. 1 {3/4} + {3/4} = '+ms(s)+', que es '+cmpWord(s,need)+' 2 {1/2}.','¿Cuántos cuartos suman {3/4} + {3/4}?',{R:[sn(SIc(ok),'¿Alcanza?')]})})(),
 (()=>{const q=sub(F(3,1),add(Mx(1,1,4),Mx(1,1,2))),ok=cmp(q,F(1,2))>0;return E('Una cinta mide 3 m. Cortas 1 {1/4} m y luego 1 {1/2} m. ¿Te queda más de {1/2} m?',[],SI(ok)+'. 1 {1/4} + 1 {1/2} = 2 {3/4}; 3 − 2 {3/4} = '+ms(q)+' m.','¿Cuánto cortaste en total?',{R:[sn(SIc(ok),'¿Más de {1/2} m?')]})})(),
 (()=>{const a=Mx(2,1,3),b=Mx(2,2,5),c=cmp(a,b);return E('Luis caminó 2 {1/3} km y Ana 2 {2/5} km. ¿Quién caminó más?',[],(c>0?'Luis':c<0?'Ana':'Iguales')+'. {1/3} = {5/15} y {2/5} = {6/15}.','Compara solo las fracciones con denominador 15.',{R:[op(['Luis','Ana','Iguales'],c>0?0:c<0?1:2,'¿Quién caminó más?')]})})(),
 (()=>{const s=add(Mx(1,1,2),Mx(1,1,3));return E('Pepe sumó 1 {1/2} + 1 {1/3} y obtuvo 2 {2/5}. ¿Es correcto? Corrígelo.',[],'No. 1 {3/6} + 1 {2/6} = '+ms(s)+'. Pepe sumó numeradores y denominadores.','¿Qué denominador sirve para medios y tercios?',{R:[sn(1,'¿Es correcto?'),fr(Fs(s),'Resultado correcto')]})})(),
 (()=>{const q=sub(Mx(4,1,4),Mx(2,3,4)),ok=cmp(q,Mx(1,1,2))>=0;return E('Tenías 4 {1/4} kg de fruta y vendiste 2 {3/4} kg. ¿Te quedan <b>al menos</b> 1 {1/2} kg?',[],SI(ok)+'. 4 {1/4} − 2 {3/4} = '+ms(q)+' kg; «al menos» incluye el caso igual.','Cambia 4 {1/4} por 3 {5/4}.',{R:[sn(SIc(ok),'¿Al menos 1 {1/2} kg?')]})})(),
 (()=>{const s=add(Mx(1,5,8),Mx(1,3,4)),ok=cmp(s,Mx(3,1,2))>=0;return E('Dos tablas de 1 {5/8} m y 1 {3/4} m se ponen en línea. ¿Alcanzan a cubrir 3 {1/2} m?',[],SI(ok)+'. 1 {5/8} + 1 {6/8} = '+ms(s)+' m, que es menor que 3 {4/8} m.','¿Cuántos octavos son {3/4}? ¿Y {1/2}?',{R:[sn(SIc(ok),'¿Alcanzan?')]})})(),
 (()=>{const q=sub(F(3,1),Mx(1,1,4));return E('Mónica dice que 3 − 1 {1/4} = 2 {1/4}. ¿Tiene razón? Corrígela.',[],'No. 3 − 1 {1/4} = '+ms(q)+'. Mónica sumó el cuarto en vez de quitarlo.','Si quitas 1 entero, quedan 2. ¿Cuánto queda si además quitas {1/4}?',{R:[sn(1,'¿Tiene razón?'),fr(Fs(q),'Resultado correcto')]})})(),
 (()=>{const s=add(Mx(1,2,3),Mx(1,1,2)),ok=cmp(s,F(3,1))>0;return E('Ramón usó 1 {2/3} h para la tarea y 1 {1/2} h para jugar. ¿Fueron más de 3 horas?',[],SI(ok)+'. 1 {4/6} + 1 {3/6} = '+ms(s)+' h.','¿Cuántos sextos son {2/3} + {1/2}?',{R:[sn(SIc(ok),'¿Más de 3 h?')]})})(),
 (()=>{const xs=[add(Mx(1,1,2),Mx(2,1,4)),add(Mx(2,3,8),Mx(1,5,8)),add(Mx(1,2,3),Mx(2,1,2))],c=xs.findIndex(x=>cmp(x,F(4,1))===0);return E('¿Cuál suma da exactamente 4? A) 1 {1/2} + 2 {1/4} B) 2 {3/8} + 1 {5/8} C) 1 {2/3} + 2 {1/2}',[],'ABC'[c]+'. 2 {3/8} + 1 {5/8} = 3 {8/8} = 4. A da 3 {3/4} y C da 4 {1/6}.','¿En cuál las fracciones forman un entero exacto?',{R:[op(['A','B','C'],c,'¿Cuál da 4?')]})})(),
 (()=>{const q=sub(F(10,1),add(Mx(3,1,2),Mx(4,3,4))),ok=cmp(q,F(2,1))>0;return E('Un costal tenía 10 kg de maíz. Se usaron 3 {1/2} kg y 4 {3/4} kg. ¿Quedan más de 2 kg?',[],SI(ok)+'. 3 {1/2} + 4 {3/4} = 8 {1/4}; 10 − 8 {1/4} = '+ms(q)+' kg.','¿Cuánto se usó en total?',{R:[sn(SIc(ok),'¿Más de 2 kg?')]})})()
];
TEMAS.push({eje:'fra',title:'Fracciones: sumar y restar con mixtos',rows:lee.map(([w,a,d],i)=>{const m=Mx(w,a,d),[x,s,y]=ops[i],r=R(x,y,s);
 const bars=[...Array(w).fill(0).map(()=>({k:'bar',d,m:d,h:22})),{k:'bar',d,m:a,h:22}];
 return{t:nombres[i],e:[
 E('Cada tira es un entero. ¿Qué número mixto muestran las partes marcadas?',bars,w+' {'+a+'/'+d+'} = '+fs(m),'¿Cuántos enteros completos hay? ¿Qué parte del último?',{col:true,R:[fr(Fs(m),'Número mixto')]}),
 E('Calcula '+ms(x)+(s>0?' + ':' − ')+ms(y)+'.',[],ms(x)+(s>0?' + ':' − ')+ms(y)+' = '+ms(r)+(simp(r).d!==r.d?'':''),s>0?'Suma enteros con enteros y fracciones con fracciones; usa un denominador común.':'Si la fracción de arriba es menor, cambia un entero por fracciones.',{R:[fr(Fs(r),'Resultado')]}),
 retos[i]]}})});})();

/* 5. FRACCIÓN Y DECIMAL ENTRE NATURAL (10 fichas) */
(()=>{const lee=[[F(3,4),3],[F(2,3),2],[F(4,5),2],[F(2,4),2],[F(6,8),3],[F(4,10),4],[F(2,6),2],[F(3,5),3],[F(4,6),2],[F(3,12),3]];
const dec2=[[0.8,4],[2.4,3],[1.5,6],[0.9,2],[3.6,8],[5.4,9],[0.75,3],[4.2,5],[1.2,16],[7.5,6]];
const nombres=['Pizza para tres','Leche en tazas','El terreno en lotes','El error de Toño','Dinero para dulces','El listón cortado','Arroz en bolsas','¿Qué es más?','La pared en equipo','El garrafón'];
const retos=[
 E('Hay {3/4} de pizza para 3 niños en partes iguales. Lía dice que a cada uno le toca {1/4} de pizza. ¿Tiene razón?',[{k:'pie',d:4,m:3}],'Sí. {3/4} ÷ 3 = {1/4}: cada niño recibe uno de los tres cuartos.','¿Cuántos cuartos hay? ¿Cuántos le tocan a cada niño?',{R:[sn(0,'¿Tiene razón?')]}),
 (()=>{const c=1/8;return E('Hay {1/2} L de leche para 4 tazas iguales. ¿Cada taza recibe más de 0.1 L?',[],SI(c>0.1)+'. {1/2} ÷ 4 = {1/8} L = 0.125 L, que es más que 0.1 L.','¿En cuántas partes queda dividido el litro?',{R:[sn(SIc(c>0.1),'¿Más de 0.1 L?')]})})(),
 E('{2/3} de un terreno se divide en 4 lotes iguales. ¿Qué fracción del terreno completo es cada lote?',[{k:'bar',d:12,m:8}],'{2/3} = {8/12}; {8/12} ÷ 4 = {2/12} = {1/6}.','¿Cuántos doceavos son {2/3}?',{R:[fr('1/6','Cada lote')]}),
 E('Toño dice que 0.6 ÷ 3 = 2. Encuentra el error y corrígelo.',[],'0.6 ÷ 3 = 0.2. Son 6 décimos entre 3 = 2 décimos.','¿Cuántos décimos son 0.6?',{R:[n(0.2,'Resultado correcto')]}),
 (()=>{const c=R4(4.5/3);return E('Tres hermanos se reparten $4.50 en partes iguales. ¿A cada uno le alcanza para un dulce de $1.60?',[],SI(c>=1.6)+'. 4.50 ÷ 3 = '+P(c)+', menos que $1.60.','¿Cuánto es 4.50 ÷ 3?',{R:[sn(SIc(c>=1.6),'¿Alcanza?')]})})(),
 E('Un listón de {4/5} de metro se corta en 2 partes iguales. ¿Cada parte es mayor, menor o igual que {1/2} metro?',[{k:'bar',d:5,m:4}],'Menor. {4/5} ÷ 2 = {2/5}, y {2/5} = {4/10} es menor que {5/10}.','¿Cuánto es {4/5} ÷ 2?',{R:[op(['Mayor','Menor','Igual'],1,'Cada parte es…')]}),
 (()=>{const c=R4(2.5/5);return E('Se reparten 2.5 kg de arroz en 5 bolsas iguales. ¿Cada bolsa tiene medio kilo?',[],SI(c===0.5)+'. 2.5 ÷ 5 = '+M(c)+' kg = medio kilo.','¿Cuánto es 25 décimos entre 5?',{R:[sn(SIc(c===0.5),'¿Medio kilo?')]})})(),
 E('¿Qué es más: {3/4} ÷ 3 o {1/2} ÷ 2?',[],'Iguales. {3/4} ÷ 3 = {1/4} y {1/2} ÷ 2 = {1/4}.','Calcula los dos repartos.',{R:[op(['{3/4} ÷ 3','{1/2} ÷ 2','Iguales'],2,'¿Cuál es más?')]}),
 E('Seis personas pintan {3/5} de una pared en partes iguales. ¿Qué fracción de la pared pinta cada una?',[{k:'bar',d:10,m:6}],'{3/5} = {6/10}; {6/10} ÷ 6 = {1/10}.','¿Cuántos décimos son {3/5}?',{R:[fr('1/10','Cada persona')]}),
 (()=>{const c=R4(0.9/4);return E('Un garrafón con 0.9 L se reparte en 4 vasos iguales. ¿Cada vaso tiene <b>al menos</b> 0.25 L?',[],SI(c>=0.25)+'. 0.9 ÷ 4 = '+M(c)+' L, menos que 0.25 L.','¿Cuánto es 0.9 ÷ 4? Agrega ceros si hace falta.',{R:[sn(SIc(c>=0.25),'¿Al menos 0.25 L?')]})})()
];
TEMAS.push({eje:'fra',title:'Fracción y decimal entre natural',rows:lee.map(([a,k],i)=>{const r=F(a.n,a.d*k),[x,y]=dec2[i],c=R4(x/y);return{t:nombres[i],e:[
 E('La parte marcada es '+fs(a)+' de la tira. Si la repartes entre '+k+' en partes iguales, ¿qué fracción de la tira le toca a cada uno?',[{k:'bar',d:a.d,m:a.n}],fs(a)+' ÷ '+k+' = '+fs(r)+(simp(r).d!==r.d?' = '+fs(simp(r)):''),'Divide cada parte en '+k+'. ¿En cuántas partes queda la tira?',{R:[fr(Fs(r))]}),
 E('Calcula '+M(x)+' ÷ '+y+'.',[],M(c),'Si no alcanza, agrega ceros después del punto y sigue dividiendo.',{R:[n(c)]}),
 retos[i]]}})});})();

/* 6. RAZONES Y VALOR FALTANTE */
(()=>{const tb=[['Kilos','Precio',[[1,24],[3,72]],5,'$'],['Metros','Precio',[[2,30],[4,60]],7,'$'],['Cuadernos','Precio',[[3,45],[6,90]],10,'$'],['Horas','Kilómetros',[[2,150],[4,300]],5,''],['Pasteles','Huevos',[[5,15],[10,30]],8,'']];
const razon=[['niñas','niños',12,18],['perros','gatos',15,20],['canicas rojas','azules',6,10],['días con lluvia','días sin lluvia',8,20],['sillas','mesas',10,4]];
const nombres=['Agua de limón','Lápices baratos','El mapa del viaje','Pasta para seis','Puntería en básquet'];
const retos=[
 E('Agua A: 2 limones por 5 vasos de agua. Agua B: 3 limones por 6 vasos. ¿Cuál sabe más a limón?',[],'La B. A: 2 ÷ 5 = 0.4 limones por vaso. B: 3 ÷ 6 = 0.5 limones por vaso.','¿Cuántos limones hay por cada vaso en cada jarra?',{R:[op(['La A','La B','Iguales'],1,'¿Cuál sabe más?')]}),
 E('Tienda A: 3 lápices por $18. Tienda B: 5 lápices por $28. ¿Dónde es más barato cada lápiz?',[],'En la B. A: $6 cada uno. B: 28 ÷ 5 = $5.60.','¿Cuánto cuesta un lápiz en cada tienda?',{R:[op(['En la A','En la B','Igual'],1,'¿Dónde es más barato?')]}),
 E('En un mapa, 1 cm representa 5 km. Dos pueblos están a 7 cm en el mapa. ¿Están a más de 30 km?',[],'Sí. 7 × 5 = 35 km.','Si 1 cm son 5 km, ¿cuánto son 7 cm?',{R:[sn(0,'¿Más de 30 km?'),n(35,'Distancia km')]}),
 E('Una receta para 4 personas usa 300 g de pasta. ¿Alcanzan 500 g para 6 personas?',[],'Sí. Para 1 persona: 75 g; para 6: 450 g.','¿Cuánta pasta es para 1 persona?',{R:[sn(0,'¿Alcanza?'),n(450,'Pasta para 6 g')]}),
 E('El equipo A encestó 18 de 24 tiros. El B, 14 de 20. ¿Quién tiene mejor puntería?',[],'El A. A: 18 ÷ 24 = 0.75. B: 14 ÷ 20 = 0.7.','¿Qué parte de sus tiros encestó cada equipo?',{R:[op(['El A','El B','Iguales'],0,'¿Quién?')]})
];
TEMAS.push({eje:'pro',title:'Razones y valor faltante',rows:tb.map(([h1,h2,rs,q,u],i)=>{const k=rs[0][1]/rs[0][0],ans=k*q,[a1,a2,x,y]=razon[i],g=gcd(x,y),rz=F(x/g,y/g);return{t:nombres[i],e:[
 E('La tabla es de proporcionalidad. ¿Cuánto corresponde a '+q+' '+h1.toLowerCase()+'?',[{k:'table',head:[h1,h2],rows:rs.map(([a,b])=>[a,u+N(b)]).concat([[q,'?']])}],q+' → '+u+N(ans)+' (1 → '+u+N(k)+').','¿Cuánto corresponde a 1?',{R:[n(ans,h2+(u?' $':''))]}),
 E('Hay '+x+' '+a1+' y '+y+' '+a2+'. Escribe la razón de '+a1+' a '+a2+' como fracción simplificada.',[],fs(F(x,y))+' = '+fs(rz),'¿Entre qué número puedes dividir los dos?',{R:[fr(Fs(rz),'Razón',{exacta:true})]}),
 retos[i]]}})});})();

/* 7. PORCENTAJES Y TANTO POR CIENTO (10 fichas) */
(()=>{const sombra=[35,60,12,85,40,7,50,24,90,65],pct=[[15,80],[30,250],[5,60],[75,120],[12,50],[40,35],[25,360],[8,200],[60,45],[35,140]];
const nombres=['La playera en oferta','El examen de Ana','Tenis más baratos','El ahorro de Beto','Bicis en el salón','¿Cuál es más?','Precio que sube','El error de Lía','Boletos del concierto','¿En cuál ganas más?'];
const retos=[
 E('Una playera de $250 tiene 20% de descuento. ¿Cuánto pagas?',[],'20% de 250 = 50; 250 − 50 = $200.','¿Cuánto es el 10% de 250?',{R:[n(200,'Pagas $')]}),
 E('En un examen de 40 preguntas, Ana acertó 32. ¿Qué porcentaje acertó?',[],'32 de 40 = 80 de 100 = 80%.','¿Cuántas preguntas vale cada 10%?',{R:[n(80,'Porcentaje %')]}),
 E('Tienda A: tenis de $800 con 25% de descuento. Tienda B: los mismos a $620. ¿Dónde pagas menos?',[],'En la A. 25% de 800 = 200; 800 − 200 = $600, menos que $620.','¿Qué fracción es el 25%?',{R:[op(['En la A','En la B','Igual'],0,'¿Dónde pagas menos?')]}),
 E('Beto tenía $500 ahorrados y le dieron 10% más. Él dice que ahora tiene $510. ¿Tiene razón?',[],'No. 10% de 500 = 50; tiene $550.','¿Cuánto es el 10% de 500?',{R:[sn(1,'¿Tiene razón?'),n(550,'Ahora tiene $')]}),
 E('De 25 alumnos, 9 llegan en bici. ¿Es más del 30% del grupo?',[],'Sí. 9 de 25 = 36 de 100 = 36%.','Si 25 alumnos son el 100%, ¿cuánto vale cada alumno?',{R:[sn(0,'¿Más del 30%?'),n(36,'Porcentaje %')]}),
 E('¿Qué es más: el 15% de 200 o el 20% de 140?',[],'El 15% de 200 = 30. El 20% de 140 = 28.','Calcula los dos.',{R:[op(['15% de 200','20% de 140','Iguales'],0,'¿Cuál es más?')]}),
 E('Un celular de $3,000 sube 5% de precio. ¿Cuánto cuesta ahora?',[],'5% de 3,000 = 150; 3,000 + 150 = $3,150.','¿Cuánto es el 1% de 3,000?',{R:[n(3150,'Precio nuevo $')]}),
 E('Lía dice que el 50% de 30 es 50. Encuentra el error y corrígelo.',[],'El 50% es la mitad: 30 ÷ 2 = 15. Lía confundió el porcentaje con la cantidad.','¿Qué fracción es el 50%?',{R:[n(15,'Resultado correcto')]}),
 E('De 60 boletos se vendió el 45%. ¿Quedan más de 30 boletos?',[],'Sí. 45% de 60 = 27 vendidos; quedan 33.','¿Cuánto es el 10% de 60? ¿Y el 5%?',{R:[sn(0,'¿Quedan más de 30?'),n(33,'Quedan')]}),
 E('Juego A: ganas 3 de cada 10 veces. Juego B: ganas el 35% de las veces. ¿En cuál ganas más seguido?',[],'En el B. 3 de 10 = 30%, menos que 35%.','¿Qué porcentaje es 3 de cada 10?',{R:[op(['En el A','En el B','Igual'],1,'¿En cuál?')]})
];
TEMAS.push({eje:'pro',title:'Porcentajes y tanto por ciento',rows:sombra.map((m,i)=>{const [p,q]=pct[i],r=p*q/100;return{t:nombres[i],e:[
 E('La cuadrícula tiene 100 cuadros. ¿Qué porcentaje está sombreado?',[{k:'g100',m}],m+'%','¿Cuántos cuadros de 100 están sombreados?',{R:[n(m,'Porcentaje %')]}),
 E('Calcula el '+p+'% de '+q+'.',[],p+'% de '+q+' = '+q+' × '+p+' ÷ 100 = '+N(r)+'.','¿Cuánto es el 1% de '+q+'? ¿O el 10%?',{R:[n(r)]}),
 retos[i]]}})});})();

/* 8. POLÍGONOS REGULARES */
(()=>{const pol=[[5,4,'pentágono'],[6,3.5,'hexágono'],[8,2.5,'octágono'],[3,6,'triángulo equilátero'],[10,1.2,'decágono']],ar=[[5,6,4.1,'pentágono'],[6,4,3.5,'hexágono'],[8,5,6,'octágono'],[5,10,6.9,'pentágono'],[6,8,6.9,'hexágono']];
const nombres=['El alambre del hexágono','Perímetros iguales','¿El rectángulo es regular?','La mesa hexagonal','¿Cuál es regular?'];
const retos=[
 E('Con 30 cm de alambre, ¿alcanza para hacer un hexágono regular de 5.5 cm de lado?',[{k:'rpoly',n:6,lado:'5.5 cm'}],'No. 6 × 5.5 = 33 cm, más que 30 cm.','¿Cuántos lados tiene el hexágono?',{R:[sn(1,'¿Alcanza?')]}),
 E('Un pentágono regular y un hexágono regular tienen 30 cm de perímetro cada uno. ¿Cuál tiene lados más largos?',[],'El pentágono: 30 ÷ 5 = 6 cm. El hexágono: 30 ÷ 6 = 5 cm.','Divide el perímetro entre el número de lados.',{R:[op(['Pentágono','Hexágono','Iguales'],0,'¿Cuál?')]}),
 E('Lalo dice que un rectángulo de 6 cm por 3 cm es un polígono regular porque sus 4 ángulos son iguales. ¿Tiene razón?',[{k:'poly',gw:7,gh:4,c:18,shapes:[{pts:[[0.5,0.5],[6.5,0.5],[6.5,3.5],[0.5,3.5]]}]}],'No. En un polígono regular todos los lados y todos los ángulos son iguales; sus lados miden 6 y 3.','¿Sus lados miden lo mismo?',{R:[sn(1,'¿Tiene razón?')]}),
 E('Una mesa con forma de hexágono regular mide 1.2 m por lado. ¿Alcanza un listón de 7 m para toda la orilla?',[],'No. 6 × 1.2 = 7.2 m, más que 7 m.','¿Cuánto mide el perímetro de la mesa?',{R:[sn(1,'¿Alcanza?'),n(7.2,'Perímetro m')]}),
 E('¿Cuál es un polígono regular? A) un rombo que no es cuadrado B) un cuadrado C) un rectángulo largo',[],'B. El cuadrado tiene 4 lados iguales y 4 ángulos iguales.','¿Cuál tiene lados iguales y ángulos iguales?',{R:[op(['A','B','C'],1,'¿Cuál?')]})
];
TEMAS.push({eje:'geo',title:'Polígonos regulares',rows:pol.map(([k,l,nm],i)=>{const [ka,la,ap,na]=ar[i],A=R4(ka*la*ap/2);return{t:nombres[i],e:[
 E('Este '+nm+' es regular. ¿Cuántos lados tiene y cuánto mide su perímetro?',[{k:'rpoly',n:k,lado:N(l)+' cm'}],k+' lados; perímetro '+k+' × '+N(l)+' = '+N(R4(k*l))+' cm.','¿Cuántos lados iguales tiene? Multiplica por la medida de uno.',{R:[n(k,'Lados'),n(R4(k*l),'Perímetro cm')]}),
 E('Calcula el área de un '+na+' regular de '+N(la)+' cm de lado y '+N(ap)+' cm de apotema.',[{k:'rpoly',n:ka,lado:N(la)+' cm',ap:'ap = '+N(ap)}],'Perímetro '+N(ka*la)+' cm; área = '+N(ka*la)+' × '+N(ap)+' ÷ 2 = '+N(A)+' cm².','Área = perímetro × apotema ÷ 2.',{model:true,R:[n(A,'Área cm²')]}),
 retos[i]]}})});})();

/* 9. CÍRCULO Y π (π ≈ 3.14) */
(()=>{const ci=[['d',10],['d',20],['r',3],['d',8],['r',7]],ar=[10,2,5,3,4];
const nombres=['La rueda de la bici','¿π es 3?','La mesa redonda','Dos círculos','Del borde al diámetro'];
const retos=[
 E('Una rueda de bicicleta mide 60 cm de diámetro. En una vuelta, ¿avanza más de 2 m?',[],'No. 3.14 × 60 = 188.4 cm, menos que 200 cm.','Una vuelta = la circunferencia de la rueda.',{R:[sn(1,'¿Más de 2 m?'),n(188.4,'Una vuelta cm')]}),
 E('Juan dice que π vale exactamente 3. ¿Tiene razón?',[],'No. π es un poco más que 3 (3.14…); la circunferencia mide un poco más de 3 diámetros.','¿Cuántas veces cabe el diámetro en el borde?',{R:[sn(1,'¿Tiene razón?')]}),
 E('Para la orilla de una mesa redonda de 1 m de diámetro tienes 3 m de listón. ¿Alcanza?',[{k:'circ',show:'d',lab:'1 m'}],'No. 3.14 × 1 = 3.14 m, más que 3 m.','¿Cuánto mide la circunferencia?',{R:[sn(1,'¿Alcanza?')]}),
 E('Un círculo tiene 2 cm de radio y otro 4 cm. ¿El área del grande es el doble que la del chico? ¿Cuántas veces es?',[],'No. 3.14 × 2 × 2 = 12.56 cm² y 3.14 × 4 × 4 = 50.24 cm²: es 4 veces.','Calcula las dos áreas y divide.',{R:[sn(1,'¿Es el doble?'),n(4,'¿Cuántas veces?')]}),
 E('La circunferencia de un plato mide 31.4 cm. ¿Cuánto mide su diámetro?',[],'31.4 ÷ 3.14 = 10 cm.','Circunferencia = π × diámetro. ¿Qué número por 3.14 da 31.4?',{R:[n(10,'Diámetro cm')]})
];
TEMAS.push({eje:'geo',title:'Círculo y π',rows:ci.map(([t2,v],i)=>{const d=t2==='d'?v:2*v,C=R4(3.14*d),r=ar[i],A=R4(3.14*r*r);return{t:nombres[i],e:[
 E('El '+(t2==='d'?'diámetro':'radio')+' mide '+v+' cm. Usa π ≈ 3.14. ¿Cuánto mide la circunferencia?',[{k:'circ',show:t2,lab:v+' cm'}],(t2==='r'?'Diámetro '+d+' cm; ':'')+'3.14 × '+d+' = '+N(C)+' cm.','Circunferencia = π × diámetro.',{R:[n(C,'Circunferencia cm')]}),
 E('Calcula el área de un círculo de '+r+' cm de radio (π ≈ 3.14).',[{k:'circ',show:'r',lab:r+' cm'}],'3.14 × '+r+' × '+r+' = '+N(A)+' cm².','Área = π × radio × radio.',{model:true,R:[n(A,'Área cm²')]}),
 retos[i]]}})});})();

/* 10. PLANO CARTESIANO (primer cuadrante) */
(()=>{const A=[[3,2],[5,4],[1,5],[6,1],[4,3]],B=[[7,2],[5,1],[6,5],[6,5],[1,3]];
const nombres=['El cuarto vértice','El mapa del tesoro','El cuadrado','¿Cuál está más cerca?','¿Mismo punto?'];
const retos=[
 E('Tres vértices de un rectángulo son (1, 1), (5, 1) y (5, 4). ¿Dónde está el cuarto vértice?',[{k:'cart',pts:[[1,1],[5,1],[5,4]]}],'(1, 4). Tiene la x de (1, 1) y la y de (5, 4).','¿Qué punto está arriba de (1, 1) y a la altura de (5, 4)?',{R:[n(1,'x'),n(4,'y')]}),
 E('Un tesoro está en (4, 2). Pedro dice: «Desde (0, 0) camina 2 a la derecha y 4 hacia arriba». ¿Tiene razón?',[],'No. Primero va la x: 4 a la derecha y 2 hacia arriba.','En (4, 2), ¿qué número dice cuánto avanzar a la derecha?',{R:[sn(1,'¿Tiene razón?')]}),
 E('Tres vértices de un cuadrado son (2, 1), (5, 1) y (5, 4). ¿Cuál es el cuarto?',[{k:'cart',pts:[[2,1],[5,1],[5,4]]}],'(2, 4). Los lados miden 3.','¿Cuánto mide el lado de abajo?',{R:[n(2,'x'),n(4,'y')]}),
 E('¿Qué punto está más cerca del origen (0, 0): A(1, 6) o B(4, 2)?',[{k:'cart',pts:[[1,6,'A'],[4,2,'B']],gh:7}],'B. Si mides con regla desde (0, 0), A queda a poco más de 6 unidades y B a menos de 5.','Dibuja una línea del origen a cada punto y compáralas.',{R:[op(['A','B','Igual'],1,'¿Cuál?')]}),
 E('Ana dice que (3, 5) y (5, 3) son el mismo punto. ¿Tiene razón?',[{k:'cart',pts:[[3,5,'(3, 5)'],[5,3,'(5, 3)']]}],'No. (3, 5) está 3 a la derecha y 5 arriba; (5, 3) está 5 a la derecha y 3 arriba.','¿Qué indica el primer número? ¿Y el segundo?',{R:[sn(1,'¿Tiene razón?')]})
];
TEMAS.push({eje:'geo',title:'Plano cartesiano',rows:A.map(([x,y],i)=>{const [bx,by]=B[i],dist=Math.abs(bx-x)+Math.abs(by-y);return{t:nombres[i],e:[
 E('¿Cuáles son las coordenadas del punto A?',[{k:'cart',pts:[[x,y,'A']]}],'A('+x+', '+y+'): '+x+' a la derecha y '+y+' hacia arriba.','Primero cuenta hacia la derecha (x) y luego hacia arriba (y).',{R:[n(x,'x'),n(y,'y')]}),
 E('En el plano, ubica B('+bx+', '+by+'). ¿Cuántas unidades hay de A('+x+', '+y+') a B en línea recta?',[{k:'cart',pts:[[x,y,'A']]}],dist+' unidades ('+(bx!==x?'en horizontal':'en vertical')+').','¿Qué coordenada cambia de A a B?',{k:[{k:'cart',pts:[[x,y,'A'],[bx,by,'B']]}],R:[n(dist,'Unidades')]}),
 retos[i]]}})});})();

/* 11. VOLUMEN DE PRISMAS */
(()=>{const cu=[[3,2,2],[4,2,3],[5,3,2],[3,3,3],[2,2,4]],bx=[[8,5,3],[10,4,6],[2.5,4,2],[12,10,5],[7,3,1.5]];
const nombres=['La pecera','Dos cajas','La suma de Toño','Cubos en la caja','Doble de largo'];
const retos=[
 E('Una pecera mide 50 cm × 30 cm × 40 cm. ¿Le caben más de 50 litros? (1 L = 1,000 cm³)',[{k:'box',l:5,w:3,h:4,sc:12,ll:'50 cm',lw:'30 cm',lh:'40 cm'}],'Sí. 50 × 30 × 40 = 60,000 cm³ = 60 L.','Calcula el volumen y divide entre 1,000.',{R:[sn(0,'¿Más de 50 L?'),n(60,'Litros')]}),
 E('Caja A: 4 cm × 4 cm × 4 cm. Caja B: 8 cm × 4 cm × 2 cm. ¿Cuál tiene más volumen?',[],'Iguales. A: 64 cm³. B: 64 cm³.','Calcula los dos volúmenes.',{R:[op(['La A','La B','Iguales'],2,'¿Cuál?')]}),
 E('Toño dice que el volumen de una caja de 2 cm × 3 cm × 4 cm es 9 cm³. Encuentra el error y corrígelo.',[],'Toño sumó. Se multiplica: 2 × 3 × 4 = 24 cm³.','¿El volumen se suma o se multiplica?',{R:[n(24,'Volumen correcto cm³')]}),
 E('Una caja de 20 cm × 10 cm × 10 cm se llena con cubos de 10 cm de lado. ¿Cuántos cubos caben?',[{k:'cubes',l:2,w:1,h:1,u:34}],'2 cubos: 2 a lo largo, 1 a lo ancho y 1 a lo alto.','¿Cuántos cubos caben a lo largo?',{R:[n(2,'Cubos')]}),
 E('Si duplicas el largo de una caja y dejas igual el ancho y el alto, ¿el volumen se duplica?',[],'Sí. Por ejemplo, 2 × 3 × 4 = 24 y 4 × 3 × 4 = 48.','Prueba con una caja de 2 × 3 × 4.',{R:[sn(0,'¿Se duplica?')]})
];
TEMAS.push({eje:'med',title:'Volumen de prismas',rows:cu.map(([l,w,h],i)=>{const [a,b,c]=bx[i],V=R4(a*b*c);return{t:nombres[i],e:[
 E('¿Cuántos cubitos forman el prisma? (No hay huecos escondidos.)',[{k:'cubes',l,w,h}],l+' × '+w+' × '+h+' = '+l*w*h+' cubitos.','¿Cuántos cubitos hay en el piso de abajo? ¿Cuántos pisos hay?',{R:[n(l*w*h,'Cubitos')]}),
 E('Calcula el volumen de una caja de '+N(a)+' cm × '+N(b)+' cm × '+N(c)+' cm.',[{k:'box',l:Math.min(a,10),w:Math.min(b,6),h:Math.min(c,6),sc:12,ll:N(a)+' cm',lw:N(b)+' cm',lh:N(c)+' cm'}],N(a)+' × '+N(b)+' × '+N(c)+' = '+N(V)+' cm³.','Volumen = largo × ancho × alto.',{model:true,R:[n(V,'Volumen cm³')]}),
 retos[i]]}})});})();

/* 12. UNIDADES DE MEDIDA */
(()=>{const fg=[[{k:'jar',cap:2000,step:250,level:1750,unit:'ml'},'¿Cuántos litros de agua hay en la jarra?',1.75,'1,750 ml = 1.75 L','Litros'],[{k:'ruler',cm:10,len:8.4},'¿Cuántos milímetros mide el lápiz?',84,'8.4 cm = 84 mm','mm'],[{k:'jar',cap:1000,step:100,level:600,unit:'ml'},'¿Cuántos litros de agua hay en la jarra?',0.6,'600 ml = 0.6 L','Litros'],[{k:'ruler',cm:10,len:6.7},'¿Cuántos milímetros mide el lápiz?',67,'6.7 cm = 67 mm','mm'],[{k:'jar',cap:3000,step:500,level:2500,unit:'ml'},'¿Cuántos litros de agua hay en la jarra?',2.5,'2,500 ml = 2.5 L','Litros']];
const cv=[['Convierte 2.75 km a metros.',2750,'2.75 × 1,000 = 2,750 m','Metros','¿Cuántos metros tiene 1 km?'],['Convierte 4,500 g a kilogramos.',4.5,'4,500 ÷ 1,000 = 4.5 kg','Kilogramos','¿Cuántos gramos tiene 1 kg?'],['Convierte 3.2 t a kilogramos.',3200,'3.2 × 1,000 = 3,200 kg','Kilogramos','¿Cuántos kilos tiene 1 tonelada?'],['Convierte 250 cm a metros.',2.5,'250 ÷ 100 = 2.5 m','Metros','¿Cuántos centímetros tiene 1 m?'],['¿Cuántos minutos son 1.5 horas?',90,'1.5 × 60 = 90 minutos','Minutos','¿Cuántos minutos son media hora?']];
const nombres=['Vueltas a la pista','Vasos de agua','¿Cuál pesa más?','La película','El elevador'];
const retos=[
 E('Una vuelta a la pista mide 400 m. ¿Cuántas vueltas son 3 km?',[],'3 km = 3,000 m; 3,000 ÷ 400 = 7.5 vueltas.','¿Cuántos metros son 3 km?',{R:[n(7.5,'Vueltas')]}),
 E('Una botella tiene 1.5 L. ¿Alcanza para servir 8 vasos de 200 ml?',[],'No. 8 × 200 = 1,600 ml, más que 1,500 ml.','¿Cuántos ml son 1.5 L?',{R:[sn(1,'¿Alcanza?')]}),
 E('Un paquete pesa 750 g y otro 0.8 kg. ¿Cuál pesa más?',[],'El de 0.8 kg = 800 g.','Pasa los dos a gramos.',{R:[op(['El de 750 g','El de 0.8 kg','Iguales'],1,'¿Cuál?')]}),
 E('Una película dura 2 h 15 min y empieza a las 17:50. ¿Termina antes de las 20:00?',[],'No. 17:50 + 2 h = 19:50; + 15 min = 20:05.','Suma primero las horas y después los minutos.',{R:[sn(1,'¿Antes de las 20:00?')]}),
 E('Un elevador soporta como máximo 0.6 t. Suben 8 personas de 70 kg. ¿Se pasan?',[],'No. 8 × 70 = 560 kg, menos que 600 kg.','¿Cuántos kilos son 0.6 t?',{R:[sn(1,'¿Se pasan?')]})
];
TEMAS.push({eje:'med',title:'Unidades de medida',rows:fg.map(([f1,q,v,a,l],i)=>({t:nombres[i],e:[
 E(q,[f1],a,'¿Cuánto vale cada rayita?',{R:[n(v,l)]}),
 E(cv[i][0],[],cv[i][2],cv[i][4],{R:[n(cv[i][1],cv[i][3])]}),
 retos[i]]}))});})();

/* 13. GRÁFICAS CIRCULARES */
(()=>{const G=[[['Fútbol','Básquet','Natación','Otros'],[50,25,15,10],2,200],[['Camión','Auto','A pie','Bici'],[40,30,20,10],2,80],[['Mango','Fresa','Uva'],[50,30,20],1,60],[['Lunes','Martes','Miércoles','Jueves'],[10,20,30,40],3,150],[['Lectura','Deporte','Música','Videojuegos'],[35,25,15,25],0,40]];
const nombres=['Deporte favorito','Cómo llegamos','Fruta del recreo','Préstamos de libros','Tiempo libre'];
const retos=[
 E('Usa la gráfica del ejercicio 1. ¿Fútbol y Básquet juntos son más de la mitad?',[],'Sí. 50% + 25% = 75%, más que 50%.','¿Qué porcentaje es la mitad?',{R:[sn(0,'¿Más de la mitad?')]}),
 E('Usa la gráfica del ejercicio 1. Carlos dice que Camión es el doble que Bici. ¿Tiene razón?',[],'No. 40% es 4 veces 10%.','¿Cuántas veces cabe 10 en 40?',{R:[sn(1,'¿Tiene razón?'),n(4,'¿Cuántas veces es?')]}),
 E('Usa la gráfica del ejercicio 1. Pedro dice que Uva es la cuarta parte del total. ¿Tiene razón?',[],'No. La cuarta parte es 25%; Uva es 20%.','¿Qué porcentaje es la cuarta parte?',{R:[sn(1,'¿Tiene razón?')]}),
 E('Usa la gráfica del ejercicio 1. ¿Qué fracción del círculo es Jueves? Simplifícala.',[],'40% = {40/100} = {2/5}.','Escribe el porcentaje como fracción de 100.',{R:[fr('2/5','Fracción',{exacta:true})]}),
 E('Usa la gráfica del ejercicio 1. Deporte y Videojuegos tienen el mismo porcentaje. ¿Ocupan el mismo tamaño en el círculo?',[],'Sí. Mismo porcentaje = mismo pedazo del círculo.','¿De qué depende el tamaño de cada pedazo?',{R:[sn(0,'¿Mismo tamaño?')]})
];
TEMAS.push({eje:'dat',title:'Gráficas circulares',rows:G.map(([cats,vals,k,tot],i)=>({t:nombres[i],e:[
 E('¿Qué porcentaje eligió '+cats[k]+'?',[{k:'circg',cats,vals,pct:true}],cats[k]+': '+vals[k]+'%.','Busca el pedazo con su trama en la leyenda.',{R:[n(vals[k],'Porcentaje %')]}),
 E('Usa la gráfica del ejercicio 1. Si en total respondieron '+tot+' personas, ¿cuántas eligieron '+cats[k]+'?',[],vals[k]+'% de '+tot+' = '+N(vals[k]*tot/100)+' personas.','¿Cuánto es el 10% de '+tot+'?',{R:[n(R4(vals[k]*tot/100),'Personas')]}),
 retos[i]]}))});})();

/* 14. MEDIA Y RANGO */
(()=>{const D=[[2,3,3,4,6,6],[1,4,4,5,8],[3,3,4,5,5,6],[2,5,6,6,7,8],[4,4,5,5,5,9]],md=[[8,6,7,9,10],[12,15,9,14],[5.5,6,7.5,5],[20,25,30,35,40],[3,8,4,9,6]];
const nombres=['El último examen','Goles por partido','Cuatro números','Temperaturas','Calificaciones parecidas'];
const retos=[
 E('Luis sacó 8, 7 y 9 en tres exámenes. ¿Cuánto necesita en el cuarto para tener promedio de 8.5?',[],'4 × 8.5 = 34; 8 + 7 + 9 = 24; necesita 34 − 24 = 10.','¿Cuánto deben sumar los 4 exámenes?',{R:[n(10,'Calificación')]}),
 E('El equipo A anotó 3, 5 y 4 goles. El B anotó 6, 1 y 5. ¿Cuál tiene mayor promedio de goles?',[],'Iguales. A: 12 ÷ 3 = 4. B: 12 ÷ 3 = 4.','Suma los goles de cada equipo y divide entre 3.',{R:[op(['El A','El B','Iguales'],2,'¿Cuál?')]}),
 E('La media de 4 números es 10. ¿Cuánto suman los 4 números?',[],'4 × 10 = 40.','Media = suma ÷ cantidad de datos.',{R:[n(40,'Suma')]}),
 E('Las temperaturas de la semana fueron 18, 22, 25, 19 y 16 °C. Ana dice que el rango es 25. Corrígela.',[],'Rango = mayor − menor = 25 − 16 = 9 °C.','¿Cuál es la temperatura mayor y cuál la menor?',{R:[n(9,'Rango °C')]}),
 E('Dos grupos tienen media de 7. El grupo A tiene rango 2 y el B rango 8. ¿En cuál las calificaciones son más parecidas entre sí?',[],'En el A: su rango es menor, los datos están más juntos.','¿Qué indica un rango pequeño?',{R:[op(['En el A','En el B'],0,'¿En cuál?')]})
];
TEMAS.push({eje:'dat',title:'Media y rango',rows:D.map((vs,i)=>{const mn=Math.min(...vs),mx=Math.max(...vs),m=md[i],avg=R4(m.reduce((x,y)=>x+y,0)/m.length);return{t:nombres[i],e:[
 E('Cada punto es un dato. ¿Cuál es el rango de los datos?',[{k:'dots',vals:vs,min:Math.max(0,mn-1),max:mx+1}],'Rango = '+mx+' − '+mn+' = '+(mx-mn)+'.','¿Cuál es el dato mayor y cuál el menor?',{R:[n(mx-mn,'Rango')]}),
 E('Calcula la media (promedio) de: '+m.map(N).join(', ')+'.',[],'('+m.map(N).join(' + ')+') ÷ '+m.length+' = '+N(avg)+'.','Suma todos los datos y divide entre cuántos son.',{R:[n(avg,'Media')]}),
 retos[i]]}})});})();

/* 15. PROBABILIDAD CON DIAGRAMA DE ÁRBOL */
(()=>{const T=[[['Á','S'],['Á','S'],'Lanzas dos monedas (Á = águila, S = sol).','¿Qué probabilidad hay de sacar dos águilas (ÁÁ)?','1/4','ÁÁ es 1 de 4 resultados: {1/4}.'],
 [['R','A'],['1','2','3'],'Giras una ruleta roja/azul (R, A) y sacas una tarjeta 1, 2 o 3.','¿Qué probabilidad hay de sacar A y un número par (A2)?','1/6','A2 es 1 de 6 resultados: {1/6}.'],
 [['C','G'],['F','L','U'],'Eliges helado chico o grande (C, G) y sabor fresa, limón o uva (F, L, U).','¿Qué probabilidad hay de que salga sabor fresa, de cualquier tamaño?','1/3','CF y GF: 2 de 6 = {2/6} = {1/3}.'],
 [['A','B','C'],['1','2'],'Eliges una puerta A, B o C y luego una llave 1 o 2.','¿Qué probabilidad hay de que salga la llave 1?','1/2','A1, B1, C1: 3 de 6 = {3/6} = {1/2}.'],
 [['Á','S'],['R','V','A','N'],'Lanzas una moneda y luego giras una ruleta de 4 colores (R, V, A, N).','¿Qué probabilidad hay de águila con cualquier color?','1/2','4 de 8 = {4/8} = {1/2}.']];
const nombres=['Dos monedas','El error de Beto','Canicas en la bolsa','Par o mayor que 4','Ruleta de 80 giros'];
const retos=[
 E('Con dos monedas, ¿qué es más probable: una águila y un sol (en cualquier orden) o dos águilas?',[],'Una águila y un sol: ÁS y SÁ son 2 de 4; dos águilas es 1 de 4.','Cuenta en el árbol cuántos resultados tiene cada caso.',{R:[op(['Una águila y un sol','Dos águilas','Igual'],0,'¿Cuál?')]}),
 E('Beto dice que con dos monedas hay 3 resultados (dos águilas, dos soles o uno de cada uno), así que cada uno tiene probabilidad {1/3}. ¿Tiene razón?',[],'No. Hay 4 resultados igual de probables: ÁÁ, ÁS, SÁ, SS. «Uno de cada uno» vale {2/4}.','Haz el árbol de dos monedas.',{R:[sn(1,'¿Tiene razón?')]}),
 E('En una bolsa hay 3 canicas rojas y 1 azul. Sacar una canica verde es…',[],'Imposible: no hay canicas verdes.','¿Hay alguna verde?',{R:[op(['Seguro','Probable','Imposible'],2,'Es…')]}),
 E('Lanzas un dado. ¿Qué es más probable: un número par o un número mayor que 4?',[],'Par: 2, 4, 6 son 3 de 6. Mayor que 4: 5, 6 son 2 de 6.','Escribe los resultados de cada caso.',{R:[op(['Número par','Mayor que 4','Igual'],0,'¿Cuál?')]}),
 E('Una ruleta tiene 8 partes iguales y 3 son rojas. Si la giras 80 veces, ¿cerca de cuántas veces esperas rojo?',[{k:'spin',parts:['R','R','R','A','A','V','V','A']}],'{3/8} de 80 = 30 veces (aproximadamente).','¿Cuánto es {1/8} de 80?',{R:[n(30,'Veces')]})
];
TEMAS.push({eje:'dat',title:'Probabilidad con diagrama de árbol',rows:T.map(([a,b,ctx,q2,p,ans2],i)=>({t:nombres[i],e:[
 E(ctx+' ¿Cuántos resultados posibles hay?',[{k:'tree',a,b}],a.length+' × '+b.length+' = '+a.length*b.length+' resultados.','Cuenta las ramas del final del árbol.',{R:[n(a.length*b.length,'Resultados')]}),
 E(q2+' Usa el árbol del ejercicio 1.',[],ans2,'Cuenta los resultados que sirven y divide entre el total.',{R:[fr(p,'Probabilidad')]}),
 retos[i]]}))});})();
