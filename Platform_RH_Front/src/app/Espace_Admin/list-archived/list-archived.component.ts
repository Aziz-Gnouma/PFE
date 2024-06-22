import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';


import { User } from 'src/app/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-archived',
  templateUrl: './list-archived.component.html',
  styleUrls: ['./list-archived.component.css']
})

export class ListArchivedComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = ''; 
  showModal: boolean = false; 
  selectedUser: User | undefined;
  constructor(private appService: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getGerantArchived();
  }
  isModalOpen: boolean = false;

  


  getGerantArchived(): void {
    this.appService.getALLUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.role.some(role => role.roleName === 'Archiver'));
  });

  }

  DerchiverGerant(id: number) {
    const confirmed = confirm('Are you sure you want to desarchive this Gérant?');
    if (confirmed) {
      this.appService.desarchiveAdminUser(id).subscribe(
        () => {
          this.getGerantArchived();
        },
        (error: any) => {
          console.log('Error archiving gerant:', error);
        }
      );
    }
    this.getGerantArchived();
    this.router.navigate(['/Entrepreuneurs']);
  }

  goToGerantList(){
    this.router.navigate(['Entrepreuneurs']);
    this.getGerantArchived();
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
  
}