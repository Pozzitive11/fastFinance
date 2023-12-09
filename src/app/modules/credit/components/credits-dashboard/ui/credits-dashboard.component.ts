import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreditFiltersService } from '../../../services';
import { CreditInformation } from '../../../models';
import { CreditPaginationService } from 'src/app/shared/services';
@Component({
  selector: 'app-credits-dashboard',
  templateUrl: './credits-dashboard.component.html',
  styleUrls: ['./credits-dashboard.component.scss'],
})
export class CreditsDashboardComponent {
  credits: CreditInformation[] = [];
  constructor(
    protected creditPaginationService: CreditPaginationService,
    public creditFiltersService: CreditFiltersService,
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
