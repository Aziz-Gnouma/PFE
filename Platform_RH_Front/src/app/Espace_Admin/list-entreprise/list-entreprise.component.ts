import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';


import { User } from 'src/app/User';

@Component({
  selector: 'app-list-entreprise',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.css']
})
export class ListEntrepriseComponent implements OnInit {
  users: User[] = []; 
  searchTerm2: string = ''; 
  showModal: boolean = false; 
  selectedUser: User | undefined; 

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    this.appService.getAdminUsers().subscribe((data: User[]) => {
      this.users = data;
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


}
