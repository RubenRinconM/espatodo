import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LogoProvider } from './context/LogoContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <LogoProvider>
      <App />
    </LogoProvider>
  </AuthProvider>
);
