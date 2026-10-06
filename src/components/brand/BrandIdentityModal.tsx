import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  ShoppingBag, 
  Copy, 
  Check, 
  Eye, 
  Maximize2,
  Upload
} from 'lucide-react';
import { EspatodoLogo } from './EspatodoLogo';
import { useLogo } from '../../context/LogoContext';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogoUploader?: () => void;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({
  isOpen,
  onClose,
  onOpenLogoUploader
}) => {
  if (!isOpen) return null;

  const { isCustom } = useLogo();
  const [activeTab, setActiveTab] = useState<'3d' | 'flat'>('3d');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const brandColors = [
    {
      name: 'Azul Eléctrico & Índigo',
      role: 'Base & Estructura (Apps & Tecnología)',
      hex: '#2563EB',
      gradient: 'from-blue-700 via-blue-600 to-sky-400',
      description: 'Color de la tecnología, confianza, inteligencia y solidez digital. Asienta la marca como plataforma profesional.'
    },
    {
      name: 'Gradiente Violeta / Púrpura',
      role: 'Transición & Creatividad (Módulo Académico LMS)',
      hex: '#7C3AED',
      gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600',
      description: 'Color de la sabiduría, aprendizaje continuo y transformación pedagógica para la I.E. Ramón Múnera Lopera.'
    },
    {
      name: 'Naranja Coral & Oro Caliente',
      role: 'Flecha de Proyección (Ventas & Comercio)',
      hex: '#F97316',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      description: 'Entusiasmo, éxito comercial y fuerza activa que impulsa el crecimiento económico hacia el futuro.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                Manual de Identidad & Significado del Isologo
              </h3>
              <p className="text-[11px] text-neutral-400">
                Es Pa' Todo · Arquitectura Visual de Rubén Darío Rincón Montoya
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Showcase Stage */}
          <div className="relative rounded-3xl bg-radial from-neutral-900 via-neutral-950 to-black border border-neutral-800/80 p-8 sm:p-10 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Toggle 3D vs Flat */}
            <div className="relative z-10 flex items-center gap-1.5 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 text-xs font-mono mb-8">
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === '3d'
                    ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Renderizado 3D Metalizado
              </button>
              <button
                onClick={() => setActiveTab('flat')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'flat'
                    ? 'bg-neutral-800 text-white font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Vector Plano (Minimalista)
              </button>
            </div>

            {/* Rendered Logo */}
            <div className="relative z-10 py-4 transform hover:scale-105 transition-transform duration-500">
              <EspatodoLogo
                variant="full"
                size="hero"
                is3D={activeTab === '3d'}
                showSubtitle={true}
              />
            </div>

            <p className="relative z-10 mt-6 text-xs text-neutral-400 max-w-lg leading-relaxed font-sans">
              Isologo oficial con contraste de alto impacto que simboliza el eslabón infinito de la plataforma y su proyección hacia el éxito.
            </p>

            {onOpenLogoUploader && (
              <div className="relative z-10 mt-5 pt-4 border-t border-neutral-800/80 w-full max-w-md flex flex-col items-center gap-2">
                <button
                  onClick={onOpenLogoUploader}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Upload className="w-4 h-4 stroke-[2.5]" />
                  <span>{isCustom ? 'Reemplazar Archivo Metalizado.png' : 'Cargar Archivo Metalizado.png Original'}</span>
                </button>
                <span className="text-[11px] font-mono text-neutral-400">
                  {isCustom ? '✓ Archivo original cargado y activo' : 'Usa tu archivo PNG original directamente sin modificaciones'}
                </span>
              </div>
            )}
          </div>

          {/* Tri-Color Palette Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
              Trilogía Cromática y Simbolismo de Módulos
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {brandColors.map((color, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`h-12 w-full rounded-xl bg-gradient-to-r ${color.gradient} shadow-inner flex items-center justify-between px-3 text-white font-mono text-xs font-bold`}>
                      <span>{color.hex}</span>
                      <button
                        onClick={() => copyColor(color.hex)}
                        className="p-1 rounded bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
                        title="Copiar código HEX"
                      >
                        {copiedHex === color.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div>
                      <h5 className="font-bold text-white text-sm">{color.name}</h5>
                      <span className="text-[11px] font-mono text-amber-400 block mt-0.5">
                        {color.role}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {color.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The 3 Core Pillars of the Isologo */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
              Anatomía y Arquitectura del Símbolo
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                  1. Eslabón e Infinito ('e' y 'E')
                </h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Evoca sutilmente las iniciales de la marca. Su diseño continuo combina la forma de un eslabón de cadena con el símbolo del infinito, representando un todo cohesionado donde múltiples actividades (Apps, Academia y Tienda) están interconectadas sin límites: <strong>"Es Pa' Todo"</strong>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                  2. La Flecha de Proyección
                </h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Apunta hacia arriba y a la derecha, la dirección universal del éxito y el crecimiento. Nace del centro del eslabón, demostrando que <strong>Espatodo</strong> es el punto de partida dinámico que impulsa a estudiantes, emprendedores y usuarios hacia el futuro.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                  3. El Acabado Metálico 3D
                </h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  El efecto metálico cepillado y tridimensional proyecta alta tecnología, durabilidad y solidez institucional. Comunica una infraestructura robusta, confiable y construida para perdurar en el tiempo.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px]">
            Desarrollado por www.espatodo.com · Rubén Darío Rincón Montoya
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors"
          >
            Cerrar Manual
          </button>
        </div>

      </div>
    </div>
  );
};
