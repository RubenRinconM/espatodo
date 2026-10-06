import React from 'react';
import { 
  GraduationCap, 
  Laptop, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  Code2,
  Package
} from 'lucide-react';
import { TemplateType, UserRole } from '../types';

export interface ModuleContextDetails {
  template: TemplateType;
  title: string;
  category: string;
  institutionOrScope: string;
  tagline: string;
  themeColor: string; // 'purple' | 'blue' | 'orange'
  colorHex: string;
  publicRole: {
    name: string;
    shortName: string;
    description: string;
    badgeText: string;
  };
  adminRole: {
    name: string;
    shortName: string;
    description: string;
    badgeText: string;
  };
}

export function getModuleContext(template: TemplateType = 'academic'): ModuleContextDetails {
  switch (template) {
    case 'portfolio':
      return {
        template: 'portfolio',
        title: 'Portafolio & Apps',
        category: 'Laboratorio de Software & Tecnologías',
        institutionOrScope: 'Espatodo Tech Hub · Laboratorio Interactivo',
        tagline: 'Desarrollo web, aplicaciones interactivas 3D y código <> embebible',
        themeColor: 'blue',
        colorHex: '#2563EB',
        publicRole: {
          name: 'Visitante / Explorador Tech',
          shortName: 'Visitante',
          description: 'Prueba aplicaciones interactivas, examina tecnologías y ejecuta código en vivo.',
          badgeText: 'Vista Visitante Tech'
        },
        adminRole: {
          name: 'Administrador / Desarrollador de Software',
          shortName: 'Admin Dev <>',
          description: 'Carga aplicaciones, incrusta código directo <> (HTML/JS/CSS) y administra métricas.',
          badgeText: 'Modo Desarrollador <>'
        }
      };

    case 'services':
      return {
        template: 'services',
        title: 'Tienda & Catálogo Comercial',
        category: 'Marketplace de Productos & Soluciones',
        institutionOrScope: 'Espatodo Store · Venta de Productos & Asesorías',
        tagline: 'Artículos físicos (celulares, calzado, mugs) y consultorías profesionales',
        themeColor: 'orange',
        colorHex: '#F97316',
        publicRole: {
          name: 'Cliente / Comprador',
          shortName: 'Cliente',
          description: 'Explora artículos en venta, consulta precios en COP y solicita directamente por WhatsApp.',
          badgeText: 'Vista Cliente / Comprador'
        },
        adminRole: {
          name: 'Administrador de Tienda & Ventas',
          shortName: 'Admin Tienda',
          description: 'Carga nuevos artículos físicos (celulares, calzado, mugs), fija precios, stock y gestiona catálogo.',
          badgeText: 'Gestor de Tienda (Rubén Darío)'
        }
      };

    case 'academic':
    default:
      return {
        template: 'academic',
        title: 'Plataforma Académica LMS',
        category: 'Gestión Educativa & Educación Física',
        institutionOrScope: 'I.E. Ramón Múnera Lopera · Medellín',
        tagline: 'Guías de aprendizaje, videos instructivos y entregas grupales de Educación Física',
        themeColor: 'purple',
        colorHex: '#9333EA',
        publicRole: {
          name: 'Estudiante / Acudiente',
          shortName: 'Estudiante',
          description: 'Consulta guías por grado, ve videos explicativos y envía evidencias grupales.',
          badgeText: 'Vista Estudiante I.E. Ramón Múnera'
        },
        adminRole: {
          name: 'Docente / Administrador Académico',
          shortName: 'Docente Admin',
          description: 'Carga guías académicas, publica talleres, califica evidencias grupales con notas y retroalimentación.',
          badgeText: 'Docente Admin (Rubén Darío)'
        }
      };
  }
}
