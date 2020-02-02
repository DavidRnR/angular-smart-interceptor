import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule, MatFormFieldModule,
  MatProgressSpinnerModule, MatButtonModule, MatToolbarModule, MatProgressBarModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// Interceptor
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainInterceptor } from './helper/main.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';

// Services
import { AuthorizationService } from './services/authorization.service';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthorizationService, ApiService, DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
