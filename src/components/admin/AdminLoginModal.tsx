import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  X, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  HelpCircle,
  EyeClosed,
  Settings,
  Sliders,
  LogOut,
  Keyboard
} from 'lucide-react';
import { useAuth, DEFAULT_ADMIN_PASSWORD } from '../../context/AuthContext';

export const AdminLoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    isAdminAuthenticated, 
    loginAsAdmin, 
    logoutAdmin,
    changeAdminPassword,
    hideAdminTrigger,
    setHideAdminTrigger
  } = useAuth();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Change password tab state
  const [activeTab, setActiveTab] = useState<'login' | 'settings'>('login');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = loginAsAdmin(password);
    if (success) {
      setPassword('');
      closeLoginModal();
    } else {
      setError('Clave de administrador incorrecta. Verifique e intente nuevamente.');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (newPass !== confirmPass) {
      setPasswordChangeError('La nueva contraseña y la confirmación no coinciden.');
      return;
    }
    if (newPass.length < 4) {
      setPasswordChangeError('La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }

    const success = changeAdminPassword(currentPass, newPass);
    if (success) {
      setPasswordChangeSuccess('¡Contraseña cambiada exitosamente!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPasswordChangeError('La contraseña actual es incorrecta.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                {isAdminAuthenticated ? 'Panel de Seguridad Admin' : 'Acceso Restringido · Administrador'}
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Rubén Darío Rincón Montoya
              </p>
            </div>
          </div>

          <button
            onClick={closeLoginModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (if authenticated) */}
        {isAdminAuthenticated && (
          <div className="flex border-b border-neutral-800 bg-neutral-900/40 text-xs font-mono">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-center transition-colors ${
                activeTab === 'login'
                  ? 'text-orange-400 border-b-2 border-orange-500 font-bold bg-neutral-900/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Estado de Sesión
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2.5 text-center transition-colors ${
                activeTab === 'settings'
                  ? 'text-orange-400 border-b-2 border-orange-500 font-bold bg-neutral-900/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Cambiar Clave & Opciones
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* STATE 1: ALREADY AUTHENTICATED */}
          {isAdminAuthenticated && activeTab === 'login' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-orange-400">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Sesión de Administrador Activa</span>
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans">
                  Tienes acceso total para:
                </p>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 font-sans pl-1">
                  <li><strong>Docente Admin:</strong> Cargar guías y calificar evidencias.</li>
                  <li><strong>Admin Dev &lt;&gt;:</strong> Inyectar código y publicar aplicaciones.</li>
                  <li><strong>Admin Tienda:</strong> Subir productos (celulares, calzado, mugs, servicios).</li>
                  <li><strong>CMS:</strong> Crear, editar o eliminar pestañas del sistema.</li>
                </ul>
              </div>

              {/* Secret access info */}
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Lock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Acceso 100% Oculto al Público</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Los visitantes y estudiantes no ven ningún botón de administrador. Para abrir este panel en cualquier momento, basta con dar <strong>3 clics seguidos en el isologo inferior</strong> (al lado de <em>Desarrollado por www.espatodo.com</em>) o presionar <kbd className="px-1 py-0.5 bg-neutral-950 rounded border border-neutral-800 text-neutral-300">Ctrl + Shift + A</kbd>.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                  <span>Cambiar Clave</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logoutAdmin();
                    closeLoginModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión Admin</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: CHANGE PASSWORD & SETTINGS */}
          {isAdminAuthenticated && activeTab === 'settings' && (
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div className="text-xs text-neutral-400 font-mono">
                Cambia la clave maestra de acceso para que solo tú la conozcas:
              </div>

              {passwordChangeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{passwordChangeSuccess}</span>
                </div>
              )}

              {passwordChangeError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordChangeError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-300">Contraseña Actual:</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Introduce contraseña actual"
                  required
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-300">Nueva Contraseña:</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  required
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-300">Confirmar Nueva Contraseña:</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  required
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Guardar Nueva Clave
              </button>
            </form>
          )}

          {/* STATE 3: LOGIN FORM (UNAUTHENTICATED) */}
          {!isAdminAuthenticated && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Área de Gestión Privada</span>
                </p>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Para habilitar la creación de contenido, carga de productos, subida de código y gestión de pestañas, introduce la clave maestra de Rubén Darío.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="text-neutral-300">Clave de Administrador:</label>
                  <span className="text-[10px] text-orange-400/80">Solo para Rubén Darío</span>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introduce tu clave maestra..."
                    autoFocus
                    required
                    className="w-full pl-3 pr-10 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-orange-500 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                    title={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Hint for First Setup */}
              <div className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/20 text-[11px] font-mono text-neutral-400 flex items-start gap-2">
                <KeyRound className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-300 font-semibold">Clave maestra inicial: </span>
                  <code className="text-orange-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 select-all">
                    {DEFAULT_ADMIN_PASSWORD}
                  </code>
                  <span className="block text-[10px] text-neutral-400 mt-0.5 font-sans">
                    (Una vez dentro, puedes cambiarla en la pestaña "Cambiar Clave" por la que desees).
                  </span>
                </div>
              </div>

              {/* Secret access tips */}
              <div className="text-[10px] text-neutral-400 font-mono flex flex-col gap-1.5 pt-1 border-t border-neutral-900">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Keyboard className="w-3 h-3 text-neutral-400" />
                    Atajo: <kbd className="bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-neutral-300">Ctrl + Shift + A</kbd>
                  </span>
                  <span className="text-neutral-400">URL: <code className="text-orange-400 font-mono">?admin=login</code></span>
                </div>
                <p className="text-[10px] text-orange-400/90 font-sans">
                  ⭐ Activación profesional: 3 clics continuos en el isologo inferior junto a "Desarrollado por www.espatodo.com".
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Desbloquear Modo Administrador</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
