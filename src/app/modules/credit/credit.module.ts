import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CreditApiService, CreditStatisticsService } from './services';
import { DatepickerComponent } from '@shared/ui/datepicker';
import { PaginationComponent } from '@shared/ui/pagination';
import { CreditFiltersComponent } from './components/credit-filters';
import { CreditsDashboardComponent } from './components/credits-dashboard';
import { StatisticsDashboardComponent } from './components/statistics-dashboard';

@NgModule({
  declarations: [
    CreditsDashboardComponent,
    CreditFiltersComponent,
    StatisticsDashboardComponent,
    PaginationComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
  ],
  exports: [
    CreditsDashboardComponent,
    CreditFiltersComponent,
    StatisticsDashboardComponent,
    PaginationComponent,
    DatepickerComponent,
  ],
  providers: [CreditApiService, CreditStatisticsService],
})
export class CreditsModule {}
