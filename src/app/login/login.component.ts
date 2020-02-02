import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from './../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginFailed = false;
  spinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authtorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [ 'test@test.com', [Validators.required, Validators.email]],
      password: ['1234test', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.spinner = true;

      this.authtorizationService.login(email.trim(), password.trim()).subscribe(() => {
        this.router.navigate(['/home']);
      }, (err) => {
        this.spinner = false;
        this.loginFailed = true;
      });
    }

  }
}
