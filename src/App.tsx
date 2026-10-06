/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plus, ShieldCheck, UserCheck, Sparkles, Layers, ArrowRight, Upload } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AcademicTemplate } from './components/templates/AcademicTemplate';
import { PortfolioTemplate } from './components/templates/PortfolioTemplate';
import { ServicesTemplate } from './components/templates/ServicesTemplate';
import { NewTabModal } from './components/admin/NewTabModal';
import { BrandIdentityModal } from './components/brand/BrandIdentityModal';
import { LogoUploaderModal } from './components/brand/LogoUploaderModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { useAuth } from './context/AuthContext';

import { 
  TabModule, 
  UserRole, 
  AcademicGuide, 
  GroupSubmission, 
  PortfolioApp, 
  ServiceItem 
} from './types';

import {
  getFirebaseTabs,
  createFirebaseTab,
  deleteFirebaseTab,
  getFirebaseGuides,
  saveFirebaseGuide,
  deleteFirebaseGuide,
  getFirebaseSubmissions,
  submitFirebaseGroupHomework,
  gradeFirebaseSubmission,
  getFirebasePortfolioApps,
  saveFirebasePortfolioApp,
  deleteFirebasePortfolioApp,
  getFirebaseServices,
  saveFirebaseService,
  deleteFirebaseStoreItem
} from './services/firebase';
import { getModuleContext } from './utils/moduleContext';

