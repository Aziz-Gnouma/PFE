import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AffaireSociale } from 'src/app/models/affaire-sociale';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';
@Component({
  selector: 'app-list-affaire',
  templateUrl: './list-affaire.component.html',
  styleUrls: ['./list-affaire.component.css']
})
export class ListAffairesComponent implements OnInit {
  affaires: AffaireSociale[] = [];
  @ViewChild('content') content: any;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedAffaire: AffaireSociale | null = null;
  constructor(private affaireService: AffaireSocialeService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.listerAffaires();
  }
  modifierAffaire(id: number) {
    this.router.navigate(['/edit-affaire', id]);
}



  listerAffaires(): void {
    this.affaireService.listerAffaires()
      .subscribe(
        (affaires: AffaireSociale[]) => {
          // Filter out duplicate entries
          this.affaires = this.filterDuplicates(affaires);
        },
        error => {
          console.error('Error fetching affaires:', error);
        }
      );
  }

  filterDuplicates(affaires: AffaireSociale[]): AffaireSociale[] {
    const uniqueAffaires: AffaireSociale[] = [];
    const affaireIds = new Set<string>();

    affaires.forEach(affaire => {
      if (!affaireIds.has(affaire.situationFamiliale)) {
        uniqueAffaires.push(affaire);
        affaireIds.add(affaire.situationFamiliale);
      }
    });

    return uniqueAffaires;
  }
  deleteAffaire(id: number) {
    this.affaireService.annulerAffaire(id)
      .subscribe(() => {
        this.affaires = this.affaires.filter(affaire => affaire.id !== id);
      });
  }
  openPopup(affaire: AffaireSociale): void {
    this.selectedAffaire = affaire;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  closeModal(): void {
    this.selectedAffaire = null; 
    this.modalService.dismissAll();
  }
  getPaginatedItems(): AffaireSociale[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.affaires.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.affaires.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getPaginationArray().length) {
      this.currentPage = page;
    }
  }
}
