import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Avancement, Structure, Titularisation } from 'src/app/Employee';



@Component({
  selector: 'app-historique-carriere',
  templateUrl: './historique-carriere.component.html',
  styleUrl: './historique-carriere.component.css'
})

export class HistoriqueCarriereComponent implements OnInit {
  AvencementData: Avancement [] =[]; 
  tituData:Titularisation[] = []; 
  StructureData:Structure [] =[]; 
  
  step: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;  
  avancement!: FormGroup; 
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

    this.getHistorisueAvanc();
    this.getHistorisueStructure();
    this.getHistorisueTitur();

   
  }
  convertDate(dateString: string): string {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  getHistorisueAvanc()
  {
    this.appServiceService.GetAvancementbyId(this.id).subscribe(
      (data: any) => {
        this.AvencementData = data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
          console.log(' Historique AvencementData:', this.AvencementData);

      },
      (error) => {
        console.error('Failed to fetch employee data:', error);
      }
    );
  }
  getHistorisueStructure()
  {
    this.appServiceService.GetStructurebyId(this.id).subscribe(
      (data: any) => {
        this.StructureData =data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
        console.log(' Historique StructureData:', this.StructureData);

      },
      (error) => {
        console.error('Failed to fetch employee data:', error);
      }
    );
  }
  getHistorisueTitur()
  {
    this.appServiceService.GetTitularisationbyId(this.id).subscribe(
      (data: any) => {
        this.tituData = data.sort((a: any, b: any) => {
          const dateA = new Date(this.convertDate(a.dateAjouter));
          const dateB = new Date(this.convertDate(b.dateAjouter));
          return dateB.getTime() - dateA.getTime(); 
        });
        console.log(' Historique tituData:', this.tituData);

      },
      (error) => {
        console.error('Failed to fetch employee data:', error);
      }
    );
  }
 
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
  }
  
  
  AStep() {
    this.step = 1;
  }
  
  BStep() {
    this.step = 2;
  }

  CStep() {
    this.step = 3;
  }

  
  
}

