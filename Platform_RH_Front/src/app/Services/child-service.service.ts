import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Child } from '../models/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private baseUrl = 'http://localhost:8081/children'; // Remove /add

  constructor(private http: HttpClient) { }

  addNewChild(child: Child, matricule: string): Observable<Child> {
    child.matricule = matricule;
    return this.http.post<Child>(`${this.baseUrl}/add`, child);
  }
  getAllChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.baseUrl}`);
  }

}
