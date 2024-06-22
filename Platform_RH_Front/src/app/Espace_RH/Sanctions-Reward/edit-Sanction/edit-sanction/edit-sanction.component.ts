import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { Sanction } from 'src/app/models/sanction';

@Component({
  selector: 'app-edit-sanction',
  templateUrl: './edit-sanction.component.html',
  styleUrls: ['./edit-sanction.component.css']
})
export class EditSanctionComponent implements OnInit {
  sanction: any = {};

  constructor(
    private route: ActivatedRoute,
    private sanctionsRecompencesService: SanctionsRecompencesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.sanctionsRecompencesService.getSanctionById(id).subscribe(
        (sanction: Sanction) => {
          this.sanction = sanction;
        },
        error => {
          console.error('Error fetching sanction:', error);
        }
      );
    });
  }

  saveSanction() {
    if (this.sanction) {
      this.sanctionsRecompencesService.modifierSanction(this.sanction.id, this.sanction).subscribe(
        updatedSanction => {
          console.log('Sanction updated successfully:', updatedSanction);
          
        },
        error => {
          console.error('Error updating sanction:', error);
        }
      );
    } else {
      console.error('No sanction to update.');
    }
  }
}
