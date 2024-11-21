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
    'naming': 5000
  },
  'ilustracion': {
    'personaje': 8000,
    'escena': 12000,
    'pattern': 6000,
    'iconos': 4000
  },
  'publicidad-exterior': {
    'espectacular': 15000,
    'parada-autobus': 10000,
    'valla': 12000,
    'vehicular': 8000
  },
  'impresos': {
    'folleto': 6000,
    'catalogo': 15000,
    'revista': 20000,
    'empaque': 12000
  },
  'foto-video': {
    'sesion-producto': 8000,
    'sesion-retrato': 6000,
    'video-corto': 12000,
    'video-corporativo': 25000
  },
  'edicion-animacion': {
    'edicion-basica': 5000,
    'motion-graphics': 12000,
    'animacion-2d': 15000,
    'animacion-3d': 25000
  },
  'direccion': {
    'direccion-arte': 20000,
    'consultoria': 15000,
    'estrategia': 18000
  },
  'social-media': {
    'feed-mensual': 12000,
    'historias-mensual': 8000,
    'reels-mensual': 15000,
    'pack-completo': 30000
  }
};

// Service options for each category
export const serviceOptions: ServiceOptions = {
  'identidad-corporativa': [
    { value: 'logotipo-completo', label: 'Logotipo Completo + Manual' },
    { value: 'rediseno', label: 'Rediseño de Marca' },
    { value: 'manual', label: 'Manual de Marca' },
    { value: 'logotipo', label: 'Solo Logotipo' },
    { value: 'vectorizacion', label: 'Vectorización' },
    { value: 'papeleria', label: 'Papelería Corporativa' },
    { value: 'key-visual', label: 'Key Visual' },
    { value: 'slogan', label: 'Slogan' },
    { value: 'naming', label: 'Naming' }
  ],
  'ilustracion': [
    { value: 'personaje', label: 'Diseño de Personaje' },
    { value: 'escena', label: 'Ilustración de Escena' },
    { value: 'pattern', label: 'Patrón/Textura' },
    { value: 'iconos', label: 'Set de Iconos' }
  ],
  'publicidad-exterior': [
    { value: 'espectacular', label: 'Espectacular' },
    { value: 'parada-autobus', label: 'Parada de Autobús' },
    { value: 'valla', label: 'Valla Publicitaria' },
    { value: 'vehicular', label: 'Rotulación Vehicular' }
  ],
  'impresos': [
    { value: 'folleto', label: 'Folleto' },
    { value: 'catalogo', label: 'Catálogo' },
    { value: 'revista', label: 'Revista' },
    { value: 'empaque', label: 'Empaque' }
  ],
  'foto-video': [
    { value: 'sesion-producto', label: 'Sesión de Producto' },
    { value: 'sesion-retrato', label: 'Sesión de Retrato' },
    { value: 'video-corto', label: 'Video Corto' },
    { value: 'video-corporativo', label: 'Video Corporativo' }
  ],
  'edicion-animacion': [
    { value: 'edicion-basica', label: 'Edición Básica' },
    { value: 'motion-graphics', label: 'Motion Graphics' },
    { value: 'animacion-2d', label: 'Animación 2D' },
    { value: 'animacion-3d', label: 'Animación 3D' }
  ],
  'direccion': [
    { value: 'direccion-arte', label: 'Dirección de Arte' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'estrategia', label: 'Estrategia' }
  ],
  'social-media': [
    { value: 'feed-mensual', label: 'Feed Mensual' },
    { value: 'historias-mensual', label: 'Historias Mensuales' },
    { value: 'reels-mensual', label: 'Reels Mensuales' },
    { value: 'pack-completo', label: 'Pack Completo' }
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