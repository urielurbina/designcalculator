// Service Types
export type ServiceId = 
  | 'logotipo-completo' | 'rediseno' | 'manual' | 'logotipo' | 'vectorizacion'
  | 'papeleria' | 'key-visual' | 'slogan' | 'naming'
  | 'personaje' | 'escena' | 'pattern' | 'iconos'
  | 'espectacular' | 'parada-autobus' | 'valla' | 'vehicular'
  | 'folleto' | 'catalogo' | 'revista' | 'empaque'
  | 'sesion-producto' | 'sesion-retrato' | 'video-corto' | 'video-corporativo'
  | 'edicion-basica' | 'motion-graphics' | 'animacion-2d' | 'animacion-3d'
  | 'direccion-arte' | 'consultoria' | 'estrategia'
  | 'feed-mensual' | 'historias-mensual' | 'reels-mensual' | 'pack-completo';

export type ServiceCategory = 
  | 'identidad-corporativa'
  | 'ilustracion'
  | 'publicidad-exterior'
  | 'impresos'
  | 'foto-video'
  | 'edicion-animacion'
  | 'direccion'
  | 'social-media';

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