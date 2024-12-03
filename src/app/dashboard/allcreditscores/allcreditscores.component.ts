import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto';

@Component({
  selector: 'app-allcreditscores',
  templateUrl: './allcreditscores.component.html',
  styleUrls: ['./allcreditscores.component.css']
})
export class AllcreditscoresComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['accessionNo', 'prediction', 'score'];
  dataSource: MatTableDataSource<FinancialDataDto> = new MatTableDataSource<FinancialDataDto>();
  userId: string | null = null;
  rating?: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private financialDataService: FinancialDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
    if (this.userId) {
      this.loadFinancialData(this.userId); // Load financial data for the user
    }

    // Set up filter predicate using getPredictionLabel and getRatingFromScore
    this.dataSource.filterPredicate = (data: FinancialDataDto, filter: string) => {
      const filterValue = filter.trim().toLowerCase();

      // Get the rating label and prediction label
      const ratingLabel = this.getRatingFromScore(data.score);
      const predictionLabel = this.getPredictionLabel(data.prediction);

      // Combine fields to be filtered
      const combinedData = `${data.accessionNo ?? ''} ${predictionLabel} ${ratingLabel}`.toLowerCase();

      // Debugging log
      console.log("Filtering on:", combinedData, "with filter:", filterValue);

      return combinedData.includes(filterValue);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPredictionLabel(score: number): string {
    this.rating = 1 - score;
    if (this.rating >= 0.875 && this.rating <= 1.0) {
      return 'Highest Credit Quality (Extremely Strong Financial Commitment)';
    } else if (this.rating >= 0.75 && this.rating < 0.875) {
      return 'High Credit Quality (Very Strong Financial Commitment)';
    } else if (this.rating >= 0.625 && this.rating < 0.75) {
      return 'Upper-Medium Credit Quality (Strong Financial Commitment)';
    } else if (this.rating >= 0.5 && this.rating < 0.625) {
      return 'Medium Credit Quality (Financial Commitment weakens under adverse economic conditions)';
    } else if (this.rating >= 0.375 && this.rating < 0.5) {
      return 'Substantial Credit Risk (Financial Commitment is vulnerable but the company has the capacity to meet its obligations)';
    } else if (this.rating >= 0.25 && this.rating < 0.375) {
      return 'High Credit Risk (Financial Commitment is more vulnerable but the company has the capacity to meet its obligations)';
    } else if (this.rating >= 0.125 && this.rating < 0.25) {
      return 'Very High Credit Risk (Financial Commitment highly vulnerable and the company is dependent upon favorable economic conditions to meet its obligations)';
    } else if (this.rating >= 0.0 && this.rating < 0.125) {
      return 'In Default (Obligation is in default or in breach of an imputed promise)';
    } else {
      return 'Invalid Score';
    }
  }
  
  
  getRatingFromScore(score: number): string {
    this.rating = 1 - score;
    if (this.rating >= 0.875 && this.rating <= 1.0) {
      return 'AAA';
    } else if (this.rating >= 0.75 && this.rating < 0.875) {
      return 'AA';
    } else if (this.rating >= 0.625 && this.rating < 0.75) {
      return 'A';
    } else if (this.rating >= 0.5 && this.rating < 0.625) {
      return 'BBB';
    } else if (this.rating >= 0.375 && this.rating < 0.5) {
      return 'BB';
    } else if (this.rating >= 0.25 && this.rating < 0.375) {
      return 'B';
    } else if (this.rating >= 0.125 && this.rating < 0.25) {
      return 'CCC/CC/C';
    } else if (this.rating >= 0.0 && this.rating < 0.125) {
      return 'D';
    } else {
      return 'Invalid Score';
    }
  }

  loadFinancialData(userId: string): void {
    this.financialDataService.getFinancialDataByUser(userId).subscribe(
      (data: FinancialDataDto[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching financial data:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
