export type ActivePanel = 'quotes' | 'freelancer' | 'clients' | 'pdf-design' | 'services';

export interface Quote {
  id: string;
  quote_number: string;
  created_at: string;
  client: {
    name: string;
    company?: string;
  };
  total_amount: number;
  currency: 'MXN' | 'USD';
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}

export interface QuoteService {
  name?: string;
  description?: string;
  finalPrice?: number;
  finalPriceUSD?: number;
  quantity?: number;
  basePrice?: number;
  breakdown?: Record<string, any>;
  id?: string;
  category?: string;
  complexity?: string;
  urgency?: string;
  rights?: string;
  scope?: string;
  expertise?: string;
}