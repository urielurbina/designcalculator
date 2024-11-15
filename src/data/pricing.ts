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
    'infografia': 7000
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
    'lona': 2000,
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
  'direccion': {
    'corto': 50000,
    'largo': 150000,
    'serie': 200000,
    'corto-completo': 80000,
    'largo-completo': 250000
  },
  'social-media': {
    'plan': 8000,
    'grid': 4000,
    'informes': 3000,
    'post-single': 800,
    'pack-posts': 6000,
    'perfil': 2000,
    'avatar-social': 1500,
    'video-30': 4000,
    'video-60': 6000,
    'cm-basico': 12000,
    'cm-diseno': 18000,
    'cm-completo': 25000
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
    { value: 'boceto-personaje', label: 'Boceto de Personaje' },
    { value: 'ilustracion-2d-bn', label: 'Ilustración 2D B/N' },
    { value: 'ilustracion-2d-color', label: 'Ilustración 2D Color' },
    { value: 'avatar', label: 'Avatar' },
    { value: 'objetos-accesorios', label: 'Objetos y Accesorios' },
    { value: 'pagina-historieta', label: 'Página Historieta + Colorización' },
    { value: 'colorizacion', label: 'Colorización por Página' },
    { value: 'fondos', label: 'Fondos' },
    { value: 'ilustracion-3d', label: 'Ilustración 3D por Personaje' },
    { value: 'mano-alzada', label: 'Ilustración a Mano Alzada' },
    { value: 'vectorial', label: 'Ilustración Vectorial' },
    { value: 'infografia', label: 'Infografía Ilustrada' }
  ],
  'publicidad-exterior': [
    { value: 'pendon', label: 'Pendón' },
    { value: 'senaletica', label: 'Señalética' },
    { value: 'valla', label: 'Valla' },
    { value: 'valla-movil', label: 'Valla Móvil' },
    { value: 'rotulacion-pequena', label: 'Rotulación Vehículo 1%-5%' },
    { value: 'rotulacion-mediana', label: 'Rotulación Vehículo 6%-15%' },
    { value: 'rotulacion-grande', label: 'Rotulación Vehículo 16%-50%' },
    { value: 'rotulacion-completa', label: 'Rotulación Vehículo 51%-100%' },
    { value: 'pantalla-led', label: 'Pantalla LED' },
    { value: 'lona', label: 'Lona m2' },
    { value: 'banderola', label: 'Banderola' }
  ],
  'impresos': [
    { value: 'poster', label: 'Poster' },
    { value: 'aviso', label: 'Aviso' },
    { value: 'bolsa', label: 'Bolsa' },
    { value: 'empaque', label: 'Diseño Empaque + Mockup' },
    { value: 'catalogo', label: 'Catálogo Productos x Página' },
    { value: 'correo', label: 'Correo' },
    { value: 'diagramacion', label: 'Diagramación Editorial x Página' },
    { value: 'diseno-libro', label: 'Diseño Editorial Libro x Página' },
    { value: 'diseno-revista', label: 'Diseño Editorial Periódico/Revista x Página' },
    { value: 'portada', label: 'Diseño Portada/Contraportada' },
    { value: 'exhibidor', label: 'Exhibidor' },
    { value: 'folleto', label: 'Folleto x Página' },
    { value: 'invitacion', label: 'Invitación' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'programa', label: 'Programa Evento' },
    { value: 'totem', label: 'Tótem' },
    { value: 'volante', label: 'Volante' }
  ],
  'foto-video': [
    { value: 'sesion-foto', label: 'Sesión Fotográfica x Día' },
    { value: 'foto-producto', label: 'Foto Producto' },
    { value: 'retoque', label: 'Retoque Digital x Foto' },
    { value: 'video-rrss', label: 'Grabación Redes Sociales' },
    { value: 'drone-dia', label: 'Grabación Drone x Día' },
    { value: 'drone-hora', label: 'Grabación Drone x Hora' },
    { value: 'evento', label: 'Cubrimiento Evento x Día' },
    { value: 'food-styling', label: 'Food Styling' },
    { value: 'camarografo', label: 'Día Camarógrafo' },
    { value: 'sonidista', label: 'Día Sonidista' },
    { value: 'video-corporativo', label: 'Video Corporativo (60s)' },
    { value: 'video-croma', label: 'Video con Croma' },
    { value: 'video-youtube', label: 'Video Youtube' }
  ],
  'edicion-animacion': [
    { value: 'animacion-creditos', label: 'Animación Créditos' },
    { value: 'animacion-brochure', label: 'Animación Brochure 2D' },
    { value: 'animacion-textos', label: 'Animación Textos x 30s' },
    { value: 'pack-rrss', label: 'Paquete Animación RRSS x 15s' },
    { value: 'colorizacion-video', label: 'Colorización x Día' },
    { value: 'musica', label: 'Musicalización x Minuto' },
    { value: 'vfx', label: 'VFX x Minuto' },
    { value: 'edicion', label: 'Edición Video x Minuto' },
    { value: 'gif', label: 'GIF x 10s' },
    { value: 'subtitulos', label: 'Subtítulos x Minuto' },
    { value: 'video-2d', label: 'Video Animado 2D x Minuto' },
    { value: 'video-mixto', label: 'Video Animado Técnica Mixta x Minuto' },
    { value: 'rotoscopia', label: 'Video Animado Rotoscopia x Minuto' }
  ],
  'direccion': [
    { value: 'corto', label: 'Dirección Cortometraje' },
    { value: 'largo', label: 'Dirección Largometraje' },
    { value: 'serie', label: 'Dirección Serie x Temporada' },
    { value: 'corto-completo', label: 'Dirección + Producción Completa Cortometraje' },
    { value: 'largo-completo', label: 'Dirección + Producción Completa Largometraje' }
  ],
  'social-media': [
    { value: 'plan', label: 'Social Media Plan' },
    { value: 'grid', label: 'Diseño Grid' },
    { value: 'informes', label: 'Informes/Analítica' },
    { value: 'post-single', label: 'Post Single' },
    { value: 'pack-posts', label: '10 Publicaciones' },
    { value: 'perfil', label: 'Perfil Optimizado' },
    { value: 'avatar-social', label: 'Avatar' },
    { value: 'video-30', label: 'Video TikTok/Reel 30s' },
    { value: 'video-60', label: 'Video TikTok/Reel 60s' },
    { value: 'cm-basico', label: 'Community Management Básico Mensual' },
    { value: 'cm-diseno', label: 'Community Management con Diseño Mensual' },
    { value: 'cm-completo', label: 'Community Management Paquete Completo' }
  ]
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
    'boceto-personaje': 3,
    'ilustracion-2d-bn': 4,
    'ilustracion-2d-color': 5,
    'avatar': 2,
    'objetos-accesorios': 3,
    'pagina-historieta': 7,
    'colorizacion': 2,
    'fondos': 4,
    'ilustracion-3d': 8,
    'mano-alzada': 4,
    'vectorial': 5,
    'infografia': 6
  },
  'publicidad-exterior': {
    'pendon': 3,
    'senaletica': 5,
    'valla': 7,
    'valla-movil': 6,
    'rotulacion-pequena': 4,
    'rotulacion-mediana': 6,
    'rotulacion-grande': 8,
    'rotulacion-completa': 10,
    'pantalla-led': 5,
    'lona': 3,
    'banderola': 3
  },
  'impresos': {
    'poster': 3,
    'aviso': 2,
    'bolsa': 3,
    'empaque': 7,
    'catalogo': 2,
    'correo': 2,
    'diagramacion': 2,
    'diseno-libro': 3,
    'diseno-revista': 3,
    'portada': 4,
    'exhibidor': 5,
    'folleto': 3,
    'invitacion': 2,
    'brochure': 4,
    'programa': 3,
    'totem': 5,
    'volante': 2
  },
  'foto-video': {
    'sesion-foto': 1,
    'foto-producto': 2,
    'retoque': 1,
    'video-rrss': 3,
    'drone-dia': 1,
    'drone-hora': 1,
    'evento': 1,
    'food-styling': 2,
    'camarografo': 1,
    'sonidista': 1,
    'video-corporativo': 10,
    'video-croma': 7,
    'video-youtube': 5
  },
  'edicion-animacion': {
    'animacion-creditos': 3,
    'animacion-brochure': 5,
    'animacion-textos': 2,
    'pack-rrss': 4,
    'colorizacion-video': 2,
    'musica': 2,
    'vfx': 5,
    'edicion': 3,
    'gif': 2,
    'subtitulos': 1,
    'video-2d': 7,
    'video-mixto': 10,
    'rotoscopia': 12
  },
  'direccion': {
    'corto': 30,
    'largo': 90,
    'serie': 120,
    'corto-completo': 45,
    'largo-completo': 120
  },
  'social-media': {
    'plan': 7,
    'grid': 3,
    'informes': 2,
    'post-single': 1,
    'pack-posts': 5,
    'perfil': 2,
    'avatar-social': 2,
    'video-30': 3,
    'video-60': 4,
    'cm-basico': 30,
    'cm-diseno': 30,
    'cm-completo': 30
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