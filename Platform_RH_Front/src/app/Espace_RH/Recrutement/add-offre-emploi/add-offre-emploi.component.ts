import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RecrutementService } from 'src/app/Services/recrutement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offre-emploi',
  templateUrl: './add-offre-emploi.component.html',
  styleUrls: ['./add-offre-emploi.component.css']
})
export class AddOffreEmploiComponent {
  offreForm: FormGroup;

  constructor(private fb: FormBuilder, private recrutementService: RecrutementService, private router: Router) {
    this.offreForm = this.fb.group({
      titre: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      lieu: ['', Validators.required],
      salaire: ['', Validators.required],
      typeDePoste: new FormControl('CDI'), // Valeur initiale
      detailsEmploi: ['', Validators.required],
      tempsDeTravail: new FormControl('Travail en journée'), // Valeur initiale
      descriptionPoste: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.offreForm.valid) {
      this.recrutementService.addOffre(this.offreForm.value).subscribe(response => {
        console.log('Offre ajoutée avec succès', response);
        this.router.navigate(['/postulelistrh']);
        // Ajouter du code pour gérer le succès, par exemple, vider le formulaire ou afficher un message
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'offre', error);
        alert(`Erreur lors de l'ajout de l'offre : ${error.message}`);
      });
    } else {
      alert('Le formulaire est invalide. Veuillez remplir tous les champs obligatoires.');
    }
  }
}
