import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { path } from '../../api.service';
import { Manufacturer, Product, Role, Source, Step, Tag, User, Task, TaskType } from '../../models/model';

@Injectable({ providedIn: 'root' })
export class MiscService {
  constructor(private http: HttpClient) { }

  SaveUser(user: User): Observable<any> {
    if (user.ID) {
      return this.http.put<any>(`${path}/users/${user.ID}`, user)
    }
    return this.http.post<User>(`${path}/users`, user)
  }

  DeleteUser(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/users/${ID}`)
  }

  SaveRole(role: Role): Observable<any> {
    if (role.ID) {
      return this.http.put<any>(`${path}/roles/${role.ID}`, role)
    }
    return this.http.post<Role>(`${path}/roles`, role)
  }

  DeleteRole(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/roles/${ID}`)
  }

  SaveStep(step: Partial<Step>): Observable<any> {
    if (step.ID) {
      return this.http.put<any>(`${path}/steps/${step.ID}`, step)
    }
    return this.http.post<Step>(`${path}/steps`, step)
  }

  DeleteStep(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/steps/${ID}`)
  }

  SaveTag(item: Partial<Tag>): Observable<any> {
    if (item.ID) {
      return this.http.put<any>(`${path}/tags/${item.ID}`, item)
    }
    return this.http.post<Tag>(`${path}/tags`, item)
  }

  DeleteTag(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/tags/${ID}`)
  }

  SaveSource(item: Partial<Source>): Observable<any> {
    if (item.ID) {
      return this.http.put<any>(`${path}/sources/${item.ID}`, item)
    }
    return this.http.post<Step>(`${path}/sources`, item)
  }

  DeleteSource(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/sources/${ID}`)
  }

  SaveTaskType(item: Partial<TaskType>): Observable<any> {
    if (item.ID) {
      return this.http.put<any>(`${path}/tasktypes/${item.ID}`, item)
    }
    return this.http.post<TaskType>(`${path}/tasktypes`, item)
  }

  DeleteTaskType(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/tasktypes/${ID}`)
  }

  SaveProduct(item: Partial<Product>): Observable<any> {
    if (item.ID) {
      return this.http.put<any>(`${path}/products/${item.ID}`, item)
    }
    return this.http.post<Product>(`${path}/products`, item)
  }

  DeleteProduct(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/products/${ID}`)
  }

  SaveManufacturer(item: Partial<Manufacturer>): Observable<any> {
    if (item.ID) {
      return this.http.put<any>(`${path}/manufacturers/${item.ID}`, item)
    }
    return this.http.post<Manufacturer>(`${path}/manufacturers`, item)
  }

  DeleteManufacturer(ID: number): Observable<any> {
    return this.http.delete<any>(`${path}/manufacturers/${ID}`)
  }
}