import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../core/services/ErrorHandlerService/error-handler-service';
import { LoginService } from '../../../../core/services/auth/login/login-service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../../core/services/cart/cart-service';
import { NotificationService } from '../../../../core/services/notification/notification-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private platformId = inject(PLATFORM_ID);
  isLoading = signal<boolean>(false);
  serverErrorMessages = signal<string[]>([]);

  private notificationService = inject(NotificationService);

  constructor(
    private loginService: LoginService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private cartService: CartService,
  ) {}

  loginForm: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.email]),

    Password: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    this.serverErrorMessages.set([]);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.isLoading.set(true);

      this.loginService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading.set(false);

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', data.token);
          }

          this.loginService.getUserData();

          this.cartService.loadCartCount();

          this.router.navigate(['/home']);
        },
        error: (err) => {
              console.log('==============error resopnse==================');
          console.log(err);
          this.isLoading.set(false);
          this.serverErrorMessages.set(this.errorHandlerService.extractServerErrors(err));
          console.log('================================');
          console.log(this.serverErrorMessages().length);
        },
      });
    }
  }
}
