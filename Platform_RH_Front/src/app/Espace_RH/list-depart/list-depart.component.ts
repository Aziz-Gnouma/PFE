
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-list-depart',
  templateUrl: './list-depart.component.html',
  styleUrl: './list-depart.component.css'
})

export class ListDepartComponent implements OnInit {
  enterpriseName!: string;
  FicheDePaie: any [] =[];
  departs: any [] =[];
  searchTerm: string = '';

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
    this.getDeparts();


  } 

  getDeparts(): void {
    const enterpriseName = this.enterpriseName;
    this.appService.getAllDeparts().subscribe((data:any) => {
      this.departs = data.filter((depart: any) => depart.matricule.includes(enterpriseName));
      console.log(this.departs);
    });
  }

  Accepter(matricule: string , departId: string, employeeName: string, employeeEmail: string) {
    const confirmed = confirm('Êtes-vous sûr de vouloir accepter ce départ ?');
    if (confirmed)

    this.appService.AcceptDepart(departId, employeeName, employeeEmail).subscribe(
      () => {
        this.router.navigateByUrl('/ListDepart');
      },
      (error) => {
        console.error('Error accepting departure:', error);
      }
    );
    this.appService.archiveEmployeUser(matricule).subscribe(
      () => {
      },
      (error: any) => {
        console.log('Error archiving gerant:', error);
      }
    );
  }

  Annuler(departId: string, employeeName: string, employeeEmail: string) {
    const confirmed = confirm('Êtes-vous sûr de vouloir annuler ce départ ?');
    if (confirmed)
    this.appService.AnnulerDepart(departId, employeeName, employeeEmail).subscribe(
      () => {
        this.router.navigateByUrl('/ListDepart');
      },
      (error) => {
        console.error('Error accepting departure:', error);
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
