import { Component, DestroyRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterName } from '@modules/credit/models';
import { CreditFiltersService } from '@modules/credit/services';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CreditPaginationService } from '@shared/services';
import { DatepickerComponent } from '@shared/ui/datepicker';

@Component({
  selector: 'app-credit-filters',
  templateUrl: './credit-filters.component.html',
  styleUrls: ['./credit-filters.component.scss'],
})
export class CreditFiltersComponent {
  @ViewChild('issuanceDatepicker') issuanceDatepicker: DatepickerComponent;
  @ViewChild('returnDatepicker') returnDatepicker: DatepickerComponent;

  constructor(
    private creditPaginationService: CreditPaginationService,
    private creditFiltersService: CreditFiltersService,
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
    this.creditFiltersService.addFilter({
      name: FilterName.DATE,
      props: { dates: this.formatDate(dates), dateType: 'issuance_date' },
    });
    this.creditFiltersService
      .getFilteredCredits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  formatByReturnDate(dates: NgbDate[]) {
    this.creditFiltersService.addFilter({
      name: FilterName.DATE,
      props: { dates: this.formatDate(dates), dateType: 'return_date' },
    });
    this.creditFiltersService
      .getFilteredCredits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  filterByOverdueCredits() {
    this.creditFiltersService.addFilter({
      name: FilterName.OVERDUE_CREDITS,
    });

    this.creditFiltersService
      .getFilteredCredits()
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
