import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';
import { User } from 'src/app/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-entrepreneurs',
  templateUrl: './list-entrepreneurs.component.html',
  styleUrls: ['./list-entrepreneurs.component.css']
})
export class ListEntrepreneursComponent implements OnInit {
  users: User[] = []; 
  searchTerm: string = ''; 
  showModal: boolean = false; 
  selectedUser: User | undefined; 


  constructor(private appService: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getGerantList();
  }
 


  getGerantList(): void {
    this.appService.getAdminUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  ArchiverGerant(id: number) {
    const confirmed = confirm('Are you sure you want to archive this Gérant?');
    if (confirmed) {
      this.appService.archiveAdminUser(id).subscribe(
        () => {
          
          this.router.navigate(['/'])
        },
        (error: any) => {
          console.log('Error archiving gerant:', error);
          // Handle archive errors
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
  goToGerantList(){
    this.router.navigate(['Entrepreuneurs']);
    this.getGerantList();
  }
  
}
