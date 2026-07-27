import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../core/services/ErrorHandlerService/error-handler-service';
import { RegisterService } from '../../../../core/services/auth/register/RegisterService';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnDestroy {

  // Test 2 injection context methods
  private errorHandlerService: ErrorHandlerService = inject(ErrorHandlerService);
  constructor(private registerService: RegisterService, private router: Router) { }

  subscription!: Subscription | null;
  serverErrorMessages = signal<string[]>([]);
  isLoading = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({

    FirstName: new FormControl
      (
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ),

    LastName: new FormControl
      (
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ),

    Email: new FormControl
      (
        null,
        [
          Validators.required,
          Validators.email
        ]
      ),

    Password: new FormControl(
      null,
      [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]
    ),

    ConfirmPassword: new FormControl(
      null,
      [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]
    )


  }, this.formValidation);

  onSubmit() {

    this.serverErrorMessages.set([]);

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();
    }

    else {
      this.isLoading.set(true);

      this.subscription = this.registerService.AddUser(this.registerForm.value).subscribe({
        next: (data) => {

          this.isLoading.set(false);
          this.router.navigate(['/login']);

        },
        error: (err) => {

          this.serverErrorMessages.set(this.errorHandlerService.extractServerErrors(err));
          this.isLoading.set(false);

        }

      })



    }
  }


  formValidation(form: AbstractControl) {

    const password = form.get('Password')?.value;
    const confirmPassword = form.get('ConfirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
