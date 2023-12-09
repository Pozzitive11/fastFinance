import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditInformation } from '../models/credits.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditApiService {
  constructor(private http: HttpClient) {}

  getCreditData(): Observable<CreditInformation[]> {
    return this.http.get<CreditInformation[]>(environment.apiUrl);
  }
}
