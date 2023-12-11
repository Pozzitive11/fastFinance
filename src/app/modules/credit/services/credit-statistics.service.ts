import { Injectable } from '@angular/core';

import {
  Observable,
  from,
  groupBy,
  mergeMap,
  toArray,
  map,
  BehaviorSubject,
  tap,
} from 'rxjs';
import { CreditApiService } from './credit-api.service';
import { CreditInformation, MonthlyCreditStatistics } from '../models';
interface UserCreditMetric {
  user: string;
  metricValue: number;
}
@Injectable({
  providedIn: 'root',
})
export class CreditStatisticsService {
  private _topUsersByCredits$ = new BehaviorSubject<UserCreditMetric[]>([]);
  private _topUsersByPercentPaid$ = new BehaviorSubject<UserCreditMetric[]>([]);
  private _topUsersByRatio$ = new BehaviorSubject<UserCreditMetric[]>([]);

  topUsersByCredits$ = from(this._topUsersByCredits$);
  topUsersByPercentPaid$ = from(this._topUsersByPercentPaid$);
  topUsersByRatio$ = from(this._topUsersByRatio$);

  constructor(private readonly creditApiService: CreditApiService) {}

  getCreditStatistics(): Observable<MonthlyCreditStatistics[]> {
    return this.creditApiService.getCreditData().pipe(
      tap((data) => {
        const topUsersByCredits = this.getTopUsersByCredits(data);
        const topUsersByPercentPaid = this.getTopUsersByPercentPaid(data);
        const topUsersByRatio = this.getTopUsersByRatio(data);

        this._topUsersByCredits$.next(topUsersByCredits);
        this._topUsersByPercentPaid$.next(topUsersByPercentPaid);
        this._topUsersByRatio$.next(topUsersByRatio);
      }),
      mergeMap((data) => from(data)),
      groupBy((credit) =>
        credit.issuance_date.split('-').slice(0, 2).join('-')
      ),
      mergeMap((group) => {
        return group.pipe(
          toArray(),
          map((creditsInMonth) => {
            const totalCredits = creditsInMonth.length;
            const totalAmount = this.calculateTotalAmount(creditsInMonth);
            const averageAmount = this.calculateAverageAmount(creditsInMonth);
            const totalPercent = this.calculateTotalPercent(creditsInMonth);
            const totalReturnedCredits =
              this.calculateTotalReturnedCredits(creditsInMonth);

            return {
              month: group.key,
              totalCredits,
              totalAmount,
              averageAmount,
              totalPercent,
              totalReturnedCredits,
            };
          })
        );
      }),
      toArray()
    );
  }

  private calculateAverageAmount(credits: CreditInformation[]): number {
    const totalAmount = this.calculateTotalAmount(credits);
    return totalAmount / credits.length || 0;
  }

  private calculateTotalAmount(credits: CreditInformation[]): number {
    return credits.reduce((sum, credit) => sum + credit.body, 0);
  }

  private calculateTotalPercent(credits: CreditInformation[]): number {
    return credits.reduce((sum, credit) => sum + credit.percent, 0);
  }

  private calculateTotalReturnedCredits(credits: CreditInformation[]): number {
    return credits.filter((credit) => credit.actual_return_date).length;
  }

  private getTopUsersByCredits(
    credits: CreditInformation[]
  ): UserCreditMetric[] {
    const userCreditsMap = new Map<string, number>();

    credits.forEach((credit) => {
      const user = credit.user;
      userCreditsMap.set(user, (userCreditsMap.get(user) || 0) + 1);
    });

    return this.getTopUsers(userCreditsMap);
  }

  private getTopUsersByPercentPaid(
    credits: CreditInformation[]
  ): UserCreditMetric[] {
    const userPercentPaidMap = new Map<string, number>();

    const paidCredits = credits.filter(
      (credit) => credit.actual_return_date !== null
    );

    paidCredits.forEach((credit) => {
      const user = credit.user;
      userPercentPaidMap.set(
        user,
        (userPercentPaidMap.get(user) || 0) + credit.percent
      );
    });

    return this.getTopUsers(userPercentPaidMap);
  }

  private getTopUsersByRatio(credits: CreditInformation[]): UserCreditMetric[] {
    const userRatioMap = new Map<
      string,
      { totalPercent: number; totalBody: number }
    >();

    const paidCredits = credits.filter(
      (credit) => credit.actual_return_date !== null
    );

    paidCredits.forEach((credit) => {
      const user = credit.user;
      const existingData = userRatioMap.get(user) || {
        totalPercent: 0,
        totalBody: 0,
      };
      userRatioMap.set(user, {
        totalPercent: existingData.totalPercent + credit.percent,
        totalBody: existingData.totalBody + credit.body,
      });
    });

    const sortedUsers = Array.from(userRatioMap.entries()).sort(
      (a, b) =>
        b[1].totalPercent / b[1].totalBody - a[1].totalPercent / a[1].totalBody
    );
    return sortedUsers.slice(0, 10).map(([user, metricValue]) => ({
      user,
      metricValue: metricValue.totalPercent / metricValue.totalBody,
    }));
  }

  private getTopUsers(userMap: Map<string, number>): UserCreditMetric[] {
    const sortedUsers = Array.from(userMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedUsers.slice(0, 10).map(([user, metricValue]) => ({
      user,
      metricValue,
    }));
  }
}
