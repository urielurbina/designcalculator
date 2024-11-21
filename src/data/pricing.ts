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
    'logotipo-completo': 25000,
    'rediseno': 18000,
    'manual': 15000,
    'logotipo': 8000,
    'vectorizacion': 3000,
    'papeleria': 5000,
    'key-visual': 6000,
    'slogan': 4000,
    'naming': 5000,
    'identidad-basica': 5000,
    'identidad-completa': 8000,
    'brand-book': 5000,
    'brandscape': 4000,
    'brand-voice': 3000,
    'submarca': 2500,
    'trademark': 1500,
    'auditoria': 1000,
    'arquetipos': 500,
    'estrategia-marca': 7000
  },
  'ilustracion': {
    'boceto-personaje': 3000,
    'ilustracion-2d-bn': 4000,
    'ilustracion-2d-color': 6000,
    'avatar': 2500,
    'objetos-accesorios': 2000,
    'pagina-historieta': 8000,
    'colorizacion': 2000,
    'fondos': 3500,
    'ilustracion-3d': 12000,
    'mano-alzada': 4500,
    'vectorial': 5000,
    'infografia': 7000,
    'personaje': 2500,
    'mascota': 3500,
    'patron': 2000,
    'iconos': 3500,
    'editorial': 4000,
    'arte-conceptual': 5000,
    'storyboard': 6000,
    'mapa': 4000,
    'portada': 4000,
    'producto': 2500,
    'tecnico': 3500
  },
  'publicidad-exterior': {
    'pendon': 3000,
    'senaletica': 5000,
    'valla': 8000,
    'valla-movil': 7000,
    'rotulacion-pequena': 3000,
    'rotulacion-mediana': 5000,
    'rotulacion-grande': 8000,
    'rotulacion-completa': 12000,
    'pantalla-led': 6000,
    'lona': 800,
    'banderola': 2500
  },
  'impresos': {
    'poster': 3000,
    'aviso': 2500,
    'bolsa': 3000,
    'empaque': 8000,
    'catalogo': 2000,
    'correo': 1500,
    'diagramacion': 2000,
    'diseno-libro': 3000,
    'diseno-revista': 3000,
    'portada': 4000,
    'exhibidor': 6000,
    'folleto': 3000,
    'invitacion': 2000,
    'brochure': 5000,
    'programa': 3000,
    'totem': 6000,
    'volante': 1500
  },
  'foto-video': {
    'sesion-foto': 8000,
    'foto-producto': 5000,
    'retoque': 1000,
    'video-rrss': 6000,
    'drone-dia': 12000,
    'drone-hora': 2000,
    'evento': 15000,
    'food-styling': 8000,
    'camarografo': 8000,
    'sonidista': 6000,
    'video-corporativo': 25000,
    'video-croma': 18000,
    'video-youtube': 12000
  },
  'edicion-animacion': {
    'animacion-creditos': 5000,
    'animacion-brochure': 8000,
    'animacion-textos': 3000,
    'pack-rrss': 6000,
    'colorizacion-video': 4000,
    'musica': 3000,
    'vfx': 8000,
    'edicion': 5000,
    'gif': 2000,
    'subtitulos': 1000,
    'video-2d': 15000,
    'video-mixto': 20000,
    'rotoscopia': 25000
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
    { value: 'logotipo-completo', label: 'Logotipo Completo' },
    { value: 'rediseno', label: 'Rediseño' },
    { value: 'manual', label: 'Manual de Marca' },
    { value: 'logotipo', label: 'Logotipo Básico' },
    { value: 'vectorizacion', label: 'Vectorización' },
    { value: 'papeleria', label: 'Papelería' },
    { value: 'key-visual', label: 'Key Visual' },
    { value: 'slogan', label: 'Slogan' },
    { value: 'naming', label: 'Naming' },
    { value: 'brand-book', label: 'Brand Book' },
    { value: 'brandscape', label: 'Brandscape' },
    { value: 'brand-voice', label: 'Brand Voice' },
    { value: 'submarca', label: 'Submarca' },
    { value: 'trademark', label: 'Trademark' },
    { value: 'auditoria', label: 'Auditoría' },
    { value: 'arquetipos', label: 'Arquetipos' },
    { value: 'estrategia-marca', label: 'Estrategia' }
  ],
  'ilustracion': [
    { value: 'boceto-personaje', label: 'Boceto de Personaje' },
    { value: 'ilustracion-2d-bn', label: 'Ilustración 2D B/N' },
    { value: 'ilustracion-2d-color', label: 'Ilustración 2D Color' },
    { value: 'avatar', label: 'Avatar' },
    { value: 'objetos-accesorios', label: 'Objetos y Accesorios' },
    { value: 'pagina-historieta', label: 'Página de Historieta' },
    { value: 'colorizacion', label: 'Colorización' },
    { value: 'fondos', label: 'Fondos' },
    { value: 'ilustracion-3d', label: 'Ilustración 3D' },
    { value: 'mano-alzada', label: 'Mano Alzada' },
    { value: 'vectorial', label: 'Vectorial' },
    { value: 'infografia', label: 'Infografía' }
  ],
  'publicidad-exterior': [
    { value: 'pendon', label: 'Pendón' },
    { value: 'senaletica', label: 'Señalética' },
    { value: 'valla', label: 'Valla' },
    { value: 'valla-movil', label: 'Valla Móvil' },
    { value: 'rotulacion-pequena', label: 'Rotulación Pequeña' },
    { value: 'rotulacion-mediana', label: 'Rotulación Mediana' },
    { value: 'rotulacion-grande', label: 'Rotulación Grande' },
    { value: 'rotulacion-completa', label: 'Rotulación Completa' },
    { value: 'pantalla-led', label: 'Pantalla LED' },
    { value: 'lona', label: 'Lona' },
    { value: 'banderola', label: 'Banderola' }
  ],
  'impresos': [
    { value: 'poster', label: 'Póster' },
    { value: 'aviso', label: 'Aviso' },
    { value: 'bolsa', label: 'Bolsa' },
    { value: 'empaque', label: 'Empaque' },
    { value: 'catalogo', label: 'Catálogo' },
    { value: 'correo', label: 'Correo' },
    { value: 'diagramacion', label: 'Diagramación' },
    { value: 'diseno-libro', label: 'Diseño de Libro' },
    { value: 'diseno-revista', label: 'Diseño de Revista' },
    { value: 'portada', label: 'Portada' },
    { value: 'exhibidor', label: 'Exhibidor' },
    { value: 'folleto', label: 'Folleto' },
    { value: 'invitacion', label: 'Invitación' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'programa', label: 'Programa' },
    { value: 'totem', label: 'Tótem' },
    { value: 'volante', label: 'Volante' }
  ],
  'foto-video': [
    { value: 'sesion-foto', label: 'Sesión de Fotos' },
    { value: 'foto-producto', label: 'Foto de Producto' },
    { value: 'retoque', label: 'Retoque' },
    { value: 'video-rrss', label: 'Video para RRSS' },
    { value: 'drone-dia', label: 'Drone (Día)' },
    { value: 'drone-hora', label: 'Drone (Hora)' },
    { value: 'evento', label: 'Evento' },
    { value: 'food-styling', label: 'Food Styling' },
    { value: 'camarografo', label: 'Camarógrafo' },
    { value: 'sonidista', label: 'Sonidista' },
    { value: 'video-corporativo', label: 'Video Corporativo' },
    { value: 'video-croma', label: 'Video con Croma' },
    { value: 'video-youtube', label: 'Video para YouTube' }
  ],
  'edicion-animacion': [
    { value: 'animacion-creditos', label: 'Animación de Créditos' },
    { value: 'animacion-brochure', label: 'Animación de Brochure' },
    { value: 'animacion-textos', label: 'Animación de Textos' },
    { value: 'pack-rrss', label: 'Pack RRSS' },
    { value: 'colorizacion-video', label: 'Colorización de Video' },
    { value: 'musica', label: 'Música' },
    { value: 'vfx', label: 'VFX' },
    { value: 'edicion', label: 'Edición' },
    { value: 'gif', label: 'GIF' },
    { value: 'subtitulos', label: 'Subtítulos' },
    { value: 'video-2d', label: 'Video 2D' },
    { value: 'video-mixto', label: 'Video Mixto' },
    { value: 'rotoscopia', label: 'Rotoscopía' }
  ],
  'editorial': [
    { value: 'libro-comercial', label: 'Libro Comercial' },
    { value: 'libro-arte', label: 'Libro de Arte' },
    { value: 'revista', label: 'Revista' },
    { value: 'catalogo-comercial', label: 'Catálogo Comercial' },
    { value: 'catalogo-premium', label: 'Catálogo Premium' },
    { value: 'memoria-anual', label: 'Memoria Anual' },
    { value: 'whitepaper', label: 'Whitepaper' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'editorial-digital', label: 'Editorial Digital' },
    { value: 'maquetacion', label: 'Maquetación' },
    { value: 'portada', label: 'Portada' },
    { value: 'infografia', label: 'Infografía' }
  ],
  'web': [
    { value: 'webapp-basica', label: 'Web App Básica' },
    { value: 'webapp-completa', label: 'Web App Completa' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'app-design', label: 'Diseño de App' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'portal-corporativo', label: 'Portal Corporativo' },
    { value: 'intranet', label: 'Intranet' },
    { value: 'optimizacion', label: 'Optimización' },
    { value: 'mantenimiento', label: 'Mantenimiento' },
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
    { value: 'presentacion', label: 'Presentación' },
    { value: 'brochure-digital', label: 'Brochure Digital' },
    { value: 'brochure-impreso', label: 'Brochure Impreso' },
    { value: 'media-kit', label: 'Media Kit' },
    { value: 'pitch-deck', label: 'Pitch Deck' }
  ],
  'social-media': [
    { value: 'pack-basico', label: 'Pack Básico' },
    { value: 'pack-completo', label: 'Pack Completo' },
    { value: 'estrategia-social', label: 'Estrategia Social' },
    { value: 'calendario-editorial', label: 'Calendario Editorial' },
    { value: 'video-redes', label: 'Video Redes' },
    { value: 'reel', label: 'Reel' },
    { value: 'pack-historias', label: 'Pack Historias' },
    { value: 'contenido-blog', label: 'Contenido Blog' },
    { value: 'contenido-newsletter', label: 'Contenido Newsletter' },
    { value: 'pack-publicidad', label: 'Pack Publicidad' },
    { value: 'copywriting', label: 'Copywriting' },
    { value: 'contenido-seo', label: 'Contenido SEO' }
  ],
  'audiovisual': [
    { value: 'video-corporativo', label: 'Video Corporativo' },
    { value: 'video-producto', label: 'Video Producto' },
    { value: 'documental', label: 'Documental' },
    { value: 'motion-graphics', label: 'Motion Graphics' },
    { value: 'animacion-3d', label: 'Animación 3D' },
    { value: 'video-comercial', label: 'Video Comercial' },
    { value: 'video-evento', label: 'Video Evento' },
    { value: 'video-educativo', label: 'Video Educativo' },
    { value: 'podcast-setup', label: 'Podcast Setup' },
    { value: 'pack-streaming', label: 'Pack Streaming' },
    { value: 'demo-reel', label: 'Demo Reel' },
    { value: 'video-aereo', label: 'Video Aéreo' }
  ],
  'fotografia': [
    { value: 'producto-basico', label: 'Producto Básico' },
    { value: 'producto-premium', label: 'Producto Premium' },
    { value: 'gastronomica', label: 'Gastronómica' },
    { value: 'retratos', label: 'Retratos' },
    { value: 'evento-medio', label: 'Evento Medio' },
    { value: 'evento-completo', label: 'Evento Completo' },
    { value: 'lookbook', label: 'Lookbook' },
    { value: 'arquitectura', label: 'Arquitectura' },
    { value: 'aereas', label: 'Aéreas' },
    { value: 'banco-imagenes', label: 'Banco de Imágenes' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'ecommerce', label: 'E-commerce' }
  ],
  'moda': [
    { value: 'coleccion', label: 'Colección' },
    { value: 'tech-pack', label: 'Tech Pack' },
    { value: 'lookbook', label: ' lookbook', label: 'Lookbook' },
    { value: 'moodboard', label: 'Moodboard' },
    { value: 'figurin', label: 'Figurín' },
    { value: 'patron-textil', label: 'Patrón Textil' },
    { value: 'marca-moda', label: 'Marca de Moda' },
    { value: 'catalogo', label: 'Catálogo' },
    { value: 'flat-sketch', label: 'Flat Sketch' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'campana', label: 'Campaña' },
    { value: 'etiquetas', label: 'Etiquetas' }
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