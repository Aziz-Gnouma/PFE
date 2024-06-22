import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private apiUrl = 'http://localhost:8089/conges';
  constructor(private http: HttpClient) { }
  addDemande(demande: Demande): Observable<any> {
    return this.http.post(this.apiUrl, demande);
  }
  getPendingDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/pending`);
  }

  updateDemandeStatus(demande: Demande): Observable<any> {
    return this.http.put(`${this.apiUrl}/${demande.id}`, demande);
  }
  getAcceptedDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/accepted`);
  }
  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}`);
  }
  getPreviousDaysRemaining(matricule: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/previous-days-remaining/${matricule}`);
    // Assurez-vous d'ajuster l'URL de votre endpoint pour correspondre à la structure de votre API
  }
  getAllDemandesByMatricule(matricule: string): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/demandes?matricule=${matricule}`);
  }
}
