"""Construye la versión HTML de Misiones de matemáticas a partir de src/.
Uso: python3 herramientas/construir.py  ->  web/misiones-matematicas-<versión>-html.html e index.html"""
import re, os, html, hashlib, base64
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def leer(p): return open(os.path.join(R, p), encoding='utf-8').read()
cfg = leer('src/nucleo/config.js')
def c(clave):
    m = re.search(clave + r":'([^']*)'", cfg); assert m, clave; return m.group(1)
V = {'APP': c('APP'), 'GRADO': c('GRADO'), 'VERSION': c('VERSION'), 'AUTOR': c('AUTOR'),
     'CONTACTO': c('CONTACTO'), 'TEXTO_DONAR': c('TEXTO_DONAR'), 'PRIVACIDAD': c('PRIVACIDAD'),
     'LIC': c('nombre'), 'LICURL': c('url'), 'TIPO': 'Versión HTML'}
# Logo: verificar SHA del original antes de incrustar
logo = base64.b64decode(open(os.path.join(R, 'assets/logo/logo.svg.b64.txt')).read().strip())
assert hashlib.sha256(logo).hexdigest().startswith('f533a2432e46'), 'logo alterado'
V['LOGO'] = 'data:image/svg+xml;base64,' + base64.b64encode(logo).decode()
assert V['LOGO'] == c('LOGO'), 'CONFIG.LOGO no coincide con assets/logo'

head = leer('src/nucleo/plantilla-cabeza.html')
head = head.replace('<title>Misiones de fracciones · 5.º de primaria</title>',
  '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'">\n'
  '<title>Misiones de matemáticas · 6.º de primaria (México)</title>\n<link rel="icon" href="' + V['LOGO'] + '">')
