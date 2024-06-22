import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AbsenceService } from 'src/app/Services/absence.service';
import { Absence } from 'src/app/models/absence';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-valid-absences',
  templateUrl: './valid-absences.component.html',
  styleUrls: ['./valid-absences.component.css']
})
export class ValidAbsencesComponent implements OnInit {
  absences: Absence[] = [];
  loading: boolean = true;
  error: string | null = null;
  userData: any;
  categoriesList$: any;
  constructor(
    private absenceService: AbsenceService,
    private snackBar: MatSnackBar,
    private appService: AppServiceService,

  ) { }

  ngOnInit(): void {
    this.getPendingAbsences();
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName);
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

      if (this.absences.length > 0) {
        const matriculeValue = this.userData.matricule || '';
        const enterpriseValue = enterpriseName;
        const userFirstValue = this.userData.userFirstName;
        const userLastNameValue = this.userData.userLastName;
        this.absences[0].RHMatricule = matriculeValue;
        this.absences[0].entreprise = enterpriseValue;
        this.absences[0].userFirstName = userFirstValue;
        this.absences[0].userLastName = userLastNameValue;
      }
    }
  }

  getPendingAbsences(): void {
    this.absenceService.getPendingAbsences()
      .subscribe(
        (absences: Absence[]) => {
          this.absences = absences;
          this.loading = false;
          this.error = null;
        },
        (error) => {
          console.error('Error fetching absences:', error);
          this.loading = false;
          this.error = 'Error fetching absences. Please try again later.';
        }
      );
  }

  acceptAbsence(absence: Absence): void {
    if (absence.id) {
      this.absenceService.validateAbsence(absence.id)
        .subscribe(() => {
          this.absences = this.absences.filter(a => a !== absence);
          this.openSnackBar('Absence accepted successfully'); // Display success alert
        });
    }
  }

  rejectAbsence(absence: Absence): void {
    if (absence.id) {
      this.absenceService.rejectAbsence(absence.id)
        .subscribe(() => {
          this.absences = this.absences.filter(a => a !== absence);
          this.openSnackBar('Absence rejected successfully'); // Display success alert
        });
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
