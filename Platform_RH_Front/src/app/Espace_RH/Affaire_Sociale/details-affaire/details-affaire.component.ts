import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-details-affaire',
  templateUrl: './details-affaire.component.html',
  styleUrl: './details-affaire.component.css'
})
export class DetailsAffaireComponent {
  @Input() selectedAffaire: any;


}
