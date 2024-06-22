import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentAuthService {

  private apiUrl = 'http://localhost:8058/api/docs'; // Assuming this is the endpoint for adding documents

  constructor(private http: HttpClient) { }

  addDoc(document: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, document);
  }

  getAllDocs(): Observable<any> {
    // Implement HTTP request to fetch documents from the backend
    return this.http.get<any>(this.apiUrl);
  }

  generateQRCode(document: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/generateQR`, document, {
      responseType: 'blob' // Ensure response type is Blob
    });
  }

  generateAttestation(cin: string): Observable<Blob> {
    // Assuming the endpoint for generating attestation PDF is '/attestation'
    return this.http.get(`${this.apiUrl}/attestation?cin=${cin}`, {
      responseType: 'blob' // Ensure response type is Blob
    });
  }
}
