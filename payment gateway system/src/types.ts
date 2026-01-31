
export enum PaymentStatus {
  INITIATED = 'INITIATED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export interface Payment {
  id: string;
  provider_id?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface WebhookEvent {
  id: string;
  payment_id: string;
  provider_event_id: string;
  status: string;
  payload: any;
  received_at: Date;
  processed_at?: Date;
}

export interface PaymentFilter {
  start_date: string; // ISO Date
  end_date: string; // ISO Date
  status?: PaymentStatus[];
  min_amount?: number;
  max_amount?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export enum DiscrepancyType {
  MISSING_WEBHOOK = 'MISSING_WEBHOOK',
  STATUS_MISMATCH = 'STATUS_MISMATCH',
  PROVIDER_ONLY = 'PROVIDER_ONLY'
}

export interface DiscrepancyReport {
  type: DiscrepancyType;
  payment_id?: string;
  description: string;
  details: any;
  detected_at: Date;
}
