import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ListFilter } from './models/model';

export const path = 'http://localhost:8080'
const defaultLimit = 25

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

export function FilterToString(filter: ListFilter): string {
  return `?limit=${filter.limit || defaultLimit}&offset=${filter.offset || 0}`
}
 
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

}