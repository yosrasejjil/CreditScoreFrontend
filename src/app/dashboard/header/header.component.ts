import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/services/axios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: string | null = null;
  login: string | null = null;

  constructor(private axiosService: AxiosService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user ID and login from localStorage
    this.userId = localStorage.getItem('user_id');
    this.login = localStorage.getItem('login');
  }
  // Logout method
  logout(): void {
    // Clear the authentication token and user info
    this.axiosService.setAuthToken(null); // Clear token
    localStorage.removeItem('user_id'); // Remove user ID from local storage
    localStorage.removeItem('login'); // Optionally remove login info

    // Navigate to the home or login page
    this.router.navigate(['/login']); // Adjust to your desired route
  }
}
