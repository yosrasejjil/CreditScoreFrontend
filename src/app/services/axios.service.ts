import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  // Retrieve the auth token from localStorage
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  // Save the auth token in localStorage
  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  // Save the user ID in localStorage
  setUserId(userId: string): void {
    window.localStorage.setItem('user_id', userId);
  }

  // Perform a request (POST, GET, etc.)
  request(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    // Add auth token to headers if available
    if (this.getAuthToken() !== null) {
      headers = { "Authorization": "Bearer " + this.getAuthToken() };
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
