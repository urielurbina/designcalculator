// Service Types
export type ServiceId = 
  // Identidad Corporativa
  | 'logotipo' | 'identidad-basica' | 'identidad-completa' | 'rediseno' | 'brand-book'
  | 'naming' | 'brandscape' | 'brand-voice' | 'submarca' | 'trademark' | 'auditoria'
  | 'arquetipos' | 'estrategia-marca'
  // Editorial
  | 'libro-comercial' | 'libro-arte' | 'revista' | 'catalogo-comercial' | 'catalogo-premium'
  | 'memoria-anual' | 'whitepaper' | 'newsletter' | 'editorial-digital' | 'maquetacion'
  | 'portada' | 'infografia'
  // Web
  | 'webapp-basica' | 'webapp-completa' | 'ecommerce' | 'landing-page' | 'app-design'
  | 'dashboard' | 'portal-corporativo' | 'intranet' | 'optimizacion' | 'mantenimiento'
  | 'prototipo' | 'ui-kit'
  // Marketing
  | 'campana-completa' | 'campana-digital' | 'campana-print' | 'merchandising' | 'packaging'
  | 'punto-venta' | 'stand' | 'presentacion' | 'brochure-digital' | 'brochure-impreso'
  | 'media-kit' | 'pitch-deck'
  // Social Media
  | 'pack-basico' | 'pack-completo' | 'estrategia-social' | 'calendario-editorial'
  | 'video-redes' | 'reel' | 'pack-historias' | 'contenido-blog' | 'contenido-newsletter'
  | 'pack-publicidad' | 'copywriting' | 'contenido-seo'
  // Audiovisual
  | 'video-corporativo' | 'video-producto' | 'documental' | 'motion-graphics' | 'animacion-3d'
  | 'video-comercial' | 'video-evento' | 'video-educativo' | 'podcast-setup' | 'pack-streaming'
  | 'demo-reel' | 'video-aereo'
  // Fotografía
  | 'producto-basico' | 'producto-premium' | 'gastronomica' | 'retratos' | 'evento-medio'
  | 'evento-completo' | 'lookbook' | 'arquitectura' | 'aereas' | 'banco-imagenes'
  | 'lifestyle' | 'ecommerce'
  // Ilustración
  | 'personaje' | 'mascota' | 'patron' | 'iconos' | 'editorial' | 'arte-conceptual'
  | 'storyboard' | 'mapa' | 'infografia' | 'portada' | 'producto' | 'tecnico'
  // Moda
  | 'coleccion' | 'tech-pack' | 'lookbook' | 'moodboard' | 'figurin' | 'patron-textil'
  | 'marca-moda' | 'catalogo' | 'flat-sketch' | 'portfolio' | 'campana' | 'etiquetas';

export type ServiceCategory = 
  | 'identidad-corporativa'
  | 'editorial'
  | 'web'
  | 'marketing'
  | 'social-media'
  | 'audiovisual'
  | 'fotografia'
  | 'ilustracion'
  | 'moda';

export type ComplexityLevel = 'simple' | 'moderado' | 'complejo' | 'premium';
export type UrgencyLevel = 'estandar' | 'rapido' | 'urgente' | 'inmediato';
export type RightsLevel = 'pequena' | 'profesional' | 'empresarial' | 'corporativo';
export type ScopeLevel = 'personal' | 'comercial-local' | 'comercial-nacional' | 'comercial-internacional';
export type ExpertiseLevel = 'junior' | 'mid' | 'senior' | 'expert';

export type VolumeDiscountType = 'none' | '2-3' | '4-5' | '6+';
export type ClientDiscountType = 'normal' | 'recurrente' | 'vip';
export type MaintenanceType = 'none' | 'mensual' | 'trimestral' | 'anual';

export interface Service {
  id: ServiceId;
  name?: string;
  category: ServiceCategory;
  complexity: ComplexityLevel;
  urgency: UrgencyLevel;
  rights: RightsLevel;
  scope: ScopeLevel;
  expertise: ExpertiseLevel;
  quantity: number;
  description?: string;
}

export interface ServiceOption {
  value: ServiceId;
  label: string;
}

export interface ServiceOptions {
  [key: string]: ServiceOption[];
}

export interface BaseRates {
  [key: string]: {
    [key: string]: number;
  };
}

export interface SelectedService extends Service {
  name: string;
  basePrice: number;
  finalPrice: number;
  finalPriceUSD: number;
  description: string;
  breakdown: PriceBreakdown;
}

// Pricing Types
export interface PriceBreakdown {
  basePrice: number;
  complexity: number;
  urgency: number;
  rights: number;
  scope: number;
  expertise: number;
  volumeDiscount: number;
  clientDiscount: number;
  maintenance: number;
  finalPrice: number;
  finalPriceUSD: number;
  clientMultiplier: number;
  urgencyMultiplier: number;
}

// Touchpoint Types
export interface Touchpoint {
  id: string;
  name: string;
  price: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  services: Service[];
}

// Quote Types
export interface QuoteInfo {
  // Designer Info
  designerName: string;
  designerWebsite: string;
  designerEmail: string;
  designerPhone: string;
  designerLogo: string;

  // Client Info
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;

  // Quote Details
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  notes: string;
}