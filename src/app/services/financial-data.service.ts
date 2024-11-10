import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service'; // Assuming this is in the same directory
import { Observable, from, map } from 'rxjs';
import { FinancialDataDto } from '../shared/models/FinancialDataDto';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {
  
  getFinancialDataByUser(userId: string): Observable<FinancialDataDto[]> {
    const url = `/api/financial-data/user/${userId}`;
    return from(this.axiosService.request('GET', url, null)).pipe(
      map((response: any) => response.data) // Extracts the data property
    );
  }

  constructor(private axiosService: AxiosService) {}
  

  addFinancialData(financialData: FinancialDataDto): Observable<any> {
    const url = '/api/financial-data/create';
    return from(this.axiosService.request('POST', url, financialData));
  }

  getFinancialData(accessionNo: number): Observable<FinancialDataDto> {
    const url = `/api/financial-data/${accessionNo}`;
    return from(this.axiosService.request('GET', url, null));
  }

  getAllFinancialData(): Observable<FinancialDataDto[]> {
    const url = '/api/financial-data/all';
    console.log(this.axiosService.request('GET', url, null));
    return from(this.axiosService.request('GET', url, null));
  }

  updateFinancialData(accessionNo: number, financialData: FinancialDataDto): Observable<any> {
    const url = `/api/financial-data/update/${accessionNo}`;
    return from(this.axiosService.request('PUT', url, financialData));
  }

  deleteFinancialData(accessionNo: number): Observable<any> {
    const url = `/api/financial-data/delete/${accessionNo}`;
    return from(this.axiosService.request('DELETE', url, null));
  }
}
