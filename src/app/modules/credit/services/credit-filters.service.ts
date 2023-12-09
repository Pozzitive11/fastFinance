import { Injectable } from '@angular/core';
import { CreditInformation } from '../models/credits.model';
import { CreditApiService } from './credit-api.service';
import { BehaviorSubject, Observable, delay, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditFiltersService {
  private _allCredits$ = new BehaviorSubject<CreditInformation[]>([]);
  private _filteredCredits$ = new BehaviorSubject<CreditInformation[]>([]);

  filteredCredits$ = from(this._filteredCredits$);

  constructor(private readonly creditApiService: CreditApiService) {}

  initializeData(): void {
    this.creditApiService.getCreditData().subscribe((data) => {
      this._allCredits$.next(data);
      this._filteredCredits$.next(data);
    });
  }

  filterByDate(
    dates: string[],
    dateType: string
  ): Observable<CreditInformation[]> {
    return this._allCredits$.pipe(
      map((allCredits) =>
        allCredits.filter((item) => {
          const creditDate = new Date(item[dateType]);

          return (
            creditDate >= new Date(dates[0]) && creditDate <= new Date(dates[1])
          );
        })
      ),
      tap((filteredCredits) => {
        this._filteredCredits$.next(filteredCredits);
      })
    );
  }

  filterByOverdueCredits(): Observable<CreditInformation[]> {
    return this._filteredCredits$.pipe(
      map((allCredits) =>
        allCredits.filter((credit) => {
          const returnDate = new Date(credit.return_date);

          const actualReturnDate = credit.actual_return_date
            ? new Date(credit.actual_return_date)
            : null;

          return (
            actualReturnDate > returnDate ||
            (returnDate < new Date() && actualReturnDate === null)
          );
        })
      ),
      tap((filteredCredits) => {
        this._filteredCredits$.next(filteredCredits);
      })
    );
  }
}
