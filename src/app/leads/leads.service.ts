import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { FilterToString, httpOptions, path } from '../api.service';
import { Lead, ListFilter } from '../models/model';
 
@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private http: HttpClient) {}
 
  List(filter: ListFilter): Observable<HttpResponse<Array<Lead>>> {
    // console.log(filter)
    return this.http.get<Lead[]>(`${path}/leads${FilterToString(filter)}`, httpOptions)
  }
}