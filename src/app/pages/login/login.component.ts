import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthorizationService } from './../../services/authorization.service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthorizationService],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    ReactiveFormsModule,
    FormsModule,
  ],
  standalone: true,
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authtorizationService = inject(AuthorizationService);

  spinner = false;
  submitted = false;
  loginFailed = false;
  loginForm: FormGroup =  this.formBuilder.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['1234test', Validators.required],
  });


  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.spinner = true;

      this.authtorizationService
        .login(email.trim(), password.trim())
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (_) => {
            this.spinner = false;
            this.loginFailed = true;
          },
        });
    }
  }
}
