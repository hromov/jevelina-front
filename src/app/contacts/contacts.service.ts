import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { Contact, ListFilter } from '../models/model';

const path = 'http://localhost:8080/contacts'
const defaultLimit = 25

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

export function FilterToString(filter: ListFilter): string {
  return `?limit=${filter.limit || defaultLimit}&offset=${filter.offset || 0}`
}
 
@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private http: HttpClient) {}
 
  List(filter: ListFilter): Observable<HttpResponse<Array<Contact>>> {
    return this.http.get<Contact[]>(path+FilterToString(filter), httpOptions)
  }
}