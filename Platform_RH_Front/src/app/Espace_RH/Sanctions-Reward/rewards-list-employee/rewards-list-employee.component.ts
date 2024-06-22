import { Component, OnInit } from '@angular/core';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-rewards-list-employee',
  templateUrl: './rewards-list-employee.component.html',
  styleUrls: ['./rewards-list-employee.component.css']
})
export class RewardsListEmployeeComponent implements OnInit {
  userData: any;
  rewards: Reward[] = [];
  filteredRewards: Reward[] = [];
  searchMatricule: string = '';
  selectedReward: Reward | null = null;
  currentPage: number = 1;

  constructor(private sanctionsRecompencesService: SanctionsRecompencesService) { }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.fetchRewardsByMatricule(this.userData.matricule);
    } else {
      console.error('User Data not found in local storage...');
    }
  }

  fetchRewardsByMatricule(matricule: string): void {
    this.sanctionsRecompencesService.filterrewardsByMatricule(matricule).subscribe(
      (rewards: Reward[]) => {
        this.rewards = rewards;
        this.filteredRewards = rewards;
      },
      (error) => {
        console.error('Error fetching rewards by matricule:', error);
      }
    );
  }

  onSearchMatriculeChange(): void {
    this.filteredRewards = this.rewards.filter(reward =>
      String(reward.matricule).includes(this.searchMatricule)
    );
  }

  openPopup(reward: Reward): void {
    this.selectedReward = reward;
  }

  closeModal(): void {
    this.selectedReward = null;
  }

  editReward(reward: Reward): void {
    // Implement edit logic
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // Add logic to handle pagination if necessary
  }

  getPaginationArray(): number[] {
    // Implement pagination array logic
    return [1, 2, 3]; // Example pagination array
  }
}
