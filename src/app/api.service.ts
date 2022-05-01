import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListFilter, Manufacturer, Product, Role, Source, Step, Tag, Task, TaskType, User } from './shared/model';
const prod = true
export const path = prod ? 'https://vorota-ua.ew.r.appspot.com' : 'https://localhost:8080'
const defaultLimit = 25

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
};

export function FilterToString(filter: ListFilter): string {
    const additional = `${filter.active ? '&active=true' : ''}${filter.step ? '&step=' + filter.step.toString() : ''}${filter.query ? '&query=' + filter.query : ''}${filter.responsible ? '&responsible=' + filter.responsible : ''}`
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

    TasksFor(parentID: number): Observable<Array<Task>> {
        return this.http.get<Task[]>(`${path}/tasks?parent=${parentID}`)
    }

    SaveTask(task: Task): Observable<Task> {
        if (task.ID) {
            return this.http.put<Task>(`${path}/tasks/${task.ID}`, task)    
        }
        return this.http.post<Task>(`${path}/tasks`, task)
    }
    
}