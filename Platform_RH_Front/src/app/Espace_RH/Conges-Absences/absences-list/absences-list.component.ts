import { Component, Input, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/Services/absence.service';
import { Absence } from 'src/app/models/absence';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-absences-list',
  templateUrl: './absences-list.component.html',
  styleUrls: ['./absences-list.component.css']
})
export class AbsencesListComponent implements OnInit {
  absences: Absence[] = [];
  searchTerm: string = '';
  userData: any;
  categoriesList$: any;
  @Input() FormationForm: any;
  constructor(private absenceService: AbsenceService,private appService: AppServiceService) { }

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

    this.fetchAbsences();
  }

  fetchAbsences(): void {
    this.absenceService.getAllAbsences().subscribe(
      (absences: Absence[]) => {
        this.absences = absences;
      },
      (error) => {
        console.error('Error fetching absences:', error);
        // Handle error if needed
      }
    );
  }
}
