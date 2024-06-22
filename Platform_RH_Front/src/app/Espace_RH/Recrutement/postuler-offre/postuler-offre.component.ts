import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecrutementService } from 'src/app/Services/recrutement.service';

@Component({
  selector: 'app-postuler-offre',
  templateUrl: './postuler-offre.component.html',
  styleUrls: ['./postuler-offre.component.css']
})
export class PostulerOffreComponent implements OnInit {
  offre: any; // Replace with the appropriate type
  selectedFiles: File[] = [];
  alertMessage: string | null = null;
  name: string = '';
  email: string = '';
  constructor(
    private route: ActivatedRoute,
    private recrutementService: RecrutementService
  ) {}

  ngOnInit() {
    const offreId = this.route.snapshot.params['id'];
    this.recrutementService.getOffreById(offreId).subscribe(data => {
      this.offre = data;
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  // onSubmit() {
  //   if (this.name && this.email && this.selectedFiles.length > 0) {
  //     this.recrutementService.submitMultipleCVs(this.name, this.email, this.selectedFiles)
  //       .subscribe(
  //         response => {
  //           this.alertMessage = 'CV submitted successfully!';
  //           console.log(response);
  //         },
  //         error => {
  //           this.alertMessage = 'Failed to submit CVs';
  //           console.error(error);
  //         }
  //       );
  //   } else {
  //     this.alertMessage = 'Please fill out all fields and select at least one file.';
  //   }
  // }
  onSubmit() {
    if (this.name && this.email && this.selectedFiles.length > 0) {
      this.recrutementService.submitMultipleCVs(this.name, this.email, this.selectedFiles)
        .subscribe(
          response => {
            this.alertMessage = 'CVs submitted successfully!';
            console.log(response);
          },
          error => {
            this.alertMessage = error;
            console.error(error);
          }
        );
    } else {
      this.alertMessage = 'Please fill out all fields and select at least one file.';
    }
  }

  onRankAllCVs() {
    this.recrutementService.rankAllCVs().subscribe(
      (response) => {
        console.log('Ranked CVs response', response);
        // Handle the ranked CVs here
      },
      (error) => {
        console.error('Failed to rank CVs', error);
        this.alertMessage = 'Failed to rank CVs';
      }
    );
  }
}
