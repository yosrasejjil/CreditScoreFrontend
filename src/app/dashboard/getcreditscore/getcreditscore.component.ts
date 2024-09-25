import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-getcreditscore',
  templateUrl: './getcreditscore.component.html',
  styleUrls: ['./getcreditscore.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class GetcreditscoreComponent {

  private _formBuilder = inject(FormBuilder);
  private _financialDataService = inject(FinancialDataService);

  cashflowFormGroup: FormGroup;
  isLinear = false;
  balanceSheetFormGroup: FormGroup;
  incomeStatementFormGroup: FormGroup;
  accessionFormGroup: FormGroup;
  years: number[] = [];
  userId?: string | null; // Add userId property

  constructor() {
    this.accessionFormGroup = this._formBuilder.group({
      accessionNo: ['', Validators.required],
      fy: ['', Validators.required],
      fp: ['', Validators.required],
      form: ['', Validators.required],
      filed: ['', Validators.required],
    });

    this.balanceSheetFormGroup = this._formBuilder.group({
      assets: ['', Validators.required],
      currentAssets: ['', Validators.required],
      currentLiabilities: ['', Validators.required],
      stockholderEquity: ['', Validators.required],
      liabilitiesAndStockholdersEquity: ['', Validators.required],
      retainedEarnings: ['', Validators.required],
      workingCapital: ['', Validators.required],
      liabilities: ['', Validators.required],
      cash: ['', Validators.required],
      accountsReceivable: ['', Validators.required],
      inventory: ['', Validators.required],
      currentOtherAssets: ['', Validators.required],
      noncurrentAssets: ['', Validators.required],
      intangibleAssets: ['', Validators.required],
      accountsPayable: ['', Validators.required],
      shortTermDebt: ['', Validators.required],
      longTermDebt: ['', Validators.required],
      noncurrentLiabilities: ['', Validators.required],
    });

    this.incomeStatementFormGroup = this._formBuilder.group({
      earningBeforeInterestAndTaxes: ['', Validators.required],
      revenues: ['', Validators.required],
      netIncome: ['', Validators.required],
      grossProfit: ['', Validators.required],
      operatingExpenses: ['', Validators.required],
      nonoperatingIncome: ['', Validators.required],
      interestExpense: ['', Validators.required],
    });

    this.cashflowFormGroup = this._formBuilder.group({
      netCashOperatingActivities: ['', Validators.required],
      netCashInvestingActivities: ['', Validators.required],
      netCashFinancingActivities: ['', Validators.required],
    });
  }

  private loadFiscalYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    this.years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
  }

  ngOnInit(): void {
    this.loadFiscalYears();
    this.userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
  }

  onSubmit() {
    // Validate all forms
    if (this.accessionFormGroup.invalid || this.balanceSheetFormGroup.invalid || this.incomeStatementFormGroup.invalid || this.cashflowFormGroup.invalid) {
      alert("Please fill out all forms correctly before submitting.");
      return;
    }

    // Combine all form values and add user ID
    const formData: FinancialDataDto = {
      ...this.accessionFormGroup.value,
      ...this.balanceSheetFormGroup.value,
      ...this.incomeStatementFormGroup.value,
      ...this.cashflowFormGroup.value,
      id: this.userId // Add user ID to form data
    };

    this._financialDataService.addFinancialData(formData).subscribe(
      (response: any) => {
        console.log('Financial data saved:', response);
        alert("Form submission successful!");
      },
      (error: any) => {
        console.error('Error saving financial data:', error);
        alert("There was an error submitting the form. Please try again.");
      }
    );
  }
}
