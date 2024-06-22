import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-rewards',
  standalone: true,
  imports: [],
  templateUrl: './details-rewards.component.html',
  styleUrl: './details-rewards.component.css'
})
export class DetailsRewardsComponent {
  @Input() selectedsanction: any;

}
