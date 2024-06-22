import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';
import { User } from 'src/app/User';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'bootstrap'; // Import Bootstrap JavaScript

@Component({
  selector: 'app-all-new-users',
  templateUrl: './all-new-users.component.html',
  styleUrls: ['./all-new-users.component.css']
})

export class AllNewUsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  searchTerm: string = '';
  selectedUser: User | null = null;

  constructor(private appService: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getNewUsers();
  }

  ngAfterViewInit(): void {
    $('#userDetailsModal').modal({
      backdrop: 'static', 
      keyboard: false, 
    });
  }

  getNewUsers(): void {
    this.appService.getALLUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.role.some(role => role.roleName === 'NewDemande'));
    });
  }

  getDetailsUsers(id: number): void {
    this.appService.getUserbyId(id).subscribe((data: User[]) => {
      if (data.length > 0) {
        this.selectedUser = data[0];
        console.log(this.selectedUser);
      }
    });
  }

  getDetailsUser(id: number) {
    console.log('ok1');
    this.router.navigate(['NewUsers', id]);
    console.log('ok2');
  }

  DerchiverGerant(id: number) {
    const confirmed = confirm('Are you sure you want to desarchive this Gérant?');
    if (confirmed) {
      this.appService.desarchiveAdminUser(id).subscribe(
        () => {
          this.getNewUsers();
        },
        (error: any) => {
          console.log('Error archiving gerant:', error);
        }
      );
    }
    this.getNewUsers();
    this.router.navigate(['/Entrepreuneurs']);
  }

  goToGerantList(){
    this.router.navigate(['Entrepreuneurs']);
    this.getNewUsers();
  }

  openPopup(user: User) {
    this.selectedUser = user;
    ($('#userDetailsModal') as any).modal('show');
  }
}
