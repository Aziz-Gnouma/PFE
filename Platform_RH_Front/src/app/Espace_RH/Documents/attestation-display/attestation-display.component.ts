import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CryptoServiceService } from 'src/app/Services/crypto-service.service';

@Component({
  selector: 'app-attestation-display',
  templateUrl: './attestation-display.component.html',
  styleUrls: ['./attestation-display.component.css']
})
export class AttestationDisplayComponent implements OnInit {
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cryptoService: CryptoServiceService // Fix typo here
  ) { }

  ngOnInit(): void {
    const encryptedCin = this.route.snapshot.queryParamMap.get('cin');
    const cin = this.decryptCin(encryptedCin);
    this.fetchUserData(cin);
  }

  fetchUserData(cin: string | null) {
    if (cin) {
      this.http.get(`http://localhost:4200/attestation?cin=${cin}`).subscribe(
        (data) => {
          this.userData = data;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  decryptCin(encryptedCin: string | null): string | null {
    if (encryptedCin) {
      return this.cryptoService.decrypt(encryptedCin);
    }
    return null;
  }
}
