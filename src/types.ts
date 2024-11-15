export interface Service {
  id: string;
  name?: string;
  category: string;
  complexity: string;
  urgency: string;
  rights: string;
  scope: string;
  description?: string;
}

export interface SelectedService extends Service {
  name: string;
  basePrice: number;
  finalPrice: number;
  description: string;
  breakdown: PriceBreakdown;
}

export interface Touchpoint {
  id: string;
  name: string;
  price: number;
}

export interface PriceBreakdown {
  basePrice: number;
  complexity: number;
  urgency: number;
  rights: number;
  scope: number;
  volumeDiscount: number;
  clientDiscount: number;
  maintenance: number;
  finalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  services: Service[];
}

export interface QuoteInfo {
  // Designer Info
  designerName: string;
  designerWebsite: string;
  designerEmail: string;
  designerPhone: string;
  designerLogo?: string;

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