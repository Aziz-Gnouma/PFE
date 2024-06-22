import { Component, OnInit } from '@angular/core';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { Sanction } from 'src/app/models/sanction';
@Component({
  selector: 'app-sanctions-list-employee',
  templateUrl: './sanctions-list-employee.component.html',
  styleUrls: ['./sanctions-list-employee.component.css']
})
export class SanctionsListEmployeeComponent implements OnInit {
  userData: any;
  sanctions: Sanction[] = [];
  filteredSanctions: Sanction[] = [];
  searchMatricule: string = '';
  currentPage: number = 1;

  constructor(private sanctionsService: SanctionsRecompencesService) { }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.fetchSanctionsByMatricule(this.userData.matricule);
    } else {
      console.error('User Data not found in local storage...');
    }
  }

  fetchSanctionsByMatricule(matricule: string): void {
    this.sanctionsService.filterSanctionsByMatricule(matricule).subscribe(
      (sanctions: Sanction[]) => {
        this.sanctions = sanctions;
        this.filteredSanctions = sanctions;
      },
      (error) => {
        console.error('Error fetching sanctions by matricule:', error);
      }
    );
  }

  onSearchMatriculeChange(): void {
    this.filteredSanctions = this.sanctions.filter(sanction =>
      String(sanction.matricule).includes(this.searchMatricule)
    );
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    // Add logic to handle pagination
  }

  openPopup(sanction: Sanction): void {
    // Implement popup logic
  }

  editSanction(sanction: Sanction): void {
    // Implement edit logic
  }

  getPaginationArray(): number[] {
    // Implement pagination array logic
    return [1, 2, 3]; // Example pagination array
  }
}
