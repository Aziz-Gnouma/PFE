import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent implements OnInit {
  enterpriseName: string = '';
  newUsersCount: any; 
  newDemandeNumber: number | undefined;
  totalUsersNumber: number | undefined; 
  totalEnterprisesNumber: number | undefined; 
  ReclamationsNumber: number | undefined; 


  constructor(
    private appService: AppServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedEnterpriseName = localStorage.getItem('enterpriseName');

    if (storedEnterpriseName !== null) {
      this.enterpriseName = storedEnterpriseName;
      console.log('Enterprise Name:', this.enterpriseName);
    } else {
      console.error('Enterprise Name not found in local storage.');
    }
    this.getNewDemandes();
    this.getTotalEnterprises();
    this.getTotalUsers();
    this.getNewReclamations();
  }

  getNewDemandes(): void {
    this.appService.gettotalUsersWithRoleNewDemande().subscribe((data: any) => { 
      this.newDemandeNumber = data; 
    });
  }

  getTotalEnterprises(): void {
    this.appService.getTotalEnterprises().subscribe((data: any) => { 
      this.totalEnterprisesNumber = data; 
    });
  }

  getTotalUsers(): void {
    this.appService.gettotalUsers().subscribe((data:  any) => { 
      this.totalUsersNumber = data; 
      console.log('totalUsersNumber',this.totalUsersNumber)
    });
  }
  getNewReclamations(): void {
    this.appService.getALLtotalReclamations().subscribe((data: any) => { 
      this.ReclamationsNumber = data; 
    });
  }

  goToAllEmployees(): void {
    this.router.navigate(['/allEmployees']);
  }
}
