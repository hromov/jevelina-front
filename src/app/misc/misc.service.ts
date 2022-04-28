import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { path } from '../api.service';
import { Manufacturer, Product, Role, Source, Step, Tag, User } from '../models/model';
 
@Injectable({ providedIn: 'root' })
export class MiscService {
  constructor(private http: HttpClient) {}
 
  Users(): Observable<Array<User>> {
    return this.http.get<User[]>(`${path}/users`)
  }

  SaveUser(user: User): Observable<any>{
    if (user.ID) {
      return this.http.put<any>(`${path}/users/${user.ID}`, user)
    }
    return this.http.post<User>(`${path}/users`, user)
  }

  DeleteUser(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/users/${ID}`)
  }

  Roles(): Observable<Array<Role>> {
    return this.http.get<Role[]>(`${path}/roles`)
  }

  SaveRole(role: Role): Observable<any>{
    if (role.ID) {
      return this.http.put<any>(`${path}/roles/${role.ID}`, role)
    }
    return this.http.post<Role>(`${path}/roles`, role)
  }

  DeleteRole(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/roles/${ID}`)
  }

  Steps(): Observable<Array<Step>> {
    return this.http.get<Step[]>(`${path}/steps`)
  }

  SaveStep(step: Partial<Step>): Observable<any>{
    console.log(step)
    if (step.ID) {
      return this.http.put<any>(`${path}/steps/${step.ID}`, step)
    }
    return this.http.post<Step>(`${path}/steps`, step)
  }

  DeleteStep(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/steps/${ID}`)
  }

  Tags(): Observable<Array<Tag>> {
    return this.http.get<Tag[]>(`${path}/tags`)
  }

  Sources(): Observable<Array<Source>> {
    return this.http.get<Source[]>(`${path}/sources`)
  }

  TaskTypes(): Observable<Array<TaskType>> {
    return this.http.get<TaskType[]>(`${path}/tasktypes`)
  }

  Products(): Observable<Array<Product>> {
    return this.http.get<Product[]>(`${path}/products`)
  }

  Manufacturers(): Observable<Array<Manufacturer>> {
    return this.http.get<Manufacturer[]>(`${path}/manufacturers`)
  }
}