# Misiones de matemáticas · 6.º de primaria (México) · v1.01

Fichas gratuitas de matemáticas para 6.º de primaria en México: 15 temas, 90 fichas y 270 ejercicios. Se contestan en pantalla o se imprimen en carta, con solucionario en la mitad inferior de cada hoja.

**Usarlo en línea:** https://vic-akd.github.io/misiones-matematicas-6/

**Contestar en pantalla:** cada ejercicio tiene casillas y el botón «Comprobar». Si te equivocas aparece una pista; al segundo error puedes ver la respuesta. Nada se guarda.

**Usarlo sin internet:** descarga `index.html` y ábrelo en cualquier navegador. Para PDF, elige «Guardar como PDF» al imprimir.

Los temas se basan en los contenidos de matemáticas de 6.º de la SEP (Fase 5, Plan 2022). Compáralos con el libro de texto de tu grupo.

## Temas

1. Números grandes y decimales · 2. Multiplicar con decimales · 3. Dividir con decimales · 4. Fracciones: sumar y restar con mixtos · 5. Fracción y decimal entre natural · 6. Razones y valor faltante · 7. Porcentajes y tanto por ciento · 8. Polígonos regulares · 9. Círculo y π · 10. Plano cartesiano · 11. Volumen de prismas · 12. Unidades de medida · 13. Gráficas circulares · 14. Media y rango · 15. Probabilidad con diagrama de árbol

## Modificarlo

| Ruta | Qué contiene |
|---|---|
| `src/nucleo/config.js` | Nombre, grado, versión, autor, licencia, Donar y funciones por versión. |
| `src/nucleo/modelo-temas.js` | Los 15 temas: `E(pregunta, figuras, respuesta, pista, {R: campos para contestar})`. |
| `src/nucleo/figuras-base.js`, `figuras.js`, `figuras6.js` | Aritmética y dibujos SVG (plano cartesiano, polígonos, árbol, gráfica circular, cubos…). |
| `src/nucleo/logica-respuestas.js` | Cómo se leen y califican las respuestas. |
| `src/nucleo/vistas-base.js`, `vistas.js` | Armado de cada ficha. |
| `src/nucleo/eventos.js` | Navegación, respuestas, impresión, Donar y Acerca de. |
| `src/nucleo/plantilla-cabeza.html`, `cuerpo.html` | Estilos y estructura de la página. |
| `src/plataformas/html/adaptador.js` | Enlaces, impresión y descarga de la versión HTML. |
| `herramientas/construir.py` | Une todo en un solo HTML. |
| `pruebas/probar.js` | Pruebas automáticas. |

**Regenerar** (Python 3): `python3 herramientas/construir.py` → `index.html` y `web/misiones-matematicas-v1.01-html.html`.

**Probar** (Node y Playwright): `node pruebas/probar.js index.html`.

## Privacidad
Esta aplicación no recaba, guarda, envía ni comparte datos personales. Los botones de Donar abren Mercado Pago o PayPal en tu navegador.

## Autor y licencia
Víctor Arellano · contacto@victorarellano.com · [CC BY-NC-SA 4.0](LICENCIA.md): puedes usarlo, imprimirlo y adaptarlo dando crédito, sin venderlo y compartiendo tus cambios con la misma licencia.

**Cómo dar crédito** si lo usas o lo modificas:

> Basado en *Misiones de matemáticas 6.º* de Víctor Arellano, https://vic-akd.github.io/misiones-matematicas-6/, CC BY-NC-SA 4.0.

Si lo modificaste, agrega «Modificado por <tu nombre>».

Esta herramienta es gratuita. Si te sirve, puedes apoyar de forma voluntaria: [Donar con Mercado Pago](https://link.mercadopago.com.mx/victorcursos) · [Donar con PayPal](https://paypal.me/donar369)
