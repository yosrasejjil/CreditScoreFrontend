import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthContentComponent } from './auth-content/auth-content.component';

import { AxiosService } from './services/axios.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardModule } from './dashboard/dashboard.module'; // Importing the DashboardModule

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AuthContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardModule, // Importing the DashboardModule here
    FormsModule,
  ],
  providers: [AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
