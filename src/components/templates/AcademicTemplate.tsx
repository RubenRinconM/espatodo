import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Video, 
  Users, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ExternalLink,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronDown
} from 'lucide-react';
import { AcademicGuide, GroupSubmission, UserRole } from '../../types';

interface AcademicTemplateProps {
  role: UserRole;
  guides: AcademicGuide[];
  submissions: GroupSubmission[];
  onSubmitHomework: (submission: Omit<GroupSubmission, 'id' | 'submittedAt' | 'status'>) => Promise<void>;
  onGradeSubmission?: (id: string, data: { status: 'calificado' | 'en_revision' | 'entregado'; gradeScore?: number; feedback?: string }) => Promise<void>;
  onAddGuide?: (guide: AcademicGuide) => Promise<void>;
  onDeleteGuide?: (id: string) => Promise<void>;
}

export const AcademicTemplate: React.FC<AcademicTemplateProps> = ({
  role,
  guides,
  submissions,
  onSubmitHomework,
  onGradeSubmission,
  onAddGuide,
  onDeleteGuide
}) => {
  // Grades available at I.E. Ramón Múnera Lopera
  const grades = [
    { id: 'all', label: 'Todos los Grados' },
    { id: '6', label: '6° Grado' },
    { id: '7', label: '7° Grado' },
    { id: '8', label: '8° Grado' },
    { id: '9', label: '9° Grado' },
    { id: '10', label: '10° Grado' },
    { id: '11', label: '11° Grado' }
  ];

  const [selectedGrade, setSelectedGrade] = useState('10');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('guide-10-ef');

  // Filtered guides by grade
  const filteredGuides = selectedGrade === 'all' 
    ? guides 
    : guides.filter(g => g.gradeId === selectedGrade || g.gradeId === 'all');

  const activeGuide = guides.find(g => g.id === selectedGuideId) || filteredGuides[0] || guides[0];

  // Admin New Guide Modal State
  const [showNewGuideModal, setShowNewGuideModal] = useState(false);
  const [newGuideTitle, setNewGuideTitle] = useState('');
  const [newGuideGrade, setNewGuideGrade] = useState('10');
  const [newGuideSubject, setNewGuideSubject] = useState('Educación Física y Deportes');
  const [newGuideDesc, setNewGuideDesc] = useState('');
  const [newGuideDuration, setNewGuideDuration] = useState('4 semanas (Periodo 3)');
  const [newGuideDueDate, setNewGuideDueDate] = useState('2026-11-20');
  const [newGuideDownloadUrl, setNewGuideDownloadUrl] = useState('https://drive.google.com/drive/folders/ejemplo-guia-pdf');
  const [newGuideVideoUrl, setNewGuideVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [newGuideRequirements, setNewGuideRequirements] = useState(
    'Grabación de video de evidencia grupal (máx 3 min)\nFicha de frecuencia cardíaca antes y después del esfuerzo\nReflexión grupal de hidratación y postura'
  );

  const applyGuidePreset = (presetType: 'condicionamiento' | 'voleibol' | 'ritmo' | 'cooper') => {
    switch (presetType) {
      case 'condicionamiento':
        setNewGuideTitle('Guía Integral: Condicionamiento Físico y Cualidades Motrices');
        setNewGuideGrade('10');
        setNewGuideSubject('Educación Física y Deportes');
        setNewGuideDesc('Plan de trabajo para el desarrollo de la resistencia aeróbica, flexibilidad activa y fuerza funcional orientada a la salud cardiovascular.');
        setNewGuideDuration('4 semanas (Periodo 3)');
        setNewGuideDueDate('2026-11-15');
        setNewGuideRequirements('Circuito de 5 estaciones de calistenia y coordinación.\nGrabación de video de evidencia por grupo (máximo 3 minutos).\nFicha técnica de pulsaciones en reposo y post-esfuerzo.\nPlanilla de autoevaluación del equipo de trabajo.');
        break;
      case 'voleibol':
        setNewGuideTitle('Taller Técnico: Fundamentos del Voleibol y Trabajo Colaborativo');
        setNewGuideGrade('9');
        setNewGuideSubject('Educación Física y Deportes');
        setNewGuideDesc('Perfeccionamiento del pase de dedos, recepción de antebrazos y táctica defensiva en equipo.');
        setNewGuideDuration('3 semanas (Periodo 4)');
        setNewGuideDueDate('2026-11-28');
        setNewGuideRequirements('Video demostrativo de secuencia de 10 pases consecutivos en equipo.\nCuestionario sobre el reglamento oficial FIVB.\nRegistro fotográfico de posiciones fundamentales.');
        break;
      case 'ritmo':
        setNewGuideTitle('Guía de Expresión Corporal, Sincronización y Danza Deportiva');
        setNewGuideGrade('11');
        setNewGuideSubject('Educación Física y Deportes');
        setNewGuideDesc('Montaje coreográfico grupal que integra elementos gimnásticos, coordinación rítmica y expresión cinestésica.');
        setNewGuideDuration('5 semanas (Periodo 4)');
        setNewGuideDueDate('2026-12-05');
        setNewGuideRequirements('Secuencia rítmica de 32 tiempos con implementos deportivos.\nParticipación activa equitativa de todos los integrantes del grupo.\nReflexión escrita sobre el trabajo cooperativo y superación.');
        break;
      case 'cooper':
        setNewGuideTitle('Valoración de Resistencia: Test de Cooper y Salud Respiratoria');
        setNewGuideGrade('8');
        setNewGuideSubject('Educación Física y Deportes');
        setNewGuideDesc('Medición de la capacidad aeróbica submáxima y cálculo estimado de VO2 máx para estudiantes de secundaria.');
        setNewGuideDuration('2 semanas');
        setNewGuideDueDate('2026-11-10');
        setNewGuideRequirements('Registro de vueltas a la pista escolar durante 12 minutos.\nGráfica comparativa de frecuencia cardíaca por integrante.\nConclusiones sobre hábitos de vida saludable.');
        break;
    }
  };

  const handleCreateGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuideTitle.trim() || !onAddGuide) return;

    const createdGuide: AcademicGuide = {
      id: `guide-${Date.now()}`,
      title: newGuideTitle.trim(),
      gradeId: newGuideGrade,
      subject: newGuideSubject.trim(),
      description: newGuideDesc.trim(),
      duration: newGuideDuration.trim(),
      dueDate: newGuideDueDate.trim(),
      downloadUrl: newGuideDownloadUrl.trim(),
      videoUrl: newGuideVideoUrl.trim(),
      requirements: newGuideRequirements.split('\n').map(r => r.trim()).filter(Boolean)
    };

    await onAddGuide(createdGuide);
    setShowNewGuideModal(false);
    setSelectedGuideId(createdGuide.id);
  };

  // Submission form state
  const [groupNumber, setGroupNumber] = useState('Grupo 3 - Resistencia y Ritmo');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [members, setMembers] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Grading modal state for Admin
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState<string>('4.5');
  const [feedbackInput, setFeedbackInput] = useState<string>('Buen trabajo en equipo y cumplimiento de los parámetros de frecuencia cardíaca.');

  const handleAddMember = () => {
    if (members.length < 6) {
      setMembers([...members, '']);
    }
  };

  const handleMemberChange = (index: number, val: string) => {
    const updated = [...members];
    updated[index] = val;
    setMembers(updated);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderName.trim() || !evidenceUrl.trim()) {
      alert('Por favor completa el nombre del líder y el enlace de evidencia (Drive o YouTube).');
      return;
    }

    const validMembers = members.map(m => m.trim()).filter(Boolean);
    const finalMembers = [
      `${leaderName.trim()} (Líder)`,
      ...validMembers
    ];

    setIsSubmitting(true);
    try {
      await onSubmitHomework({
        guideId: activeGuide ? activeGuide.id : 'guide-general',
        grade: `${selectedGrade === 'all' ? '10' : selectedGrade}° Grado`,
        groupNumber: groupNumber.trim() || 'Grupo de Trabajo',
        leaderName: leaderName.trim(),
        leaderEmail: leaderEmail.trim() || 'estudiante@ieramonmunera.edu.co',
        teamMembers: finalMembers,
        evidenceUrl: evidenceUrl.trim(),
        notes: notes.trim()
      });

      setSubmitSuccess(true);
      setLeaderName('');
      setLeaderEmail('');
      setEvidenceUrl('');
      setNotes('');
      setMembers(['']);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Error registrando entrega.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveGrade = async (subId: string) => {
    if (!onGradeSubmission) return;
    const scoreNum = parseFloat(gradeInput);
    await onGradeSubmission(subId, {
      status: 'calificado',
      gradeScore: isNaN(scoreNum) ? 4.5 : scoreNum,
      feedback: feedbackInput
    });
    setGradingSubId(null);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Institutional LMS Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <GraduationCap className="w-4 h-4" />
              <span>Institución Educativa Ramón Múnera Lopera · Medellín</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk']">
              Aula Virtual de Educación Física y Salud
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Dirección Pedagógica por el docente <strong className="text-neutral-200">Rubén Darío Rincón Montoya</strong>. 
              Descarga tus guías de periodo, revisa los videos explicativos de acondicionamiento físico y sube las evidencias de tu equipo de trabajo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start md:items-center shrink-0">
            {role === 'admin' && (
              <button
                onClick={() => setShowNewGuideModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Cargar Nueva Guía / Taller</span>
              </button>
            )}

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs">
              <span className="text-neutral-400 block font-mono text-[10px]">Docente a Cargo</span>
              <span className="font-semibold text-neutral-200 text-sm">Rubén Darío Rincón M.</span>
              <span className="text-[11px] text-purple-400 block mt-0.5 font-medium">Educación Física y Deportes</span>
            </div>
          </div>

        </div>

        {/* Decorative Ambient Violet Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      </div>

      {/* Grade Selector (Interactive Segmented Control) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
            Seleccionar Grado Escolar
          </h2>
          <span className="text-xs text-neutral-400">
            Mostrando guías del periodo vigente
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {grades.map((g) => {
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedGrade(g.id);
                  const firstMatch = guides.find(gd => g.id === 'all' || gd.gradeId === g.id);
                  if (firstMatch) setSelectedGuideId(firstMatch.id);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Area: Guides List & Embedded Media Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Guides Accordion / List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Guías Didácticas Disponibles
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {filteredGuides.length} guías
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredGuides.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-xs">
                No hay guías registradas para este grado actualmente.
              </div>
            ) : (
              filteredGuides.map((guide) => {
                const isSelected = guide.id === activeGuide?.id;
                return (
                  <div
                    key={guide.id}
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`group relative w-full text-left p-4 rounded-xl transition-all border text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-purple-500/60 shadow-xs'
                        : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[10px] text-purple-400 uppercase tracking-wide">
                        Grado {guide.gradeId}° · {guide.duration || 'Periodo Activo'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          {guide.dueDate}
                        </span>
                        {role === 'admin' && onDeleteGuide && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`¿Eliminar la guía "${guide.title}"?`)) {
                                onDeleteGuide(guide.id);
                              }
                            }}
                            className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Eliminar guía"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-neutral-100 text-sm leading-snug group-hover:text-purple-300 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                );
              })

            )}
          </div>
        </div>

        {/* Right Column: Central Area for Embedded Guide & Video Lesson */}
        <div className="lg:col-span-8 space-y-6">
          {activeGuide ? (
            <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6 space-y-6">
              
              {/* Header of Active Guide */}
              <div className="border-b border-neutral-800 pb-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
                  <span className="text-purple-400 font-semibold">{activeGuide.subject}</span>
                  <span>·</span>
                  <span>Grado {activeGuide.gradeId}°</span>
                  <span>·</span>
                  <span>Fecha Límite: {activeGuide.dueDate}</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight font-['Cabinet_Grotesk']">
                  {activeGuide.title}
                </h2>
                <p className="text-neutral-300 text-sm mt-2 leading-relaxed">
                  {activeGuide.description}
                </p>
              </div>

              {/* Embedded Video Area (Pedagogical demonstration) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-200">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-rose-400" />
                    Video Tutorial y Pautas Técnicas de Ejecución
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    I.E. Ramón Múnera Lopera
                  </span>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center group">
                  {/* Clean responsive video stage */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  {/* Interactive Visual Player Canvas */}
                  <div className="relative z-20 text-center p-6 space-y-3 max-w-md">
                    <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-400 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                      <Video className="w-6 h-6 ml-0.5" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">
                      Clase Demostrativa: Calistenia y Registro Cardíaco
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      El profesor Rubén Darío explica la toma de pulso radial/carotídeo y la técnica postural para evitar lesiones lumbares.
                    </p>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors pt-1"
                    >
                      <span>Abrir video en pantalla completa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Aesthetic Sports Lab backdrop */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500 via-neutral-900 to-black" />
                </div>
              </div>

              {/* Requirements & Criteria Checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  Requerimientos y Criterios de Evaluación
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGuide.requirements.map((req, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800 text-neutral-400">
              Selecciona una guía didáctica en la columna izquierda para ver su contenido.
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MANDATORY PANEL: ENTREGAS DE EDUCACIÓN FÍSICA (GRUPO DE TRABAJO NOTA)     */}
      {/* ========================================================================= */}
      <section className="mt-12 space-y-6">
        
        {/* Panel Section Header */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Módulo de Entrega Digital
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight font-['Cabinet_Grotesk']">
                Panel de Entregas de Educación Física
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Modalidad Cooperativa Grupal</span>
            </div>
          </div>
        </div>

        {/* CRITICAL EXPLICIT WARNING: A single delivery applies to the whole group */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-200 space-y-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300 tracking-tight">
                Regla Institucional de Entrega Grupal
              </h4>
              <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                <strong>Atención Estudiantes:</strong> En las actividades de Educación Física de la I.E. Ramón Múnera Lopera, 
                <strong className="underline decoration-amber-400 underline-offset-2 ml-1">
                  una única entrega realizada por el líder o delegado de equipo se aplica automáticamente a todos los integrantes vinculados
                </strong>. 
                No es necesario que cada alumno entregue por separado. Asegúrate de incluir los nombres completos de todos los compañeros que participaron activamente.
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Submission Form (Left) & Submissions History/Admin Review (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submission Form */}
          <div className="lg:col-span-5 bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 space-y-5">
            <div className="border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                Registrar Entrega de Trabajo
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Completa los datos del grupo y pega el link de Drive o video.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Entrega registrada con éxito! Ya se encuentra disponible para la revisión del docente.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Group Name & Guide Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Número o Nombre de Grupo *
                  </label>
                  <input
                    type="text"
                    required
                    value={groupNumber}
                    onChange={(e) => setGroupNumber(e.target.value)}
                    placeholder="Ej. Grupo 2 - Fuerza y Ritmo"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Grado Asignado *
                  </label>
                  <select
                    value={selectedGrade === 'all' ? '10' : selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value="6">6° Grado</option>
                    <option value="7">7° Grado</option>
                    <option value="8">8° Grado</option>
                    <option value="9">9° Grado</option>
                    <option value="10">10° Grado</option>
                    <option value="11">11° Grado</option>
                  </select>
                </div>
              </div>

              {/* Leader Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Nombre del Líder (Quien registra) *
                  </label>
                  <input
                    type="text"
                    required
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="Nombre y Apellidos del líder"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    placeholder="estudiante@ieramonmunera.edu.co"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              {/* Team Members List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-400 font-mono text-[11px]">
                    Compañeros de Equipo (A quienes cubre esta entrega)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    + Agregar integrante
                  </button>
                </div>

                <div className="space-y-2">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        placeholder={`Integrante ${index + 2}: Nombre completo`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs"
                      />
                      {members.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence URL */}
              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Enlace de Evidencia (Google Drive / YouTube / Carpeta Cloud) *
                </label>
                <input
                  type="url"
                  required
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://drive.google.com/... o https://youtu.be/..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Observaciones o Comentarios para el Profesor
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Anotamos las dificultades encontradas en el circuito o detalles de grabación..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registrando en Firebase...</span>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Enviar Entrega para el Grupo</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Submissions History & Group Coverage List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">
                  Entregas Registradas en el Sistema
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {submissions.length} entregas grupales
              </span>
            </div>

            <div className="space-y-3">
              {submissions.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-neutral-900/30 border border-neutral-800 text-neutral-500 text-xs">
                  No hay entregas registradas aún. El primer grupo que registre su trabajo aparecerá aquí.
                </div>
              ) : (
                submissions.map((sub) => {
                  const isGraded = sub.status === 'calificado';
                  return (
                    <div 
                      key={sub.id}
                      className="p-4 sm:p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700/80 transition-colors space-y-3"
                    >
                      {/* Sub Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">
                              {sub.groupNumber}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                              {sub.grade}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Líder: <strong className="text-neutral-200">{sub.leaderName}</strong> ({sub.leaderEmail})
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isGraded ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                              <Award className="w-3.5 h-3.5" />
                              Nota: {sub.gradeScore?.toFixed(1) || '5.0'} / 5.0
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                              <Clock className="w-3 h-3" />
                              {sub.status === 'en_revision' ? 'En Revisión' : 'Entregado'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Team Members List (Covered by this delivery) */}
                      <div>
                        <span className="text-[11px] font-mono text-neutral-400 block mb-1">
                          Integrantes amparados por esta entrega ({sub.teamMembers.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.teamMembers.map((member, mIdx) => (
                            <span 
                              key={mIdx}
                              className="text-xs text-neutral-300 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Notes & Evidence Link */}
                      {sub.notes && (
                        <p className="text-xs text-neutral-400 italic bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-800/40">
                          "{sub.notes}"
                        </p>
                      )}

                      {/* Feedback from teacher if graded */}
                      {sub.feedback && (
                        <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-neutral-300">
                          <span className="text-amber-400 font-semibold font-mono text-[10px] block">
                            Retroalimentación del Docente Rubén Darío:
                          </span>
                          <p className="mt-0.5">{sub.feedback}</p>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <a
                          href={sub.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium font-mono text-[11px]"
                        >
                          <span>Ver enlace de evidencia</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-neutral-400 font-mono">
                            {sub.submittedAt}
                          </span>

                          {/* Teacher / Admin Grade Button */}
                          {role === 'admin' && (
                            <button
                              onClick={() => {
                                setGradingSubId(sub.id);
                                setGradeInput(sub.gradeScore?.toString() || '4.8');
                                setFeedbackInput(sub.feedback || 'Excelente participación grupal y rigor en la ejecución del acondicionamiento.');
                              }}
                              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-medium text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Award className="w-3 h-3" />
                              <span>{isGraded ? 'Editar Nota' : 'Calificar'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </section>

      {/* Admin New Guide Creation Modal */}
      {showNewGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Cabinet_Grotesk']">
                    Cargar Nueva Guía o Taller Académico
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    I.E. Ramón Múnera Lopera · Docente Rubén Darío Rincón M.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewGuideModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick 1-Click Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block">
                Plantillas Rápidas Predefinidas (1 Clic)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => applyGuidePreset('condicionamiento')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-300">🏃 Condicionamiento Físico</span>
                  <span className="text-[10px] text-neutral-500">10° Grado · Cualidades motrices</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyGuidePreset('voleibol')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-300">🏐 Fundamentos Voleibol</span>
                  <span className="text-[10px] text-neutral-500">9° Grado · Táctica y reglamento</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyGuidePreset('ritmo')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-300">💃 Expresión Corporal</span>
                  <span className="text-[10px] text-neutral-500">11° Grado · Coreografía y danza</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyGuidePreset('cooper')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-300">📋 Test de Resistencia</span>
                  <span className="text-[10px] text-neutral-500">8° Grado · Test de Cooper</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateGuideSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Grado Escolar *
                  </label>
                  <select
                    value={newGuideGrade}
                    onChange={(e) => setNewGuideGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="6">6° Grado</option>
                    <option value="7">7° Grado</option>
                    <option value="8">8° Grado</option>
                    <option value="9">9° Grado</option>
                    <option value="10">10° Grado</option>
                    <option value="11">11° Grado</option>
                    <option value="all">Todos los Grados</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Asignatura
                  </label>
                  <input
                    type="text"
                    value={newGuideSubject}
                    onChange={(e) => setNewGuideSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Título de la Guía o Taller *
                </label>
                <input
                  type="text"
                  required
                  value={newGuideTitle}
                  onChange={(e) => setNewGuideTitle(e.target.value)}
                  placeholder="Ej. Guía Integral: Acondicionamiento Físico y Salud"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Descripción y Objetivos Pedagógicos
                </label>
                <textarea
                  rows={2}
                  value={newGuideDesc}
                  onChange={(e) => setNewGuideDesc(e.target.value)}
                  placeholder="Detalla las competencias motrices o teóricas a evaluar..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Duración / Periodo
                  </label>
                  <input
                    type="text"
                    value={newGuideDuration}
                    onChange={(e) => setNewGuideDuration(e.target.value)}
                    placeholder="Ej. 4 semanas (Periodo 3)"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Fecha Límite de Entrega
                  </label>
                  <input
                    type="date"
                    value={newGuideDueDate}
                    onChange={(e) => setNewGuideDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Enlace Guía PDF / Google Drive
                  </label>
                  <input
                    type="url"
                    value={newGuideDownloadUrl}
                    onChange={(e) => setNewGuideDownloadUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Enlace Video Explicativo YouTube
                  </label>
                  <input
                    type="url"
                    value={newGuideVideoUrl}
                    onChange={(e) => setNewGuideVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Requerimientos y Criterios de Evaluación (1 por línea)
                </label>
                <textarea
                  rows={3}
                  value={newGuideRequirements}
                  onChange={(e) => setNewGuideRequirements(e.target.value)}
                  placeholder="Circuito de calistenia&#10;Video grupal de 3 min&#10;Ficha de frecuencia cardíaca"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-purple-500 resize-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowNewGuideModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar y Publicar Guía
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Grading Modal */}
      {gradingSubId && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-['Cabinet_Grotesk']">
                  Calificación Docente (Rubén Darío)
                </h3>
              </div>
              <button 
                onClick={() => setGradingSubId(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Nota Numérica (Escala 1.0 a 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="5.0"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Retroalimentación Pedagógica
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGradingSubId(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveGrade(gradingSubId)}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold shadow-sm"
              >
                Guardar Calificación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
