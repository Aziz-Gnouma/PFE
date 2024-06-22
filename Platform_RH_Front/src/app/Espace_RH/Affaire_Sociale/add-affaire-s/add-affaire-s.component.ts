import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';7
import { ChildService } from 'src/app/Services/child-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-add-affaire-s',
  templateUrl: './add-affaire-s.component.html',
  styleUrls: ['./add-affaire-s.component.css']
})
export class AddAffaireSComponent implements OnInit {
  affaireForm!: FormGroup;
  formulaire: boolean = false;
  errorMessage: string = '';
  step: number = 1;
  childForm!: FormGroup;
  submitted: boolean = false; // Define submitted property
  niveauxEtude = [
    { value: 'Primaire', label: 'Primaire' },
    { value: 'Secondaire', label: 'Secondaire' },
    { value: 'Universitaire', label: 'Universitaire' }
  ];
  userData: any;
  matriculeValue: any; // Define matriculeValue property

  categoriesList$: any;
  constructor(
    private affaireService: AffaireSocialeService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ChildService: ChildService,
    private appService: AppServiceService,
  ) { }

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
    this.matriculeValue = this.userData.matricule; // Assign value to matriculeValue property


  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  initForm(): void {
    this.childForm = this.fb.group({
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      genre: ['', Validators.required],
      dateAjout: [new Date().toISOString().split('T')[0]], // Set default date to today
      niveauEtude: ['', Validators.required],
      // image: [null, Validators.required]
    });

    this.affaireForm = this.fb.group({
      situationFamiliale: ['', Validators.required],
      matriculeConjoint: [this.userData?.matricule],
      prenomConjoint: [this.userData?.userFirstName],
      nbEnfants: ['', [Validators.required, Validators.min(0)]],
      nbEnfantsImposables: ['', [Validators.required, Validators.min(0)]],
      chefDeFamille: [''],
      salaireUnique: [''],
      allocFamiliale: [''],
      securiteSociale: [''],
      nomAssurance: [''],
      affiliationLe: [, Validators.required],
      exonere: [''],
      affiliationRegime: [''],
      affiliationAssurance: [''],
      affiliationMutuelle: [''],
      affiliationAssuranceGroupe: [''],
      affiliationCss: ['', [Validators.required, Validators.min(0)]],
      numeroAffiliationAssurance: ['', [Validators.required, Validators.min(0)]],
      nomMutuelle: [''],
      numeroAffiliationMutuelle: ['', [Validators.required, Validators.min(0)]],
    });
  }

  openModal4(): void {
    $('#exampleModalToggle3').modal('show');
  }

  onAjouter(): void {
    if (this.affaireForm.valid) {
      this.affaireService.ajouterAffaire(this.affaireForm.value).subscribe(
        () => {
          this.formulaire = true;
          this.router.navigate(['affaires']);
          this.toastr.success('Affaire ajoutée avec succès', 'Succès');
        },
        error => {
          console.error('Error adding affaire:', error);
          this.errorMessage = 'Something went wrong. Please try again later.';
          this.toastr.error('Une erreur est survenue lors de l\'ajout de l\'affaire', 'Erreur');
        }
      );
    } else {
      console.error('Form is invalid.');
      this.markFormGroupTouched(this.affaireForm);
      this.errorMessage = 'Please fill all required fields correctly.';
      this.toastr.warning('Veuillez remplir tous les champs obligatoires correctement', 'Attention');
      Object.keys(this.affaireForm.controls).forEach(key => {
        console.log(`${key} validity:`, this.affaireForm.get(key)?.valid);
      });
    }
  }

  addChildAndResetForm(): void {
    this.submitted = true;
    if (this.childForm.invalid) {
      console.error('Form validation failed');
      return;
    }

    // Now you can pass matricule to the addNewChild method
    this.ChildService.addNewChild(this.childForm.value, this.matriculeValue)
      .subscribe(() => {
        console.log('Child added successfully!');
        // Reset the form after successful addition
        this.childForm.reset();
        // Redirect to AddEmployee component after successful addition
        this.router.navigate(['/AddEmployee']);
      }, (error: any) => {
        console.error('Error adding child:', error);
      });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
