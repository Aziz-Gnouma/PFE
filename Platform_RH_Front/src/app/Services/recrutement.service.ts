import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  private apiUrl = 'http://localhost:8045/api/offres';
  private cvApiUrl = 'http://localhost:8045/api/cv';

  constructor(private http: HttpClient) { }

  addOffre(offre: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, offre);
  }

  getAllOffres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getOffreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  submitCV(name: string, email: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    return this.http.post<any>(`${this.cvApiUrl}/submit`, formData);
  }
  submitMultipleCVs(name: string, email: string, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });

    return this.http.post<any>(`${this.cvApiUrl}/submitMultiple`, formData)
    .pipe(
      map(response => {
        // Assuming the server responds with a success message
        return 'CVs submitted successfully!';
      }),
      // catchError(error => {
      //   console.error('Failed to submit CVs:', error);
      //   throw 'Failed to submit CVs';
      // })
    );
  }



  rankAllCVs(): Observable<any> {
    return this.http.get<any>(`${this.cvApiUrl}/rankAll`);
  }


  downloadCv(id: number): Observable<Blob> {
    return this.http.get(`${this.cvApiUrl}/downloadCv/${id}`, { responseType: 'blob' });
  }
  deleteOffre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  acceptCV(id: number): Observable<any> {
    return this.http.post(`${this.cvApiUrl}/accept/${id}`, {});
  }

  rejectCV(id: number): Observable<any> {
    return this.http.post(`${this.cvApiUrl}/reject/${id}`, {});
  }
}
