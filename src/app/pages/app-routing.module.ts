import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsPageComponent } from './statistics-page';
import { CreditDashboardPage } from './credit-dashboard-page';

const routes: Routes = [
  { path: 'generalTable', component: CreditDashboardPage },
  { path: 'shortInfoPanel', component: StatisticsPageComponent },
  { path: '**', redirectTo: 'generalTable', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
