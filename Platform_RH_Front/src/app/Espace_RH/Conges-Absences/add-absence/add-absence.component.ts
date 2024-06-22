import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/models/absence';
import { AbsenceService } from 'src/app/Services/absence.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent implements OnInit {
  userData: any;
  categoriesList$: any;
  absence: Absence = {
    startDate: new Date().toISOString().split('T')[0], // Set start date to current date
    reason: '',
    numberOfHours: 0,
    matricule: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private absenceService: AbsenceService, private appService: AppServiceService,    private router: Router
  ) { }

  ngOnInit(): void {

    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName)
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

      // Set matricule in absence object
      this.absence.matricule = this.userData.matricule;

    } else {
      console.error('User Data not found in local storage...');
    }
  }

  validateNumberOfHours(): void {
    if (this.absence && this.absence.numberOfHours !== undefined) {
      if (this.absence.numberOfHours > 8) {
        this.absence.numberOfHours = 8;
      }
    }
  }


//   calculateNumberOfHours(): void {
//     if (this.absence.startDate && this.absence.endDate) {
//         const start = new Date(this.absence.startDate);
//         const end = new Date(this.absence.endDate);

//         // Get the start and end of the work day
//         const workDayStart = new Date(this.absence.startDate);
//         workDayStart.setHours(8, 0, 0); // Assuming work day starts at 8:00 AM
//         const workDayEnd = new Date(this.absence.startDate);
//         workDayEnd.setHours(17, 0, 0); // Assuming work day ends at 5:00 PM

//         let hours = Math.abs(end.getTime() - start.getTime()) / 36e5; // Total hours

//         // Check if absence starts and ends in the same work day
//         if (start >= workDayStart && end <= workDayEnd) {
//             // Subtract 1 hour from total hours if the absence falls within the work day
//             hours -= 1;
//         } else {
//             // If absence spans multiple days, subtract the non-working hours of the start day
//             if (start < workDayStart) {
//                 const overlapHours = (workDayStart.getTime() - start.getTime()) / 36e5;
//                 hours -= overlapHours;
//             }
//             // If absence spans multiple days, subtract the non-working hours of the end day
//             if (end > workDayEnd) {
//                 const overlapHours = (end.getTime() - workDayEnd.getTime()) / 36e5;
//                 hours -= overlapHours;
//             }
//         }

//         this.absence.numberOfHours = hours;
//     }
// }


  createAbsence(): void {
    // Validate start date is not in the past
    const currentDate = new Date().toISOString().split('T')[0];
    if (this.absence.startDate < currentDate) {
      this.errorMessage = 'La date de début ne peut pas être située dans le passé.';
      return;
  } else if (this.absence.startDate > currentDate) {
      this.errorMessage = 'La date de début ne peut pas être située dans le futur.';
      return;
  }
    // Assuming you have validation logic here before creating absence
    this.absenceService.createAbsence(this.absence).subscribe(() => {
      // Optionally, you can navigate to another page or display a success message
      this.successMessage = 'Absence créée avec succès.';
      this.router.navigate(['/AbsencesListEmployee']);
    }, error => {
      this.errorMessage = 'Erreur lors de la création de labsence : ' + error.message;
      // Handle error, display error message, etc.
    });
  }
}
