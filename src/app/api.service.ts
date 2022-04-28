import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListFilter, Manufacturer, Product, Role, Source, Step, Tag, TaskType, User } from './models/model';

export const path = 'http://localhost:8080'
const defaultLimit = 25

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
};

export function FilterToString(filter: ListFilter): string {
    const additional = `${filter.active ? '&active=true' : ''}${filter.step ? '&step=' + filter.step.toString() : ''}${filter.query ? '&query=' + filter.query : ''}`
    return `?limit=${filter.limit || defaultLimit}&offset=${filter.offset || 0}${additional}`
}

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }


    Users(): Observable<Array<User>> {
        return this.http.get<User[]>(`${path}/users`)
    }

    Roles(): Observable<Array<Role>> {
        return this.http.get<Role[]>(`${path}/roles`)
    }

    Steps(): Observable<Array<Step>> {
        return this.http.get<Step[]>(`${path}/steps`)
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