pal = '''.sheet[data-eje="num"]{--acc:#185fc7;--tint:#cfe2ff;--wash:#edf5ff}
.sheet[data-eje="ope"]{--acc:#00766c;--tint:#bfeedd;--wash:#e5f8f2}
.sheet[data-eje="fra"]{--acc:#7437ad;--tint:#e3cffa;--wash:#f3ebff}
.sheet[data-eje="pro"]{--acc:#a63d6b;--tint:#f7cfe0;--wash:#fcebf2}
.sheet[data-eje="geo"]{--acc:#9a5b00;--tint:#fbe0b5;--wash:#fff4e3}
.sheet[data-eje="med"]{--acc:#3d6b12;--tint:#d6efbd;--wash:#eef8e4}
.sheet[data-eje="dat"]{--acc:#b23a2b;--tint:#f8d3cc;--wash:#fdeeea}'''
head, n = re.subn(r'\.sheet\[data-level="2"\]\{[^}]*\}\n\.sheet\[data-level="3"\]\{[^}]*\}', pal, head); assert n == 1
va = ''':root{--va-primario:#1F5F8B;--va-primario-2:#245FA6;--va-acento:#C8343E;--va-peligro:#A4262C;--va-aviso:#B4521B;--va-aviso-fondo:#FCEBDD;--va-texto:#1F2937;--va-fondo:#FFFFFF;--va-superficie:#F1F5F9}
.va-cab{display:flex;align-items:center;gap:10px;flex-wrap:wrap;max-width:840px;margin:16px auto 0;padding:10px 16px;background:var(--va-fondo);border-top:4px solid var(--va-primario);border-radius:12px}
.va-logo{width:29px;height:36px;flex:none}
.va-tit{flex:1;min-width:180px;display:flex;flex-direction:column;color:var(--va-primario)}
.va-tit b{font-size:22px;line-height:1.15}.va-tit span{font-size:14px;color:var(--va-texto)}
.va-btn{font:inherit;padding:6px 12px;border-radius:6px;border:1px solid var(--va-primario);background:var(--va-primario);color:#fff;cursor:pointer}
.va-btn.va-sec{background:var(--va-fondo);color:var(--va-primario)}
.va-btn:focus-visible,.va-link:focus-visible,a:focus-visible{outline:3px solid var(--va-primario-2);outline-offset:2px}
.va-link{font:inherit;font-size:inherit;background:none;border:0;padding:0;color:var(--va-primario-2);text-decoration:underline;cursor:pointer}
.va-off{opacity:.55;cursor:not-allowed}
.va-aviso{margin:6px 0 0;font-size:14px;color:#9A4416}.va-aviso:not(:empty){background:var(--va-aviso-fondo);padding:4px 8px;border-radius:6px}
.va-pie{max-width:840px;margin:10px auto 24px;padding:10px 16px;display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:space-between;font-size:13px;color:var(--va-texto)}
.va-pie a{color:var(--va-primario-2)}
dialog{max-width:min(520px,calc(100vw - 32px));border:0;border-top:4px solid var(--va-primario);border-radius:12px;padding:16px 18px;color:var(--va-texto)}
dialog::backdrop{background:#1f293799}
dialog h2{margin:0 0 6px;font-size:20px;color:var(--va-primario)}
dialog p{font-size:14px;margin:6px 0}dialog a{color:var(--va-primario-2)}
.va-don{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
dialog form{margin-top:8px;text-align:right}
.va-ac{display:flex;gap:12px;align-items:center}.va-ac p{margin:0}
.sello{display:inline-flex;align-items:center;gap:4px;margin-left:auto;color:#465269}
nav{margin-top:10px}
@media print{.va-cab,.va-pie,dialog{display:none!important}}
.int{margin-top:6px;padding:6px 8px;background:var(--va-superficie);border-radius:8px;font-size:14px}
.int-c{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;margin:4px 0;border:0;padding:0;min-width:0}
.int-c legend{padding:0;margin-bottom:2px;font-weight:600}
.int-c>span:first-child{font-weight:600}
.int input[type=text]{font:inherit;font-size:16px;width:9em;max-width:100%;padding:4px 6px;border:1px solid #6b7890;border-radius:6px;background:#fff;color:var(--va-texto)}
.int input[aria-invalid=true]{border:2px solid var(--va-peligro)}
.int-op{display:inline-flex;gap:4px;align-items:center;padding:2px 8px;border:1px solid #c3ccda;border-radius:6px;background:#fff;cursor:pointer}
.int-ord{display:inline-flex;gap:4px;align-items:center}.int-ord select{font-size:15px;padding:3px 4px}
.int-acc{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.int .va-btn{padding:4px 10px;font-size:14px}
.int-msg{margin:4px 0 0;font-weight:600;min-height:0}.int-msg:empty{display:none}
.int-msg.ok{color:#1d6b2f}.int-msg.no{color:var(--va-peligro)}
.int-pista,.int-sol,.int-auto p{margin:4px 0 0;font-size:13.5px}
.int-auto{margin-top:4px}
.int[data-estado=bien]{outline:2px solid #1d6b2f}
.int-marc{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;justify-content:space-between;margin:6px 0 0;padding:4px 10px;border:1px solid #cad5e4;border-radius:8px;font-size:14px}
.int-marc .va-btn{padding:3px 10px;font-size:13px}
@media screen{.resp{display:none}}
@media print{.int,.int-marc{display:none!important}}'''
head = head.replace('</style>', va + '\n</style>', 1)
r = [(' .ans .figs{min-height:0}', ' .ans .figs{min-height:0}\n .ex .figs svg{max-height:26mm}\n .ans .figs svg{max-height:24mm;max-width:100%}'),
     (' .ex{margin:5px 0;padding:4px 9px}', ' .ex{margin:4px 0;padding:4px 9px}'),
     (' nav{display:none}', ' nav,.va-cab,.va-pie,dialog{display:none}')]
for a, b in r:
    assert head.count(a) == 1, a; head = head.replace(a, b)
cuerpo = leer('src/nucleo/cuerpo.html')
for k, v in V.items(): cuerpo = cuerpo.replace('%%' + k + '%%', html.escape(v, quote=True))
assert '%%' not in cuerpo
js = ['src/nucleo/config.js', 'src/plataformas/html/adaptador.js', 'src/nucleo/figuras-base.js',
      'src/nucleo/figuras.js', 'src/nucleo/figuras6.js', 'src/nucleo/vistas-base.js',
      'src/nucleo/modelo-temas.js', 'src/nucleo/logica-respuestas.js', 'src/nucleo/vistas.js', 'src/nucleo/eventos.js']
out = head + '\n' + cuerpo + '\n<script>\n"use strict";\n' + '\n'.join(leer(p) for p in js) + '\n</script></body></html>\n'
os.makedirs(os.path.join(R, 'web'), exist_ok=True)
nombre = 'misiones-matematicas-' + V['VERSION'] + '-html.html'
for p in ('web/' + nombre, 'index.html'):
    open(os.path.join(R, p), 'w', encoding='utf-8').write(out)
print(nombre, len(out.encode()), hashlib.sha256(out.encode()).hexdigest()[:16])
