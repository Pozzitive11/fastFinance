export interface CreditInformation {
  id: number;
  user: string;
  issuance_date: string;
  return_date: string;
  actual_return_date: string;
  body: number;
  percent: number;
}
export interface MonthlyCreditStatistics {
  month: string;
  totalCredits: number;
  totalAmount: number;
  averageAmount: number;
  totalPercent: number;
  totalReturnedCredits: number;
}
