import { Component, Input, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/Services/absence.service';
import { Absence } from 'src/app/models/absence';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-absences-list-employee',
  templateUrl: './absences-list-employee.component.html',
  styleUrl: './absences-list-employee.component.css'
})
export class AbsencesListEmployeeComponent {
  absences: Absence[] = [];
  searchTerm: string = '';
  userData: any;
  categoriesList$: any;
  @Input() FormationForm: any;
  constructor(private absenceService: AbsenceService,private appService: AppServiceService) { }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      this.fetchAbsencesByMatricule(this.userData.matricule);
    } else {
      console.error('User Data not found in local storage...');
    }
  }

  fetchAbsencesByMatricule(matricule: string): void {
    this.absenceService.getAllAbsencesByMatricule(matricule).subscribe(
      (absences: Absence[]) => {
        this.absences = absences;
      },
      (error) => {
        console.error('Error fetching absences by matricule:', error);
        // Gérer l'erreur si nécessaire
      }
    );
  }

}
