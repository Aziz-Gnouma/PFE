import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';
@Component({
  selector: 'app-list-archiver',
  templateUrl: './list-archiver.component.html',
  styleUrls: ['./list-archiver.component.css']
})

export class ListArchiverComponent implements OnInit {
  enterpriseName!: string;
  users: User[] = [];
  searchTerm: string = '';
  showModal: boolean = false; 
  selectedUser: User | undefined; 
  roleFilter:User | undefined;

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
      const enterpriseUsers = data.filter(user => 
        user.entreprise.some(entreprise => entreprise.entrepriseName === this.enterpriseName)
      );

      this.users = enterpriseUsers.filter(user => 
        user.role.some(role => role.roleName === 'Archiver')
      );

      console.log(this.users);
    });
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
  desarchiveGRHUser(id: number) {
    const confirmed = confirm('Are you sure you want to desarchive this GRH?');
    if (confirmed) {
      this.appService.desarchiveEmployeUser(id).subscribe(
        () => {
          this.getNewUsers();
          this.router.navigateByUrl('/allEmployees');

        },
        (error: any) => {
          console.log('Error archiving gerant:', error);
        }
      );
    }
    this.getNewUsers();
   
  }
}