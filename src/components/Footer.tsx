import React from 'react';
import { ExternalLink, ShieldCheck, Sparkles, GraduationCap, Layers, Lock } from 'lucide-react';
import { EspatodoLogo } from './brand/EspatodoLogo';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  currentTabTitle?: string;
  onNavigateTab?: (slug: string) => void;
  onOpenBrandModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentTabTitle, 
  onNavigateTab,
  onOpenBrandModal 
}) => {
  const { isAdminAuthenticated, openLoginModal } = useAuth();
  const isologoClickRef = React.useRef<{ count: number; timer: NodeJS.Timeout | null }>({ count: 0, timer: null });
  const [clickEffect, setClickEffect] = React.useState<boolean>(false);
  
  // Secret activation: 3 continuous clicks on footer isologo to open admin panel
  const handleFooterIsologoTripleClick = () => {
    isologoClickRef.current.count += 1;
    if (isologoClickRef.current.timer) clearTimeout(isologoClickRef.current.timer);
    
    // Tactile micro-animation
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 250);

    if (isologoClickRef.current.count >= 3) {
      openLoginModal();
      isologoClickRef.current.count = 0;
    } else {
      isologoClickRef.current.timer = setTimeout(() => {
        isologoClickRef.current.count = 0;
      }, 1400); // 1.4s threshold for 3 continuous clicks
    }
  };
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 text-neutral-400 mt-auto">
      {/* Upper Footer: Structured Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Direction */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <EspatodoLogo variant="horizontal" size="md" is3D={true} />
              <span className="text-xs px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 font-mono">
                Isologo Oficial 3D
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Plataforma web modular integral dirigida por <strong className="text-neutral-200 font-medium">Rubén Darío Rincón Montoya</strong>. 
              Conectando innovación tecnológica, gestión académica para la <strong className="text-neutral-200 font-medium">I.E. Ramón Múnera Lopera</strong> y soluciones profesionales de alto impacto.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                Medellín, Colombia
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Arquitectura Segura
              </span>
              <span>·</span>
              {onOpenBrandModal && (
                <button
                  onClick={onOpenBrandModal}
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-mono transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  Ver Significado del Isologo
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Motores de la Plataforma */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
              Motores del Sistema
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('academico')}
                  className="hover:text-purple-400 transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  LMS Académico (Ramón Múnera)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('portafolio')}
                  className="hover:text-blue-400 transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Laboratorio Portafolio 3D & Tech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('servicios')}
                  className="hover:text-orange-400 transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Tienda & Consultoría SST
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacto & Dirección */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
              Contacto y Dirección
            </h4>
            <div className="text-xs space-y-1.5 text-neutral-400">
              <p className="font-medium text-neutral-300">Rubén Darío Rincón Montoya</p>
              <p className="text-neutral-500">Líder de Proyecto & Docente</p>
              <a 
                href="https://wa.me/573000000000?text=Hola%20Rub%C3%A9n%20Dar%C3%ADo,%20me%20comunico%20desde%20la%20plataforma%20Es%20Pa%20Todo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors pt-1 font-mono text-[11px]"
              >
                Atención Directa WhatsApp
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Signature Bar: "Desarrollado por www.espatodo.com" */}
      <div className="border-t border-neutral-900 bg-black/70 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Explicit Mandatory Author/Brand Stamp with Isologo (3 continuous clicks activates Admin) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFooterIsologoTripleClick}
              className={`p-1.5 -m-1.5 rounded-xl transition-all select-none active:scale-95 focus:outline-none cursor-pointer ${
                clickEffect 
                  ? 'ring-2 ring-orange-500/50 bg-orange-500/10 scale-105' 
                  : 'hover:opacity-95'
              }`}
              title="espatodo.com"
              aria-label="Isologo oficial espatodo.com (3 toques para activar administrador)"
            >
              <EspatodoLogo variant="icon" size="sm" is3D={true} />
            </button>
            <p className="text-neutral-300 font-medium select-none">
              Desarrollado por{' '}
              <a 
                href="https://www.espatodo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 underline underline-offset-4 decoration-orange-500/50 hover:decoration-orange-400 font-semibold tracking-wide transition-all"
              >
                <span className="text-[#2563EB]">www.espatodo</span>
                <span className="text-[#F97316]">.com</span>
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-[11px] font-mono">
            <span>© {new Date().getFullYear()} Es Pa' Todo</span>
            <span>·</span>
            <span>Rubén Darío Rincón Montoya</span>
            {isAdminAuthenticated && (
              <>
                <span>·</span>
                <span className="text-orange-400 font-semibold flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-lg">
                  <ShieldCheck className="w-3 h-3 text-orange-400" />
                  <span>Modo Administrador Activo</span>
                </span>
              </>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
};
