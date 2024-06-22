import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sanction } from 'src/app/models/sanction';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-list-sanction',
  templateUrl: './list-sanction.component.html',
  styleUrls: ['./list-sanction.component.css']
})
export class ListSanctionComponent implements OnInit {
  searchMatricule: string = '';
  sanctions: Sanction[] = [];
  searchTerm: string = '';
  filteredSanctions: Sanction[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedsanction: Sanction | null = null;
  @ViewChild('content') content: any;
  userData: any;
  categoriesList$: any;

  @Input() FormationForm: any;
  constructor(private sanctionsRecompencesService: SanctionsRecompencesService,
              private modalService: NgbModal, private router: Router,private appService: AppServiceService) { }

              ngOnInit(): void {
                const enterpriseName = localStorage.getItem('enterpriseName') || '';
                console.log(enterpriseName);
                this.categoriesList$ = this.appService.getAllCategories();
                const storedUserData = localStorage.getItem('UserData');

                if (storedUserData !== null) {
                  this.userData = JSON.parse(storedUserData);
                  console.log('UserData', this.userData);

                  if (this.FormationForm) {
                    const matriculeValue = this.userData.matricule || '';
                    const enterpriseValue = enterpriseName;
                    const userFirstValue=this.userData.userFirstName;
                    const userLastNameValue=this.userData.userLastName;
                    this.FormationForm.get('RHMatricule')?.setValue(matriculeValue);
                    this.FormationForm.get('entreprise')?.setValue(enterpriseValue);
                    this.FormationForm.get('userFirstName')?.setValue(userFirstValue);
                    this.FormationForm.get('userLastName')?.setValue(userLastNameValue)
                  } else {
                    console.error('FormationForm is not provided.');
                  }
                } else {
                  console.error('User Data not found in local storage...');
                }

                this.loadSanctionsByEnterprise(enterpriseName); // Call the method to load sanctions by enterprise
              }

              loadSanctionsByEnterprise(enterprise: string): void {
                this.sanctionsRecompencesService.getSanctionsByEnterprise(enterprise).subscribe(
                  (data: Sanction[]) => {
                    this.sanctions = data;
                    this.filteredSanctions = data;
                  },
                  (error: any) => {
                    console.error('Error loading sanctions by enterprise: ', error);
                  }
                );
              }
  filterSanctionsByMatricule(matricule: string): void {
    this.sanctionsRecompencesService.filterSanctionsByMatricule(matricule).subscribe(
      (data: Sanction[]) => {
        this.sanctions = data;
        this.filteredSanctions = data;
      },
      (error: any) => {
        console.error('Erreur lors du filtrage des sanctions par matricule : ', error);
      }
    );
  }
  filterSanctions(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredSanctions = this.sanctions.filter(sanction =>
        sanction.Autorite.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sanction.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sanction.gravite.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sanction.StatutA.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredSanctions = this.sanctions;
    }
  }

  onSearchMatriculeChange(): void {
    this.sanctionsRecompencesService.filterSanctionsByMatricule(this.searchMatricule).subscribe(
      (data: Sanction[]) => {
        this.sanctions = data;
        this.filteredSanctions = data;
      },
      (error: any) => {
        console.error('Erreur lors du filtrage des sanctions par matricule : ', error);
      }
    );
  }

  onDeleteSanction(id: number): void {
    // Implement deletion logic here
  }
  editSanction(sanction: Sanction): void {
    this.router.navigate(['/edit-sanction', sanction.id]);
  }

  getPaginatedItems(): Sanction[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sanctions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.sanctions.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getPaginationArray().length) {
      this.currentPage = page;
    }
  }
  openPopup(sanction: Sanction): void {
    this.selectedsanction = sanction;
    const modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.selectedsanction = this.selectedsanction; // Pass the selected sanction to the modal component
}


  closeModal(): void {
    this.selectedsanction = null;
    this.modalService.dismissAll();
  }
}
