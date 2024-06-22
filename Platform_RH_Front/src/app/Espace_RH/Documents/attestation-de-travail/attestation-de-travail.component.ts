import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentAuthService } from 'src/app/Services/document-auth.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-attestation-de-travail',
  templateUrl: './attestation-de-travail.component.html',
  styleUrls: ['./attestation-de-travail.component.css']
})
export class AttestationDeTravailComponent implements OnInit {
  attestation: any;
  cin: string | undefined;
  userFirstName: string | undefined;
  userLastName: string | undefined;
  userData: any;
  categoriesList$: any;
  documents: any;
  matricule: string | undefined;
  pays: string | undefined;
  cinDate: string | undefined;
  dateOfBirth: string | undefined;
  entrepriseName: string | undefined;
  nationality: string | undefined;
  qrCodeUrl: string | undefined;
  pdfDownloaded: boolean = false;
  dateTimeNow!: string;

  constructor(private route: ActivatedRoute, private documentService: DocumentAuthService, private appService: AppServiceService) { }

  ngOnInit(): void {
    this.fetchUserData();
    this.categoriesList$ = this.appService.getAllCategories();
    this.downloadPDF(); // Trigger download when component initializes
    this.updateDateTime();


  }


  fetchUserData() {
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      this.cin = this.userData.cin;
      this.userFirstName = this.userData.userFirstName;
      this.userLastName = this.userData.userLastName;
      this.matricule = this.userData.matricule;
      this.pays = this.userData.pays;
      this.cinDate = this.userData.cinDate;
      this.dateOfBirth = this.userData.dateOfBirth;
      this.entrepriseName = this.userData.entrepriseName;
      this.nationality = this.userData.nationality;
      console.log('UserData', this.userData);
      this.generateQRCode(); // Call generateQRCode() after fetching user data
    } else {
      console.error('User Data not found in local storage...');
    }
  }
  updateDateTime(): void {
    // Obtenez la date actuelle et formatez-la pour afficher uniquement la date
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    this.dateTimeNow = new Date().toLocaleDateString('fr-FR', options);
  }




  generateQRCode(): void {
    const userDetails = {
      cin: this.cin,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      matricule: this.matricule,
      pays: this.pays,
      cinDate: this.cinDate,
      dateOfBirth: this.dateOfBirth,
      entrepriseName: this.entrepriseName,
      nationality: this.nationality
    };

    const qrData = JSON.stringify(userDetails);

    QRCode.toDataURL(qrData)
      .then((url: string) => {
        this.qrCodeUrl = url;
      })
      .catch((err: any) => {
        console.error('Error generating QR code:', err);
      });
  }
  downloadPDF(): void {
    // Check if PDF has already been downloaded
    if (!this.pdfDownloaded) {
      // Fetch and download the attestation PDF
      if (this.cin) {
        this.documentService.generateAttestation(this.cin).subscribe((blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'attestation.pdf';
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.pdfDownloaded = true; // Set flag to true after downloading PDF
        });
      }
    }
  }
}
