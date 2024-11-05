/* import { Component, OnInit, ViewChild } from '@angular/core';
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
export class AllcreditscoresComponent implements OnInit {
  displayedColumns: string[] = ['accessionNo', 'prediction']; // Displayed columns
  dataSource: MatTableDataSource<FinancialDataDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private financialDataService: FinancialDataService // Inject the service
  ) {
    // Initialize dataSource with an empty array
    this.dataSource = new MatTableDataSource<FinancialDataDto>([]);
  }

  ngOnInit(): void {
    this.loadAllFinancialData(); // Fetch all financial data on component initialization
  }

  ngAfterViewInit() {
    // Set paginator and sort once the view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Method to fetch all financial data
  private loadAllFinancialData(): void {
    this.financialDataService.getAllFinancialData().subscribe(
      (data: FinancialDataDto[]) => {
        console.log('aaaaaaaaaaaaaaaaaa')

        this.dataSource.data = data; // Populate the dataSource with all financial data
        console.log(this.dataSource.data);

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
export class AllcreditscoresComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['accessionNo', 'prediction'];
  dataSource: MatTableDataSource<FinancialDataDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private financialDataService: FinancialDataService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<FinancialDataDto>([]);
  }

  ngOnInit(): void {
    this.loadAllFinancialData();
  }

  ngAfterViewInit() {
    // Ensure paginator and sort are set correctly after the view initializes
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadAllFinancialData(): void {
    this.financialDataService.getAllFinancialData().subscribe(
      (data: FinancialDataDto[]) => {
        console.log('Data fetched successfully:', data);
        this.dataSource = new MatTableDataSource<FinancialDataDto>(data); // Set data to the dataSource
        this.cdr.detectChanges(); // Trigger change detection
        console.log('potato:', this.dataSource.data);

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
} */








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
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAllFinancialData(): void {
    this.financialDataService.getAllFinancialData().subscribe(
      (data: FinancialDataDto[]) => {
        this.dataSource.data = data; // Set fetched data to dataSource
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
