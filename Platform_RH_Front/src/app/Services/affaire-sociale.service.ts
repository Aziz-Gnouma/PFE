
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AffaireSociale } from '../models/affaire-sociale';

@Injectable({
  providedIn: 'root'
})
export class AffaireSocialeService {

  private apiUrl = 'http://localhost:8081/affaires-sociales';
  private employeeUrl = 'http://localhost:9090';
  constructor(private http: HttpClient) { }

  ajouterAffaire(affaire: AffaireSociale): Observable<AffaireSociale> {
    return this.http.post<AffaireSociale>(`${this.apiUrl}/ajout`, affaire)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  listerAffaires(): Observable<AffaireSociale[]> {
    return this.http.get<AffaireSociale[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  modifierAffaire(id: number, affaire: AffaireSociale): Observable<AffaireSociale> {
    // Make a PUT request to update the AffaireSociale object
    return this.http.put<AffaireSociale>(`${this.apiUrl}/update/${id}`, affaire)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAffaireById(cin: String): Observable<AffaireSociale> {
    return this.http.get<AffaireSociale>(`${this.apiUrl}/GetAffaire/${cin}`)
      .pipe(
        map(response => response), // Adjust as per your response structure
        catchError(this.handleError.bind(this))
      );
  }
  getALLAffaireById(cin: String): Observable<AffaireSociale> {
    return this.http.get<AffaireSociale>(`${this.apiUrl}/GetTitularisation/${cin}`)
      .pipe(
        map(response => response), // Adjust as per your response structure
        catchError(this.handleError.bind(this))
      );
  }

  sauvegarderToutesLesAffaires(affaires: AffaireSociale[]): Observable<AffaireSociale[]> {
    return this.http.post<AffaireSociale[]>(`${this.apiUrl}/save-all`, affaires)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  UploadEmploye (cin: number, affaireSocialeData :any): Observable<any> {
    return this.http.post(`${this.employeeUrl}/auth/registerNewEmploye/${cin}`, affaireSocialeData)
  }

  annulerAffaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  saveAffaireSociale(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, payload)
      .pipe(
        catchError(this.handleError) // Handle errors if any
      );
  }
}




