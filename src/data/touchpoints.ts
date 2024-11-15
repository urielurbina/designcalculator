import { Touchpoint } from '../types';

const touchpoints: { [key: string]: Touchpoint[] } = {
  logo: [
    { id: 'logo-variations', name: 'Variaciones Adicionales de Logo', price: 150 },
    { id: 'logo-guidelines', name: 'Manual de Uso de Logo', price: 200 },
    { id: 'logo-animation', name: 'Animación Simple del Logo', price: 300 },
    { id: 'logo-mockups', name: 'Mockups Personalizados', price: 100 },
  ],
  branding: [
    { id: 'brand-patterns', name: 'Patrones y Texturas', price: 250 },
    { id: 'brand-presentation', name: 'Presentación de Marca', price: 300 },
    { id: 'brand-merchandise', name: 'Diseño de Merchandising', price: 400 },
    { id: 'brand-templates', name: 'Plantillas Corporativas', price: 350 },
  ],
  web: [
    { id: 'web-responsive', name: 'Diseño Responsive Adicional', price: 300 },
    { id: 'web-prototype', name: 'Prototipo Interactivo', price: 400 },
    { id: 'web-animations', name: 'Animaciones Personalizadas', price: 350 },
    { id: 'web-icons', name: 'Set de Iconos Personalizados', price: 200 },
  ],
  social: [
    { id: 'social-templates', name: 'Plantillas Adicionales', price: 150 },
    { id: 'social-stories', name: 'Diseños para Stories', price: 200 },
    { id: 'social-covers', name: 'Portadas para Redes', price: 100 },
    { id: 'social-gif', name: 'GIFs Personalizados', price: 250 },
  ],
};

export const getTouchpointsByProject = (projectType: string): Touchpoint[] => {
  return touchpoints[projectType] || [];
};