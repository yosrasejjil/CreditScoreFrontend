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
  rating?:number ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private financialDataService: FinancialDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
    if (this.userId) {
      this.loadFinancialData(this.userId);
    }
  }

  ngAfterViewInit() {
    // Set paginator and sort after the view initializes
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRatingFromScore(score: number): string {
     this.rating=1-score
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
        this.dataSource.data = data; // Update data source with fetched data
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


/* 





import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto';

@Component({
  selector: 'app-allcreditscores',
  templateUrl: './allcreditscores.component.html',
  styleUrls: ['./allcreditscores.component.css']
})
export class AllcreditscoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['accessionNo', 'prediction', 'id', 'assets']; // Adjust based on required columns
  dataSource: MatTableDataSource<FinancialDataDto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private financialDataService: FinancialDataService) {
    this.loadAllFinancialData();

  } ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
    if (this.userId) {
      this.loadFinancialData(this.userId);
     /* console.log('ohohoh:', this.financialData);

    }
  


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadFinancialData(userId: string): void {
    this.financialDataService.getFinancialDataByUser(userId).subscribe(
      (data: FinancialDataDto[]) => {
        this.financialData = data; // This should now be the array you expect
      },
      (error) => {
        console.error('Error fetching financial data:', error);
      }
    );
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto'; // Ensure this path is correct

@Component({
  selector: 'app-allcreditscores',
  templateUrl: './allcreditscores.component.html',
  styleUrls: ['./allcreditscores.component.css']
})
export class AllcreditscoresComponent implements OnInit {

  financialData: FinancialDataDto[] = []; // Ensure this matches the imported model type
  userId: string | null = null;

  constructor(private financialDataService: FinancialDataService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
    if (this.userId) {
      this.loadFinancialData(this.userId);
      console.log('ohohoh:', this.financialData);

    
  }


  loadFinancialData(userId: string): void {
    this.financialDataService.getFinancialDataByUser(userId).subscribe(
      (data: FinancialDataDto[]) => {
        this.financialData = data; // This should now be the array you expect
      },
      (error) => {
        console.error('Error fetching financial data:', error);
      }
    );
  }

}
   */