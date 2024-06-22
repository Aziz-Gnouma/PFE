import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';

@Component({
  selector: 'app-historique-affaire',
  templateUrl: './historique-affaire.component.html',
  styleUrls: ['./historique-affaire.component.css']
})
export class HistoriqueAffaireComponent implements OnInit {

  affaireSocialeData: any [] = [];
  //affaireSocialeData!: AffaireSociale | AffaireSociale[]; // Define affaireSocialeData as either a single AffaireSociale or an array of AffaireSociale

  id: string = '';
  searchTerm!: string;
  constructor(
    private affaireService: AffaireSocialeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('ID:', this.id);
    this.getHistoriqueAffaire();
  }

  getHistoriqueAffaire() {
    this.affaireService.getALLAffaireById(this.id).subscribe(
      (data: any) => {
        if (typeof data === 'object' && data !== null) {
          this.affaireSocialeData = data;
          console.log('Historique des affaires:', this.affaireSocialeData);
        } else {
          console.error('Les données récupérées ne sont pas au format attendu.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'historique des affaires:', error);
      }
    );
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
