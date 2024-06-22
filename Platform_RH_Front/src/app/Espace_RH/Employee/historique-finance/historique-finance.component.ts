import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-historique-finance',
  templateUrl: './historique-finance.component.html',
  styleUrl: './historique-finance.component.css'
})

export class HistoriqueFinanceComponent implements OnInit {
  FinancieresData: any [] =[]; 

  
  step: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;  
  id!: string; 
searchTerm!: string;

  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  
    this.id = this.route.snapshot.params['id'];
    console.log('id employee data:', this.id);

    this.getHistorisueFinance();


   
  }
  convertDate(dateString: string): string {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  getHistorisueFinance()
  {
    this.appServiceService.getFinancieresById(this.id).subscribe(
      (data: any) => {
        this.FinancieresData = data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
          console.log(' Historique f data:', this.FinancieresData);

      },
      (error) => {
        console.error('Failed to fetch employee data:', error);
      }
    );
  }

 
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
  }
  
  
 
  
  
}
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Return null if value is null or undefined
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
