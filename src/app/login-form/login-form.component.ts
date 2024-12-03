import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AxiosService } from '../services/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  active: string = 'login'; // Tracks the active tab
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private axiosService: AxiosService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize login form
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]], // Company Name validation
      password: ['', [Validators.required, Validators.minLength(8)]] // Minimum length of 6
    });
     // Initialize register form
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      login: ['', [Validators.required]], // Company Name validation
      password: ['', [Validators.required, Validators.minLength(8)]],
      id: ['', [Validators.minLength(10),Validators.required, Validators.pattern('^[0-9]{10}$') ]] // Only numeric ID
    }); 
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill out all fields correctly.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    const { login, password } = this.loginForm.value;

    this.axiosService.request('POST', '/login', { login, password })
      .then(response => {
        this.axiosService.setAuthToken(response.data.token);  // Store token
        localStorage.setItem('user_id', response.data.id);   
        localStorage.setItem('login', response.data.login);  // Set login name
        // Store user ID
        this.router.navigate(['/dashboard/dashboard']).then(() => {
          window.location.reload(); });// Forces a full page reload;});
        this.snackBar.open('Login successful!', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success'],
        });
      })
      .catch(() => {
        this.snackBar.open('Invalid login credentials.', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error'],
        });
      });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      const errors = [];
      if (this.registerForm.get('firstName')?.invalid) {
        errors.push('First name is invalid.');
      }
      if (this.registerForm.get('id')?.invalid) {
        errors.push('ID must be a 10-digit number.');
      }
      // Add more checks as needed
      this.snackBar.open(errors.join(' '), 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
      return;
    
    }

    const formData = this.registerForm.value;

    this.axiosService.request('POST', '/register', formData)
      .then(response => {
        this.axiosService.setAuthToken(response.data.token);  // Store token
        localStorage.setItem('user_id', response.data.id);  
        localStorage.setItem('login', response.data.login);  // Set login name
        // Store user ID
        this.router.navigate(['/dashboard/dashboard']).then(() => {
          window.location.reload(); })
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success'],
        });
      })
      .catch(() => {
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error'],
        });
      });
  }

  onLoginTab(): void {
    this.active = 'login';
  }

  onRegisterTab(): void {
    this.active = 'register';
  }
}
