import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { path } from '../api.service';
import { Step } from '../models/model';
 
@Injectable({ providedIn: 'root' })
export class MiscService {
  constructor(private http: HttpClient) {}
 
  Steps(): Observable<Array<Step>> {
    return this.http.get<Step[]>(`${path}/steps`)
  }
}