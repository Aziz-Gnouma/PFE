import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { CongesService } from 'src/app/Services/conges-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';


@Component({
  selector: 'app-conges-list',
  templateUrl: './conges-list.component.html',
  styleUrls: ['./conges-list.component.css']
})
export class CongesListComponent implements OnInit {
  allDemandes: Demande[] = [];
  searchTerm: string = '';
  userData: any;
  categoriesList$: any;
  @Input() FormationForm: any;
  constructor(private congesService: CongesService,private appService: AppServiceService  ) { }


  ngOnInit(): void {
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName);
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

      if (this.FormationForm) {
        const matriculeValue = this.userData.matricule || '';
        const enterpriseValue = enterpriseName;
        const userFirstValue=this.userData.userFirstName;
        const userLastNameValue=this.userData.userLastName;
        this.FormationForm.get('RHMatricule')?.setValue(matriculeValue);
        this.FormationForm.get('entreprise')?.setValue(enterpriseValue);
        this.FormationForm.get('userFirstName')?.setValue(userFirstValue);
        this.FormationForm.get('userLastName')?.setValue(userLastNameValue)
      } else {
        console.error('FormationForm is not provided.');
      }
    } else {
      console.error('User Data not found in local storage...');
    }


    this.fetchAllDemandes();
  }

  fetchAllDemandes() {
    this.congesService.getAllDemandes().subscribe(demandes => {
      this.allDemandes = demandes;
    }, error => {
      console.error('Error fetching all demandes:', error);
    });
  }
}
