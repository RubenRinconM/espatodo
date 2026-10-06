import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  hideAdminTrigger: boolean;
  loginAsAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => boolean;
  setHideAdminTrigger: (hide: boolean) => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdminAuthenticated: false,
  hideAdminTrigger: false,
  loginAsAdmin: () => false,
  logoutAdmin: () => {},
  changeAdminPassword: () => false,
  setHideAdminTrigger: () => {},
  isLoginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

const AUTH_STORAGE_KEY = 'espatodo_admin_session';
const PASS_STORAGE_KEY = 'espatodo_admin_master_pwd';
const HIDE_TRIGGER_KEY = 'espatodo_hide_admin_trigger';

// Default password for Rubén Darío (can be changed anytime in the panel)
export const DEFAULT_ADMIN_PASSWORD = 'adminespatodo';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [hideAdminTrigger, setHideAdminTriggerState] = useState<boolean>(() => {
    const val = localStorage.getItem(HIDE_TRIGGER_KEY);
    return val === null ? true : val === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Keyboard shortcut listener: Ctrl + Shift + A or Cmd + Shift + A to open admin login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsLoginModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check URL query parameter: ?admin=login on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'login' || params.get('admin') === 'true') {
      setIsLoginModalOpen(true);
    }
  }, []);

  const getStoredPassword = (): string => {
    return localStorage.getItem(PASS_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
  };

  const loginAsAdmin = (password: string): boolean => {
    const validPassword = getStoredPassword();
    if (password === validPassword) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAdminAuthenticated(true);
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAdminAuthenticated(false);
  };

  const changeAdminPassword = (currentPass: string, newPass: string): boolean => {
    const validPassword = getStoredPassword();
    if (currentPass === validPassword && newPass.trim().length >= 4) {
      localStorage.setItem(PASS_STORAGE_KEY, newPass.trim());
      return true;
    }
    return false;
  };

  const setHideAdminTrigger = (hide: boolean) => {
    localStorage.setItem(HIDE_TRIGGER_KEY, hide ? 'true' : 'false');
    setHideAdminTriggerState(hide);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated,
        hideAdminTrigger,
        loginAsAdmin,
        logoutAdmin,
        changeAdminPassword,
        setHideAdminTrigger,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
