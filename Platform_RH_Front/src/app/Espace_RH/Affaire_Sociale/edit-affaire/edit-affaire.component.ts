import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffaireSociale } from 'src/app/models/affaire-sociale';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';

@Component({
  selector: 'app-edit-affaire',
  templateUrl: './edit-affaire.component.html',
  styleUrls: ['./edit-affaire.component.css']
})
export class EditAffaireComponent implements OnInit {
  id!: number;
  affaire: AffaireSociale = {
    id: 0,
    status: '',
    situationFamiliale: '',
    matriculeConjoint: '',
    prenomConjoint: '',
    nbEnfants: 0,
    nbEnfantsImposables: 0,
    chefDeFamille: false,
    salaireUnique: false,
    allocFamiliale: false,
    securiteSociale: '',
    nomAssurance: '',
    affiliationLe: new Date(),
    exonere: false,
    affiliationRegime: false,
    affiliationAssurance: false,
    affiliationMutuelle: false,
    affiliationAssuranceGroupe: false,
    affiliationCss: 0,
    numeroAffiliationAssurance: 0,
    nomMutuelle: '',
    numeroAffiliationMutuelle: 0
  };


  constructor(
    private route: ActivatedRoute,
    private affaireService: AffaireSocialeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   // this.fetchAffaireDetails();
  }

  // fetchAffaireDetails(): void {
  //   this.affaireService.getAffaireById(this.id)
  //     .subscribe(
  //       (data: AffaireSociale) => {
  //         this.affaire = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching AffaireSociale details:', error);
  //       }
  //     );
  // }
  convertirEnDate(dateString: string): Date {
    return new Date(dateString);
  }
  updateAffaire(): void {
    this.affaireService.modifierAffaire(this.id, this.affaire)
      .subscribe(() => {
        this.router.navigate(['/list-affaire']);
      });
  }
}
