import { Component, OnInit } from '@angular/core';
import { RecrutementService } from 'src/app/Services/recrutement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-offre-rh',

  templateUrl: './post-offre-rh.component.html',
  styleUrl: './post-offre-rh.component.css'
})
export class PostOffreRhComponent implements OnInit {
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


  deleteOffre(id: number): void {
    const confirmDelete = confirm("Are you sure you want to delete this offer?");
    if (!confirmDelete) {
        return; 
    }
    this.recrutementService.deleteOffre(id).subscribe(
        () => {
            this.filteredOffres = this.filteredOffres.filter(offre => offre.id !== id);
            console.log('Offre supprimée avec succès');
        },
        error => {
            console.error('Erreur lors de la suppression de l\'offre', error);
        }
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
