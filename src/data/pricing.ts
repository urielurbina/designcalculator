import { 
  VolumeDiscountType, 
  ClientDiscountType, 
  MaintenanceType,
  ServiceCategory,
  ServiceId,
  ComplexityLevel,
  UrgencyLevel,
  RightsLevel,
  ScopeLevel,
  ExpertiseLevel,
  ServiceOptions,
  BaseRates
} from '../types';

// Base rates for different service categories
export const baseRates: BaseRates = {
  'identidad-corporativa': {
    'logotipo': 4000,
    'identidad-basica': 5000,
    'identidad-completa': 8000,
    'rediseno': 5000,
    'brand-book': 5000,
    'naming': 2000,
    'brandscape': 4000,
    'brand-voice': 3000,
    'submarca': 2500,
    'trademark': 1500,
    'auditoria': 1000,
    'arquetipos': 500,
    'estrategia-marca': 7000
  },
  'editorial': {
    'libro-comercial': 5000,
    'libro-arte': 8000,
    'revista': 4000,
    'catalogo-comercial': 3000,
    'catalogo-premium': 6000,
    'memoria-anual': 7000,
    'whitepaper': 2500,
    'newsletter': 1500,
    'editorial-digital': 4000,
    'maquetacion': 2000,
    'portada': 1500,
    'infografia': 2500
  },
  'web': {
    'webapp-basica': 15000,
    'webapp-completa': 25000,
    'ecommerce': 35000,
    'landing-page': 5000,
    'app-design': 12000,
    'dashboard': 15000,
    'portal-corporativo': 20000,
    'intranet': 25000,
    'optimizacion': 3000,
    'mantenimiento': 2000,
    'prototipo': 4000,
    'ui-kit': 7000
  },
  'marketing': {
    'campana-completa': 15000,
    'campana-digital': 8000,
    'campana-print': 7000,
    'merchandising': 5000,
    'packaging': 6000,
    'punto-venta': 7000,
    'stand': 10000,
    'presentacion': 3500,
    'brochure-digital': 2500,
    'brochure-impreso': 3500,
    'media-kit': 4500,
    'pitch-deck': 4000
  },
  'social-media': {
    'pack-basico': 1500,
    'pack-completo': 3000,
    'estrategia-social': 2000,
    'calendario-editorial': 2500,
    'video-redes': 500,
    'reel': 300,
    'pack-historias': 1500,
    'contenido-blog': 2000,
    'contenido-newsletter': 1500,
    'pack-publicidad': 3500,
    'copywriting': 2500,
    'contenido-seo': 3000
  },
  'audiovisual': {
    'video-corporativo': 15000,
    'video-producto': 8000,
    'documental': 25000,
    'motion-graphics': 7000,
    'animacion-3d': 10000,
    'video-comercial': 12000,
    'video-evento': 7000,
    'video-educativo': 8000,
    'podcast-setup': 4000,
    'pack-streaming': 5000,
    'demo-reel': 6000,
    'video-aereo': 4000
  },
  'fotografia': {
    'producto-basico': 2500,
    'producto-premium': 4000,
    'gastronomica': 3500,
    'retratos': 1500,
    'evento-medio': 3500,
    'evento-completo': 6000,
    'lookbook': 5000,
    'arquitectura': 4000,
    'aereas': 3500,
    'banco-imagenes': 7500,
    'lifestyle': 4000,
    'ecommerce': 3500
  },
  'ilustracion': {
    'personaje': 2500,
    'mascota': 3500,
    'patron': 2000,
    'iconos': 3500,
    'editorial': 4000,
    'arte-conceptual': 5000,
    'storyboard': 6000,
    'mapa': 4000,
    'infografia': 3500,
    'portada': 4000,
    'producto': 2500,
    'tecnico': 3500
  },
  'moda': {
    'coleccion': 8000,
    'tech-pack': 3000,
    'lookbook': 4000,
    'moodboard': 1500,
    'figurin': 2000,
    'patron-textil': 2500,
    'marca-moda': 5000,
    'catalogo': 4500,
    'flat-sketch': 1800,
    'portfolio': 3500,
    'campana': 6000,
    'etiquetas': 2000
  }
};

