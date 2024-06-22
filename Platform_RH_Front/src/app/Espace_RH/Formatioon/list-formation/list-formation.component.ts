import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.css'
})
export class ListFormationComponent {
  FormationForm!: FormGroup;
  userData: any; 
  FormationsList: any;
  downloading: boolean = false;



  constructor(private formBuilder: FormBuilder ,
        private appService: AppServiceService,
         private route : Router,
         private fb: FormBuilder,
         private router: Router,
         public AppServiceService: AppServiceService
    ) { }

    ngOnInit(): void {
      const enterpriseName = localStorage.getItem('enterpriseName') || '';

  
      this.getFormations(enterpriseName);
    }
    convertDate(dateString: string): string {
      const parts = dateString.split('/');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    extractDate(dateString: string): string {
      return dateString.split("T")[0]; 
    }
    getFormations(enterpriseName: string): void {
      this.appService.getFormations(enterpriseName).subscribe((data: any[]) => {
        data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
        this.FormationsList = data; 
        console.log(this.FormationsList);
      });
    }


TelechargerFormations(id: number): void {
  // Set downloading to true to show the loading spinner
  this.downloading = true;

  this.appService.TelechargerFormation(id).subscribe(
    (data: any) => {
      const blob = new Blob([data], { type: 'video/mp4' });
  
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formation.mp4'; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      // After the download is complete, set downloading to false
      this.downloading = false;
    },
    (error) => {
      console.error('Error downloading video:', error);
      // Handle the error
      
      // Set downloading to false in case of error
    }
  );
}

SuprimerFormation(id: number,enterpriseName:string) {
  const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cette formation ?');
  if (confirmed) {
    this.appService.supprimerFormation(id).subscribe(
      () => {

        this.getFormations(enterpriseName);
        this.router.navigate(['/ListFormation'])
      },
      (error: any) => {
        console.log('Error archiving gerant:', error);
      }
    );
  }
          //  this.getGerantList();

}
modifierformation(id : number) {
  this.router.navigate(['ModifierFormation', id]);
}
    
    
}
