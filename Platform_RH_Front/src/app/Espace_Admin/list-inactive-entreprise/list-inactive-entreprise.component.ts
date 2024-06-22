import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';


import { User } from 'src/app/User';
@Component({
  selector: 'app-list-inactive-entreprise',
  templateUrl: './list-inactive-entreprise.component.html',
  styleUrls: ['./list-inactive-entreprise.component.css']
})

export class ListInactiveEntrepriseComponent implements OnInit {
  users: User[] = []; 
  searchTerm2: string = ''; 
  showModal: boolean = false; 
  selectedUser: User | undefined;

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    this.appService.getALLUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.entreprise.some(entreprise => entreprise.etat === -1));
      this.users = data.filter(user => user.role.some(role => role.roleName === 'Archiver'));

      console.log(this.users)
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