import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterToString, httpOptions, path } from '../api.service';
import { ListFilter, Transfer, Wallet } from '../shared/model';

//TODO: change to local if needed
@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  Wallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${path}/wallets`)
  }
  Categories(): Observable<string[]> {
    return this.http.get<string[]>(`${path}/categories`)
  }
  SaveWallet(item: Wallet): Observable<any> {
    if (item.ID) {
      return this.http.put<Wallet>(`${path}/wallets/${item.ID}`, item)
    }
    return this.http.post(`${path}/wallets`, item)
  }
  DeleteWallet(ID: number): Observable<any> {
    return this.http.delete(`${path}/wallets/${ID}`)
  }

  Transfers(filter: ListFilter): Observable<HttpResponse<Array<Transfer>>> {
    return this.http.get<Transfer[]>(`${path}/transfers${FilterToString(filter)}`, httpOptions)
  }

  SaveTransfer(item: Transfer): Observable<any> {
    if (item.ID) {
      return this.http.put<Transfer>(`${path}/transfers/${item.ID}`, item)
    }
    return this.http.post(`${path}/transfers`, item)
  }

  DeleteTransfer(ID: number): Observable<any> {
    return this.http.delete(`${path}/transfers/${ID}`)
  }
  
  CompleteTransfer(ID: number): Observable<any> {
    return this.http.get(`${path}/transfers/${ID}/complete`)
  }
}