// Service options for each category
export const serviceOptions: ServiceOptions = {
  'identidad-corporativa': [
    { value: 'logotipo', label: 'Logotipo' },
    { value: 'identidad-basica', label: 'Identidad Básica (Logo + Manual básico)' },
    { value: 'identidad-completa', label: 'Identidad Completa (Logo + Manual completo)' },
    { value: 'rediseno', label: 'Rediseño de Marca' },
    { value: 'brand-book', label: 'Brand Book Completo' },
    { value: 'naming', label: 'Naming (Investigación + Propuestas)' },
    { value: 'brandscape', label: 'Brandscape (Análisis de competencia)' },
    { value: 'brand-voice', label: 'Brand Voice (Tono de comunicación)' },
    { value: 'submarca', label: 'Submarca' },
    { value: 'trademark', label: 'Trademark (Diseño documentación)' },
    { value: 'auditoria', label: 'Auditoría de Marca' },
    { value: 'arquetipos', label: 'Arquetipos de Marca' },
    { value: 'estrategia-marca', label: 'Estrategia de Marca' }
  ],
  'editorial': [
    { value: 'libro-comercial', label: 'Libro Comercial' },
    { value: 'libro-arte', label: 'Libro de Arte' },
    { value: 'revista', label: 'Revista (Por número)' },
    { value: 'catalogo-comercial', label: 'Catálogo Comercial' },
    { value: 'catalogo-premium', label: 'Catálogo Premium' },
    { value: 'memoria-anual', label: 'Memoria Anual' },
    { value: 'whitepaper', label: 'Whitepaper' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'editorial-digital', label: 'Editorial Digital' },
    { value: 'maquetacion', label: 'Maquetación (100 páginas)' },
    { value: 'portada', label: 'Portada' },
    { value: 'infografia', label: 'Infografía' }
  ],
  'web': [
    { value: 'webapp-basica', label: 'Web App Básica' },
    { value: 'webapp-completa', label: 'Web App Completa' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'app-design', label: 'Diseño de App (UI/UX)' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'portal-corporativo', label: 'Portal Corporativo' },
    { value: 'intranet', label: 'Intranet' },
    { value: 'optimizacion', label: 'Optimización Web' },
    { value: 'mantenimiento', label: 'Mantenimiento Mensual' },
    { value: 'prototipo', label: 'Prototipo' },
    { value: 'ui-kit', label: 'UI Kit' }
  ],
  'marketing': [
    { value: 'campana-completa', label: 'Campaña Completa' },
    { value: 'campana-digital', label: 'Campaña Digital' },
    { value: 'campana-print', label: 'Campaña Print' },
    { value: 'merchandising', label: 'Merchandising' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'punto-venta', label: 'Punto de Venta' },
    { value: 'stand', label: 'Stand' },
    { value: 'presentacion', label: 'Presentación Corporativa' },
    { value: 'brochure-digital', label: 'Brochure Digital' },
    { value: 'brochure-impreso', label: 'Brochure Impreso' },
    { value: 'media-kit', label: 'Media Kit' },
    { value: 'pitch-deck', label: 'Pitch Deck' }
  ],
  'social-media': [
    { value: 'pack-basico', label: 'Pack Social Básico (15 posts)' },
    { value: 'pack-completo', label: 'Pack Social Completo (30 posts)' },
    { value: 'estrategia-social', label: 'Estrategia Social' },
    { value: 'calendario-editorial', label: 'Calendario Editorial' },
    { value: 'video-redes', label: 'Video Redes (1-2 min)' },
    { value: 'reel', label: 'Reel (30-60 seg)' },
    { value: 'pack-historias', label: 'Pack 10 Historias' },
    { value: 'contenido-blog', label: 'Contenido Blog (4 artículos)' },
    { value: 'contenido-newsletter', label: 'Contenido Newsletter' },
    { value: 'pack-publicidad', label: 'Pack Publicidad' },
    { value: 'copywriting', label: 'Copywriting' },
    { value: 'contenido-seo', label: 'Contenido SEO' }
  ],
  'audiovisual': [
    { value: 'video-corporativo', label: 'Video Corporativo (3-5 min)' },
    { value: 'video-producto', label: 'Video Producto' },
    { value: 'documental', label: 'Documental (15-20 min)' },
    { value: 'motion-graphics', label: 'Motion Graphics' },
    { value: 'animacion-3d', label: 'Animación 3D' },
    { value: 'video-comercial', label: 'Video Comercial (30 seg)' },
    { value: 'video-evento', label: 'Video Evento' },
    { value: 'video-educativo', label: 'Video Educativo' },
    { value: 'podcast-setup', label: 'Podcast Setup' },
    { value: 'pack-streaming', label: 'Pack Streaming' },
    { value: 'demo-reel', label: 'Demo Reel' },
    { value: 'video-aereo', label: 'Video Aéreo' }
  ],
  'fotografia': [
    { value: 'producto-basico', label: 'Producto Básico (10 productos)' },
    { value: 'producto-premium', label: 'Producto Premium (10 con estilismo)' },
    { value: 'gastronomica', label: 'Fotografía Gastronómica' },
    { value: 'retratos', label: 'Retratos Corporativos (5)' },
    { value: 'evento-medio', label: 'Evento Medio (4 horas)' },
    { value: 'evento-completo', label: 'Evento Completo (8 horas)' },
    { value: 'lookbook', label: 'Lookbook (20 looks)' },
    { value: 'arquitectura', label: 'Arquitectura (10 espacios)' },
    { value: 'aereas', label: 'Fotos Aéreas' },
    { value: 'banco-imagenes', label: 'Banco de Imágenes (50 fotos)' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'ecommerce', label: 'Fotos E-commerce (20 productos)' }
  ],
  'ilustracion': [
    { value: 'personaje', label: 'Personaje con Poses' },
    { value: 'mascota', label: 'Mascota con Manual' },
    { value: 'patron', label: 'Patrón' },
    { value: 'iconos', label: 'Set 20 Iconos' },
    { value: 'editorial', label: 'Ilustración Editorial' },
    { value: 'arte-conceptual', label: 'Arte Conceptual' },
    { value: 'storyboard', label: 'Storyboard (20 escenas)' },
    { value: 'mapa', label: 'Mapa Ilustrado' },
    { value: 'infografia', label: 'Infografía Ilustrada' },
    { value: 'portada', label: 'Portada Ilustrada' },
    { value: 'producto', label: 'Producto Ilustrado' },
    { value: 'tecnico', label: 'Dibujo Técnico' }
  ],
  'moda': [
    { value: 'coleccion', label: 'Diseño de Colección (8-12 piezas)' },
    { value: 'tech-pack', label: 'Tech Pack (Ficha técnica)' },
    { value: 'lookbook', label: 'Lookbook (Catálogo)' },
    { value: 'moodboard', label: 'Moodboard (Panel inspiración)' },
    { value: 'figurin', label: 'Figurín (Dibujo técnico)' },
    { value: 'patron-textil', label: 'Patrón Textil' },
    { value: 'marca-moda', label: 'Marca de Moda (Identidad)' },
    { value: 'catalogo', label: 'Catálogo de Moda' },
    { value: 'flat-sketch', label: 'Flat Sketch (Dibujo plano)' },
    { value: 'portfolio', label: 'Portfolio de Moda' },
    { value: 'campana', label: 'Campaña de Moda Básica' },
    { value: 'etiquetas', label: 'Etiquetas y Packaging' }
  ]
};

