import React, { useState } from 'react';
import { X, FolderPlus, GraduationCap, Laptop, Briefcase, Sparkles, Check } from 'lucide-react';
import { TabModule, TemplateType } from '../../types';

interface NewTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTab: (tabData: Omit<TabModule, 'id'>) => Promise<void>;
}

export const NewTabModal: React.FC<NewTabModalProps> = ({
  isOpen,
  onClose,
  onCreateTab
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [template, setTemplate] = useState<TemplateType>('academic');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templatesList: { type: TemplateType; title: string; subtitle: string; icon: React.ReactNode }[] = [
    {
      type: 'academic',
      title: 'Plantilla Académica (LMS)',
      subtitle: 'Selector de grados, guías descargables, videos incrustados y panel de entregas grupales.',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />
    },
    {
      type: 'portfolio',
      title: 'Plantilla Portafolio (Apps & Tech)',
      subtitle: 'Cuadrícula tecnológica de proyectos con etiquetas y botón interactivo "Ejecutar Aplicación".',
      icon: <Laptop className="w-5 h-5 text-sky-400" />
    },
    {
      type: 'services',
      title: 'Plantilla Tienda / Servicios',
      subtitle: 'Catálogo de soluciones comerciales, consultorías (ej. SST) y botón de contacto por WhatsApp.',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor ingresa un título para la sección.');
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      let iconName = 'GraduationCap';
      if (template === 'portfolio') iconName = 'Laptop';
      if (template === 'services') iconName = 'Briefcase';

      await onCreateTab({
        title: title.trim(),
        slug: slug || `seccion-${Date.now()}`,
        template,
        description: description.trim() || `Módulo administrado por Rubén Darío Rincón Montoya bajo la plantilla ${template}.`,
        iconName,
        isCustom: true
      });

      onClose();
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al crear la pestaña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 sm:p-7 space-y-6 shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk'] leading-tight">
                Crear Nueva Pestaña / Sección
              </h3>
              <p className="text-xs text-neutral-400">
                Panel CMS de Rubén Darío Rincón Montoya
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Section Title */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1.5">
              Título de la Sección *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Robótica y Proyectos STEAM 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs sm:text-sm font-medium transition-colors"
            />
          </div>

          {/* Template Selector */}
          <div>
            <label className="block text-neutral-300 font-medium mb-2">
              Selector de Plantilla (Motor Base) *
            </label>
            <div className="space-y-2.5">
              {templatesList.map((tpl) => {
                const isSelected = template === tpl.type;
                return (
                  <div
                    key={tpl.type}
                    onClick={() => setTemplate(tpl.type)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-neutral-950 border-amber-400 shadow-xs'
                        : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {tpl.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-xs ${isSelected ? 'text-amber-400' : 'text-neutral-200'}`}>
                          {tpl.title}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        {tpl.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Description */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1.5">
              Descripción Corta (Opcional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica a los usuarios qué encontrarán en este nuevo módulo..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs resize-none transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Guardando...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Crear y Guardar</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
