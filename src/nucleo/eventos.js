/* ========== EVENTOS ========== */
const pages=document.querySelector("#pages"),pick=document.querySelector("#pick"),toggle=document.querySelector("#toggle");
let k0=0;pick.innerHTML=ALL.map((tm,ti)=>'<optgroup label="'+(ti+1)+'. '+tm.title+'">'+tm.rows.map((r,i)=>'<option value="'+(k0++)+'">'+(i+1)+'. '+r.t+'</option>').join("")+'</optgroup>').join("");
document.querySelector("#count").textContent=ALL.length+" temas · "+markup.length+" fichas · "+markup.length*3+" ejercicios";
function setKey(show){pages.classList.toggle("hide-key",!show);toggle.textContent=show?"Ocultar respuestas":"Mostrar respuestas";toggle.setAttribute("aria-pressed",String(show))}
function show(){
 pages.innerHTML=markup[Number(pick.value)];
 setKey(false);
 document.querySelector("#prev").disabled=pick.selectedIndex===0;
 document.querySelector("#next").disabled=pick.selectedIndex===markup.length-1;
}
pick.onchange=show;
document.querySelector("#prev").onclick=()=>{pick.selectedIndex--;show()};
document.querySelector("#next").onclick=()=>{pick.selectedIndex++;show()};
toggle.onclick=()=>setKey(pages.classList.contains("hide-key"));
let printing=false;
const printSet=list=>{printing=true;pages.innerHTML=list.join("");Adaptador.pdf.imprimir()};
document.querySelector("#one").onclick=()=>Adaptador.pdf.imprimir();
document.querySelector("#tema").onclick=()=>{const ti=IDX[Number(pick.value)][0];printSet(markup.filter((m,k)=>IDX[k][0]===ti))};
document.querySelector("#all").onclick=()=>printSet(markup);
/* afterprint restaura la ficha también en navegadores donde print() no bloquea */
window.addEventListener("afterprint",()=>{if(printing){printing=false;const k=!pages.classList.contains("hide-key");pages.innerHTML=markup[Number(pick.value)];setKey(k)}});

/* Funciones no disponibles: aria-disabled, acción bloqueada y aviso anunciado */
const aviso=document.querySelector("#aviso");
function conFuncion(id,fn,boton){
 const ok=FUNCIONES[id][PLATAFORMA];
 if(!ok){boton.setAttribute("aria-disabled","true");boton.setAttribute("aria-describedby","aviso");boton.classList.add("va-off")}
 boton.addEventListener("click",()=>{if(ok){fn();return}aviso.textContent="Esta función no está disponible en la versión "+({html:"HTML",portable:"portable",instalable:"instalable",android:"Android"})[PLATAFORMA]+"."+(FUNCIONES[id].html?" Disponible en la versión HTML.":"")});
}
conFuncion("descargarArchivo",()=>Adaptador.archivos.descargarHTML(),document.querySelector("#descargar"));
/* Donar y Acerca de */
const dlgDonar=document.querySelector("#dlgDonar"),dlgAcerca=document.querySelector("#dlgAcerca");
[["#btnDonar",dlgDonar],["#pieDonar",dlgDonar],["#btnAcerca",dlgAcerca],["#pieAcerca",dlgAcerca]].forEach(([s,d])=>document.querySelector(s).addEventListener("click",()=>d.showModal()));
document.querySelectorAll("[data-donar]").forEach(b=>b.addEventListener("click",()=>Adaptador.enlaces.abrirDonar(CONFIG.DONAR[b.dataset.donar])));


/* Contestar en pantalla: delegación de eventos sobre la ficha visible */
function valoresDe(box,i,c){
 if(c.k==='op'){const r=box.querySelector('input[data-c="'+i+'"]:checked');return r?r.value:''}
 if(c.k==='ord'||c.k==='dos')return [...box.querySelectorAll('[data-c="'+i+'"]')].map(x=>x.value);
 return box.querySelector('[data-c="'+i+'"]').value;
}
function marcarCampo(box,i,r){box.querySelectorAll('[data-c="'+i+'"]').forEach(x=>{if(r===false)x.setAttribute('aria-invalid','true');else x.removeAttribute('aria-invalid')})}
function contar(){const s=pages.querySelector('.sheet');if(!s)return;const k=s.querySelector('.int-cuenta');if(k)k.textContent=s.querySelectorAll('.int[data-estado="bien"]').length}
function mensaje(box,txt,clase){const m=box.querySelector('.int-msg');m.textContent=txt;m.className='int-msg'+(clase?' '+clase:'')}
function fallo(box){
 const n=Number(box.dataset.intentos)+1;box.dataset.intentos=n;
 box.querySelector('.int-pista').hidden=false;
 if(n>=2)box.querySelector('[data-accion="ver"]').hidden=false;
 mensaje(box,n>=2?'✖ Todavía no. Lee la pista o mira la respuesta.':'✖ Todavía no. Lee la pista e inténtalo otra vez.','no');
}
function comprobar(box){
 if(!FUNCIONES.responderEnPantalla[PLATAFORMA])return;
 const cs=RESPID[box.dataset.id];
 const rs=cs.map((c,i)=>Resp.campo(c,valoresDe(box,i,c)));
 box.querySelector('.int-auto').hidden=true;
 if(rs.some(r=>r===null)){rs.forEach((r,i)=>marcarCampo(box,i,true));mensaje(box,'Completa todas las casillas.','');return}
 rs.forEach((r,i)=>marcarCampo(box,i,r));
 if(rs.some(r=>r===false)){box.dataset.estado=box.dataset.estado==='bien'?'':box.dataset.estado||'';fallo(box);contar();return}
 if(rs.some(r=>r==='auto')){box.querySelector('.int-auto').hidden=false;mensaje(box,'Revisa tú mismo: ¿dice lo mismo que la respuesta?','');return}
 if(box.dataset.estado!=='visto')box.dataset.estado='bien';
 mensaje(box,box.dataset.estado==='bien'?'✔ ¡Correcto!':'✔ Correcto, pero ya habías visto la respuesta.','ok');contar();
}
pages.addEventListener('click',ev=>{
 const b=ev.target.closest('[data-accion]');if(!b||!pages.contains(b))return;
 const box=b.closest('.int'),a=b.dataset.accion;
 if(a==='reiniciar'){const k=!pages.classList.contains('hide-key');show();setKey(k);return}
 if(!box)return;
 if(a==='comprobar')comprobar(box);
 else if(a==='ver'){box.querySelector('.int-sol').hidden=false;if(box.dataset.estado!=='bien')box.dataset.estado='visto';b.hidden=true;contar()}
 else if(a==='bien'){box.querySelector('.int-auto').hidden=true;if(box.dataset.estado!=='visto')box.dataset.estado='bien';mensaje(box,box.dataset.estado==='bien'?'✔ ¡Bien!':'✔ Bien, pero ya habías visto la respuesta.','ok');contar()}
 else if(a==='mal'){box.querySelector('.int-auto').hidden=true;fallo(box)}
});
pages.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&ev.target.matches('.int input[type="text"]')){ev.preventDefault();comprobar(ev.target.closest('.int'))}});

/* ========== ARRANQUE ========== */
show();
