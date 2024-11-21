// Update the type imports
import { ServiceCategory, ServiceId, ServiceOptions, BaseRates } from '../types';

// Add type assertions to the objects
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
  // ... rest of your baseRates
} as const;

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
  // ... rest of your serviceOptions
} as const;

// Rest of your code with proper type assertions...