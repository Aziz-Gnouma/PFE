import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { CongesService } from 'src/app/Services/conges-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-conges-list-employee',
  templateUrl: './conges-list-employee.component.html',
  styleUrl: './conges-list-employee.component.css'
})
export class CongesListEmployeeComponent {
  allDemandes: Demande[] = [];
  searchTerm: string = '';
  userData: any;
  categoriesList$: any;
  @Input() FormationForm: any;
  constructor(private congesService: CongesService,private appService: AppServiceService  ) { }

  ngOnInit(): void {
    // Récupérer les données de l'utilisateur depuis le stockage local
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      // Appeler la méthode pour récupérer les demandes de congé de l'utilisateur actuel
      this.fetchDemandesByMatricule(this.userData.matricule);
    } else {
      console.error('User Data not found in local storage...');
    }
  }
  fetchDemandesByMatricule(matricule: string) {
    this.congesService.getAllDemandesByMatricule(matricule).subscribe(demandes => {
      this.allDemandes = demandes;
    }, error => {
      console.error('Error fetching demandes by matricule:', error);
    });
  }
}
