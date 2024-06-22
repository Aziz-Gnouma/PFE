import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseUrl = 'http://localhost:8089/api/absences';

  constructor(private http: HttpClient) { }

  createAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(this.baseUrl, absence);
  }

  updateAbsence(id: number, absence: Absence): Observable<Absence> {
    return this.http.put<Absence>(`${this.baseUrl}/${id}`, absence);
  }

  getAbsenceById(id: number): Observable<Absence> {
    return this.http.get<Absence>(`${this.baseUrl}/${id}`);
  }

  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.baseUrl);
  }

  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  validateAbsence(id: number): Observable<Absence> {
    return this.http.post<Absence>(`${this.baseUrl}/validate/${id}`, {});
  }
  getPendingAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}/pending`);
  }
  rejectAbsence(id: number): Observable<Absence> {
    return this.http.post<Absence>(`${this.baseUrl}/reject/${id}`, {});
  }
  getAllAbsencesByMatricule(matricule: string): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}/absences?matricule=${matricule}`);
  }
}
