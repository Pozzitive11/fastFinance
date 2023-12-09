import { Component, DestroyRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from 'src/app/shared/ui/datepicker/ui/datepicker.component';
import { CreditFiltersService } from '../../../services';
import { CreditPaginationService } from 'src/app/shared/services';

@Component({
  selector: 'app-credit-filters',
  templateUrl: './credit-filters.component.html',
  styleUrls: ['./credit-filters.component.scss'],
})
export class CreditFiltersComponent {
  @ViewChild('issuanceDatepicker') issuanceDatepicker: DatepickerComponent;
  @ViewChild('returnDatepicker') returnDatepicker: DatepickerComponent;

  constructor(
    public creditPaginationService: CreditPaginationService,
    public creditFiltersService: CreditFiltersService,
    private destroyRef: DestroyRef
  ) {}

  formatDate(dates: NgbDate[]): string[] {
    const formattedDate = [];
    if (!dates) {
      return null;
    }

    dates.map((dateItem) => {
      const year = dateItem.year.toString();
      const month =
        dateItem.month < 10 ? `0${dateItem?.month}` : dateItem.month.toString();
      const day =
        dateItem?.day < 10 ? `0${dateItem.day}` : dateItem.day.toString();

      formattedDate.push(`${year}-${month}-${day}`);
    });

    return formattedDate;
  }

  formatByIssuanceDate(dates: NgbDate[]) {
    this.returnDatepicker.fromDate = null;
    this.returnDatepicker.toDate = null;
    this.creditFiltersService
      .filterByDate(this.formatDate(dates), 'issuance_date')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  formatByReturnDate(dates: NgbDate[]) {
    this.issuanceDatepicker.fromDate = null;
    this.issuanceDatepicker.toDate = null;
    this.creditFiltersService
      .filterByDate(this.formatDate(dates), 'return_date')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  filterByOverdueCredits() {
    this.creditFiltersService
      .filterByOverdueCredits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
  resetFilters() {
    this.issuanceDatepicker.fromDate = null;
    this.issuanceDatepicker.toDate = null;

    this.returnDatepicker.fromDate = null;
    this.returnDatepicker.toDate = null;

    this.creditFiltersService.initializeData();
    this.creditPaginationService
      .calculatePageCredits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
