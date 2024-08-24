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
  

  constructor(private axiosService: AxiosService, private router: Router) {}

  onLogin(): void {
    this.axiosService.request('POST', '/login', {
      login: this.login,
      password: this.password
    }).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.axiosService.setAuthToken(null);
      this.router.navigate(['/home']);
    });
  }

  onRegister(): void {
    this.axiosService.request('POST', '/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
   

    }).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.axiosService.setAuthToken(null);
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