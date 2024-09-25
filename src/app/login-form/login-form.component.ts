import { EventEmitter, Component, Output } from '@angular/core';
import { AxiosService } from '../services/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  active: string = 'login'; // Tracks the active tab
  firstName: string = '';
  lastName: string = '';
  login: string = '';
  password: string = '';
  id?: number;

  constructor(private axiosService: AxiosService, private router: Router) {}

  // Modified onLogin method to store user_id
  onLogin(): void {
    this.axiosService.request('POST', '/login', {
      login: this.login,
      password: this.password
    }).then(response => {
      // Assuming the backend response contains the token and user_id
      this.axiosService.setAuthToken(response.data.token);  // Store token
      localStorage.setItem('user_id', response.data.id);    // Store user_id in localStorage
      localStorage.setItem('login', response.data.login);   // Store login in localStorage (if needed)

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.axiosService.setAuthToken(null);
      localStorage.removeItem('user_id');
      this.router.navigate(['/home']);
    });
  }

  // Modified onRegister method to store user_id
  onRegister(): void {
    this.axiosService.request('POST', '/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
      id: this.id
    }).then(response => {
      // Assuming the backend response contains the token and user_id
      this.axiosService.setAuthToken(response.data.token);  // Store token
      localStorage.setItem('user_id', response.data.id);    // Store user_id in localStorage
      localStorage.setItem('login', response.data.login);   // Store login in localStorage (if needed)

      // Navigate to dashboard
      this.router.navigate(['/dashboard/dashboard']);
    }).catch(error => {
      this.axiosService.setAuthToken(null);
      localStorage.removeItem('user_id');
      this.router.navigate(['/home']);
    });
  }

  onLoginTab(): void {
    this.active = 'login';
  }

  onRegisterTab(): void {
    this.active = 'register';
  }
}
