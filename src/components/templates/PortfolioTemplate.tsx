import React, { useState } from 'react';
import { 
  Laptop, 
  Play, 
  Plus, 
  Sparkles, 
  Box, 
  Globe, 
  Activity, 
  Cpu, 
  Layers, 
  Code2, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  Trash2 
} from 'lucide-react';
import { PortfolioApp, UserRole } from '../../types';
import { AppRunnerModal } from '../modals/AppRunnerModal';

interface PortfolioTemplateProps {
  role: UserRole;
  apps: PortfolioApp[];
  onAddApp?: (app: PortfolioApp) => Promise<void>;
  onDeleteApp?: (id: string) => Promise<void>;
}

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  role,
  apps,
  onAddApp,
  onDeleteApp
}) => {
  const [selectedAppToRun, setSelectedAppToRun] = useState<PortfolioApp | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showNewAppModal, setShowNewAppModal] = useState(false);

  // New app modal inputs
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Código Embebido <>');
  const [newDesc, setNewDesc] = useState('');
  const [newTechs, setNewTechs] = useState('HTML5, JavaScript, Canvas API');
  const [newCodeSnippet, setNewCodeSnippet] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #030712; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    canvas { background: #0a0f1d; border: 1px solid #1e293b; border-radius: 12px; box-shadow: 0 0 25px rgba(56,189,248,0.25); }
    h4 { margin: 0 0 10px 0; color: #38bdf8; font-size: 15px; }
    .status { margin-top: 10px; font-size: 12px; color: #94a3b8; font-family: monospace; }
  </style>
</head>
<body>
  <h4>Simulador Gráfico Interactivo &lt;&gt;</h4>
  <canvas id="c" width="480" height="220"></canvas>
  <div class="status">Interactúa moviendo el ratón sobre el canvas</div>
  <script>
    const c = document.getElementById('c'), ctx = c.getContext('2d');
    let pts = [], mouse = {x: c.width/2, y: c.height/2};
    for(let i=0; i<35; i++) pts.push({x: Math.random()*c.width, y: Math.random()*c.height, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2});
    c.onmousemove = e => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    function loop() {
      ctx.fillStyle = 'rgba(10, 15, 29, 0.25)'; ctx.fillRect(0,0,c.width,c.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>c.width) p.vx*=-1; if(p.y<0||p.y>c.height) p.vy*=-1;
        ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fill();
        for(let j=i+1; j<pts.length; j++) {
          const d = Math.hypot(p.x-pts[j].x, p.y-pts[j].y);
          if(d < 70) {
            ctx.strokeStyle = 'rgba(56,189,248,' + (1 - d/70)*0.5 + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`);

  const [previewTab, setPreviewTab] = useState<'editor' | 'preview'>('editor');

  const applyCodePreset = (preset: 'ondas' | 'imc' | 'reflejos' | 'cubo') => {
    switch (preset) {
      case 'ondas':
        setNewTitle('Generador Armónico de Ondas <>');
        setNewCategory('Física & Simulación');
        setNewTechs('HTML5, Canvas, Trigonometría');
        setNewDesc('Visualizador dinámico de ondas senoidales y cosenoidales con ajuste de frecuencia en tiempo real.');
        setNewCodeSnippet(`<!DOCTYPE html>
<html>
<body style="margin:0;background:#030712;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
  <h4 style="color:#60a5fa;margin-bottom:8px;">Ondas de Frecuencia Armónica</h4>
  <canvas id="cv" width="500" height="200" style="background:#0b0f19;border-radius:10px;border:1px solid #1f2937;"></canvas>
  <script>
    const cv = document.getElementById('cv'), cx = cv.getContext('2d');
    let t = 0;
    function anim() {
      cx.fillStyle = 'rgba(11,15,25,0.2)'; cx.fillRect(0,0,cv.width,cv.height);
      cx.beginPath(); cx.lineWidth = 2.5; cx.strokeStyle = '#38bdf8';
      for(let x=0; x<cv.width; x++) {
        const y = cv.height/2 + Math.sin(x*0.02 + t)*40;
        if(x===0) cx.moveTo(x,y); else cx.lineTo(x,y);
      }
      cx.stroke();
      t += 0.05; requestAnimationFrame(anim);
    }
    anim();
  </script>
</body>
</html>`);
        break;

      case 'imc':
        setNewTitle('Calculadora de Rendimiento Físico & Zonas Karvonen <>');
        setNewCategory('Deporte & Salud');
        setNewTechs('JavaScript, DOM API, CSS Flex');
        setNewDesc('Herramienta interactiva para calcular índice de masa corporal y rangos de frecuencia cardíaca aeróbica.');
        setNewCodeSnippet(`<!DOCTYPE html>
<html>
<body style="margin:0;background:#090d16;color:#fff;font-family:sans-serif;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
  <div style="background:#111827;padding:24px;border-radius:16px;border:1px solid #1f2937;max-width:380px;width:100%;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
    <h3 style="color:#f97316;margin-top:0;font-size:16px;">Calculadora de IMC y Zonas Cardíacas</h3>
    <div style="margin-bottom:12px;">
      <label style="font-size:12px;color:#9ca3af;display:block;">Peso (kg):</label>
      <input id="peso" type="number" value="70" style="width:100%;padding:8px;background:#030712;border:1px solid #374151;color:#fff;border-radius:8px;box-sizing:border-box;">
    </div>
    <div style="margin-bottom:12px;">
      <label style="font-size:12px;color:#9ca3af;display:block;">Estatura (cm):</label>
      <input id="estatura" type="number" value="175" style="width:100%;padding:8px;background:#030712;border:1px solid #374151;color:#fff;border-radius:8px;box-sizing:border-box;">
    </div>
    <button onclick="calc()" style="width:100%;padding:10px;background:#f97316;color:#000;font-weight:bold;border:none;border-radius:8px;cursor:pointer;">Calcular</button>
    <div id="res" style="margin-top:14px;padding:10px;background:#030712;border-radius:8px;font-size:13px;color:#38bdf8;text-align:center;">IMC: 22.9 (Normopeso)</div>
  </div>
  <script>
    function calc() {
      const p = Number(document.getElementById('peso').value), h = Number(document.getElementById('estatura').value)/100;
      const imc = (p/(h*h)).toFixed(1);
      let cat = 'Normopeso'; if(imc<18.5) cat='Bajo peso'; else if(imc>=25) cat='Sobrepeso';
      document.getElementById('res').innerHTML = 'IMC: ' + imc + ' (' + cat + ')<br><small style="color:#9ca3af">Zona Quemagrasa: 120-140 bpm</small>';
    }
  </script>
</body>
</html>`);
        break;

      case 'reflejos':
        setNewTitle('Test de Tiempo de Reacción & Reflejos <>');
        setNewCategory('Gamificación & Educación');
        setNewTechs('Canvas API, Timers, Web Audio');
        setNewDesc('Minijuego para medir milisegundos de reacción motriz de atletas y estudiantes.');
        setNewCodeSnippet(`<!DOCTYPE html>
<html>
<body style="margin:0;background:#030712;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
  <div id="box" onclick="hit()" style="width:260px;height:180px;background:#ef4444;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;user-select:none;transition:background 0.2s;">
    <h3 id="txt" style="margin:0;font-size:18px;">Espera a que cambie a VERDE...</h3>
  </div>
  <p id="sc" style="color:#94a3b8;margin-top:16px;font-family:monospace;font-size:14px;">Haz clic en el recuadro para iniciar</p>
  <script>
    let state = 'idle', start = 0, to;
    const b = document.getElementById('box'), t = document.getElementById('txt'), s = document.getElementById('sc');
    function hit() {
      if(state==='idle') {
        state='wait'; b.style.background='#ef4444'; t.innerText='¡Espera al VERDE!'; s.innerText='Esperando señal aleatoria...';
        to = setTimeout(() => { state='green'; b.style.background='#10b981'; t.innerText='¡¡CLIC AHORA!!'; start = Date.now(); }, 1500 + Math.random()*2500);
      } else if(state==='wait') {
        clearTimeout(to); state='idle'; b.style.background='#3b82f6'; t.innerText='¡Demasiado pronto!'; s.innerText='Clic para reiniciar';
      } else if(state==='green') {
        const ms = Date.now() - start; state='idle'; b.style.background='#3b82f6'; t.innerText = ms + ' ms'; s.innerText = ms < 250 ? '¡Excelente velocidad de reacción!' : 'Buen reflejo. Clic para repetir';
      }
    }
  </script>
</body>
</html>`);
        break;

      case 'cubo':
        setNewTitle('Renderizador 3D CSS de Cubo Volumétrico <>');
        setNewCategory('Gráficos 3D & CSS');
        setNewTechs('CSS 3D Transforms, Web Animations');
        setNewDesc('Cubo tridimensional con iluminación reactiva y rotación espacial controlada por ratón.');
        setNewCodeSnippet(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #040711; height: 100vh; display: flex; align-items: center; justify-content: center; perspective: 700px; overflow: hidden; }
    .cube { width: 100px; height: 100px; position: relative; transform-style: preserve-3d; animation: spin 8s infinite linear; }
    .face { position: absolute; width: 100px; height: 100px; background: rgba(37,99,235,0.25); border: 2px solid #60a5fa; box-shadow: 0 0 15px rgba(59,130,246,0.5); }
    .front  { transform: translateZ(50px); }
    .back   { transform: rotateY(180deg) translateZ(50px); background: rgba(249,115,22,0.25); border-color: #f97316; }
    .right  { transform: rotateY(90deg) translateZ(50px); }
    .left   { transform: rotateY(-90deg) translateZ(50px); background: rgba(249,115,22,0.25); border-color: #f97316; }
    .top    { transform: rotateX(90deg) translateZ(50px); }
    .bottom { transform: rotateX(-90deg) translateZ(50px); }
    @keyframes spin { 0% { transform: rotateX(0deg) rotateY(0deg); } 100% { transform: rotateX(360deg) rotateY(360deg); } }
  </style>
</head>
<body>
  <div class="cube">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face right"></div>
    <div class="face left"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
  </div>
</body>
</html>`);
        break;
    }
  };


  const categories = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: '3d', label: '3D & Realidad Virtual' },
    { id: 'edtech', label: 'EdTech & Gamificación' },
    { id: 'salud', label: 'Deporte & Biomecánica' }
  ];

  const filteredApps = apps.filter((app) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === '3d') return app.technologies.some(t => t.includes('3D') || t.includes('WebGL') || t.includes('Three'));
    if (categoryFilter === 'edtech') return app.category.includes('EdTech') || app.category.includes('Gamificación');
    if (categoryFilter === 'salud') return app.category.includes('Salud') || app.category.includes('Deporte');
    return true;
  });

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !onAddApp) return;

    const isCode = Boolean(newCodeSnippet.trim());

    const created: PortfolioApp = {
      id: `app-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Proyecto de software desarrollado bajo la plataforma modular Es Pa Todo.',
      longDescription: newDesc.trim() || 'Módulo interactivo y código cargado por Rubén Darío Rincón Montoya.',
      category: newCategory,
      technologies: newTechs.split(',').map(s => s.trim()).filter(Boolean),
      version: isCode ? 'v1.0 Live <>' : 'v1.0 Release',
      author: 'Rubén Darío Rincón Montoya',
      interactiveType: isCode ? 'code_embed' : 'generic',
      codeSnippet: isCode ? newCodeSnippet.trim() : undefined,
      demoMetrics: {
        users: isCode ? 'Código Activo' : '100+ usuarios',
        fps: isCode ? 'Sandbox Live' : '60 FPS',
        status: isCode ? 'Ejecutable <>' : 'Activo'
      }
    };

    await onAddApp(created);
    setShowNewAppModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getVisualPreview = (app: PortfolioApp) => {
    if (app.codeSnippet || app.interactiveType === 'code_embed') {
      return (
        <div className="h-48 w-full bg-gradient-to-br from-blue-950/50 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb25,transparent_60%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/50 text-blue-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-blue-300 block">Código Embebido &lt;&gt;</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800 flex items-center gap-1">
            <span className="text-blue-400">&lt;/&gt;</span> HTML5/JS
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sandbox Live
          </div>
        </div>
      );
    }

    if (app.interactiveType === '3d_museum') {
      return (
        <div className="h-48 w-full bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b15,transparent_60%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Box className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-amber-300 block">Renderizado 3D Interactivo</span>
          </div>
          {/* Tech Spec Overlay */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            WebGL 2.0
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            60 FPS
          </div>
        </div>
      );
    }

    if (app.interactiveType === 'world_quiz') {
      return (
        <div className="h-48 w-full bg-gradient-to-br from-sky-950/40 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0284c715,transparent_60%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/40 text-sky-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-sky-300 block">Motor de Preguntas Canvas</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            HTML5 Canvas
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-sky-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            Gamificado
          </div>
        </div>
      );
    }

    return (
      <div className="h-48 w-full bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#05966915,transparent_60%)]" />
        <div className="relative z-10 text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Activity className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-mono text-emerald-300 block">Algoritmo Cinemático</span>
        </div>
        <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
          Matemático
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-8 pb-12">
      
      {/* Portfolio Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>Laboratorio de Software y Tecnologías Emergentes (Azul & Índigo)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk']">
              Portafolio de Aplicaciones Tecnológicas
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Desarrollos informáticos, motores de renderizado 3D y simulaciones interactivas creadas por <strong className="text-neutral-200">Rubén Darío Rincón Montoya</strong>. 
              Ejecuta cada aplicación directamente desde el navegador con un solo clic.
            </p>
          </div>

          {role === 'admin' && (
            <button
              onClick={() => setShowNewAppModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Añadir Proyecto al Lab</span>
            </button>
          )}
        </div>

        {/* Decorative Ambient Blue Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Category Segmented Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-neutral-800 text-white shadow-xs font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-neutral-400">
          {filteredApps.length} experimentos activos
        </span>
      </div>

      {/* Modern Tech Lab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="group rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700/80 transition-all flex flex-col overflow-hidden shadow-xs hover:shadow-lg"
          >
            {/* Visual Header Stage */}
            {getVisualPreview(app)}

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {app.codeSnippet && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono">
                        <Code2 className="w-3 h-3 text-blue-400" />
                        <span>&lt;&gt;</span>
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wide">
                      {app.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {app.version}
                    </span>
                    {role === 'admin' && onDeleteApp && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`¿Eliminar la aplicación "${app.title}" del portafolio?`)) {
                            onDeleteApp(app.id);
                          }
                        }}
                        className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Eliminar app"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-['Cabinet_Grotesk']">
                  {app.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {app.description}
                </p>
              </div>

              {/* Technologies unboxed tags (Strict Zero-Pill Discipline) */}
              <div className="space-y-3 pt-2 border-t border-neutral-800/60">
                <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-neutral-400 font-mono">
                  {app.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span className="text-neutral-300">{tech}</span>
                      {tIdx < app.technologies.length - 1 && (
                        <span className="text-neutral-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Primary Action Button: "Ejecutar Aplicación" */}
                <button
                  onClick={() => setSelectedAppToRun(app)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-blue-600 hover:text-white text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover/btn:scale-110" />
                  <span>Ejecutar {app.codeSnippet ? 'Código <>' : 'Aplicación'}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Live Application Runner Modal */}
      {selectedAppToRun && (
        <AppRunnerModal
          app={selectedAppToRun}
          onClose={() => setSelectedAppToRun(null)}
        />
      )}

      {/* Admin Add New Application / Embed Code Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Cabinet_Grotesk']">
                    Cargar Código Directo &lt;&gt; o Nueva App
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Portafolio y Laboratorio de Software · Administrador Rubén Darío
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewAppModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block">
                Plantillas de Código &lt;&gt; Listas para Usar (1 Clic)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => applyCodePreset('ondas')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-blue-300">✨ Ondas Canvas</span>
                  <span className="text-[10px] text-neutral-500">Trigonometría 60fps</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyCodePreset('imc')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-orange-300">🧮 Calculadora IMC</span>
                  <span className="text-[10px] text-neutral-500">Zonas cardíacas</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyCodePreset('reflejos')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-emerald-300">🎮 Test Reflejos</span>
                  <span className="text-[10px] text-neutral-500">Milisegundos reacción</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyCodePreset('cubo')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-300">🌐 Cubo 3D CSS</span>
                  <span className="text-[10px] text-neutral-500">Transformaciones 3D</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateApp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Título de la Aplicación *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Simulador de Ondas & Partículas"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Ej. Código Embebido <>, Simulación 3D"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Tecnologías (Separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={newTechs}
                    onChange={(e) => setNewTechs(e.target.value)}
                    placeholder="HTML5, Canvas, JavaScript ES6"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Descripción Corta
                  </label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Resumen del funcionamiento y propósito..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Code Snippet Input & Live Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-neutral-400 font-mono text-[11px] flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Código Fuente Directo &lt;&gt; (HTML / CSS / JavaScript)</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-1 p-0.5 bg-neutral-950 rounded-lg border border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('editor')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                        previewTab === 'editor'
                          ? 'bg-neutral-800 text-white font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('preview')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                        previewTab === 'preview'
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Vista Previa
                    </button>
                  </div>
                </div>

                {previewTab === 'editor' ? (
                  <textarea
                    rows={8}
                    value={newCodeSnippet}
                    onChange={(e) => setNewCodeSnippet(e.target.value)}
                    placeholder="Pega aquí tu código HTML, CSS o JS (<canvas>, <script>, etc.)..."
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-xs focus:outline-none focus:border-blue-500 resize-y leading-relaxed select-all"
                  />
                ) : (
                  <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 h-52">
                    <iframe
                      srcDoc={newCodeSnippet}
                      title="Preview"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowNewAppModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Publicar Código en Portafolio</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

