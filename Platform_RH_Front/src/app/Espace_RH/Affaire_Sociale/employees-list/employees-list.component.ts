import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importez ActivatedRoute et Router depuis '@angular/router'
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  enterpriseName!: string;
  users: User[] = [];
  selectedUser: User | undefined;
  affaireAdded: boolean = false;
  searchTerm: string = '';
  selectedRole: string = '';
  hasaffaire: boolean = false;
  constructor(
    private appService: AppServiceService,
    private route: ActivatedRoute,
    private router: Router, // Ajoutez Router à la liste des dépendances
    public AppServiceService: AppServiceService // Assurez-vous que AppServiceService est correctement injecté
  ) {}

  ngOnInit(): void {
    const storedEnterpriseName = localStorage.getItem('enterpriseName');

    if (storedEnterpriseName !== null) {
      this.enterpriseName = storedEnterpriseName;
      console.log('Enterprise Name:', this.enterpriseName);
    } else {
      console.error('Enterprise Name not found in local storage.');
    }
    this.getNewUsers();
  }

  getNewUsers(): void {
    console.log(this.enterpriseName);
    this.appService.getALLUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.entreprise.some(entreprise => entreprise.entrepriseName === this.enterpriseName));
      console.log(this.users);
    });
  }

  openModal(user: User): void {
    console.log("Opening modal for user:", user);
    this.selectedUser = user;
    $('#exampleModalToggle').modal('show');
  }

  closeModal(): void {
    console.log("Closing modal");
    this.affaireAdded = false;
  }

  addAffaire(cin: number): void { // Modifiez la signature de la méthode pour accepter un paramètre
    // Rediriger vers la route 'add-affaire'
    this.router.navigate(['/add-affaire']); // Assurez-vous que la route 'add-affaire' est correctement définie dans votre fichier de configuration des routes
  }
}

