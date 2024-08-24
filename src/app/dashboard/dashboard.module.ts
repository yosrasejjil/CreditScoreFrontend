import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetcreditscoreComponent } from './getcreditscore/getcreditscore.component';
import { AllcreditscoresComponent } from './allcreditscores/allcreditscores.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dash-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AllcreditscoresComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    GetcreditscoreComponent, // This component should be declared, not imported

    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    
  ],
  exports: [
    // Export components if needed in other modules
    DashboardComponent
  ]
})
export class DashboardModule { }
