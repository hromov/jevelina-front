import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { FilterToString, httpOptions, path } from '../api.service';
import { Contact, ListFilter } from '../shared/model';
 
@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private http: HttpClient) {}
 
  List(filter: ListFilter): Observable<HttpResponse<Array<Contact>>> {
    return this.http.get<Contact[]>(`${path}/contacts${FilterToString(filter)}`, httpOptions)
  }

  Get(id: number): Observable<HttpResponse<Contact>> {
    // console.log(id)
    return this.http.get<Contact>(`${path}/contacts/${id}`, httpOptions)
  }

  Save(contact: Contact): Observable<any> {
    if (contact.ID) {
      return this.http.put<Contact>(`${path}/contacts/${contact.ID}`, contact)
    }
    return this.http.post<Contact>(`${path}/contacts`, contact)
  }

  Delete(ID: number): Observable<any> {
    return this.http.delete(`${path}/contacts/${ID}`)
  }
}