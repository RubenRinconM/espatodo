/**
 * Firebase Services Layer - "Es Pa' Todo" Platform
 * 
 * Este módulo contiene la arquitectura de conexión y las funciones operativas de Firebase (Firestore & Auth).
 * Conectado a la base de datos Firestore aprovisionada en Google Cloud.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfigFile from '../../firebase-applet-config.json';
import { TabModule, GroupSubmission, AcademicGuide, PortfolioApp, StoreItem } from '../types';

export const firebaseConfig = firebaseConfigFile;

// Initialize Firebase App & Firestore
export const app = getApps().length === 0 ? initializeApp(firebaseConfigFile) : getApp();
export const db = getFirestore(app, firebaseConfigFile.firestoreDatabaseId);
export const auth = getAuth(app);

// Connection test as required by Firebase skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase: Dispositivo sin conexión o base de datos en inicialización.");
    }
  }
}
testConnection();

// Structured Firestore error handler conforming to skill specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Info: ', JSON.stringify(errInfo));
}

export const FIRESTORE_COLLECTIONS = {
  TABS: 'platform_tabs',
  ACADEMIC_GUIDES: 'academic_guides',
  SUBMISSIONS: 'ef_group_submissions',
  PORTFOLIO_APPS: 'portfolio_applications',
  STORE_ITEMS: 'store_inventory_and_services',
  SYSTEM_CONFIG: 'system_config'
};

export const INITIAL_TABS: TabModule[] = [
  {
    id: 'tab-academic',
    title: 'Académico LMS (Ramón Múnera)',
    slug: 'academico',
    template: 'academic',
    description: 'Espacio pedagógico de Educación Física de la Institución Educativa Ramón Múnera Lopera.',
    iconName: 'GraduationCap',
    isCustom: false
  },
  {
    id: 'tab-portfolio',
    title: 'Portafolio Tech & Apps',
    slug: 'portafolio',
    template: 'portfolio',
    description: 'Laboratorio de aplicaciones interactivas, motores 3D y carga de código <>.',
    iconName: 'Laptop',
    isCustom: false
  },
  {
    id: 'tab-services',
    title: 'Tienda & Catálogo de Venta',
    slug: 'servicios',
    template: 'services',
    description: 'Catálogo de artículos de venta (celulares, calzado, mugs) y consultorías profesionales.',
    iconName: 'Briefcase',
    isCustom: false
  }
];

export const INITIAL_GUIDES: AcademicGuide[] = [
  {
    id: 'guide-10-ef',
    gradeId: '10',
    subject: 'Educación Física y Deportes',
    title: 'Guía Integral: Condicionamiento Físico y Cualidades Motrices',
    description: 'Plan de trabajo para el desarrollo de la resistencia aeróbica, flexibilidad activa y fuerza funcional orientada a la salud cardiovascular.',
    dueDate: '2026-10-25',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '4 semanas (Periodo 3)',
    requirements: [
      'Circuito de 5 estaciones de calistenia y coordinación.',
      'Grabación de video de evidencia (máximo 3 minutos) por grupo.',
      'Ficha técnica de frecuencia cardíaca antes y después del esfuerzo.',
      'Reflexión sobre hidratación y ergonomía postural.'
    ]
  },
  {
    id: 'guide-11-ef',
    gradeId: '11',
    subject: 'Educación Física y Deportes',
    title: 'Guía Avanzada: Expresión Corporal, Ritmo y Trabajo en Equipo',
    description: 'Diseño de coreografía deportiva grupal con enfoque en sincronización, expresión cinestésica y liderazgo cooperativo.',
    dueDate: '2026-11-10',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '6 semanas (Periodo 4)',
    requirements: [
      'Creación de secuencia rítmica de 32 tiempos con implementos deportivos.',
      'Inclusión de todos los miembros del grupo en roles activos.',
      'Planilla de autoevaluación y coevaluación del grupo de trabajo.'
    ]
  },
  {
    id: 'guide-9-ef',
    gradeId: '9',
    subject: 'Educación Física y Deportes',
    title: 'Guía Básica: Fundamentos Técnicos del Voleibol y Atletismo',
    description: 'Ejecución técnica del pase de dedos, antebrazos y arrancada de velocidad baja en pista.',
    dueDate: '2026-10-18',
    duration: '3 semanas (Periodo 3)',
    requirements: [
      'Registro fotográfico o video de la postura básica defensiva.',
      'Cuestionario resuelto sobre el reglamento oficial FIVB.'
    ]
  }
];

export const INITIAL_SUBMISSIONS: GroupSubmission[] = [
  {
    id: 'sub-01',
    guideId: 'guide-10-ef',
    grade: '10° (Grupo 1)',
    groupNumber: 'Grupo 4 - Los Titanes',
    leaderName: 'Mateo Restrepo Gómez',
    leaderEmail: 'm.restrepo@ieramonmunera.edu.co',
    teamMembers: [
      'Mateo Restrepo Gómez (Líder)',
      'Valentina Henao Quintero',
      'Sebastián Correa Zapata',
      'Camila Andrea Vélez'
    ],
    evidenceUrl: 'https://drive.google.com/drive/folders/ejemplo-evidencias-ramon-munera-10-1',
    notes: 'Entregamos el video completo del circuito en cancha central y las tablas de pulsaciones de los cuatro compañeros.',
    submittedAt: '2026-10-02 14:35',
    status: 'calificado',
    gradeScore: 4.8,
    feedback: 'Excelente coordinación y registro de frecuencia cardíaca. Gran trabajo en equipo.'
  },
  {
    id: 'sub-02',
    guideId: 'guide-10-ef',
    grade: '10° (Grupo 2)',
    groupNumber: 'Grupo 2 - Fuerza y Ritmo',
    leaderName: 'Santiago Londoño Castro',
    leaderEmail: 's.londono@ieramonmunera.edu.co',
    teamMembers: [
      'Santiago Londoño Castro (Líder)',
      'Mariana Ramírez Cano',
      'Juan David Morales'
    ],
    evidenceUrl: 'https://youtu.be/ejemplo-video-acondicionamiento',
    notes: 'Adjunto link de YouTube no listado con la rutina de 5 estaciones. Toda la evidencia fue grabada en la sede escolar.',
    submittedAt: '2026-10-04 09:15',
    status: 'en_revision'
  }
];

export const INITIAL_PORTFOLIO_APPS: PortfolioApp[] = [
  {
    id: 'app-code-embed-demo',
    title: 'Simulador de Ondas & Partículas <>',
    description: 'Aplicación embebida mediante código directo HTML5, Canvas y física oscilatoria.',
    longDescription: 'Demostración de código <> interactivo cargado directamente desde el panel de administración. Permite manipular frecuencia, amplitud y amortiguamiento de ondas en tiempo real.',
    category: 'Código Embebido <>',
    technologies: ['HTML5', 'Canvas API', 'JavaScript ES6', 'CSS3'],
    version: 'v1.2 Live <>',
    author: 'Rubén Darío Rincón Montoya',
    interactiveType: 'code_embed',
    codeSnippet: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #030712; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    canvas { background: #0b0f19; border: 1px solid #1f2937; border-radius: 12px; box-shadow: 0 0 20px rgba(37,99,235,0.2); }
    .controls { margin-top: 15px; display: flex; gap: 15px; align-items: center; font-size: 13px; color: #9ca3af; }
    input[type=range] { accent-color: #3b82f6; cursor: pointer; }
    h4 { margin: 0 0 10px 0; color: #60a5fa; font-size: 16px; font-weight: 700; }
  </style>
</head>
<body>
  <h4>Ondas de Frecuencia Armónica (Código &lt;&gt; en Tiempo Real)</h4>
  <canvas id="waveCanvas" width="600" height="240"></canvas>
  <div class="controls">
    <label>Velocidad: <input id="speed" type="range" min="1" max="10" value="4"></label>
    <label>Amplitud: <input id="amp" type="range" min="10" max="80" value="45"></label>
  </div>
  <script>
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    let step = 0;
    function draw() {
      const speed = Number(document.getElementById('speed').value) * 0.015;
      const amp = Number(document.getElementById('amp').value);
      ctx.fillStyle = 'rgba(11, 15, 25, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#38bdf8';
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + step) * amp * Math.cos(step * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#f97316';
      for (let x = 0; x < canvas.width; x += 6) {
        const y2 = canvas.height / 2 + Math.cos(x * 0.025 + step * 1.2) * (amp * 0.7);
        ctx.arc(x, y2, 2, 0, Math.PI * 2);
      }
      ctx.fillStyle = '#f97316';
      ctx.fill();
      step += speed;
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`,
    demoMetrics: {
      users: 'Código Activo',
      fps: '60 FPS',
      status: 'Ejecutable <>'
    }
  },
  {
    id: 'app-museum-3d',
    title: 'Museo Virtual 3D',
    description: 'Recorrido interactivo tridimensional para galerías artísticas y patrimonio cultural.',
    longDescription: 'Simulación espacial inmersiva con renderizado WebGL en tiempo real. Permite explorar pabellones virtuales, examinar esculturas con iluminación volumétrica e interactuar con fichas didácticas de patrimonio.',
    category: 'Gráficos 3D & Realidad Virtual',
    technologies: ['Three.js', 'WebGL', 'React', 'GLTF Loader', 'Tailwind CSS'],
    version: 'v2.4 Pro',
    author: 'Rubén Darío Rincón Montoya',
    interactiveType: '3d_museum',
    demoMetrics: {
      users: '12.4k visitas',
      fps: '60 FPS fluido',
      status: 'En Producción'
    }
  },
  {
    id: 'app-world-game',
    title: 'Juego Educativo Mundial',
    description: 'Plataforma gamificada de retos de geografía, cultura física y conocimiento global.',
    longDescription: 'Sistema lúdico educativo con retos cronometrados, mapas vectoriales dinámicos, motor de física para lanzamientos y tablas de clasificación escolar en tiempo real.',
    category: 'EdTech & Gamificación',
    technologies: ['Canvas API', 'TypeScript', 'Web Audio API', 'React 19'],
    version: 'v1.8 Stable',
    author: 'Rubén Darío Rincón Montoya',
    interactiveType: 'world_quiz',
    demoMetrics: {
      users: '8.2k partidas',
      fps: 'Motor Canvas',
      status: 'Activo'
    }
  },
  {
    id: 'app-biomechanics-calc',
    title: 'Calculadora de Biomecánica Deportiva',
    description: 'Herramienta de análisis cinemático y gasto calórico para entrenadores de educación física.',
    longDescription: 'Software de modelado biomecánico para estimación de torque articular en sentadillas, trayectorias de salto vertical y cálculo automático de zonas de frecuencia cardíaca de Karvonen.',
    category: 'Ciencias del Deporte & Salud',
    technologies: ['Algoritmos Matemáticos', 'SVG Vector', 'React Hooks', 'Data Export'],
    version: 'v3.1 Beta',
    author: 'Rubén Darío Rincón Montoya',
    interactiveType: 'biomechanics',
    demoMetrics: {
      users: '3.1k atletas',
      fps: 'Calculador Instantáneo',
      status: 'Nuevo'
    }
  }
];

export const INITIAL_STORE_ITEMS: StoreItem[] = [
  // 1. ARTÍCULOS FÍSICOS DE VENTA (Celulares, Zapatos, Mugs, etc.)
  {
    id: 'item-celular-pro',
    title: 'Celular Smartphone Pro 5G (128GB / 8GB RAM)',
    type: 'physical_product',
    category: 'Tecnología & Móviles',
    tagline: 'Pantalla AMOLED 120Hz, cámara triple de 64MP y batería de 5000 mAh.',
    description: 'Equipo desbloqueado para cualquier operador. Alto rendimiento para aplicaciones móviles, gaming, estudio y trabajo remoto.',
    price: 1450000,
    features: [
      'Garantía directa de 12 meses con factura.',
      'Incluye cargador de carga rápida 67W y funda antichoque.',
      'Pantalla Gorilla Glass Victus resistente a rayones.',
      'Envío asegurado a todo el país.'
    ],
    whatsappMessage: 'Hola Rubén Darío, deseo comprar el Celular Smartphone Pro 5G publicado en la tienda espatodo.com.',
    leadTime: 'Entrega en 24 a 48 horas',
    icon: 'Smartphone',
    stock: 8,
    pricingNote: '$1.450.000 COP'
  },
  {
    id: 'item-zapatos-running',
    title: 'Zapatos Deportivos Running Air Pro (Ed. Física & Cross)',
    type: 'physical_product',
    category: 'Calzado & Deporte',
    tagline: 'Suela ergonómica con amortiguación de impacto para pista y asfalto.',
    description: 'Calzado diseñado para entrenamiento de alta exigencia, atletismo y clases de educación física. Malla transpirable que evita la fatiga plantar.',
    price: 189000,
    features: [
      'Tallas disponibles: 37 al 43 (horma colombiana).',
      'Plantilla ortopédica removible con memoria de pisada.',
      'Suela antideslizante con agarre multidireccional.',
      'Colores: Negro con detalles naranja coral y azul índigo.'
    ],
    whatsappMessage: 'Hola Rubén Darío, deseo consultar tallas y comprar los Zapatos Deportivos Running de la tienda espatodo.com.',
    leadTime: 'Disponibilidad inmediata',
    icon: 'Footprints',
    stock: 24,
    pricingNote: '$189.000 COP'
  },
  {
    id: 'item-mug-personalizado',
    title: 'Mug Personalizado de Cerámica (Espatodo & Colección)',
    type: 'physical_product',
    category: 'Mugs & Merchandising',
    tagline: 'Mug de 11 oz con estampado brillante de alta duración resistente a microondas.',
    description: 'Taza de cerámica premium con el Isologo metalizado de Espatodo o diseño personalizado para tu empresa, colegio o evento deportivo.',
    price: 28000,
    features: [
      'Cerámica blanca AAA de máxima pureza.',
      'Impresión en sublimación HD a todo color.',
      'Apto para lavavajillas y microondas sin decoloración.',
      'Descuentos especiales por docenas o compras institucionales.'
    ],
    whatsappMessage: 'Hola Rubén Darío, deseo ordenar Mugs Personalizados desde la tienda espatodo.com.',
    leadTime: 'Elaboración en 24 horas',
    icon: 'Coffee',
    stock: 50,
    pricingNote: '$28.000 COP'
  },

  // 2. SERVICIOS Y CONSULTORÍAS PROFESIONALES
  {
    id: 'serv-sst',
    title: 'Consultoría en Seguridad y Salud en el Trabajo (SST)',
    type: 'professional_service',
    category: 'Gestión y Cumplimiento Normativo',
    tagline: 'Protección para tu equipo, diseño del SG-SST y auditorías preventivas bajo el Decreto 1072.',
    description: 'Asesoría técnica integral y estructuración del Sistema de Gestión de Seguridad y Salud en el Trabajo para empresas, instituciones educativas y contratistas.',
    features: [
      'Diseño e implementación de la matriz de riesgos laborales.',
      'Auditoría y planes de mejora continua según estándares mínimos.',
      'Programas de pausas activas y biomecánica postural para colaboradores.',
      'Acompañamiento en inspecciones y capacitaciones certificadas.'
    ],
    whatsappMessage: 'Hola Rubén Darío, deseo cotizar una Consultoría en Seguridad y Salud en el Trabajo (SST) para mi organización.',
    leadTime: 'Propuesta en 24-48 horas hábiles',
    icon: 'ShieldCheck',
    pricingNote: 'Planes a la medida según número de colaboradores.'
  },
  {
    id: 'serv-arrendamientos',
    title: 'Software de Arrendamientos y Propiedad Raíz',
    type: 'professional_service',
    category: 'Software Inmobiliario & Automatización',
    tagline: 'Plataforma para gestión de contratos, cobranzas automatizadas y control de inquilinos.',
    description: 'Solución tecnológica en la nube para propietarios e inmobiliarias independientes. Automatiza el envío de cuentas de cobro y genera alertas de vencimiento de pólizas.',
    features: [
      'Gestión centralizada de inmuebles, cánones de arrendamiento y fiadores.',
      'Generación automática de recibos y notificaciones por WhatsApp/Email.',
      'Seguimiento a reparaciones locativas y cuentas de servicios públicos.',
      'Panel financiero de flujo de caja y liquidación mensual.'
    ],
    whatsappMessage: 'Hola Rubén Darío, me interesa solicitar una demostración y cotización del Software de Arrendamientos.',
    leadTime: 'Demostración inmediata y despliegue en 48 horas',
    icon: 'Building2',
    pricingNote: 'Licenciamiento mensual flexible o compra llave en mano.'
  }
];

const STORAGE_KEYS = {
  TABS: 'espatodo_tabs_store_v2',
  SUBMISSIONS: 'espatodo_submissions_store_v2',
  GUIDES: 'espatodo_guides_store_v2',
  PORTFOLIO: 'espatodo_portfolio_store_v2',
  STORE_ITEMS: 'espatodo_store_items_store_v2'
};

function getLocalStore<T>(key: string, initialData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch {
    return initialData;
  }
}

function setLocalStore<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[Firebase Dummy] Error guardando en local storage key: ${key}`, err);
  }
}

// 1. TABS
export async function getFirebaseTabs(): Promise<TabModule[]> {
  try {
    const snap = await getDocs(collection(db, FIRESTORE_COLLECTIONS.TABS));
    if (!snap.empty) {
      const cloudTabs = snap.docs.map(d => ({ ...d.data(), id: d.id } as TabModule));
      setLocalStore(STORAGE_KEYS.TABS, cloudTabs);
      return cloudTabs;
    } else {
      // Seed initial tabs into Firestore on first load
      for (const tab of INITIAL_TABS) {
        await setDoc(doc(db, FIRESTORE_COLLECTIONS.TABS, tab.id), tab);
      }
      return INITIAL_TABS;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, FIRESTORE_COLLECTIONS.TABS);
    return getLocalStore<TabModule[]>(STORAGE_KEYS.TABS, INITIAL_TABS);
  }
}

export async function createFirebaseTab(newTab: Omit<TabModule, 'id'>): Promise<TabModule> {
  const created: TabModule = {
    ...newTab,
    id: `tab-${Date.now()}`
  };
  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.TABS, created.id), created);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `${FIRESTORE_COLLECTIONS.TABS}/${created.id}`);
  }
  const current = getLocalStore<TabModule[]>(STORAGE_KEYS.TABS, INITIAL_TABS);
  const updated = [...current, created];
  setLocalStore(STORAGE_KEYS.TABS, updated);
  return created;
}

export async function deleteFirebaseTab(tabId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.TABS, tabId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${FIRESTORE_COLLECTIONS.TABS}/${tabId}`);
  }
  const current = getLocalStore<TabModule[]>(STORAGE_KEYS.TABS, INITIAL_TABS);
  const updated = current.filter(t => t.id !== tabId);
  setLocalStore(STORAGE_KEYS.TABS, updated);
}

// 2. ACADÉMICO LMS
export async function getFirebaseGuides(): Promise<AcademicGuide[]> {
  try {
    const snap = await getDocs(collection(db, FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES));
    if (!snap.empty) {
      const cloudGuides = snap.docs.map(d => ({ ...d.data(), id: d.id } as AcademicGuide));
      setLocalStore(STORAGE_KEYS.GUIDES, cloudGuides);
      return cloudGuides;
    } else {
      // Seed initial guides on first run
      for (const guide of INITIAL_GUIDES) {
        await setDoc(doc(db, FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES, guide.id), guide);
      }
      return INITIAL_GUIDES;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES);
    return getLocalStore<AcademicGuide[]>(STORAGE_KEYS.GUIDES, INITIAL_GUIDES);
  }
}

export async function saveFirebaseGuide(guideData: Omit<AcademicGuide, 'id'> & { id?: string }): Promise<AcademicGuide> {
  const finalGuide: AcademicGuide = {
    ...guideData,
    id: guideData.id || `guide-${Date.now()}`
  };
  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES, finalGuide.id), finalGuide);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES}/${finalGuide.id}`);
  }
  const current = getLocalStore<AcademicGuide[]>(STORAGE_KEYS.GUIDES, INITIAL_GUIDES);
  const exists = current.some(g => g.id === finalGuide.id);
  const updated = exists 
    ? current.map(g => g.id === finalGuide.id ? finalGuide : g)
    : [finalGuide, ...current];
  setLocalStore(STORAGE_KEYS.GUIDES, updated);
  return finalGuide;
}

export async function submitFirebaseGroupHomework(submission: Omit<GroupSubmission, 'id' | 'submittedAt' | 'status'>): Promise<GroupSubmission> {
  const now = new Date();
  const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const createdSubmission: GroupSubmission = {
    ...submission,
    id: `sub-${Date.now()}`,
    submittedAt: dateFormatted,
    status: 'entregado'
  };

  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.SUBMISSIONS, createdSubmission.id), createdSubmission);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `${FIRESTORE_COLLECTIONS.SUBMISSIONS}/${createdSubmission.id}`);
  }

  const current = getLocalStore<GroupSubmission[]>(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
  const updated = [createdSubmission, ...current];
  setLocalStore(STORAGE_KEYS.SUBMISSIONS, updated);
  return createdSubmission;
}

export async function getFirebaseSubmissions(): Promise<GroupSubmission[]> {
  try {
    const snap = await getDocs(collection(db, FIRESTORE_COLLECTIONS.SUBMISSIONS));
    if (!snap.empty) {
      const cloudSubs = snap.docs.map(d => ({ ...d.data(), id: d.id } as GroupSubmission));
      setLocalStore(STORAGE_KEYS.SUBMISSIONS, cloudSubs);
      return cloudSubs;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, FIRESTORE_COLLECTIONS.SUBMISSIONS);
  }
  return getLocalStore<GroupSubmission[]>(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
}

export async function gradeFirebaseSubmission(
  submissionId: string, 
  data: { status: 'calificado' | 'en_revision' | 'entregado'; gradeScore?: number; feedback?: string }
): Promise<void> {
  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.SUBMISSIONS, submissionId), data, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${FIRESTORE_COLLECTIONS.SUBMISSIONS}/${submissionId}`);
  }
  const current = getLocalStore<GroupSubmission[]>(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
  const updated = current.map(item => item.id === submissionId ? { ...item, ...data } : item);
  setLocalStore(STORAGE_KEYS.SUBMISSIONS, updated);
}

export async function deleteFirebaseGuide(guideId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES, guideId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${FIRESTORE_COLLECTIONS.ACADEMIC_GUIDES}/${guideId}`);
  }
  const current = getLocalStore<AcademicGuide[]>(STORAGE_KEYS.GUIDES, INITIAL_GUIDES);
  const updated = current.filter(g => g.id !== guideId);
  setLocalStore(STORAGE_KEYS.GUIDES, updated);
}

// 3. PORTAFOLIO & APPS
export async function getFirebasePortfolioApps(): Promise<PortfolioApp[]> {
  try {
    const snap = await getDocs(collection(db, FIRESTORE_COLLECTIONS.PORTFOLIO_APPS));
    if (!snap.empty) {
      const cloudApps = snap.docs.map(d => ({ ...d.data(), id: d.id } as PortfolioApp));
      setLocalStore(STORAGE_KEYS.PORTFOLIO, cloudApps);
      return cloudApps;
    } else {
      for (const appItem of INITIAL_PORTFOLIO_APPS) {
        await setDoc(doc(db, FIRESTORE_COLLECTIONS.PORTFOLIO_APPS, appItem.id), appItem);
      }
      return INITIAL_PORTFOLIO_APPS;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, FIRESTORE_COLLECTIONS.PORTFOLIO_APPS);
    return getLocalStore<PortfolioApp[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO_APPS);
  }
}

export async function saveFirebasePortfolioApp(appData: PortfolioApp): Promise<void> {
  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.PORTFOLIO_APPS, appData.id), appData);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${FIRESTORE_COLLECTIONS.PORTFOLIO_APPS}/${appData.id}`);
  }
  const current = getLocalStore<PortfolioApp[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO_APPS);
  const exists = current.some(a => a.id === appData.id);
  const updated = exists 
    ? current.map(a => a.id === appData.id ? appData : a)
    : [appData, ...current];
  setLocalStore(STORAGE_KEYS.PORTFOLIO, updated);
}

export async function deleteFirebasePortfolioApp(appId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.PORTFOLIO_APPS, appId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${FIRESTORE_COLLECTIONS.PORTFOLIO_APPS}/${appId}`);
  }
  const current = getLocalStore<PortfolioApp[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO_APPS);
  const updated = current.filter(a => a.id !== appId);
  setLocalStore(STORAGE_KEYS.PORTFOLIO, updated);
}

// 4. TIENDA: ARTÍCULOS DE VENTA Y SERVICIOS
export async function getFirebaseStoreItems(): Promise<StoreItem[]> {
  try {
    const snap = await getDocs(collection(db, FIRESTORE_COLLECTIONS.STORE_ITEMS));
    if (!snap.empty) {
      const cloudItems = snap.docs.map(d => ({ ...d.data(), id: d.id } as StoreItem));
      setLocalStore(STORAGE_KEYS.STORE_ITEMS, cloudItems);
      return cloudItems;
    } else {
      for (const item of INITIAL_STORE_ITEMS) {
        await setDoc(doc(db, FIRESTORE_COLLECTIONS.STORE_ITEMS, item.id), item);
      }
      return INITIAL_STORE_ITEMS;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, FIRESTORE_COLLECTIONS.STORE_ITEMS);
    return getLocalStore<StoreItem[]>(STORAGE_KEYS.STORE_ITEMS, INITIAL_STORE_ITEMS);
  }
}

// Alias for compatibility
export const getFirebaseServices = getFirebaseStoreItems;

export async function saveFirebaseStoreItem(itemData: StoreItem): Promise<void> {
  try {
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.STORE_ITEMS, itemData.id), itemData);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${FIRESTORE_COLLECTIONS.STORE_ITEMS}/${itemData.id}`);
  }
  const current = getLocalStore<StoreItem[]>(STORAGE_KEYS.STORE_ITEMS, INITIAL_STORE_ITEMS);
  const exists = current.some(s => s.id === itemData.id);
  const updated = exists 
    ? current.map(s => s.id === itemData.id ? itemData : s)
    : [itemData, ...current];
  setLocalStore(STORAGE_KEYS.STORE_ITEMS, updated);
}

export const saveFirebaseService = saveFirebaseStoreItem;

export async function deleteFirebaseStoreItem(itemId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.STORE_ITEMS, itemId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${FIRESTORE_COLLECTIONS.STORE_ITEMS}/${itemId}`);
  }
  const current = getLocalStore<StoreItem[]>(STORAGE_KEYS.STORE_ITEMS, INITIAL_STORE_ITEMS);
  const updated = current.filter(s => s.id !== itemId);
  setLocalStore(STORAGE_KEYS.STORE_ITEMS, updated);
}

