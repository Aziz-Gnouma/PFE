import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-details-sanctions',
  templateUrl: './details-sanctions.component.html',
  styleUrls: ['./details-sanctions.component.css']
})
export class DetailsSanctionsComponent {
  @Input() selectedsanction: any;
}
