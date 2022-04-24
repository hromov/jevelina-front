import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './contacts.model';

const path = 'http://localhost:8080/contacts'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };
 
@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private http: HttpClient) {}
 
  List(): Observable<HttpResponse<Array<Contact>>> {
    return this.http.get<Contact[]>(path, httpOptions)
  }
}