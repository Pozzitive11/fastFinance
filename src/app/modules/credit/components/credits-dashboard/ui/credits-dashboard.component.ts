import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreditInformation } from '@modules/credit/models';
import { CreditFiltersService } from '@modules/credit/services';
import { CreditPaginationService } from '@shared/services';
@Component({
  selector: 'app-credits-dashboard',
  templateUrl: './credits-dashboard.component.html',
  styleUrls: ['./credits-dashboard.component.scss'],
})
export class CreditsDashboardComponent implements OnInit {
  credits: CreditInformation[] = [];
  constructor(
    private creditPaginationService: CreditPaginationService,
    private creditFiltersService: CreditFiltersService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.creditFiltersService.initializeData();
    this.creditPaginationService
      .calculatePageCredits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.creditPaginationService.paginatedCredits$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.credits = data;
      });
  }
}
