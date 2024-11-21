export interface Service {
  id: string;
  name?: string;
  category: string;
  complexity: string;
  urgency: string;
  rights: string;
  scope: string;
  expertise: string;
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
  clientMultiplier?: number;
  urgencyMultiplier?: number;
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