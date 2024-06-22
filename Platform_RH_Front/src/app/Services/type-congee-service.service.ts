import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeCongee } from '../models/type-congee';

@Injectable({
  providedIn: 'root'
})
export class TypeCongeeService {
  private apiUrl = 'http://localhost:8089/conges/type-congees';

  constructor(private http: HttpClient) { }

  getAllTypeCongees(): Observable<TypeCongee[]> {
    return this.http.get<TypeCongee[]>(this.apiUrl);
  }

  getTypeCongeeById(id: number): Observable<TypeCongee> {
    return this.http.get<TypeCongee>(`${this.apiUrl}/${id}`);
  }

  createTypeCongee(typeCongee: TypeCongee): Observable<TypeCongee> {
    return this.http.post<TypeCongee>(this.apiUrl, typeCongee);
  }

  updateTypeCongee(id: number, typeCongee: TypeCongee): Observable<TypeCongee> {
    this.http.put<TypeCongee>(`${this.apiUrl}/${id}`, typeCongee).subscribe();

    // Retrieve the updated TypeCongee object from the repository
    return this.http.get<TypeCongee>(`${this.apiUrl}/${id}`);
  }

  deleteTypeCongee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
