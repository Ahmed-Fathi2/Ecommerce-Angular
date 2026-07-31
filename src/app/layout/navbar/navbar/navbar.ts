import { Component, computed, effect, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login/login-service';
import { CartService } from '../../../core/services/cart/cart-service';
import { NotificationService } from '../../../core/services/notification/notification-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMobileMenuOpen = signal<boolean>(false);

  IsLoggedIn = computed(() => this.loginService.userData() !== null);
 

   cartService = inject(CartService);

  // itemscount=signal<number>(0)

  private notificationService = inject(NotificationService);

  private platformId =inject(PLATFORM_ID)

  constructor(public loginService: LoginService,private router: Router, ) 
  {
    // effect(() => {
    //   const count = this.cartService.cartItemsCount();
    //   this.itemscount.set(count);
    // });
  }

  // ngOnInit(): void {
  //   this.cartService.getCart().subscribe({
  //     next: (response) => {
  //       const totalCount = response.items.reduce((total, item) => total + item.quantity, 0);

  //       this.cartService.cartItemsCount.set(totalCount);

  //       // this.itemscount.set(this.cartService.cartItemsCount())
  //     },
  //     error: () => {
  //       if(isPlatformBrowser(this.platformId))
  //       this.notificationService.error('error during load cart items count !!!');
  //     },
  //   });
  // }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }
  logout() {
    localStorage.removeItem('token');

    this.loginService.getUserData();

    this.isMobileMenuOpen.set(false);
    
    this.cartService.cartItemsCount.set(0);

    this.router.navigate(['/login']);
  }
}
