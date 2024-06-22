import { Component, OnInit } from '@angular/core';
import { DocumentAuthService } from 'src/app/Services/document-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doc-authentique',
  templateUrl: './doc-authentique.component.html',
  styleUrls: ['./doc-authentique.component.css']
})
export class DocAuthentiqueComponent implements OnInit {
  documents: any[] = [];

  constructor(private documentService: DocumentAuthService, private router: Router) {}

  ngOnInit(): void {
    this.documentService.getAllDocs().subscribe(
      (response) => {
        this.documents = response;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  generateQRCode(document: any): void {
    this.documentService.generateQRCode(document).subscribe(
      (response: any) => {
        // Assuming the response contains the QR code byte array
        const qrCodeUrl = URL.createObjectURL(new Blob([response], { type: 'image/png' }));
        // Open a new tab or modal to display the QR code
        window.open(qrCodeUrl, '_blank');
      },
      (error) => {
        console.error('Error generating QR code:', error);
      }
    );
  }

  redirectToDetailsDocAuth(documentType: string): void {
    switch(documentType) {
      case 'attestation de travail':
        this.router.navigate(['/attestation-de-travail', 1]); // Assuming document ID 1
        break;
      case 'fiche de paie':
        this.router.navigate(['/MesFicheDePaie']); // Assuming document ID 2
        break;
      case 'fiche de paie':
        this.router.navigate(['/MesFicheDePaie']); // Assuming document ID 3
        break;
      default:
        console.error('Unknown document type');
    }
  }
}
