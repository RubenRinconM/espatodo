export type UserRole = 'student' | 'admin';

export type TemplateType = 'academic' | 'portfolio' | 'services';

export interface TabModule {
  id: string;
  title: string;
  slug: string;
  template: TemplateType;
  description: string;
  iconName: string;
  isCustom?: boolean;
}

export interface ModuleRoleContext {
  template: TemplateType;
  categoryTitle: string;
  moduleName: string;
  contextSubtitle: string;
  publicRoleName: string;
  publicRoleDesc: string;
  adminRoleName: string;
  adminRoleDesc: string;
  accentColor: string;
  borderAccent: string;
  badgeColor: string;
}

export interface AcademicGrade {
  id: string;
  name: string;
  period: string;
  totalStudents: number;
}

export interface AcademicGuide {
  id: string;
  title: string;
  gradeId: string;
  subject: string;
  description: string;
  downloadUrl?: string;
  videoUrl?: string;
  duration?: string;
  dueDate: string;
  requirements: string[];
}

export interface GroupSubmission {
  id: string;
  guideId: string;
  grade: string;
  groupNumber: string;
  leaderName: string;
  leaderEmail: string;
  teamMembers: string[];
  evidenceUrl: string;
  notes: string;
  submittedAt: string;
  status: 'calificado' | 'en_revision' | 'entregado';
  gradeScore?: number;
  feedback?: string;
}

export interface PortfolioApp {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  version: string;
  author: string;
  interactiveType: '3d_museum' | 'world_quiz' | 'biomechanics' | 'code_embed' | 'generic';
  codeSnippet?: string; // Código <> HTML/JS/CSS cargado directamente por el administrador
  demoMetrics?: {
    users?: string;
    fps?: string;
    status: string;
  };
}

export type StoreItemType = 'physical_product' | 'professional_service';

export interface StoreItem {
  id: string;
  title: string;
  type: StoreItemType;
  category: string;
  tagline: string;
  description: string;
  price?: number; // Precio en COP para productos como celular, zapatos, mug
  features: string[];
  whatsappMessage: string;
  leadTime: string;
  icon: string;
  imageUrl?: string;
  stock?: number;
  pricingNote?: string;
  productBadge?: string;
}

// Backward compatibility alias
export type ServiceItem = StoreItem;

