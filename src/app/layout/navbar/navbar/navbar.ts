import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login/login-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  {
  isMobileMenuOpen = signal<boolean>(false);

  // IsLoggedIn = computed(() => this.loginService.userData() !== null);

  constructor(public loginService: LoginService, private router: Router) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }
logout(){

  localStorage.removeItem('token');
  // this.loginService.userData.set(null);
  this.loginService.getUserData();
  
  this.isMobileMenuOpen.set(false);

  this.router.navigate(['/login']);

}

}

