// Add these type definitions at the top of the file
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

export type ServiceOption = {
  value: ServiceId;
  label: string;
};

export type ServiceOptions = {
  [K in ServiceCategory]: ServiceOption[];
};

export type BaseRates = {
  [K in ServiceCategory]: {
    [key in ServiceId]?: number;
  };
};

// Update Service interface
export interface Service {
  id: ServiceId;
  name?: string;
  category: ServiceCategory;
  complexity: keyof typeof import('./data/pricing').complexityMultipliers;
  urgency: keyof typeof import('./data/pricing').urgencyMultipliers;
  rights: keyof typeof import('./data/pricing').rightsMultipliers;
  scope: keyof typeof import('./data/pricing').scopeMultipliers;
  expertise: keyof typeof import('./data/pricing').expertiseMultipliers;
  quantity: number;
  description?: string;
}

// Rest of your existing types...