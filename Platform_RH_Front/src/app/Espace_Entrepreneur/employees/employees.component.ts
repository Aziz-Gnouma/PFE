import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Carrier } from 'src/app/Carriere';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  enterpriseName!: string;
  users: User[] = [];
  searchTerm: string = '';
  selectedRole: string = 'User';
  showModal: boolean = false;
  selectedUser: User | undefined;
  carriers: Carrier | undefined;
  // Initialize as null or an empty array if appropriate

  roleFilter:User | undefined;
  carrierCINs!: number[];
 // carriers: Carrier[] = []; // Changed variable name from Carrier to carriers

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
    this.appService.getALLUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.entreprise.some(entreprise => entreprise.entrepriseName === this.enterpriseName));
      console.log(this.users);

      this.appService.getCarrierUsers().subscribe((data: any[]) => {
        this.carrierCINs = data.map(carrier => carrier.cin);
        console.log('wiw',this.carrierCINs)
      });
    });

  }
ArchiverGRH(id: number) {
    const confirmed = confirm('Are you sure you want to archive this GRH?');
    if (confirmed) {
      this.router.navigateByUrl('/ArchivedEmployees');

      this.appService.archiveGRHUser(id).subscribe(
        () => {
          this.getNewUsers(); 
        },
        (error: any) => {
          console.log('Error archiving gerant:', error);

        }
      );
    }
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

  OpenModal(user: User): void {
    console.log("Opening modal for user:", user);
    this.selectedUser = user;

    // Check if the user has a carrier
    if (this.carrierCINs.includes(user.cin)) {
      this.appService.getCarrierByCIN(user.cin).subscribe(
        (data: Carrier | Carrier[]) => { 
          if (Array.isArray(data)) {
            console.error('Multiple carriers found for user:', user);
          } else {
            // Assign data to carriers
            this.carriers = data;
            console.log('carrier:', this.carriers );
            $('#CarrierModalToggle').modal('show'); 
          }
        },
        (error: any) => {
          console.error('Error fetching carrier:', error);
        }
      );

    } else {
      // If the user doesn't have a carrier, just show the modal
      $('#CarrierModalToggle').modal('show');
    }
  }



  isCarrierArray(carrier: Carrier | Carrier[]): boolean {
    return Array.isArray(carrier);
  }





}