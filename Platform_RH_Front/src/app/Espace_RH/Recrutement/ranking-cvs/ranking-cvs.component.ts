import { Component, OnInit } from '@angular/core';
import { RecrutementService } from 'src/app/Services/recrutement.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ranking-cvs',
  templateUrl: './ranking-cvs.component.html',
  styleUrls: ['./ranking-cvs.component.css']
})
export class RankingCvsComponent implements OnInit {
  rankedCVs: any[] = [];
  searchName: string = '';

  constructor(private recrutementService: RecrutementService) { }

  ngOnInit(): void {
    this.rankAllCVs();
  }

  // rankAllCVs(): void {
  //   this.recrutementService.rankAllCVs().subscribe(
  //     (rankedCVs: any[]) => {
  //       this.rankedCVs = rankedCVs;
  //       console.log('Ranked CVs:', this.rankedCVs);
  //     },
  //     (error) => {
  //       console.error('Failed to rank CVs:', error);
  //     }
  //   );
  // }
  rankAllCVs(): void {
    this.recrutementService.rankAllCVs().subscribe(
      (rankedCVs: any[]) => {
        this.rankedCVs = rankedCVs;
        console.log('Ranked CVs:', this.rankedCVs); // Check the structure of the ranked CVs
      },
      (error) => {
        console.error('Failed to rank CVs:', error);
      }
    );
  }

  downloadCV(id: number): void {
    if (id) {
      this.recrutementService.downloadCv(id).subscribe((data: Blob) => {
        saveAs(data, `CV_${id}.pdf`);
      });
    } else {
      console.error('Invalid CV ID');
    }
  }

   telechargerFiche2(id: number) {
    this.recrutementService.downloadCv(id).subscribe(
      (response: Blob) => {
         const url = window.URL.createObjectURL(response);

         const link = document.createElement('a');
         link.href = url;

         link.setAttribute('download', `Cv${id}.pdf`);
        document.body.appendChild(link);
         link.click();

         window.URL.revokeObjectURL(url);
         document.body.removeChild(link);
       },
       (error) => {
       console.error('Error downloading PDF:', error);
       }
     );

     }
     acceptCV(id: number): void {
      this.recrutementService.acceptCV(id).subscribe(
        (response) => {
          console.log('CV accepted successfully:', response);
          // Optionally, update UI or perform any other action upon successful acceptance
        },
        (error) => {
          console.error('Failed to accept CV:', error);
        }
      );
    }

    rejectCV(id: number): void {
      this.recrutementService.rejectCV(id).subscribe(
        (response) => {
          console.log('CV rejected successfully:', response);
          // Optionally, update UI or perform any other action upon successful rejection
        },
        (error) => {
          console.error('Failed to reject CV:', error);
        }
      );
    }


}
