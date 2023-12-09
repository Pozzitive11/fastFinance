import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditApiService } from './services/credit-api.service';
import { CreditStatisticsService } from './services/credit-statistics.service';
import { CreditsDashboardComponent } from './components/credits-dashboard';
import { CreditFiltersComponent } from './components/credit-filters';
import { StatisticsDashboardComponent } from './components/statistics-dashboard';
import { PaginationComponent } from 'src/app/shared/ui/pagination';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from 'src/app/shared/ui/datepicker';

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
