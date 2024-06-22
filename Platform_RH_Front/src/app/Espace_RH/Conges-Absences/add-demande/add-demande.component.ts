import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { TypeCongee } from 'src/app/models/type-congee';
import { TypeCongeeService } from 'src/app/Services/type-congee-service.service';
import { CongesService } from 'src/app/Services/conges-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent implements OnInit {
  userData: any;
  categoriesList$: any;
  demande: Demande = {
    id: null,
    dateEnvoi: null,
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: null,
    cumulative: false,
    entreprise: '',
    reason: '',
    RHMatricule: undefined,
    nombreJoursDemandes: 0,
    matricule: '',
    // daysRemaining:0
  };
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private CongesService: CongesService, private appService: AppServiceService,    private router: Router
  ) { }
  daysRemainingMap: Map<string, number> = new Map<string, number>();

  ngOnInit(): void {
    this.loadPreviousDaysRemaining();
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName)
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);


      this.demande.matricule = this.userData.matricule;

    } else {
      console.error('User Data not found in local storage...');
    }

    const enterpriseValue = enterpriseName;
    this.demande.entreprise = enterpriseValue;
    this.demande.dateEnvoi = new Date();
  }
  calculateNombreJoursDemandes(): void {
    if (this.demande.dateDebut && this.demande.dateFin) {
      const start = new Date(this.demande.dateDebut);
      const end = new Date(this.demande.dateFin);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.demande.nombreJoursDemandes = Math.abs(Math.round(differenceInDays));
    } else {
      this.demande.nombreJoursDemandes = 0;
    }
  }
  loadPreviousDaysRemaining() {
    // Vous pouvez utiliser un service CongesService pour récupérer les données des jours restants précédents depuis votre API
    // Par exemple, si votre service CongesService a une méthode getPreviousDaysRemaining(matricule: string),
    // vous pouvez l'appeler ici pour récupérer les données
    // Voici un exemple de code pour cela :

    const matricule = this.demande.matricule; // Matricule de l'utilisateur
    this.CongesService.getPreviousDaysRemaining(matricule).subscribe(
      (data: any) => {
        // Data contient les jours restants précédents pour chaque type de congé
        // Assurez-vous que le format de données correspond à vos besoins
        // Par exemple, si data est un tableau d'objets avec des propriétés typeConge et daysRemaining :
        data.forEach((item: any) => {
          this.daysRemainingMap.set(item.typeConge, item.daysRemaining);
        });
      },
      (error: any) => {
        console.error('Erreur lors du chargement des jours restants précédents : ', error);
        // Gérez l'erreur selon vos besoins
      }
    );
  }
  calculateDaysRemaining() {
    switch(this.demande.reason) {
      case 'Maladie':
        this.demande.daysRemaining = 60 - this.demande.nombreJoursDemandes;
        break;
      case 'Congé annuel':
        this.demande.daysRemaining = 50 - this.demande.nombreJoursDemandes;
        break;
      case 'Congé de maternité':
        this.demande.daysRemaining = 2 - this.demande.nombreJoursDemandes;
        break;
      case 'Congé de paternité':
        this.demande.daysRemaining = 2 - this.demande.nombreJoursDemandes;
        break;
      case 'Congé de formation':
        this.demande.daysRemaining = 7 - this.demande.nombreJoursDemandes;
        break;
      // Add cases for other types of leaves here
      default:
        this.demande.daysRemaining = 0;
        break;
    }
  }

  submitDemande() {
    const currentDate = new Date().toISOString().split('T')[0];
    if (this.demande.dateDebut < currentDate) {
      this.errorMessage = 'La date de début ne peut pas être située dans le passé.';
      return;
  } else if (this.demande.dateDebut > currentDate) {
      this.errorMessage = 'La date de début ne peut pas être située dans le futur.';
      return;
  }
    this.calculateDaysRemaining();
    const previousDaysRemaining = this.daysRemainingMap.get(this.demande.reason);

    // Ensure that this.demande.daysRemaining has a value before setting it in the map
    if (this.demande.daysRemaining !== undefined) {
        if (previousDaysRemaining !== undefined) {
            if (previousDaysRemaining !== this.demande.daysRemaining) {
                this.daysRemainingMap.set(this.demande.reason, this.demande.daysRemaining);
            }
        } else {
            this.daysRemainingMap.set(this.demande.reason, this.demande.daysRemaining);
        }
    } else {
        console.error("Days remaining is undefined.");
        // Handle the case where days remaining is undefined according to your application logic
    }

    this.demande.dateEnvoi = new Date();

    switch(this.demande.reason) {
      case 'Maladie':
        // Vérifier si le nombre de jours demandés dépasse la limite de 60 jours
        if (this.demande.nombreJoursDemandes > 60) {
          this.errorMessage = 'Pour le congé de maladie, vous ne pouvez pas demander plus de 60 jours.';
          return; // Arrêter la soumission de la demande
        }
        break;
      case 'Congé annuel':
        if (this.demande.nombreJoursDemandes > 50) {
          this.errorMessage = 'Pour le Congé annuel, vous ne pouvez pas demander plus de 50 jours.';
          return; // Arrêter la soumission de la demande
        }
        break;
      case 'Congé de maternité':
        if (this.demande.nombreJoursDemandes > 2) {
          this.errorMessage = 'Pour le Congé de maternité, vous ne pouvez pas demander plus de 2 jours.';
          return; // Arrêter la soumission de la demande
        }
        break;
      case 'Congé de paternité':
        if (this.demande.nombreJoursDemandes > 2) {
          this.errorMessage = 'Pour le Congé de paternité, vous ne pouvez pas demander plus de 2 jours.';
          return; // Arrêter la soumission de la demande
        }
        break;
      case 'Congé de formation':
        if (this.demande.nombreJoursDemandes > 7) {
          this.errorMessage = 'Pour le Congé de paternité, vous ne pouvez pas demander plus de 7 jours.';
          return; // Arrêter la soumission de la demande
        }
        break;
      case 'Congé sans solde':
        break;
      case 'Congé pour décès familial':
        break;
      case 'Congé pour déménagement':
        break;
      case 'Congé de mariage':
        break;
      // Ajouter d'autres cas pour les différents types de congés avec leurs règles respectives
      default:
        break;
    }

    // Soumettre la demande de congé
    this.CongesService.addDemande(this.demande).subscribe(response => {
      this.successMessage = 'Demande ajoutée avec succès.';
      this.router.navigate(['/congesListEmployee']);
      this.errorMessage = '';
    }, error => {
      this.errorMessage = 'Erreur lors de l\'ajout de la demande: ' + error.message;
      this.successMessage = '';
    });
  }



}
