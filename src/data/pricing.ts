export const baseRates = {
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
    'animacion-2d': 15000,
    'animacion-3d': 25000
  },
  'direccion': {
    'direccion-arte': 20000,
    'consultoria': 15000,
    'estrategia': 18000
  },
  'social-media': {
    'pack-basico': 8000,
    'pack-premium': 15000,
    'pack-stories': 6000,
    'pack-reels': 12000
  }
} as const;

export const serviceOptions = {
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
    { value: 'sesion-producto', label: 'Sesión Fotografía de Producto' },
    { value: 'sesion-retrato', label: 'Sesión Retratos' },
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
    { value: 'consultoria', label: 'Consultoría de Marca' },
    { value: 'estrategia', label: 'Estrategia Visual' }
  ],
  'social-media': [
    { value: 'pack-basico', label: 'Pack Básico (10 posts)' },
    { value: 'pack-premium', label: 'Pack Premium (20 posts)' },
    { value: 'pack-stories', label: 'Pack Stories (15 stories)' },
    { value: 'pack-reels', label: 'Pack Reels (4 reels)' }
  ]
} as const;

export const expertiseMultipliers = {
  'junior': 0.7,
  'mid': 1.0,
  'senior': 1.4
} as const;

export const complexityMultipliers = {
  'simple': 1.0,
  'intermedio': 1.5,
  'complejo': 2.0,
  'premium': 2.5,
  'experto': 3.0
} as const;

export const urgencyMultipliers = {
  'estandar': {
    label: 'Estándar (Según cronograma)',
    value: 1.0,
    description: 'Tiempo normal de entrega según el tipo de proyecto'
  },
  'reducido': {
    label: 'Tiempo Reducido (25% menos)',
    value: 1.35,
    description: 'Reducción del 25% del tiempo estándar'
  },
  'urgente': {
    label: 'Urgente (50% menos)',
    value: 1.75,
    description: 'Reducción del 50% del tiempo estándar'
  },
  'inmediato': {
    label: 'Inmediato (75% menos)',
    value: 2.5,
    description: 'Reducción del 75% del tiempo estándar'
  }
} as const;

export const rightsMultipliers = {
  'personal': 1.0,
  'comercial-local': 1.5,
  'nacional': 2.0,
  'internacional': 3.0
} as const;

export const scopeMultipliers = {
  'basico': 1.0,
  'profesional': 1.5,
  'empresarial': 2.0,
  'corporativo': 3.0
} as const;

export const volumeDiscounts = {
  'none': 0,
  '2-3': 0.10,
  '4-5': 0.15,
  '6+': 0.20
} as const;

export const clientDiscounts = {
  'normal': 0,
  'recurrente': 0.05,
  'vip': 0.10
} as const;

export const maintenanceFees = {
  'none': 0,
  'mensual': 0.20,
  'trimestral': 0.15,
  'anual': 0.10
} as const;

export const standardDeliveryTimes = {
  'identidad-corporativa': {
    'logotipo-completo': 15,
    'rediseno': 12,
    'manual': 10,
    'logotipo': 7,
    'vectorizacion': 3,
    'papeleria': 5,
    'key-visual': 5,
    'slogan': 3,
    'naming': 5
  },
  'ilustracion': {
    'personaje': 5,
    'escena': 7,
    'pattern': 3,
    'iconos': 4
  },
  'publicidad-exterior': {
    'espectacular': 7,
    'parada-autobus': 5,
    'valla': 6,
    'vehicular': 5
  },
  'impresos': {
    'folleto': 3,
    'catalogo': 10,
    'revista': 15,
    'empaque': 12
  },
  'foto-video': {
    'sesion-producto': 5,
    'sesion-retrato': 3,
    'video-corto': 7,
    'video-corporativo': 15
  },
  'edicion-animacion': {
    'edicion-basica': 3,
    'motion-graphics': 7,
    'animacion-2d': 10,
    'animacion-3d': 15
  },
  'direccion': {
    'direccion-arte': 15,
    'consultoria': 10,
    'estrategia': 12
  },
  'social-media': {
    'pack-basico': 5,
    'pack-premium': 8,
    'pack-stories': 4,
    'pack-reels': 7
  }
} as const;