import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Carrier } from 'src/app/Carriere';
import { Employee } from 'src/app/Employee';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
  
})


export class EmployeeListComponent implements OnInit {
  enterpriseName!: string;
  Employees: Employee[] = [];
  searchTerm: string = '';
  selectedRole: string = 'Employee';
  showModal: boolean = false;
  selectedUser: User | undefined;
  carriers: Carrier | undefined;

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

     if (storedEnterpriseName !== null) {
       this.enterpriseName = storedEnterpriseName;
       console.log('Enterprise Name:', this.enterpriseName);
     } else {
       console.error('Enterprise Name not found in local storage.');
     }
    this.getNewUsers();


  }

  getNewUsers(): void {
    console.log(this.enterpriseName);
    const NomEntreprise= this.enterpriseName;
    this.appService.getAllEmployes(NomEntreprise).subscribe((data: Employee[]) => {
      this.Employees = data ;

     this.Employees.forEach(employee => {
      this.appService.getCareerInformation(employee.matricule).subscribe(careerInfo => {
        Object.assign(employee, {
          categorie: careerInfo.avancement[0].categorie,
          grade: careerInfo.avancement[0].grade,
          classe: careerInfo.avancement[0].classe,
          fonction: careerInfo.structure[0].fonction,

        });


          });
      console.log(this.Employees);

    });
  });

  }
  ArchiverEmploye(id: string) {
    const confirmed = confirm('Are you sure you want to archive this Employé ?');
    if (confirmed) {
      this.appService.archiveEmployeUser(id).subscribe(
        () => {

          this.getNewUsers();
        },
        (error: any) => {
          console.log('Error archiving gerant:', error);
        }
      );
    }
            //  this.getGerantList();

  }
  openModal(user: User): void {
    console.log("Opening modal for user:", user);
    this.selectedUser = user;
    $('#exampleModalToggle').modal('show');
  }

  closeModal(): void {
    console.log("Closing modal");
    this.showModal = false;
  }
  hasCarrier(user: any): boolean {
    //console.log('ok',this.carrierCINs.includes(user.cin));

    return this.carrierCINs && this.carrierCINs.includes(user.cin);
  }
  AddCarriere(cin: number) {
    this.router.navigate(['AddCarriere', cin]);
  }
  UpdateCarriere(cin: number) {
    this.router.navigate(['UpdateCarriere', cin]);
  }

  Employeedetails(id: string) {
    this.router.navigate(['DetailsEmplyee', id]);
  }

  OpenModal(user: User): void {
    console.log("Opening modal for user:", user);
    this.selectedUser = user;

    // Check if the user has a carrier
   /* if (this.carrierCINs.includes(user.cin)) {
      // Fetch the carrier information for the selected user
      this.appService.getCarrierByCIN(user.cin).subscribe(
        (data: Carrier | Carrier[]) => { // Update the type of data to Carrier or Carrier[]
          if (Array.isArray(data)) {
            // Handle case where multiple carriers are returned
            // For example, you might want to display an error message
            console.error('Multiple carriers found for user:', user);
          } else {
            // Assign data to carriers
            this.carriers = data;
            console.log('carrier:', this.carriers );
            $('#CarrierModalToggle').modal('show'); // Show the modal after the data is fetched
          }
        },
        (error: any) => { // Handle error if necessary
          console.error('Error fetching carrier:', error);
        }
      );

    } else {
      // If the user doesn't have a carrier, just show the modal
      $('#CarrierModalToggle').modal('show');
    }*/
  }



  isCarrierArray(carrier: Carrier | Carrier[]): boolean {
    return Array.isArray(carrier);
  }





}
