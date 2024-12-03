import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AxiosService } from '../services/axios.service';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const axiosService = inject(AxiosService); // Inject AxiosService
  const router = inject(Router); // Inject Router

  const token = axiosService.getAuthToken();

  if (token) {
    return true; // Allow access if the token is present
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
