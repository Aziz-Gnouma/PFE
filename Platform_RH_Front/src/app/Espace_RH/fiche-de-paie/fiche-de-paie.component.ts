import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-fiche-de-paie',
  templateUrl: './fiche-de-paie.component.html',
  styleUrl: './fiche-de-paie.component.css'
})

export class FicheDePaieComponent implements OnInit {
  enterpriseName!: string;
  Employees: Employee[] = [];
  FicheDePaie: any [] =[]; 
  salaire: any [] =[]; 
  FN: any [] =[]; 
fn:any;
Salair:any;
  searchTerm: string = '';
  selectedRole: string = 'Employee';
  selectedUser: User | undefined;

  roleFilter:User | undefined;
  carrierCINs!: number[];
  enterpriseAdresse!: string | null;

  constructor(
    private appService: AppServiceService,

    private route: ActivatedRoute,
    private router : Router,
    public AppServiceService: AppServiceService
  ) {}

  ngOnInit(): void {
     const storedEnterpriseName = localStorage.getItem('enterpriseName'); 
     const storedEnterpriseAdresse = localStorage.getItem('EnterpriseAdresse'); 


     if (storedEnterpriseName !== null) {
       this.enterpriseName = storedEnterpriseName;
       this.enterpriseAdresse = storedEnterpriseAdresse;
       console.log('Enterprise Name:', this.enterpriseName);
     } else {
       console.error('Enterprise Name not found in local storage.');
     }
    this.getEmployes();
    this.getAllFicheDePaie();

  }

  getEmployes(): void {
    console.log(this.enterpriseName);
    const NomEntreprise= this.enterpriseName;

    this.appService.getAllEmployes(NomEntreprise).subscribe((data: Employee[]) => {
      this.Employees = data;
      console.log("éééé",this.Employees);
     // localStorage.setItem('EmployeesDetails', JSON.stringify(this.Employees));
    
      
    });

  }

  calculateSalariesForAllEmployees(): void {

    this.Employees.forEach(employee => {
     
      this.calculateAndPay(employee);
      console.log("c bon");
    });
    alert('Tu as déjà payé cet employés ce mois-ci. Merci !');
  }
  
  convertDate(dateString: string): string {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  

  getAllFicheDePaie()
  {
    this.appService.getAllFicheDePaie().subscribe(
      (data: any) => {
        this.FicheDePaie = data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
          console.log(' FicheDePaie:', this.FicheDePaie);

      },
      (error) => {
        console.error('Failed to fetch FicheDePaie data:', error);
      }
    );
  }


  calculateAndPay(employee: Employee): void {
    console.log('mat', employee.matricule);

    let fn: string;
    let salaire: number;

    this.appService.getUserfinancieres(employee.matricule).subscribe((data1: any) => {
        salaire = data1[0].salaireBase;

        this.appService.getCareerInformation(employee.matricule).subscribe((data: any) => {
            fn = data.structure[0].fonction;
            console.log("fonction: ", fn);

            const employeeForCalculation = {
                natureRevenuImposable: 'salarie',
                montantMensuel: salaire,
                situationFamiliale: true,
                secteurPrive: true,
                matricule: employee.matricule,
                nomEntreprise: this.enterpriseName,
                adresseEntreprise: this.enterpriseAdresse,
                affiliationCss: 333,
                adresse: employee.address,
                nomEmploye: `${employee.userFirstName} ${employee.userLastName}`,
                cinEmploye: employee.cin,
                address: employee.address,
                ncss: 12078333+employee.cin,
                fonction: fn,
            };
            console.log('employeeForCalculation', employeeForCalculation);

            // Now, proceed with salary calculation
            this.appService.calculateSalary(employeeForCalculation).subscribe(
                (response: any) => {
                  this.router.navigateByUrl('/FicheDePaie');
                    const message = response.message; 
                    alert(message); 
                    console.log('Employee paid successfully', response);
                    this.getAllFicheDePaie();
                },
                (error: any) => {
                    console.error('An error occurred: ', error); 
                }
            );
        });
    });
}

formatDate(value: any): string {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(value, 'yyyy-MM') || '';
}

telechargerFiche(matricule: string, date: string) {
 const formattedDate = this.formatDate(date);

  this.appService.getFicheDePaiEById(matricule, formattedDate).subscribe((response) => {
  
   
  }, (error) => {
      // Handle error
      console.error('Error downloading file:', error);
  });
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
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy-MM');
  }

}
