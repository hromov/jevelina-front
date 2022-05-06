import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FilterToString, path } from 'src/app/api.service';
import { File, FileRequest, ListFilter } from '../model';

export interface URLResponse {
  URL: string
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  addFile(file: FileRequest): Observable<File> {
    return this.http.post<File>(`${path}/files`, file)
  }

  deleteFile(id: number) {
    return this.http.delete(`${path}/files/${id}`);
  }

  list(filter: ListFilter): Observable<File[]> {
    return this.http.get<File[]>(`${path}/files${FilterToString(filter)}`)
  }

  getUrl(id: number): Observable<any> {
    return this.http.get<any>(`${path}/files/${id}`)
  }
}
