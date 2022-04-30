import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { FilterToString, httpOptions, path } from '../api.service';
import { Lead, ListFilter } from '../shared/model';
 
@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private http: HttpClient) {}
 
  List(filter: ListFilter): Observable<HttpResponse<Array<Lead>>> {
    // console.log(filter)
    return this.http.get<Lead[]>(`${path}/leads${FilterToString(filter)}`, httpOptions)
  }

  Get(id: number): Observable<HttpResponse<Lead>> {
    // console.log(id)
    return this.http.get<Lead>(`${path}/leads/${id}`, httpOptions)
  }

  Save(lead: Partial<Lead>): Observable<any> {
    if (lead.ID) {
      return this.http.put<Lead>(`${path}/leads/${lead.ID}`, lead)
    }
    return this.http.post<Lead>(`${path}/leads`, lead)
  }

  Delete(ID: number): Observable<any> {
    return this.http.delete(`${path}/leads/${ID}`)
  }
}