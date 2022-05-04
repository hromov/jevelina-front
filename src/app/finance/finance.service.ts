import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { path } from '../api.service';
import { Wallet } from '../shared/model';

//TODO: change to local if needed
@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  Wallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${path}/wallets`)
  }
  SaveWallet(item: Wallet): Observable<any> {
    if (item.ID) {
      return this.http.put(`${path}/wallets/${item.ID}`, item)
    }
    return this.http.post(`${path}/wallets`, item)
  }
  DeleteWallet(ID: number): Observable<any> {
    return this.http.delete(`${path}/wallets/${ID}`)
  }
}
