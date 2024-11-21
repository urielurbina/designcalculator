import { ServiceCategory, ServiceId, ServiceOptions, BaseRates } from '../types';

export const complexityMultipliers = {
  simple: 1,
  moderado: 1.5,
  complejo: 2,
  premium: 2.5
} as const;

export const urgencyMultipliers = {
  estandar: { value: 1, days: 14 },
  rapido: { value: 1.5, days: 7 },
  urgente: { value: 2, days: 3 },
  inmediato: { value: 2.5, days: 1 }
} as const;

export const rightsMultipliers = {
  pequena: 1,
  profesional: 1.5,
  empresarial: 2,
  corporativo: 2.5
} as const;

export const scopeMultipliers = {
  personal: 1,
  'comercial-local': 1.5,
  'comercial-nacional': 2,
  'comercial-internacional': 2.5
} as const;

export const expertiseMultipliers = {
  junior: 0.8,
  mid: 1,
  senior: 1.5,
  expert: 2
} as const;

export const volumeDiscounts = {
  'none': 0,
  '2-3': 0.1,
  '4-5': 0.15,
  '6+': 0.2
} as const;

export const clientDiscounts = {
  'normal': 0,
  'recurrente': 0.05,
  'vip': 0.1
} as const;

export const maintenanceFees = {
  'none': 0,
  'mensual': 0.2,
  'trimestral': 0.15,
  'anual': 0.1
} as const;

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
    'pattern': 5000,
    'iconos': 3000
  },
  'publicidad-exterior': {
    'espectacular': 15000,
    'parada-autobus': 8000,
    'valla': 10000,
    'vehicular': 12000
  },
  'impresos': {
    'folleto': 5000,
    'catalogo': 15000,
    'revista': 20000,
    'empaque': 18000
  },
  'foto-video': {
    'sesion-producto': 8000,
    'sesion-retrato': 6000,
    'video-corto': 15000,
    'video-corporativo': 25000
  },
  'edicion-animacion': {
    'edicion-basica': 5000,
    'motion-graphics': 12000,
    'animacion-2d': 18000,
    'animacion-3d': 25000
  },
  'direccion': {
    'direccion-arte': 20000,
    'consultoria': 15000,
    'estrategia': 18000
  },
  'social-media': {
    'feed-mensual': 8000,
    'historias-mensual': 6000,
    'reels-mensual': 12000,
    'pack-completo': 20000
  }
};

export const serviceOptions: ServiceOptions = {
  'identidad-corporativa': [
    { value: 'logotipo-completo', label: 'Nuevo Logotipo/Isologo + Manual + 5 Aplicaciones' },
    { value: 'rediseno', label: 'Rediseño Identidad Corporativa' },
    { value: 'manual', label: 'Manual de Identidad' },
    { value: 'logotipo', label: 'Logotipo' },
    { value: 'vectorizacion', label: 'Vectorización de Logo' },
    { value: 'papeleria', label: 'Diseño de Papelería' },
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
    { value: 'folleto', label: 'Folleto/Flyer' },
    { value: 'catalogo', label: 'Catálogo' },
    { value: 'revista', label: 'Revista' },
    { value: 'empaque', label: 'Diseño de Empaque' }
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