import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { CreditInformation, FilterName } from '../models';
import { CreditApiService } from './credit-api.service';

interface Filter {
  name: FilterName;
  props?: any;
}

@Injectable({
  providedIn: 'root',
})
export class CreditFiltersService {
  private _allCredits$ = new BehaviorSubject<CreditInformation[]>([]);
  private _filteredCredits$ = new BehaviorSubject<CreditInformation[]>([]);

  appliedFilters$ = new BehaviorSubject<Filter[]>([]);

  filteredCredits$ = from(this._filteredCredits$);

  constructor(private readonly creditApiService: CreditApiService) {}

  initializeData(): void {
    this.appliedFilters$.next([]);
    this.creditApiService.getCreditData().subscribe((data) => {
      this._allCredits$.next(data);
      this._filteredCredits$.next(data);
    });
  }

  addFilter(filter: Filter): void {
    const uniqueFilters = this.appliedFilters$.value.filter((appliedFilter) => {
      return (
        appliedFilter.props?.dateType !== filter.props?.dateType &&
        appliedFilter.name !== filter.name
      );
    });
    this.appliedFilters$.next([...uniqueFilters, filter]);
  }

  private filterByDate(
    credits: CreditInformation[],
    { dates, dateType }: { dates: string[]; dateType: string }
  ): CreditInformation[] {
    return credits.filter((item) => {
      const creditDate = new Date(item[dateType]);

      return (
        creditDate >= new Date(dates[0]) && creditDate <= new Date(dates[1])
      );
    });
  }

  private filterByOverdueCredits(
    credits: CreditInformation[]
  ): CreditInformation[] {
    return credits.filter((credit) => {
      const returnDate = new Date(credit.return_date);

      const actualReturnDate = credit.actual_return_date
        ? new Date(credit.actual_return_date)
        : null;

      return (
        actualReturnDate > returnDate ||
        (returnDate < new Date() && actualReturnDate === null)
      );
    });
  }

  getFilteredCredits(): Observable<CreditInformation[]> {
    return this._allCredits$.pipe(
      map((credits) => {
        const appliedFilters = this.appliedFilters$.value;
        console.log(appliedFilters);

        return appliedFilters.reduce((filteredCredits, filter) => {
          return this[filter.name](filteredCredits, filter.props);
        }, credits);
      }),
      tap((filteredCredits) => {
        this._filteredCredits$.next(filteredCredits);
      })
    );
  }
}
