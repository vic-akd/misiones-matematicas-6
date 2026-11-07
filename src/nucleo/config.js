/* ========== CONFIG ==========
 Única fuente de identidad, versión, plataforma, funciones y enlaces de donación. */
const CONFIG=Object.freeze({
 APP:'Misiones de matemáticas',
 GRADO:'6.º de primaria · México',
 VERSION:'v1.01',
 AUTOR:'Víctor Arellano',
 CONTACTO:'contacto@victorarellano.com',
 LICENCIA:{nombre:'CC BY-NC-SA 4.0',url:'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'},
 LOGO:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDMgMTgwIj48dGl0bGU+VsOtY3RvciBBcmVsbGFubzwvdGl0bGU+PHBhdGggZmlsbD0iI0MyMTUxQiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzAuNDkgMTc2LjI1TDEzMy4wMCAxMDMuNDlMMTMyLjc0IDEwMi41NkwxMjkuNzEgMTAwLjE5TDcxLjI4IDU1LjY0TDcxLjM2IDU0LjM5TDEwMi4xNSAzMC4zNkw3MC40OSAxLjczTDM4LjUwIDMwLjIzTDY5LjY0IDU0LjM5TDY5LjcyIDU1LjYzTDkuMDAgMTAyLjYyTDkuMDAgMTAzLjUzWk03MS40OSAxNzAuMjJMNzEuMTIgMTY5LjQyTDcyLjAyIDE2OC4wMkwxMTYuMTYgMTAzLjExTDc0LjQ0IDYzLjUzTDcxLjA3IDU5LjY0TDEyNy4xMiAxMDIuNzdMMTI3LjEyIDEwMy40MVpNNzAuNDYgMTQ3LjM4TDMwLjg1IDEwMy4wMEwzMS4wMCAxMDIuMzhMNzAuNjQgNzAuMzVMMTA4LjE0IDEwMC45NEwxMTAuMTIgMTAyLjYyTDExMC4xMiAxMDMuNDBMNzEuNDQgMTQ2Ljg5Wk03MC43MCA1MS44N0w3MC4yNSA1MS40Mkw4OS41MCAzMC42Nkw4OS41MCAzMC4wOUw3MS4yMyA1LjU4TDcwLjYzIDMuODhMOTcuODAgMzAuNTJaTTcwLjQwIDQxLjg4TDU1LjM4IDMwLjYyTDU1Ljk3IDI5LjQ5TDcwLjIzIDE1LjI1TDg1LjAwIDMwLjAwTDg1LjAwIDMwLjczWiIvPjwvc3ZnPg==',
 DONAR:Object.freeze({
  mercadoPago:'https://link.mercadopago.com.mx/victorcursos',
  paypal:'https://paypal.me/donar369'
 }),
 TEXTO_DONAR:'Esta herramienta es gratuita. Si te sirve, puedes apoyar de forma voluntaria.',
 PRIVACIDAD:'Esta aplicación no recaba, guarda, envía ni comparte datos personales. Lo que capturas se usa solo mientras la app está abierta y se pierde al cerrarla, salvo lo que tú exportes a PDF. Los botones de Donar abren Mercado Pago o PayPal en tu navegador; lo que hagas ahí se rige por los avisos de privacidad de esos servicios. Contacto: contacto@victorarellano.com.'
});
/* PLATAFORMA se fija al construir cada versión. */
const PLATAFORMA='html';
const TIPO={html:'Versión HTML',portable:'Versión portable',instalable:'Versión instalable',android:'Versión Android'};
/* Disponibilidad de cada función por versión. */
const FUNCIONES=Object.freeze({
 elegirFicha:{html:true,portable:true,instalable:true,android:true},
 responderEnPantalla:{html:true,portable:true,instalable:true,android:true},
 mostrarRespuestas:{html:true,portable:true,instalable:true,android:true},
 imprimirPDF:{html:true,portable:true,instalable:true,android:true},
 descargarArchivo:{html:true,portable:false,instalable:false,android:false}
});
