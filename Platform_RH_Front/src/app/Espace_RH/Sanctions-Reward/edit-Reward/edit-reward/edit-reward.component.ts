import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.css']
})
export class EditRewardComponent implements OnInit {
  reward: any = {};

  constructor(
    private route: ActivatedRoute,
    private sanctionsRecompencesService: SanctionsRecompencesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.sanctionsRecompencesService.getRewardById(id).subscribe(
        (reward: Reward) => {
          this.reward = reward;
        },
        error => {
          console.error('Error fetching reward:', error);
        }
      );
    });
  }

  saveReward() {
    if (this.reward) {
      this.sanctionsRecompencesService.updateReward(this.reward.id, this.reward).subscribe(
        updatedReward => {
          console.log('Reward updated successfully:', updatedReward);
          // Optionally, you can navigate to a different route or perform any other action upon successful update
        },
        error => {
          console.error('Error updating reward:', error);
        }
      );
    } else {
      console.error('No reward to update.');
    }
  }
}
