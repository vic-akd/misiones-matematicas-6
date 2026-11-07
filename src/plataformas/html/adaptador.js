/* ========== ADAPTADOR HTML ==========
 Interfaz común: archivos, enlaces, almacenamiento y pdf. Es lo único que cambia entre versiones. */
const ORIGENES_DONAR=['https://link.mercadopago.com.mx','https://paypal.me'];
const Adaptador={
 enlaces:{
  abrirDonar(url){ // solo destinos HTTPS autorizados en CONFIG.DONAR
   let u;try{u=new URL(url)}catch(e){return false}
   const ok=u.protocol==='https:'&&ORIGENES_DONAR.includes(u.origin)&&Object.values(CONFIG.DONAR).includes(url);
   if(ok)window.open(url,'_blank','noopener,noreferrer');
   return ok;
  }
 },
 almacenamiento:{ // la app no guarda datos
  leer(){return null},escribir(){return false},borrar(){return true}
 },
 archivos:{ // no abre ni guarda .json
  descargarHTML(){const a=document.createElement('a');a.href=location.href.split('#')[0];a.download='misiones-matematicas-'+CONFIG.VERSION+'-html.html';document.body.appendChild(a);a.click();a.remove()}
 },
 pdf:{ // excepción aprobada: el PDF sale del diálogo de impresión del navegador (carta)
  imprimir(){window.print()}
 }
};
