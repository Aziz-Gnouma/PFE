import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-list-formations',

  templateUrl: './list-formations.component.html',
  styleUrl: './list-formations.component.css'
})

export class ListFormationsComponent {
  FormationForm!: FormGroup;
  userData: any; 
  FormationsList: any;
  downloading: boolean = false;

  constructor(private formBuilder: FormBuilder ,
        private appService: AppServiceService,
         private route : Router,
         private fb: FormBuilder,
         private router: Router,
    ) { }

    ngOnInit(): void {
      const enterpriseName = localStorage.getItem('enterpriseName') || '';

  
      this.getFormations(enterpriseName);
    }
    convertDate(dateString: string): string {
      const parts = dateString.split('/');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    isDateRecent(dateString: string): boolean {
      const date = new Date(dateString);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate.getTime() - date.getTime();
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      return differenceInDays <= 3;
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
      this.downloading = false;
    },
    (error) => {
      console.error('Error downloading video:', error);
    }
  );
}

detailsformation(id : number) {
  console.log('hola')
  this.router.navigate(['FormationDetails', id]);
}
    
    
}
