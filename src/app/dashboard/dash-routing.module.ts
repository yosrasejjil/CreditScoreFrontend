import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetcreditscoreComponent } from './getcreditscore/getcreditscore.component';
import { AllcreditscoresComponent } from './allcreditscores/allcreditscores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: '', redirectTo: 'get-credit-score', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'get-credit-score', component: GetcreditscoreComponent },
        { path: 'all-credit-scores', component: AllcreditscoresComponent }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
