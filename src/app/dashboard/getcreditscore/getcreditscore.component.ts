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
import { Router } from '@angular/router';

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

  constructor(    private router: Router // Inject Router
  ) {
    this.accessionFormGroup = this._formBuilder.group({
      accessionNo: ['0001234567', Validators.required], // Default value for Accession No
      fy: [2023, Validators.required],                   // Default Fiscal Year
      fp: ['Q4', Validators.required],                   // Default Fiscal Period
      form: ['10-K', Validators.required],               // Default Form Type
      filed: ['2023-12-31', Validators.required],        // Default Filed Date
    });

    this.balanceSheetFormGroup = this._formBuilder.group({
      assets: [7921488.0, Validators.required],
      currentAssets: [1437.0, Validators.required],
      currentLiabilities: [9083390.0, Validators.required],
      stockholdersEquity: [-124462.0, Validators.required],
      liabilitiesAndStockholdersEquity: [7921488.0, Validators.required],
      retainedEarnings: [-17106213.0, Validators.required],
      workingCapital: [-7645903.0, Validators.required],
      liabilities: [9195950.0, Validators.required],
      cash: [323449.0, Validators.required],
      accountsReceivable: [1847358.0, Validators.required],
      inventory: [0, Validators.required],
      currentOtherAssets: [0, Validators.required],
      noncurrentAssets: [0, Validators.required],
      intangibleAssets: [0, Validators.required],
      accountsPayable: [21742000.0, Validators.required],
      shortTermDebt: [0, Validators.required],
      longTermDebt: [112560.0, Validators.required],
      noncurrentLiabilities: [0, Validators.required],
    });

    this.incomeStatementFormGroup = this._formBuilder.group({
      earningBeforeInterestAndTaxes: [-87655.0, Validators.required],
      revenues: [881908.0, Validators.required],
      netIncome: [-1469598.0, Validators.required],
      grossProfit: [0, Validators.required],
      operatingExpenses: [0, Validators.required],
      nonoperatingIncome: [0, Validators.required],
      interestExpense: [1397067.0, Validators.required],
    });

    this.cashflowFormGroup = this._formBuilder.group({
      netCashOperatingActivities: [-120660.0, Validators.required],
      netCashInvestingActivities: [260637.0, Validators.required],
      netCashFinancingActivities: [-26785.0, Validators.required],
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
    
        // Navigate to AllCreditScoresComponent
        this.router.navigate(['/dashboard/all-credit-scores']); // Reloads the component to show updated data
    
        alert("Form submission successful!");
      },
      (error: any) => {
        console.error('Error saving financial data:', error);
        alert("There was an error submitting the form. Please try again.");
      }
    );
  }
}
