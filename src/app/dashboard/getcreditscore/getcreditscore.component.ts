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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

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
    CommonModule,
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

  constructor(private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
      // Default values for the form, replace with dynamic data if available
      const defaultValues = {
         accessionNo: '',
          form: '',
          filed: '',
          assets: 2.428057e9,
          currentAssets: 257817000.0,
          currentLiabilities: 447636000.0,
          stockholdersEquity: 1.225684e9,
          liabilitiesAndStockholdersEquity: 2.428057e9,
          earningBeforeInterestAndTaxes: -42377000.0,
          retainedEarnings: -268872000.0,
          revenues: 163914000.0,
          workingCapital: -189819000.0,
          liabilities: 1.202373e9,
          netCashOperatingActivities: 7882000.0,
          netCashInvestingActivities: -202532000.0,
          netCashFinancingActivities: 108539000.0,
          cash: 75571000.0,
          accountsReceivable: 127259000.0,
          inventory: 0,
          currentOtherAssets: 0,
          noncurrentAssets: 2.170240e9,
          intangibleAssets: 939725000.0,
          accountsPayable: 29855000.0,
          netIncome: -21643000.0,
          grossProfit: 0,
          operatingExpenses: 206291000.0,
          nonoperatingIncome: 1003000.0,
          interestExpense: 415000.0,
          shortTermDebt: 6404000.0,
          longTermDebt: 616463000.0,
          cik: 1774675,
          noncurrentLiabilities: 754737000.0,
        };
  
      // Accessions Form Group
      this.accessionFormGroup = this._formBuilder.group({
        accessionNo: [defaultValues.accessionNo, [Validators.required]], // Minimum 10 digits
          form: [defaultValues.form, Validators.required],
          filed: [defaultValues.filed, Validators.required],
      });
  
      // Balance Sheet Form Group
      this.balanceSheetFormGroup = this._formBuilder.group({
          assets: [defaultValues.assets, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          currentAssets: [defaultValues.currentAssets, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          currentLiabilities: [defaultValues.currentLiabilities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          stockholdersEquity: [defaultValues.stockholdersEquity, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          liabilitiesAndStockholdersEquity: [defaultValues.liabilitiesAndStockholdersEquity, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          retainedEarnings: [defaultValues.retainedEarnings, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          workingCapital: [defaultValues.workingCapital, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          liabilities: [defaultValues.liabilities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          cash: [defaultValues.cash, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          accountsReceivable: [defaultValues.accountsReceivable, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          inventory: [defaultValues.inventory, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          currentOtherAssets: [defaultValues.currentOtherAssets, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          noncurrentAssets: [defaultValues.noncurrentAssets, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          intangibleAssets: [defaultValues.intangibleAssets, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          accountsPayable: [defaultValues.accountsPayable, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          shortTermDebt: [defaultValues.shortTermDebt, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          longTermDebt: [defaultValues.longTermDebt, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          noncurrentLiabilities: [defaultValues.noncurrentLiabilities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
      });
  
      // Income Statement Form Group
      this.incomeStatementFormGroup = this._formBuilder.group({
          earningBeforeInterestAndTaxes: [defaultValues.earningBeforeInterestAndTaxes, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          revenues: [defaultValues.revenues, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          netIncome: [defaultValues.netIncome, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          grossProfit: [defaultValues.grossProfit, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          operatingExpenses: [defaultValues.operatingExpenses, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          nonoperatingIncome: [defaultValues.nonoperatingIncome, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          interestExpense: [defaultValues.interestExpense, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
      });
  
      // Cashflow Form Group
      this.cashflowFormGroup = this._formBuilder.group({
          netCashOperatingActivities: [defaultValues.netCashOperatingActivities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          netCashInvestingActivities: [defaultValues.netCashInvestingActivities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
          netCashFinancingActivities: [defaultValues.netCashFinancingActivities, [Validators.required, Validators.pattern('^-?[0-9]*(\\.[0-9]+)?$')]],
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
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        // User canceled the confirmation
        return;
      }
  
      // Proceed with form validation and submission
      if (
        this.accessionFormGroup.invalid ||
        this.balanceSheetFormGroup.invalid ||
        this.incomeStatementFormGroup.invalid ||
        this.cashflowFormGroup.invalid
      ) {
        this.snackBar.open('Please fill out all forms correctly before submitting.', 'Close', {
          duration: 5000, // Show for 5 seconds
          panelClass: ['snackbar-error'], // Optional: Add custom styling
        });
        return;
      }
  
      const formData: FinancialDataDto = {
        ...this.accessionFormGroup.value,
        ...this.balanceSheetFormGroup.value,
        ...this.incomeStatementFormGroup.value,
        ...this.cashflowFormGroup.value,
        id: this.userId
      };
  
      this._financialDataService.addFinancialData(formData).subscribe(
        (response: any) => {
          console.log('Financial data saved:', response);
          this.snackBar.open('Financial data saved successfully!', 'Close', {
            duration: 5000, // Show for 5 seconds
            panelClass: ['snackbar-success'], // Optional: Add custom styling
          });
          this.router.navigate(['/dashboard/all-credit-scores']);
        },
        (error: any) => {
          console.error('Error saving financial data:', error);
          this.snackBar.open('There was an error submitting the form. Please try again.', 'Close', {
            duration: 5000, // Show for 5 seconds
            panelClass: ['snackbar-error'], // Optional: Add custom styling
          });
        }
      );
    });
  }
}