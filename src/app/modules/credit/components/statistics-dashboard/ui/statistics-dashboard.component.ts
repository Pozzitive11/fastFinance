import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonthlyCreditStatistics } from '../../../models';
import { CreditStatisticsService } from '../../../services';

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.scss'],
})
export class StatisticsDashboardComponent {
  monthlyStatistics: MonthlyCreditStatistics[] = [];

  constructor(
    protected statisticsService: CreditStatisticsService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.statisticsService
      .getCreditStatistics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((monthlyStatistics) => {
        this.monthlyStatistics = monthlyStatistics;
      });
  }
}
