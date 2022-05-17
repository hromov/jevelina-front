import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterToString, path } from 'src/app/api.service';
import { ListFilter } from 'src/app/shared/model';
import { CategorisedCashflow } from './analytics.model';

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClient) { }

  Categories(filter: ListFilter): Observable<CategorisedCashflow> {
    return this.http.get<CategorisedCashflow>(`${path}/analytics/categories${FilterToString(filter)}`)
  }
}
