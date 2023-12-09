import { Injectable } from '@angular/core';
import { CreditInformation } from '../../modules/credit/models/credits.model';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { CreditFiltersService } from '../../modules/credit/services/credit-filters.service';

@Injectable({
  providedIn: 'root',
})
export class CreditPaginationService {
  readonly FILTER_PAG_REGEX = /[^0-9]/g;
  readonly pageSize = 10;
  private _paginatedCredits$ = new BehaviorSubject<CreditInformation[]>([]);

  page = 1;
  paginatedCredits$ = from(this._paginatedCredits$);

  collectionSize$ = this.creditFiltersService.filteredCredits$.pipe(
    map((data) => data.length)
  );

  constructor(private readonly creditFiltersService: CreditFiltersService) {}

  calculatePageCredits(): Observable<CreditInformation[]> {
    return this.creditFiltersService.filteredCredits$.pipe(
      map((allCredits) => {
        const startIndex = (this.page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        return allCredits.slice(startIndex, endIndex);
      }),
      tap((paginatedCredits) => {
        this._paginatedCredits$.next(paginatedCredits);
      })
    );
  }

  selectPage(page: string): void {
    this.page = +page;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }
}