export default function App() {
  const { isAdminAuthenticated, openLoginModal } = useAuth();

  // Role State: 'student' (Vista Pública) vs 'admin' (Vista Administrador - Rubén Darío)
  const [role, setRole] = useState<UserRole>('student');

  // Synchronize role with admin authentication
  useEffect(() => {
    if (isAdminAuthenticated) {
      setRole('admin');
    } else {
      setRole('student');
    }
  }, [isAdminAuthenticated]);

  // The effective role passed to UI components is strictly 'student' unless authenticated
  const effectiveRole: UserRole = isAdminAuthenticated ? role : 'student';

  // Navigation State
  const [tabs, setTabs] = useState<TabModule[]>([]);
  const [activeTabSlug, setActiveTabSlug] = useState<string>('academico');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Admin CMS Modal State
  const [isNewTabModalOpen, setIsNewTabModalOpen] = useState<boolean>(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState<boolean>(false);
  const [isLogoUploaderOpen, setIsLogoUploaderOpen] = useState<boolean>(false);

  // Data Collections State (Populated via Firebase service layer)
  const [guides, setGuides] = useState<AcademicGuide[]>([]);
  const [submissions, setSubmissions] = useState<GroupSubmission[]>([]);
  const [portfolioApps, setPortfolioApps] = useState<PortfolioApp[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial Data Load
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [loadedTabs, loadedGuides, loadedSubmissions, loadedApps, loadedServices] = await Promise.all([
          getFirebaseTabs(),
          getFirebaseGuides(),
          getFirebaseSubmissions(),
          getFirebasePortfolioApps(),
          getFirebaseServices()
        ]);

        setTabs(loadedTabs);
        setGuides(loadedGuides);
        setSubmissions(loadedSubmissions);
        setPortfolioApps(loadedApps);
        setServices(loadedServices);

        if (loadedTabs.length > 0 && !loadedTabs.some(t => t.slug === activeTabSlug)) {
          setActiveTabSlug(loadedTabs[0].slug);
        }
      } catch (err) {
        console.error('Error cargando datos de Firebase:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Handlers
  const handleToggleRole = () => {
    if (!isAdminAuthenticated) {
      openLoginModal();
      return;
    }
    setRole(r => (r === 'student' ? 'admin' : 'student'));
  };

  const handleCreateNewTab = async (newTabData: Omit<TabModule, 'id'>) => {
    const created = await createFirebaseTab(newTabData);
    setTabs(prev => [...prev, created]);
    setActiveTabSlug(created.slug);
  };

  const handleDeleteTab = async (tabId: string) => {
    await deleteFirebaseTab(tabId);
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== tabId);
      if (activeTabSlug === prev.find(t => t.id === tabId)?.slug && filtered.length > 0) {
        setActiveTabSlug(filtered[0].slug);
      }
      return filtered;
    });
  };

  const handleAddGuide = async (newGuide: AcademicGuide) => {
    const saved = await saveFirebaseGuide(newGuide);
    setGuides(prev => [saved, ...prev.filter(g => g.id !== saved.id)]);
  };

  const handleDeleteGuide = async (guideId: string) => {
    await deleteFirebaseGuide(guideId);
    setGuides(prev => prev.filter(g => g.id !== guideId));
  };

  const handleSubmitHomework = async (submissionData: Omit<GroupSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const created = await submitFirebaseGroupHomework(submissionData);
    setSubmissions(prev => [created, ...prev]);
  };

  const handleGradeSubmission = async (
    id: string, 
    data: { status: 'calificado' | 'en_revision' | 'entregado'; gradeScore?: number; feedback?: string }
  ) => {
    await gradeFirebaseSubmission(id, data);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const handleAddPortfolioApp = async (newApp: PortfolioApp) => {
    await saveFirebasePortfolioApp(newApp);
    setPortfolioApps(prev => [newApp, ...prev.filter(a => a.id !== newApp.id)]);
  };

  const handleDeletePortfolioApp = async (appId: string) => {
    await deleteFirebasePortfolioApp(appId);
    setPortfolioApps(prev => prev.filter(a => a.id !== appId));
  };

  const handleAddService = async (newService: ServiceItem) => {
    await saveFirebaseService(newService);
    setServices(prev => [newService, ...prev.filter(s => s.id !== newService.id)]);
  };

  const handleDeleteService = async (serviceId: string) => {
    await deleteFirebaseStoreItem(serviceId);
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  // Find currently active tab
  const activeTab = tabs.find(t => t.slug === activeTabSlug) || tabs[0];
  const currentContext = getModuleContext(activeTab?.template);


  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Top Bar Navigation (Zone 1, Zone 2, Zone 3 Contract) */}
      <Header
        tabs={tabs}
        activeTabSlug={activeTabSlug}
        activeTabTemplate={activeTab?.template}
        onSelectTab={setActiveTabSlug}
        role={effectiveRole}
        onToggleRole={handleToggleRole}
        onOpenNewTabModal={() => setIsNewTabModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Main Structural Body: Sidebar + Dynamic Main Content */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        
        {/* Collapsible Sidebar */}
        <Sidebar
          tabs={tabs}
          activeTabSlug={activeTabSlug}
          activeTabTemplate={activeTab?.template}
          onSelectTab={setActiveTabSlug}
          role={effectiveRole}
          onToggleRole={handleToggleRole}
          onOpenNewTabModal={() => setIsNewTabModalOpen(true)}
          onDeleteTab={handleDeleteTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
          onOpenBrandModal={() => setIsBrandModalOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          
          {/* Breadcrumb / Top Context Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[#2563EB] font-bold">espatodo</span>
              <span className="text-[#F97316] font-bold">.com</span>
              <span>/</span>
              <span className="text-white font-semibold">{activeTab?.title || 'Módulo'}</span>
              <span className="text-neutral-500 font-normal hidden sm:inline">· {currentContext.category}</span>
              {activeTab?.isCustom && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  Pestaña Personalizada CMS
                </span>
              )}
            </div>

            {/* Quick Actions & Role Indicator (100% Module Independent) */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsLogoUploaderOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-orange-300 hover:text-orange-200 text-xs font-mono transition-all hover:scale-105 cursor-pointer shadow-xs"
                title="Cargar y usar directamente tu archivo Metalizado.png original"
              >
                <Upload className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-semibold">Cargar Metalizado.png Original</span>
              </button>

              <button
                onClick={() => setIsBrandModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors cursor-pointer"
                title="Conoce el significado del Isologo y la paleta de 3 contrastes"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Isologo & Paleta 3D</span>
              </button>

              {effectiveRole === 'admin' ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>{currentContext.adminRole.badgeText}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentContext.publicRole.badgeText}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Template Engine Router */}
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-neutral-400 font-mono">Iniciando módulos de Es Pa' Todo...</p>
            </div>
          ) : (
            <>
              {activeTab?.template === 'academic' && (
                <AcademicTemplate
                  role={effectiveRole}
                  guides={guides}
                  submissions={submissions}
                  onSubmitHomework={handleSubmitHomework}
                  onGradeSubmission={handleGradeSubmission}
                  onAddGuide={handleAddGuide}
                  onDeleteGuide={handleDeleteGuide}
                />
              )}

              {activeTab?.template === 'portfolio' && (
                <PortfolioTemplate
                  role={effectiveRole}
                  apps={portfolioApps}
                  onAddApp={handleAddPortfolioApp}
                  onDeleteApp={handleDeletePortfolioApp}
                />
              )}

              {activeTab?.template === 'services' && (
                <ServicesTemplate
                  role={effectiveRole}
                  services={services}
                  onAddService={handleAddService}
                  onDeleteService={handleDeleteService}
                />
              )}
            </>
          )}


        </main>
      </div>

      {/* Floating Action Button (FAB) for Admin: "+ Nueva Pestaña" ONLY if effectiveRole is admin */}
      {effectiveRole === 'admin' && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setIsNewTabModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title="Crear Nueva Pestaña / Módulo CMS"
          >
            <Plus className="w-4 h-4 stroke-[3] transition-transform group-hover:rotate-90" />
            <span className="hidden sm:inline">Nueva Pestaña</span>
          </button>
        </div>
      )}

      {/* Admin New Tab Modal */}
      <NewTabModal
        isOpen={isNewTabModalOpen}
        onClose={() => setIsNewTabModalOpen(false)}
        onCreateTab={handleCreateNewTab}
      />

      {/* Mandatory Signature Footer: "Desarrollado por www.espatodo.com" */}
      <Footer 
        currentTabTitle={activeTab?.title}
        onNavigateTab={setActiveTabSlug}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Brand Identity & Isologo 3D Manual Modal */}
      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        onOpenLogoUploader={() => setIsLogoUploaderOpen(true)}
      />

      {/* Direct Metalizado.png Uploader Modal */}
      <LogoUploaderModal
        isOpen={isLogoUploaderOpen}
        onClose={() => setIsLogoUploaderOpen(false)}
      />

      {/* Secure Admin Gate Password Modal */}
      <AdminLoginModal />

    </div>
  );
}
