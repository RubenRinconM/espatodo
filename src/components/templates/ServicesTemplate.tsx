import React, { useState } from 'react';
import { 
  Briefcase, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  Code2, 
  Check, 
  Clock, 
  ExternalLink, 
  Plus, 
  Sparkles,
  PhoneCall,
  Smartphone,
  Footprints,
  Coffee,
  Package,
  Trash2,
  Tag,
  DollarSign
} from 'lucide-react';
import { StoreItem, ServiceItem, UserRole } from '../../types';

interface ServicesTemplateProps {
  role: UserRole;
  services: StoreItem[];
  onAddService?: (service: StoreItem) => Promise<void>;
  onDeleteService?: (id: string) => Promise<void>;
}

export const ServicesTemplate: React.FC<ServicesTemplateProps> = ({
  role,
  services,
  onAddService,
  onDeleteService
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  // New product / item form inputs
  const [title, setTitle] = useState('');
  const [itemType, setItemType] = useState<'physical_product' | 'professional_service'>('physical_product');
  const [category, setCategory] = useState('Tecnología & Móviles');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(1450000);
  const [stock, setStock] = useState<number>(10);
  const [leadTime, setLeadTime] = useState('Entrega en 24 a 48 horas');
  const [features, setFeatures] = useState(
    'Garantía directa de 12 meses\nEnvío asegurado a todo el país\nFactura legal y soporte técnico'
  );
  const [whatsappMessage, setWhatsappMessage] = useState(
    'Hola Rubén Darío, deseo consultar y comprar este producto de la tienda espatodo.com'
  );

  const categories = [
    { id: 'all', label: 'Todos los Artículos' },
    { id: 'celulares', label: '📱 Celulares & Tecnología' },
    { id: 'calzado', label: '👟 Calzado Deportivo' },
    { id: 'mugs', label: '☕ Mugs Personalizados' },
    { id: 'servicios', label: '💼 Consultorías & Software' }
  ];

  const filteredItems = services.filter((item) => {
    if (categoryFilter === 'all') return true;
    const catLower = (item.category || '').toLowerCase();
    const titleLower = (item.title || '').toLowerCase();
    if (categoryFilter === 'celulares') {
      return catLower.includes('móvil') || catLower.includes('tecnología') || titleLower.includes('celular') || titleLower.includes('smartphone');
    }
    if (categoryFilter === 'calzado') {
      return catLower.includes('calzado') || titleLower.includes('zapato') || titleLower.includes('zapatilla');
    }
    if (categoryFilter === 'mugs') {
      return catLower.includes('mug') || titleLower.includes('mug') || titleLower.includes('taza');
    }
    if (categoryFilter === 'servicios') {
      return item.type === 'professional_service' || catLower.includes('consultoría') || catLower.includes('software');
    }
    return true;
  });

  const applyProductPreset = (preset: 'celular' | 'zapatos' | 'mug' | 'consultoria') => {
    switch (preset) {
      case 'celular':
        setTitle('Celular Smartphone Pro 5G (128GB / 8GB RAM)');
        setItemType('physical_product');
        setCategory('Tecnología & Móviles');
        setTagline('Pantalla AMOLED 120Hz, cámara triple 64MP y batería de 5000 mAh');
        setDescription('Equipo desbloqueado para cualquier operador. Excelente rendimiento para aplicaciones, estudio y trabajo.');
        setPrice(1450000);
        setStock(8);
        setLeadTime('Entrega en 24 a 48 horas');
        setFeatures('Garantía directa de 12 meses con factura legal.\nIncluye cargador ultrarrápido 67W y estuche antichoque.\nPantalla Gorilla Glass Victus resistente a caídas.\nEnvío asegurado a todo el país.');
        setWhatsappMessage('Hola Rubén Darío, deseo comprar el Celular Smartphone Pro 5G publicado en la tienda espatodo.com.');
        break;

      case 'zapatos':
        setTitle('Zapatos Deportivos Running Air Pro (Ed. Física & Cross)');
        setItemType('physical_product');
        setCategory('Calzado & Deporte');
        setTagline('Suela ergonómica con amortiguación de impacto para pista y asfalto');
        setDescription('Calzado diseñado para entrenamiento de alta exigencia, atletismo y clases de educación física.');
        setPrice(189000);
        setStock(24);
        setLeadTime('Disponibilidad inmediata');
        setFeatures('Tallas disponibles: 37 al 43 (horma colombiana).\nPlantilla ortopédica removible con memoria de pisada.\nSuela antideslizante con agarre multidireccional.\nColores: Negro con detalles naranja coral y azul índigo.');
        setWhatsappMessage('Hola Rubén Darío, deseo consultar tallas y comprar los Zapatos Deportivos Running de la tienda espatodo.com.');
        break;

      case 'mug':
        setTitle('Mug Personalizado de Cerámica (Espatodo & Colección)');
        setItemType('physical_product');
        setCategory('Mugs & Merchandising');
        setTagline('Mug de 11 oz con estampado brillante de alta duración resistente a microondas');
        setDescription('Taza de cerámica premium con el Isologo metalizado de Espatodo o diseño personalizado para tu empresa o colegio.');
        setPrice(28000);
        setStock(50);
        setLeadTime('Elaboración en 24 horas');
        setFeatures('Cerámica blanca AAA de máxima pureza.\nImpresión en sublimación HD a todo color.\nApto para lavavajillas y microondas sin decoloración.\nDescuentos especiales por docenas o compras institucionales.');
        setWhatsappMessage('Hola Rubén Darío, deseo ordenar Mugs Personalizados desde la tienda espatodo.com.');
        break;

      case 'consultoria':
        setTitle('Consultoría Especializada en Seguridad y Salud en el Trabajo (SST)');
        setItemType('professional_service');
        setCategory('Consultoría SST');
        setTagline('Diseño, auditoría e implementación del SG-SST bajo Decreto 1072 y Res. 0312');
        setDescription('Acompañamiento profesional y pedagógico integral para empresas e instituciones educativas.');
        setPrice(850000);
        setStock(5);
        setLeadTime('Inicio en 48 horas');
        setFeatures('Evaluación inicial de estándares mínimos de seguridad.\nMatriz de identificación de peligros y valoración de riesgos.\nPlan anual de capacitación y pausas activas posturales.\nCertificación de cumplimiento normativo ante Mintrabajo.');
        setWhatsappMessage('Hola Rubén Darío, deseo solicitar cotización para la Consultoría en SST de espatodo.com.');
        break;
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !onAddService) return;

    const formattedPrice = price ? `$${price.toLocaleString('es-CO')} COP` : 'A convenir';

    const newItem: StoreItem = {
      id: `item-${Date.now()}`,
      title: title.trim(),
      type: itemType,
      category: category.trim(),
      tagline: tagline.trim() || 'Artículo disponible en la tienda oficial espatodo.com',
      description: description.trim() || 'Producto garantizado bajo el ecosistema modular de Rubén Darío Rincón Montoya.',
      price: price,
      stock: stock,
      leadTime: leadTime.trim() || 'Entrega en 24 horas',
      pricingNote: formattedPrice,
      features: features.split('\n').map(f => f.trim()).filter(Boolean),
      whatsappMessage: whatsappMessage.trim() || `Hola Rubén Darío, me interesa el artículo ${title}.`,
      icon: itemType === 'physical_product' 
        ? (category.includes('Móvil') || category.includes('Tecnología') ? 'Smartphone' : category.includes('Calzado') ? 'Footprints' : 'Coffee')
        : 'Briefcase'
    };

    await onAddService(newItem);
    setShowNewProductModal(false);
    setTitle('');
    setTagline('');
    setDescription('');
  };

  const openWhatsAppDirect = (item: StoreItem) => {
    const phoneNumber = "573000000000"; // Enlace directo WhatsApp Rubén Darío
    const msg = item.whatsappMessage || `Hola Rubén Darío, deseo comprar "${item.title}" (${item.pricingNote || ''}) visto en espatodo.com.`;
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getItemVisualBadge = (item: StoreItem) => {
    const titleLower = item.title.toLowerCase();
    const catLower = (item.category || '').toLowerCase();

    if (titleLower.includes('celular') || titleLower.includes('smartphone') || catLower.includes('móvil') || item.icon === 'Smartphone') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-blue-950/60 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f620,transparent_65%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-blue-300 block font-semibold">Tecnología 5G AMOLED</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            Garantía 12 Meses
          </div>
          {item.stock !== undefined && (
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
              {item.stock} en stock
            </div>
          )}
        </div>
      );
    }

    if (titleLower.includes('zapato') || titleLower.includes('running') || catLower.includes('calzado') || item.icon === 'Footprints') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-orange-950/60 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9731620,transparent_65%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-600/20 border border-orange-500/40 text-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Footprints className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-orange-300 block font-semibold">Calzado Running Air</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            Tallas 37 al 43
          </div>
          {item.stock !== undefined && (
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
              {item.stock} pares disponibles
            </div>
          )}
        </div>
      );
    }

    if (titleLower.includes('mug') || titleLower.includes('taza') || catLower.includes('mug') || item.icon === 'Coffee') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-amber-950/60 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b20,transparent_65%)]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Coffee className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono text-amber-300 block font-semibold">Cerámica AAA 11 oz</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            Sublimación HD
          </div>
          {item.stock !== undefined && (
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
              {item.stock} disponibles
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="h-44 w-full bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden border-b border-neutral-800">
        <div className="relative z-10 text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Briefcase className="w-8 h-8 text-orange-400" />
          </div>
          <span className="text-[11px] font-mono text-neutral-300 block font-semibold">{item.category}</span>
        </div>
        <div className="absolute top-3 left-3 text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
          Servicio Profesional
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
              <ShoppingBagIcon className="w-4 h-4" />
              <span>Tienda Oficial & Soluciones Comerciales (Naranja Coral & Oro)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk']">
              Tienda Virtual & Catálogo de Artículos
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Venta directa de artículos tecnológicos (celulares), calzado deportivo, mugs personalizados y consultorías profesionales, gestionados por <strong className="text-neutral-200">Rubén Darío Rincón Montoya</strong>.
            </p>
          </div>

          {role === 'admin' && (
            <button
              onClick={() => setShowNewProductModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer hover:scale-105"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Cargar Nuevo Artículo de Venta</span>
            </button>
          )}
        </div>

        {/* Decorative Ambient Orange Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-neutral-800 text-white shadow-xs font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-neutral-400">
          {filteredItems.length} artículos en vitrina
        </span>
      </div>

      {/* Products & Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700/80 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
          >
            {/* Visual Product Stage */}
            {getItemVisualBadge(item)}

            {/* Info Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold ${
                    item.type === 'physical_product'
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                      : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  }`}>
                    {item.type === 'physical_product' ? '📦 Producto Físico' : '💼 Servicio Profesional'}
                  </span>

                  {role === 'admin' && onDeleteService && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar el artículo "${item.title}" de la tienda?`)) {
                          onDeleteService(item.id);
                        }
                      }}
                      className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Eliminar artículo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-['Cabinet_Grotesk'] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium mt-1">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">Precio de Venta</span>
                  <span className="text-base font-extrabold text-white font-mono flex items-center text-orange-400">
                    {item.pricingNote || (item.price ? `$${item.price.toLocaleString('es-CO')} COP` : 'Consultar')}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block tracking-wider">
                    Detalles y Especificaciones:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions & WhatsApp CTA */}
              <div className="space-y-3 pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    {item.leadTime}
                  </span>
                  <span className="text-neutral-400">
                    {item.stock !== undefined ? `${item.stock} disponibles` : 'Atención directa'}
                  </span>
                </div>

                {/* Mandatory WhatsApp CTA */}
                <button
                  onClick={() => openWhatsAppDirect(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/wa"
                >
                  <MessageCircle className="w-4 h-4 fill-current transition-transform group-hover/wa:scale-110" />
                  <span>Comprar / Solicitar por WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Admin Add New Product / Service Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Cabinet_Grotesk']">
                    Cargar Nuevo Artículo de Venta en Tienda
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Celulares, calzado, mugs personalizados o consultorías · Administrador Rubén Darío
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewProductModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick 1-Click Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block">
                Plantillas Rápidas de Artículos (1 Clic)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => applyProductPreset('celular')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-blue-400">📱 Celular 5G</span>
                  <span className="text-[10px] text-neutral-500">$1.450.000 COP</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyProductPreset('zapatos')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-orange-400">👟 Zapatos Running</span>
                  <span className="text-[10px] text-neutral-500">$189.000 COP</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyProductPreset('mug')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-amber-400">☕ Mug Personalizado</span>
                  <span className="text-[10px] text-neutral-500">$28.000 COP</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyProductPreset('consultoria')}
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 text-left text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-semibold block text-[11px] text-purple-400">💼 Consultoría SST</span>
                  <span className="text-[10px] text-neutral-500">Asesoría empresa</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Tipo de Artículo *
                  </label>
                  <select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  >
                    <option value="physical_product">📦 Producto Físico (Celulares, Calzado, Mugs)</option>
                    <option value="professional_service">💼 Servicio Profesional / Software</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Categoría *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Tecnología, Calzado, Mugs, etc."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Celular Smartphone Pro 5G / Zapatos Deportivos / Mug Cerámica"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Precio en COP ($) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Unidades en Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                    Tiempo de Entrega
                  </label>
                  <input
                    type="text"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    placeholder="24 a 48 horas"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Subtítulo / Frase Corta Destacada
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Ej. Pantalla AMOLED 120Hz / Suela ergonómica / Cerámica AAA 11 oz"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe las ventajas, garantía o materiales..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Características / Especificaciones (1 por línea)
                </label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Garantía de 12 meses&#10;Tallas 37 al 43&#10;Envío a todo el país"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500 resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono text-[11px] mb-1">
                  Mensaje Personalizado de WhatsApp
                </label>
                <input
                  type="text"
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder="Hola Rubén Darío, deseo comprar este artículo..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Guardar y Publicar en Tienda</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="24" 
      height="24" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
