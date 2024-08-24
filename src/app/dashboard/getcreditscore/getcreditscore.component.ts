import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
//import { FinancialDataService } from 'src/app/services/financialdata.service';
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
  ],
})
export class GetcreditscoreComponent {
  
  private _formBuilder = inject(FormBuilder);
 // private _financialDataService = inject(FinancialDataService);

  cashflowFormGroup: FormGroup;
  isLinear = false;
  balanceSheetFormGroup: FormGroup;
  incomeStatementFormGroup:FormGroup;

  constructor() {
    this.balanceSheetFormGroup = this._formBuilder.group({
      currentAssets: ['', Validators.required],
      currentLiabilities: ['', Validators.required],
      stockholderEquity: ['', Validators.required],
      liabilitiesAndStockholderEquity: ['', Validators.required],
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

  onSubmit() {
    // Validate all forms
    if (this.balanceSheetFormGroup.invalid || this.incomeStatementFormGroup.invalid || this.cashflowFormGroup.invalid) {
      alert("Please fill out all forms correctly before submitting.");
      return;
    }

    // Combine all form values
    const formData = {
      ...this.balanceSheetFormGroup.value,
      ...this.incomeStatementFormGroup.value,
      ...this.cashflowFormGroup.value,
    };

    /* Submit the valid form data
    this._financialDataService.addFinancialData(formData).subscribe(response => {
      console.log('Financial data saved:', response);
      alert("Form submission successful!");
    }, error => {
      console.error('Error saving financial data:', error);
      alert("There was an error submitting the form. Please try again.");
    });*/
  }




  
  

}

