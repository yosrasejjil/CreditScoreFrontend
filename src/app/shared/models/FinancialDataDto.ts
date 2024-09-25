export interface FinancialDataDto {
  accessionNo: String;
  id: string;
  fy: number;
  fp: string;
  form: string;
  filed: Date;
 assets:number;

  currentAssets: number;
  currentLiabilities: number;
  stockholderEquity: number;
  liabilitiesAndStockholdersEquity: number;
  retainedEarnings: number;
  workingCapital: number;
  liabilities: number;
  cash: number;
  accountsReceivable: number;
  inventory: number;
  currentOtherAssets: number;
  noncurrentAssets: number;
  intangibleAssets: number;
  accountsPayable: number;
  shortTermDebt: number;
  longTermDebt: number;
  noncurrentLiabilities: number;
  earningBeforeInterestAndTaxes: number;
  revenues: number;
  netIncome: number;
  grossProfit: number;
  operatingExpenses: number;
  nonoperatingIncome: number;
  interestExpense: number;
  netCashOperatingActivities: number;
  netCashInvestingActivities: number;
  netCashFinancingActivities: number;
}
