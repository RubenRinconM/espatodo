import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw, Maximize2, Sparkles, Award, Globe, Box, Activity, ChevronRight, Check, Code2, Copy } from 'lucide-react';
import { PortfolioApp } from '../../types';

interface AppRunnerModalProps {
  app: PortfolioApp | null;
  onClose: () => void;
}

export const AppRunnerModal: React.FC<AppRunnerModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Runner Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400 text-blue-400 flex items-center justify-center">
              {app.codeSnippet || app.interactiveType === 'code_embed' ? (
                <Code2 className="w-4 h-4 text-blue-400" />
              ) : app.interactiveType === '3d_museum' ? (
                <Box className="w-4 h-4 text-amber-400" />
              ) : app.interactiveType === 'world_quiz' ? (
                <Globe className="w-4 h-4 text-emerald-400" />
              ) : (
                <Activity className="w-4 h-4 text-orange-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                  {app.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                  {app.version}
                </span>
                {app.codeSnippet && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                    Código &lt;&gt;
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">
                Entorno interactivo en tiempo real · Desarrollado por {app.author}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Runtime Activo
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Runner Stage Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950">
          {(app.codeSnippet || app.interactiveType === 'code_embed') ? (
            <CodeSnippetSimulator app={app} />
          ) : app.interactiveType === '3d_museum' ? (
            <VirtualMuseumSimulator />
          ) : app.interactiveType === 'world_quiz' ? (
            <WorldQuizSimulator />
          ) : app.interactiveType === 'biomechanics' ? (
            <BiomechanicsSimulator />
          ) : (
            <GenericAppSimulator app={app} />
          )}
        </div>

        {/* Runner Footer Controls */}
        <div className="px-6 py-3 border-t border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Arquitectura: {app.technologies?.join(' · ') || 'HTML5 / JS'}</span>
            <span>·</span>
            <span>Licencia: Es Pa' Todo Open Lab</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Cerrar Simulador
          </button>
        </div>

      </div>
    </div>
  );
};

/**
 * 0. Simulador para Código <> Embebido en Tiempo Real
 */
const CodeSnippetSimulator: React.FC<{ app: PortfolioApp }> = ({ app }) => {
  const [activeTab, setActiveTab] = useState<'run' | 'code'>('run');
  const [copied, setCopied] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const snippet = app.codeSnippet || `<!DOCTYPE html>
<html>
<body style="background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
  <div style="text-align:center;">
    <h2 style="color:#60a5fa;">${app.title}</h2>
    <p style="color:#94a3b8;">${app.description}</p>
    <button onclick="alert('¡Código interactivo ejecutado correctamente!')" style="padding:10px 20px;border-radius:8px;background:#3b82f6;color:white;border:none;cursor:pointer;font-weight:bold;">Hacer Clic</button>
  </div>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher & Sandbox Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('run')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeTab === 'run'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Ejecución en Vivo</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Código Fuente &lt;&gt;</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'run' && (
            <button
              onClick={() => setRunKey(k => k + 1)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-mono transition-colors cursor-pointer"
              title="Reiniciar código"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar</span>
            </button>
          )}

          {activeTab === 'code' && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Código <>'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport */}
      {activeTab === 'run' ? (
        <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-inner">
          <iframe
            key={runKey}
            srcDoc={snippet}
            title={app.title}
            sandbox="allow-scripts allow-modals"
            className="w-full h-[460px] border-0"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 overflow-x-auto">
          <pre className="font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap select-all">
            {snippet}
          </pre>
        </div>
      )}
    </div>
  );
};


/**
 * 1. Simulación Interactiva del Museo Virtual 3D
 */
const VirtualMuseumSimulator: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState(45);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeArtifact, setActiveArtifact] = useState<number>(0);
  const [lightingPreset, setLightingPreset] = useState<'day' | 'gallery' | 'dramatic'>('gallery');

  const artifacts = [
    {
      name: 'Busto Clásico de Discóbolo (Atleta de Mirón)',
      era: 'Grecia Clásica (c. 450 a.C.)',
      description: 'Estudio de la biomecánica corporal antigua y tensión muscular en el lanzamiento de disco.',
      geometry: 'Escultura Anatómica',
      wireframeColor: '#F59E0B'
    },
    {
      name: 'Globo Terráqueo de Mercator',
      era: 'Renacimiento Flamenco (1541)',
      description: 'Esfera cartográfica pionera utilizada para navegación oceánica y comprensión del cosmos.',
      geometry: 'Esfera Geodésica',
      wireframeColor: '#38BDF8'
    },
    {
      name: 'Molécula de Mioglobina & Transporte de Oxígeno',
      era: 'Biofísica Moderna (1958)',
      description: 'Estructura terciaria de la proteína muscular fundamental en el rendimiento físico aeróbico.',
      geometry: 'Helicoidal Proteica',
      wireframeColor: '#34D399'
    }
  ];

  const current = artifacts[activeArtifact];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 3D Canvas Representation */}
        <div className="lg:col-span-8 bg-neutral-900/90 rounded-xl border border-neutral-800 p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden select-none">
          {/* Ambient Lighting Background based on preset */}
          <div className={`absolute inset-0 transition-colors duration-500 ${
            lightingPreset === 'day' 
              ? 'bg-gradient-to-b from-sky-950/30 via-neutral-900 to-neutral-950'
              : lightingPreset === 'dramatic'
              ? 'bg-gradient-to-t from-amber-950/40 via-neutral-950 to-black'
              : 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-black'
          }`} />

          {/* Interactive 3D Projection Engine Visual */}
          <div 
            className="relative z-10 transition-transform duration-300 flex flex-col items-center justify-center"
            style={{ 
              transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
              filter: lightingPreset === 'dramatic' ? 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.45))' : 'none'
            }}
          >
            {/* Geometric Artifact Render */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer Gyro Ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed transition-all"
                style={{ borderColor: current.wireframeColor, opacity: 0.6 }}
              />
              {/* Inner Diamond Polyhedron */}
              <div 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-2 flex items-center justify-center backdrop-blur-xs transition-transform"
                style={{ 
                  borderColor: current.wireframeColor,
                  backgroundColor: `${current.wireframeColor}10`,
                  transform: 'rotate(45deg)'
                }}
              >
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/40 flex items-center justify-center text-white font-mono text-xs font-bold"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  <Box className="w-8 h-8" style={{ color: current.wireframeColor }} />
                </div>
              </div>

              {/* Floating Orbit Points */}
              <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-sky-400" />
            </div>

            <p className="mt-4 font-mono text-[11px] text-neutral-400 tracking-wider">
              Ángulo de vista: {rotationAngle}° · Zoom: {(zoomLevel * 100).toFixed(0)}%
            </p>
          </div>

          {/* Interactive Canvas Overlay Controls */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2 bg-neutral-950/80 rounded-lg border border-neutral-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Rotación:</span>
              <button 
                onClick={() => setRotationAngle(r => (r - 45 + 360) % 360)}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded cursor-pointer"
              >
                -45°
              </button>
              <button 
                onClick={() => setRotationAngle(r => (r + 45) % 360)}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded cursor-pointer"
              >
                +45°
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Zoom:</span>
              <button 
                onClick={() => setZoomLevel(z => Math.max(0.7, z - 0.15))}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded cursor-pointer"
              >
                -
              </button>
              <button 
                onClick={() => setZoomLevel(z => Math.min(1.4, z + 0.15))}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded cursor-pointer"
              >
                +
              </button>
              <button 
                onClick={() => { setRotationAngle(45); setZoomLevel(1); }}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded cursor-pointer"
                title="Restablecer cámara"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Artifact Deck & Lighting */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2">
              Catálogo de Obras 3D
            </h4>
            <div className="space-y-2">
              {artifacts.map((art, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveArtifact(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    activeArtifact === idx
                      ? 'bg-neutral-900 border-amber-400/50 text-white'
                      : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">{art.name}</p>
                  <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">{art.era}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Artifact Info */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
            <h5 className="font-bold text-white text-sm">{current.name}</h5>
            <p className="text-neutral-300 leading-relaxed">{current.description}</p>
            <div className="pt-2 border-t border-neutral-800 flex justify-between text-[11px] font-mono text-neutral-400">
              <span>Geometría: {current.geometry}</span>
              <span className="text-emerald-400">60 FPS</span>
            </div>
          </div>

          {/* Lighting Mode Selector */}
          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase">
              Iluminación de Galería
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
              {(['day', 'gallery', 'dramatic'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLightingPreset(preset)}
                  className={`py-1 rounded text-center capitalize transition-colors cursor-pointer ${
                    lightingPreset === preset ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {preset === 'day' ? 'Día' : preset === 'gallery' ? 'Galería' : 'Dramático'}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

/**
 * 2. Simulación Interactiva del Juego Educativo Mundial
 */
const WorldQuizSimulator: React.FC = () => {
  const questions = [
    {
      question: "¿Cuál es el músculo principal responsable de la respiración durante el ejercicio aeróbico?",
      options: ["El Diafragma", "El Bíceps Braquial", "El Cuádriceps", "El Trapecio"],
      correct: 0,
      context: "Educación Física y Fisiología Deportiva"
    },
    {
      question: "¿En qué país se celebraron los primeros Juegos Olímpicos de la era moderna en 1896?",
      options: ["Francia (París)", "Grecia (Atenas)", "Reino Unido (Londres)", "Estados Unidos (San Luis)"],
      correct: 1,
      context: "Historia del Deporte Mundial"
    },
    {
      question: "¿Cuál es la frecuencia cardíaca máxima estimada para un deportista de 20 años según la fórmula de Tanaka (208 - 0.7 × edad)?",
      options: ["180 bpm", "194 bpm", "210 bpm", "165 bpm"],
      correct: 1,
      context: "Biomecánica y Métricas de Salud"
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    if (idx === q.correct) {
      setScore(s => s + 100);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
    setCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Top Scoreboard */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-white">Reto Mundial del Conocimiento</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span className="text-neutral-400">Pregunta {currentIdx + 1}/{questions.length}</span>
          <span className="text-amber-400 font-bold">{score} Puntos</span>
        </div>
      </div>

      {!completed ? (
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wide">
              {q.context}
            </span>
            <h3 className="text-lg font-bold text-white mt-1 leading-snug font-['Cabinet_Grotesk']">
              {q.question}
            </h3>
          </div>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isCorrect = idx === q.correct;
              let btnClass = "border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700";

              if (answered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500/80 bg-emerald-500/20 text-emerald-300 font-semibold";
                } else if (isChosen) {
                  btnClass = "border-rose-500/80 bg-rose-500/20 text-rose-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {answered && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>{currentIdx < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Cabinet_Grotesk']">
            ¡Reto Completado!
          </h3>
          <p className="text-neutral-300 text-sm">
            Puntaje final acumulado: <strong className="text-amber-400 font-mono text-base">{score} / {questions.length * 100} puntos</strong>
          </p>
          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

/**
 * 3. Simulación de Calculadora Biomecánica
 */
const BiomechanicsSimulator: React.FC = () => {
  const [angle, setAngle] = useState(90);
  const [athleteWeight, setAthleteWeight] = useState(70);
  const [jumpVelocity, setJumpVelocity] = useState(3.2);

  // Estimación de altura de salto (v^2 / (2*g))
  const jumpHeight = Math.pow(jumpVelocity, 2) / (2 * 9.81);
  // Fuerza articular estimada (N)
  const estimatedForce = (athleteWeight * 9.81) * (1 + (jumpVelocity / 1.5));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sliders Control Deck */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-xs">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Parámetros Físicos del Atleta
          </h4>

          <div>
            <div className="flex justify-between text-neutral-400 font-mono mb-1">
              <span>Ángulo de Flexión de Rodilla</span>
              <span className="text-white font-bold">{angle}°</span>
            </div>
            <input
              type="range"
              min="45"
              max="135"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-neutral-400 font-mono mb-1">
              <span>Masa Corporal del Estudiante</span>
              <span className="text-white font-bold">{athleteWeight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              value={athleteWeight}
              onChange={(e) => setAthleteWeight(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-neutral-400 font-mono mb-1">
              <span>Velocidad de Despegue (m/s)</span>
              <span className="text-white font-bold">{jumpVelocity.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.1"
              value={jumpVelocity}
              onChange={(e) => setJumpVelocity(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Biomechanical Live Output */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase">
              Resultados Cinemáticos Instantáneos
            </span>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-mono block">Altura de Salto Vertical</span>
                <span className="text-xl font-extrabold text-amber-400 font-mono">
                  {(jumpHeight * 100).toFixed(1)} cm
                </span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-mono block">Impacto en Aterrizaje</span>
                <span className="text-xl font-extrabold text-sky-400 font-mono">
                  {estimatedForce.toFixed(0)} N
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-400 leading-relaxed">
            <strong className="text-neutral-200">Recomendación de Rubén Darío:</strong> Un ángulo articular de rodilla de entre 85° y 95° optimiza la energía elástica acumulada en el ciclo de estiramiento-acortamiento (CEA).
          </div>
        </div>

      </div>
    </div>
  );
};

const GenericAppSimulator: React.FC<{ app: PortfolioApp }> = ({ app }) => (
  <div className="p-12 text-center space-y-4">
    <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400 text-amber-400 flex items-center justify-center">
      <Sparkles className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-white">{app.title}</h3>
    <p className="text-neutral-400 text-xs max-w-md mx-auto">{app.longDescription}</p>
  </div>
);
