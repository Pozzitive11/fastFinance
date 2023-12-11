import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonthlyCreditStatistics } from '@modules/credit/models';
import { CreditStatisticsService } from '@modules/credit/services';

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.scss'],
})
export class StatisticsDashboardComponent implements OnInit {
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
