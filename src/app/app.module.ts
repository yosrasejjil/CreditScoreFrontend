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

import { DashboardModule } from './dashboard/dashboard.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component'; // Importing the DashboardModule

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AuthContentComponent,
    NotfoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardModule,
    FormsModule,
  ],
  providers: [AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