// Multipliers for different aspects
export const complexityMultipliers: Record<ComplexityLevel, number> = {
  'simple': 1,
  'moderado': 1.5,
  'complejo': 2,
  'premium': 2.5
};

export const urgencyMultipliers: Record<UrgencyLevel, { value: number; days: number }> = {
  'estandar': { value: 1, days: 14 },
  'rapido': { value: 1.5, days: 7 },
  'urgente': { value: 2, days: 3 },
  'inmediato': { value: 2.5, days: 1 }
};

export const rightsMultipliers: Record<RightsLevel, number> = {
  'pequena': 1,
  'profesional': 1.5,
  'empresarial': 2,
  'corporativo': 2.5
};

export const scopeMultipliers: Record<ScopeLevel, number> = {
  'personal': 1,
  'comercial-local': 1.5,
  'comercial-nacional': 2,
  'comercial-internacional': 2.5
};

export const expertiseMultipliers: Record<ExpertiseLevel, number> = {
  'junior': 0.8,
  'mid': 1,
  'senior': 1.5,
  'expert': 2
};

// Discount and fee structures
export const volumeDiscounts: Record<VolumeDiscountType, number> = {
  'none': 0,
  '2-3': 0.1,
  '4-5': 0.15,
  '6+': 0.2
};

export const clientDiscounts: Record<ClientDiscountType, number> = {
  'normal': 0,
  'recurrente': 0.05,
  'vip': 0.1
};

export const maintenanceFees: Record<MaintenanceType, number> = {
  'none': 0,
  'mensual': 0.2,
  'trimestral': 0.15,
  'anual': 0.1
};