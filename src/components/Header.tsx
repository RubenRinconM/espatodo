import React from 'react';
import { Menu, X, Plus, ShieldCheck, UserCheck, Sparkles, GraduationCap, Laptop, ShoppingBag, Lock, LogOut } from 'lucide-react';
import { TabModule, UserRole, TemplateType } from '../types';
import { EspatodoLogo } from './brand/EspatodoLogo';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  tabs: TabModule[];
  activeTabSlug: string;
  activeTabTemplate?: TemplateType;
  onSelectTab: (slug: string) => void;
  role: UserRole;
  onToggleRole: () => void;
  onOpenNewTabModal: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenBrandModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tabs,
  activeTabSlug,
  activeTabTemplate = 'academic',
  onSelectTab,
  role,
  onToggleRole,
  onOpenNewTabModal,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenBrandModal
}) => {
  const { isAdminAuthenticated, hideAdminTrigger, openLoginModal, logoutAdmin } = useAuth();

  // Secret triple-click on brand logo to trigger Admin Login even when fully hidden
  const logoClickRef = React.useRef<{ count: number; timer: NodeJS.Timeout | null }>({ count: 0, timer: null });
  const handleLogoClick = () => {
    logoClickRef.current.count += 1;
    if (logoClickRef.current.timer) clearTimeout(logoClickRef.current.timer);
    if (logoClickRef.current.count >= 3) {
      openLoginModal();
      logoClickRef.current.count = 0;
    } else {
      logoClickRef.current.timer = setTimeout(() => {
        logoClickRef.current.count = 0;
      }, 1000);
    }
    onSelectTab(tabs[0]?.slug || 'academico');
  };

  // Helper to get contextual role labels per active module
  const getContextRole = () => {
    switch (activeTabTemplate) {
      case 'academic':
        return {
          publicName: 'Estudiante',
          publicIcon: <GraduationCap className="w-3.5 h-3.5 text-purple-400" />,
          adminName: 'Docente Admin',
          adminIcon: <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />,
          adminActiveColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        };
      case 'portfolio':
        return {
          publicName: 'Visitante Tech',
          publicIcon: <Laptop className="w-3.5 h-3.5 text-blue-400" />,
          adminName: 'Admin Dev <>',
          adminIcon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
          adminActiveColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
        };
      case 'services':
      default:
        return {
          publicName: 'Cliente',
          publicIcon: <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />,
          adminName: 'Admin Tienda',
          adminIcon: <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />,
          adminActiveColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
        };
    }
  };

  const currentContext = getContextRole();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* ZONE 1: Brand Wordmark & Official Isologo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={handleLogoClick}
              className="text-left group flex items-center cursor-pointer hover:opacity-95 transition-opacity"
              title="espatodo.com · Plataforma Modular Rubén Darío Rincón Montoya (3 toques para acceso de gestión)"
            >
              <EspatodoLogo variant="horizontal" size="md" is3D={true} showSubtitle={true} />
            </button>

            {/* Isologo Brand Story Trigger Badge */}
            {onOpenBrandModal && (
              <button
                onClick={onOpenBrandModal}
                className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-[10px] font-mono transition-colors cursor-pointer"
                title="Ver significado del Isologo y paleta oficial"
              >
                <Sparkles className="w-2.5 h-2.5 text-orange-400" />
                <span>Isologo 3D</span>
              </button>
            )}
          </div>

          {/* ZONE 2: Clean Text Navigation Links (Single-Line, No Pills) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {tabs.map((tab) => {
              const isActive = tab.slug === activeTabSlug;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.slug)}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap rounded-md ${
                    isActive
                      ? 'text-white bg-neutral-900 border border-neutral-800 shadow-xs'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                  }`}
                >
                  {tab.title}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: 1-2 Primary Actions (Secured Admin Controls) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin "+ Nueva Pestaña" CTA ONLY if authenticated as admin AND role is admin */}
            {isAdminAuthenticated && role === 'admin' && (
              <button
                onClick={onOpenNewTabModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Nueva Pestaña</span>
              </button>
            )}

            {/* If Admin is Authenticated: Show Full Toggle + Logout */}
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center p-1 bg-neutral-900 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => role !== 'student' && onToggleRole()}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      role === 'student'
                        ? 'bg-neutral-800 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                    title={`Vista Pública: ${currentContext.publicName}`}
                  >
                    {currentContext.publicIcon}
                    <span className="hidden md:inline">{currentContext.publicName}</span>
                  </button>
                  
                  <button
                    onClick={() => role !== 'admin' && onToggleRole()}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      role === 'admin'
                        ? `${currentContext.adminActiveColor} shadow-xs font-semibold`
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                    title={`Modo Administrador: ${currentContext.adminName}`}
                  >
                    {currentContext.adminIcon}
                    <span className="hidden md:inline">{currentContext.adminName}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    logoutAdmin();
                    if (role === 'admin') onToggleRole();
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                  title="Cerrar Sesión de Administrador"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

          </div>

        </div>
      </div>
    </header>
  );
};
