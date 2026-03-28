export interface CreditCard {
  id: string;
  title: string;
  billGenerationDate: number; // Day of month (1-31)
  billPaymentDate: number;   // Day of month (1-31)
  color?: string;
}

export interface Recommendation {
  bestCard: CreditCard;
  daysToRepay: number;
  statementDate: Date;
  dueDate: Date;
}
