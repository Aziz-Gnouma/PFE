import { Component, OnInit } from '@angular/core';
import { RecrutementService } from 'src/app/Services/recrutement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-offre-emploi',
  templateUrl: './list-offre-emploi.component.html',
  styleUrls: ['./list-offre-emploi.component.css']
})
export class ListOffreEmploiComponent implements OnInit {
  offres: any[] = [];
  tags: string[] = ['JS', 'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma'];
  filteredOffres: any[] = this.offres;
  searchTerm: string = '';
  constructor(private recrutementService: RecrutementService, private router: Router) {}

  ngOnInit(): void {
    this.filteredOffres = this.offres;
    this.recrutementService.getAllOffres().subscribe(
      (data: any[]) => {
        this.offres = data;
      },
      error => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }
  postuler(id: number): void {
    this.router.navigate(['/postuler', id]);
  }
  filterOffers() {
    this.filteredOffres = this.offres.filter(offre =>
      offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  addTagToSearch(tag: string) {
    this.searchTerm = tag;
    this.filterOffers();
  }

  searchOffers() {
    this.filterOffers();
  }
}
