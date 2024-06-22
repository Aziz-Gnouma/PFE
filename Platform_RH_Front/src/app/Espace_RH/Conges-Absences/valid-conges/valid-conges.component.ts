import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Demande } from 'src/app/models/demande';
import { CongesService } from 'src/app/Services/conges-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-valid-conges',
  templateUrl: './valid-conges.component.html',
  styleUrls: ['./valid-conges.component.css']
})
export class ValidCongesComponent implements OnInit {
  pendingDemandes: Demande[] = [];
  userData: any;
  categoriesList$: any;
  constructor(
    private congesService: CongesService,
    private snackBar: MatSnackBar,
    private appService: AppServiceService,

  ) { }

  ngOnInit() {
    this.fetchPendingDemandes();
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName);
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

      if (this.pendingDemandes.length > 0) {
        const matriculeValue = this.userData.matricule || '';
        const enterpriseValue = enterpriseName;
        const userFirstValue = this.userData.userFirstName;
        const userLastNameValue = this.userData.userLastName;
        this.pendingDemandes[0].RHMatricule = matriculeValue;
        this.pendingDemandes[0].entreprise = enterpriseValue;
        this.pendingDemandes[0].userFirstName = userFirstValue;
        this.pendingDemandes[0].userLastName = userLastNameValue;
      }
    }
  }


  fetchPendingDemandes() {
    this.congesService.getPendingDemandes().subscribe(demandes => {
      this.pendingDemandes = demandes;
    }, error => {
      console.error('Error fetching pending demandes:', error);
    });
  }

  acceptDemande(demande: Demande) {
    demande.status = 'accepted';
    this.updateDemandeStatus(demande);
    this.openSnackBar('Demande accepted successfully');
  }

  rejectDemande(demande: Demande) {
    demande.status = 'rejected';
    this.updateDemandeStatus(demande);
    this.openSnackBar('Demande rejected successfully');
  }

  updateDemandeStatus(demande: Demande) {
    this.congesService.updateDemandeStatus(demande).subscribe(response => {
      console.log('Demande status updated successfully:', response);

      this.pendingDemandes = this.pendingDemandes.filter(d => d.id !== demande.id);
    }, error => {
      console.error('Error updating demande status:', error);
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
