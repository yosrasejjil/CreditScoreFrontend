export interface FinancialDataDto {
  accessionNo: string
  id: number
  assets: number
  fy: number
  fp: string
  form: string
  filed: number[]
  currentAssets: number
  currentLiabilities: number
  stockholdersEquity: any
  liabilitiesAndStockholdersEquity: number
  earningBeforeInterestAndTaxes: number
  retainedEarnings: number
  revenues: number
  workingCapital: number
  liabilities: number
  netCashOperatingActivities: number
  netCashInvestingActivities: number
  netCashFinancingActivities: number
  cash: number
  accountsReceivable: number
  inventory: number
  currentOtherAssets: number
  noncurrentAssets: number
  intangibleAssets: number
  accountsPayable: number
  netIncome: number
  grossProfit: number
  operatingExpenses: number
  nonoperatingIncome: number
  interestExpense: number
  shortTermDebt: number
  longTermDebt: number
  noncurrentLiabilities: number
  prediction?: any

}
