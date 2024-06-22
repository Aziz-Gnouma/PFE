import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';
@Component({
  selector: 'app-mes-fiche-de-paie',
  templateUrl: './mes-fiche-de-paie.component.html',
  styleUrl: './mes-fiche-de-paie.component.css'
})


export class MesFicheDePaieComponent implements OnInit {
  enterpriseName!: string;
  Employees: Employee[] = [];
  FicheDePaie: any [] =[]; 
  selectedMonth!: number;
  selectedDate!: string; 
  
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  selectedUser: User | undefined;

  roleFilter:User | undefined;
  carrierCINs!: number[];

  constructor(
    private appService: AppServiceService,

    private route: ActivatedRoute,
    private router : Router,
    public AppServiceService: AppServiceService
  ) {}

  ngOnInit(): void {
     const storedEnterpriseName = localStorage.getItem('enterpriseName');
     const UserString: string | null = localStorage.getItem('UserData');
     if (UserString) {
         const User = JSON.parse(UserString);
         console.log('Matricule:', User.matricule); 
         this.getAllFicheDePaie(User.matricule);
     } else {
         console.log('No user data found in localStorage');
     }
     if (storedEnterpriseName !== null) {
       this.enterpriseName = storedEnterpriseName;
       console.log('Enterprise Name:', this.enterpriseName);
     } else {
       console.error('Enterprise Name not found in local storage.');
     }


  }


  
  convertDate(dateString: string): string {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  

  getAllFicheDePaie(matricule: string)
  {
    this.appService.getAllFicheDePaie().subscribe(
      (data: any) => {

        this.FicheDePaie = data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
        this.FicheDePaie = data.filter((item: any) => item.matricule === matricule);

          console.log(' FicheDePaie:', this.FicheDePaie);

      },
      (error) => {
        console.error('Failed to fetch FicheDePaie data:', error);
      }
    );
  }



formatDate(value: any): string {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(value, 'yyyy-MM') || '';
}

telechargerFiche2(matricule: string, date: string) {
  const formattedDate = this.formatDate(date);

this.appService.getFicheDePaiEById(matricule, formattedDate).subscribe(
  (response: Blob) => {
    const url = window.URL.createObjectURL(response);

    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', `Fiche_${matricule}_${date}.pdf`);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  },
  (error) => {
    console.error('Error downloading PDF:', error);
    // Handle error
  }
);

}
}