import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reward } from 'src/app/models/reward';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.css']
})
export class AddRewardComponent implements OnInit {
  rewardForm!: FormGroup;
  selectedUserId: number | null = null;
  userData: any;
  categoriesList$: any;

  constructor(
    private formBuilder: FormBuilder,
    private sanctionsRecompencesService: SanctionsRecompencesService,
    private route: ActivatedRoute,
    private appService: AppServiceService,
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
    this.rewardForm.get('RHMatricule')?.setValue(matriculeValue);
    this.rewardForm.get('entreprise')?.setValue(enterpriseValue);

    this.route.params.subscribe(params => {
      this.selectedUserId = +params['userId'];
    });
  }

  initForm(): void {
    // Initialize form with validators
    this.rewardForm = this.formBuilder.group({
      typeReward: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rewardForm.valid && this.selectedUserId) {
      const newReward: Reward = this.rewardForm.value;
      this.sanctionsRecompencesService.addReward(this.selectedUserId, newReward)
        .subscribe(
          response => {
            console.log('Récompense ajoutée avec succès : ', response);
            this.rewardForm.reset();
            this.router.navigate(['/list-reward']);
          },
          error => {
            console.error('Erreur lors de l\'ajout de la récompense : ', error);
          }
        );
    } else {
      console.error('Formulaire invalide ou aucun utilisateur sélectionné.');
    }
  }
}
