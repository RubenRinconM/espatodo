import React, { createContext, useContext, useState, useEffect } from 'react';

interface LogoContextType {
  logoUrl: string | null;
  isCustom: boolean;
  uploadLogo: (file: File) => Promise<boolean>;
  setLogoFromUrl: (url: string) => void;
  resetLogo: () => void;
}

const LogoContext = createContext<LogoContextType>({
  logoUrl: null,
  isCustom: false,
  uploadLogo: async () => false,
  setLogoFromUrl: () => {},
  resetLogo: () => {},
});

const STORAGE_KEY = 'espatodo_custom_logo_png';

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Verify if /brand/Metalizado.png exists on server if no localStorage item
  useEffect(() => {
    if (!logoUrl) {
      const img = new Image();
      img.onload = () => {
        setLogoUrl('/brand/Metalizado.png');
        setIsCustom(true);
      };
      img.onerror = () => {
        // Not uploaded yet
      };
      img.src = '/brand/Metalizado.png?t=' + Date.now();
    }
  }, [logoUrl]);

  const uploadLogo = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          // 1. Save in localStorage for immediate, persistent preview
          localStorage.setItem(STORAGE_KEY, dataUrl);
          setLogoUrl(dataUrl);
          setIsCustom(true);

          // 2. Send to server to write to /public/brand/Metalizado.png
          try {
            await fetch('/api/upload-logo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: dataUrl })
            });
          } catch (err) {
            console.warn('Could not persist to server filesystem, but saved in localStorage:', err);
          }

          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const setLogoFromUrl = (url: string) => {
    localStorage.setItem(STORAGE_KEY, url);
    setLogoUrl(url);
    setIsCustom(true);
  };

  const resetLogo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLogoUrl(null);
    setIsCustom(false);
  };

  return (
    <LogoContext.Provider value={{ logoUrl, isCustom, uploadLogo, setLogoFromUrl, resetLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
