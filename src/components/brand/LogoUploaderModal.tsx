import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  Image as ImageIcon, 
  AlertCircle, 
  RotateCcw, 
  Sparkles,
  FolderOpen,
  FileCheck
} from 'lucide-react';
import { useLogo } from '../../context/LogoContext';

interface LogoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploaderModal: React.FC<LogoUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  const { logoUrl, isCustom, uploadLogo, resetLogo } = useLogo();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen (PNG, JPG o WEBP)');
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setStatusMessage(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setSaving(true);
    setStatusMessage('Cargando y guardando imagen original...');
    try {
      const ok = await uploadLogo(selectedFile);
      if (ok) {
        setStatusMessage('¡Logo oficial cargado y aplicado con éxito a toda la plataforma!');
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatusMessage('Hubo un error al procesar el archivo.');
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Error al guardar el logo.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer el logo al diseño por defecto?')) {
      resetLogo();
      setSelectedFile(null);
      setPreviewUrl(null);
      setStatusMessage('Logo restablecido.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-['Cabinet_Grotesk']">
                Cargar Archivo Original del Isologo (Metalizado.png)
              </h3>
              <p className="text-[11px] text-neutral-400">
                Usa directamente tu archivo PNG auténtico sin ninguna modificación
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Explanation Banner */}
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-blue-300">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Garantía de Fidelidad 100% de Marca:</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Al cargar tu archivo original <strong>Metalizado.png</strong> desde aquí, la plataforma lo utilizará <strong>píxel por píxel como imagen directa</strong> en el Navbar, Menú Lateral, Portada, Pie de Página y Modales, sin aplicar ninguna alteración vectorial ni aproximación.
            </p>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-orange-500 bg-orange-500/10 scale-[1.01]'
                : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-orange-400 mb-3 shadow-inner">
              <ImageIcon className="w-7 h-7" />
            </div>

            <p className="text-sm font-semibold text-white">
              Haz clic aquí o arrastra tu archivo <span className="text-orange-400 font-mono">Metalizado.png</span>
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Soporta PNG con transparencia, alta resolución (hasta 10MB)
            </p>
          </div>

          {/* Live Preview of Selected File or Current Logo */}
          {(previewUrl || logoUrl) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{previewUrl ? 'Vista previa del archivo seleccionado:' : 'Isologo actualmente activo en la web:'}</span>
                {selectedFile && (
                  <span className="text-orange-400 font-semibold">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center min-h-[160px] max-h-[240px] overflow-hidden">
                <img
                  src={previewUrl || logoUrl || ''}
                  alt="Vista previa isologo"
                  className="max-h-40 max-w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-300 font-mono text-center flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* File Placement Path Instructions for Production / Repository */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 text-xs space-y-1.5 font-mono">
            <span className="text-neutral-400 uppercase tracking-wider text-[10px] block font-bold">
              Ubicación permanente en el código fuente:
            </span>
            <div className="flex items-center gap-2 text-neutral-300 bg-neutral-950 p-2 rounded-lg border border-neutral-800 select-all">
              <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <span>/public/brand/Metalizado.png</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Cualquier archivo colocado en esa ruta se cargará automáticamente como el isologo oficial del sitio.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3">
          <div>
            {isCustom && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-red-500/50 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 text-xs font-mono transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!selectedFile || saving}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer ${
                selectedFile && !saving
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 hover:scale-105 active:scale-95'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{saving ? 'Guardando...' : 'Aplicar Isologo Oficial'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
