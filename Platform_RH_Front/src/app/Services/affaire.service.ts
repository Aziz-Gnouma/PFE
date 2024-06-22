
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AffaireSociale } from '../models/affaire-sociale';

@Injectable({
  providedIn: 'root'
})
export class AffaireSocialeService {

  private apiUrl = 'http://localhost:8081/affaires-sociales';

  constructor(private http: HttpClient) { }

  ajouterAffaire(affaire: AffaireSociale): Observable<AffaireSociale> {
    return this.http.post<AffaireSociale>(`${this.apiUrl}/ajout`, affaire)
      .pipe(
        catchError(this.handleError.bind(this)) // Fix: bind this to the handleError function
      );
  }

  getAffaires(): Observable<AffaireSociale[]> {
    return this.http.get<AffaireSociale[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError.bind(this)) // Fix: bind this to the handleError function
      );
  }

  // Add other methods for CRUD operations as needed (update, delete, get by ID, etc.)

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}




