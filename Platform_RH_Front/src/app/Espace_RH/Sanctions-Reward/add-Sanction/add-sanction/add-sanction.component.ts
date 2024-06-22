import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sanction } from 'src/app/models/sanction';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-sanction',
  templateUrl: './add-sanction.component.html',
  styleUrls: ['./add-sanction.component.css']
})
export class AddSanctionComponent implements OnInit {
  sanctionForm!: FormGroup;
  userData: any;
  categoriesList$: any;

  selectedUserId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private appService: AppServiceService,
    private sanctionsRecompencesService: SanctionsRecompencesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName)
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

    } else {
      console.error('User Data not found in local storage...');
    }


    const matriculeValue = this.userData.matricule;
    const enterpriseValue = enterpriseName;
    this.sanctionForm.get('RHMatricule')?.setValue(matriculeValue);
    this.sanctionForm.get('entreprise')?.setValue(enterpriseValue);

    this.route.params.subscribe(params => {
      this.selectedUserId = +params['userId'];
    });
  }

  initForm(): void {
    // Get the current date and time
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().substring(0, 10);// Format as ISO string

    this.sanctionForm = this.fb.group({
      RHMatricule:['', Validators.required],
      entreprise:['', Validators.required],
      dateDemission: ['', Validators.required],
      Autorite: ['', Validators.required],
      description: ['', Validators.required],
      gravite: ['', Validators.required],
      type: ['', Validators.required],
      duree: [currentDateString, Validators.required], // Set default value to current date
      StatutA: ['', Validators.required]
    });
  }


  ajouterSanction(): void {
    if (this.selectedUserId) {
      const newSanction: Sanction = this.sanctionForm.value;
      this.sanctionsRecompencesService.ajouterSanction(this.selectedUserId, newSanction)
        .subscribe(
          response => {
            console.log('Sanction ajoutée avec succès : ', response);
            this.sanctionForm.reset();
            // Redirect to list-sanction route
            this.router.navigate(['/list-sanction']);
          },
          error => {
            console.error('Erreur lors de l\'ajout de la sanction : ', error);
          }
        );
    } else {
      console.error('Aucun utilisateur sélectionné.');
    }
  }
}
