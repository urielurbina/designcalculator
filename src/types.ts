import { 
  BaseRateKey,
  ServiceOptionKey,
  ExpertiseKey,
  ComplexityKey,
  UrgencyKey,
  RightsKey,
  ScopeKey,
  VolumeDiscountKey,
  ClientDiscountKey,
  MaintenanceFeeKey
} from './data/pricing';

export interface Service {
  id: string;
  name?: string;
  category: BaseRateKey;
  complexity: ComplexityKey;
  urgency: UrgencyKey;
  rights: RightsKey;
  scope: ScopeKey;
  expertise: ExpertiseKey;
  quantity: number;
  description?: string;
}

export interface SelectedService extends Service {
  name: string;
  basePrice: number;
  finalPrice: number;
  finalPriceUSD: number;
  description: string;
  breakdown: PriceBreakdown;
}

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
}

export interface QuoteInfo {
  designerName: string;
  designerWebsite: string;
  designerEmail: string;
  designerPhone: string;
  designerLogo?: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  notes: string;
}

export interface Touchpoint {
  id: string;
  name: string;
  price: number;
}

export type PricingKey = keyof typeof import('./data/pricing');