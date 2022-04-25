import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { FilterToString, httpOptions, path } from '../api.service';
import { Contact, ListFilter } from '../models/model';
 
@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private http: HttpClient) {}
 
  List(filter: ListFilter): Observable<HttpResponse<Array<Contact>>> {
    return this.http.get<Contact[]>(`${path}/contacts${FilterToString(filter)}`, httpOptions)
  }
}