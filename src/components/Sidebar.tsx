import React from 'react';
import { 
  GraduationCap, 
  Laptop, 
  Briefcase, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  FolderPlus, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Layers,
  ShoppingBag,
  School,
  Lock,
  LogOut
} from 'lucide-react';
import { TabModule, UserRole, TemplateType } from '../types';
import { EspatodoLogo } from './brand/EspatodoLogo';
import { getModuleContext } from '../utils/moduleContext';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  tabs: TabModule[];
  activeTabSlug: string;
  activeTabTemplate?: TemplateType;
  onSelectTab: (slug: string) => void;
  role: UserRole;
  onToggleRole: () => void;
  onOpenNewTabModal: () => void;
  onDeleteTab: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onOpenBrandModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tabs,
  activeTabSlug,
  activeTabTemplate = 'academic',
  onSelectTab,
  role,
  onToggleRole,
  onOpenNewTabModal,
  onDeleteTab,
  isCollapsed,
  onToggleCollapse,
  mobileMenuOpen,
  onCloseMobileMenu,
  onOpenBrandModal
}) => {
  const moduleContext = getModuleContext(activeTabTemplate);
  const { isAdminAuthenticated, openLoginModal, logoutAdmin, hideAdminTrigger } = useAuth();

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 shrink-0 text-purple-400" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 shrink-0 text-blue-400" />;
      case 'Briefcase':
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 shrink-0 text-orange-400" />;
      default:
        return <Layers className="w-4 h-4 shrink-0 text-amber-400" />;
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-neutral-950 border-r border-neutral-800 text-neutral-300">
      
      {/* Sidebar Header with Espatodo Isologo */}
      <div className="p-4 border-b border-neutral-800/80 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex flex-col">
            <EspatodoLogo variant="horizontal" size="sm" is3D={true} />
            <p className="text-[10px] text-neutral-400 truncate max-w-[180px] mt-1 pl-1 font-mono" title={moduleContext.institutionOrScope}>
              {moduleContext.institutionOrScope}
            </p>
          </div>
        ) : (
          <div className="mx-auto cursor-pointer" onClick={() => onToggleCollapse()}>
            <EspatodoLogo variant="icon" size="sm" is3D={true} />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
          title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role State Banner - ONLY shown when Rubén Darío is authenticated as Admin */}
      {isAdminAuthenticated && (
        <div className={`p-3 border-b border-neutral-800/60 ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-semibold">
                  Modo Administrador
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onToggleRole}
                    className="text-[10px] text-orange-400 hover:underline font-mono cursor-pointer"
                    title="Alternar entre vista de gestión y vista previa de visitante"
                  >
                    {role === 'admin' ? 'Ver como Público' : 'Ver como Admin'}
                  </button>
                  <button
                    onClick={() => {
                      logoutAdmin();
                      if (role === 'admin') onToggleRole();
                    }}
                    className="text-[10px] text-neutral-400 hover:text-red-400 font-mono cursor-pointer"
                    title="Cerrar Sesión Admin"
                  >
                    Salir
                  </button>
                </div>
              </div>
              <div className={`flex items-center gap-2.5 p-2 rounded-lg text-xs ${
                role === 'admin'
                  ? 'bg-orange-500/10 border border-orange-500/20 text-orange-300' 
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
              }`}>
                {role === 'admin' ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold text-xs leading-none">{moduleContext.adminRole.name}</p>
                      <p className="text-[10px] text-orange-400/80 mt-1 truncate">{moduleContext.adminRole.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold text-xs leading-none">Vista Previa: {moduleContext.publicRole.name}</p>
                      <p className="text-[10px] text-neutral-400 mt-1 truncate">Así lo ven los usuarios</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div 
              onClick={onToggleRole} 
              className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
              title={`Rol: ${role === 'admin' ? moduleContext.adminRole.name : moduleContext.publicRole.name} (Clic para alternar)`}
            >
              {role === 'admin' ? (
                <ShieldCheck className="w-4 h-4 text-orange-400" />
              ) : (
                <UserCheck className="w-4 h-4 text-blue-400" />
              )}
            </div>
          )}
        </div>
      )}


      {/* Tabs Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {!isCollapsed && (
          <div className="px-2 pb-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            <span>Pestañas / Módulos</span>
            <span className="text-neutral-400">{tabs.length}</span>
          </div>
        )}

        {tabs.map((tab) => {
          const isActive = tab.slug === activeTabSlug;
          return (
            <div key={tab.id} className="group relative flex items-center">
              <button
                onClick={() => {
                  onSelectTab(tab.slug);
                  onCloseMobileMenu();
                }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white border border-neutral-800 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                }`}
                title={tab.title}
              >
                <span>
                  {getIcon(tab.iconName)}
                </span>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-xs text-white">
                      {tab.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {tab.template === 'academic' && 'LMS Académico (Violeta)'}
                      {tab.template === 'portfolio' && 'Portafolio Tech (Azul)'}
                      {tab.template === 'services' && 'Tienda & Servicios (Naranja)'}
                    </p>
                  </div>
                )}
              </button>

              {/* Admin Delete Action for Custom Tabs */}
              {role === 'admin' && tab.isCustom && !isCollapsed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`¿Eliminar la pestaña "${tab.title}"?`)) {
                      onDeleteTab(tab.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-500 hover:text-red-400 rounded transition-opacity absolute right-2 cursor-pointer"
                  title="Eliminar pestaña"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}

        {/* Admin Create Tab Shortcut inside sidebar */}
        {role === 'admin' && (
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenNewTabModal();
                onCloseMobileMenu();
              }}
              className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-dashed border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition-colors text-xs font-medium cursor-pointer ${
                isCollapsed ? 'px-0' : ''
              }`}
              title="Crear Nueva Pestaña"
            >
              <FolderPlus className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>+ Nueva Pestaña</span>}
            </button>
          </div>
        )}
      </div>

      {/* Brand Manual Link in Sidebar */}
      {!isCollapsed && onOpenBrandModal && (
        <div className="px-3 pb-2">
          <button
            onClick={() => {
              onOpenBrandModal();
              onCloseMobileMenu();
            }}
            className="w-full p-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Identidad del Isologo
            </span>
            <span className="text-[10px] text-blue-400 font-mono">Ver 3D</span>
          </button>
        </div>
      )}

      {/* Footer Info in Sidebar */}
      <div className="p-3 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
        {!isCollapsed ? (
          <div>
            <div className="flex items-center justify-between text-neutral-300 font-medium">
              <span>Rubén Darío R. M.</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono">
                Líder
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Docente Ed. Física & Desarrollador
            </p>
          </div>
        ) : (
          <div className="text-center font-bold text-orange-400 text-xs">
            R
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:block shrink-0 transition-all duration-200 sticky top-16 h-[calc(100vh-4rem)] z-30 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-neutral-950 z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

