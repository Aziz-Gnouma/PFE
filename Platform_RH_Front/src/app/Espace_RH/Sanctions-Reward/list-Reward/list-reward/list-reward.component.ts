import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-list-reward',
  templateUrl: './list-reward.component.html',
  styleUrls: ['./list-reward.component.css']
})
export class ListRewardComponent implements OnInit {
  searchMatricule: string = '';
  rewards: Reward[] = [];
  searchTerm: string = '';
  filteredRewards: Reward[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedReward: Reward | null = null;
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
                    const userFirstValue = this.userData.userFirstName;
                    const userLastNameValue = this.userData.userLastName;
                    this.FormationForm.get('RHMatricule')?.setValue(matriculeValue);
                    this.FormationForm.get('entreprise')?.setValue(enterpriseValue);
                    this.FormationForm.get('userFirstName')?.setValue(userFirstValue);
                    this.FormationForm.get('userLastName')?.setValue(userLastNameValue);
                  } else {
                    console.error('FormationForm is not provided.');
                  }
                } else {
                  console.error('User Data not found in local storage...');
                }

                this.loadRewardsByEnterprise(enterpriseName);
              }

              loadRewardsByEnterprise(enterprise: string): void {
                this.sanctionsRecompencesService.getRewardsByEnterprise(enterprise).subscribe(
                  (data: Reward[]) => {
                    this.rewards = data;
                    this.filteredRewards = data;
                  },
                  (error: any) => {
                    console.error('Error loading rewards by enterprise: ', error);
                  }
                );
              }

  filterrewardsByMatricule(matricule: string): void {
    this.sanctionsRecompencesService.filterrewardsByMatricule(matricule).subscribe(
      (data: Reward[]) => {
        this.rewards = data;
        this.filteredRewards = data;
      },
      (error: any) => {
        console.error('Erreur lors du filtrage des sanctions par matricule : ', error);
      }
    );
  }
  filterRewards(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredRewards = this.rewards.filter(reward =>
        reward.typeReward.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reward.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reward.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRewards = this.rewards;
    }
  }


  onSearchMatriculeChange(): void {
    this.sanctionsRecompencesService.filterrewardsByMatricule(this.searchMatricule).subscribe(
      (data: Reward[]) => {
        this.rewards = data;
        this.filteredRewards = data;
      },
      (error: any) => {
        console.error('Erreur lors du filtrage des sanctions par matricule : ', error);
      }
    );
  }
  editReward(reward: Reward): void {
    this.router.navigate(['/edit-reward', reward.id]);
  }

  onDeleteReward(id: number): void {
    // Implement deletion logic here
  }
  getPaginatedItems(): Reward[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.rewards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.rewards.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getPaginationArray().length) {
      this.currentPage = page;
    }
  }
  openPopup(reward: Reward): void {
    this.selectedReward = reward;
    const modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.selectedReward = this.selectedReward;
  }

  closeModal(): void {
    this.selectedReward = null;
    this.modalService.dismissAll();
  }
}
