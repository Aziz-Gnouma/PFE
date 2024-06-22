import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';
import { Observable } from 'rxjs';
import { ChildService } from 'src/app/Services/child-service.service';

function convertDateFormat(inputDate: string): string {
  const parts = inputDate.split('-');
  if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } else {
      return inputDate;
  }
}
function dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);
  if (selectedDate >= currentDate) {
    return { 'futureOrCurrentDate': true };
  }

  return null;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})


export class AddEmployeeComponent implements OnInit {
  userForm!: FormGroup;
  avancement!: FormGroup;
  Adminstrativeform!: FormGroup;
  carriereFormGroup!: FormGroup;
  step: number = 1;
  activeStep: string = 'personal';
  ok! :FormGroup;
  affaireForm!: FormGroup;
  formulaire: boolean = false;
  errorMessage: string = '';
  financieresForm!: FormGroup;
  banks: any[] = [];
  agencies: any[] = [];
  selectedBankAgencies: any[] = [];
  childForm!: FormGroup;
  submitted = false;
  userData: any;
  categoriesList$: any;
  niveauxEtude = [
    { value: 'Primaire', label: 'Primaire' },
    { value: 'Secondaire', label: 'Secondaire' },
    { value: 'Universitaire', label: 'Universitaire' }
  ];
  constructor(private formBuilder: FormBuilder ,
        private appService: AppServiceService,
         private route : Router,
         private childService: ChildService,

         private affaireService: AffaireSocialeService,
         private fb: FormBuilder,
         private router: Router,
         private toastr: ToastrService
    ) { }
    redirectToChildComponent(): void {
      this.router.navigate(['/AddChild'], { queryParams: { openModal: true } });
    }
  ngOnInit(): void {
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData);
      console.log('UserData', this.userData);

    } else {
      console.error('User Data not found in local storage...');
    }

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().substring(0, 10);
    this.affaireForm = this.fb.group({
      situationFamiliale: ['', Validators.required],
      matriculeConjoint: [null],
      prenomConjoint: [this.userData.userFirstName],
      nbEnfants: ['', [Validators.required, Validators.min(0)]],
      nbEnfantsImposables: ['', [Validators.required, Validators.min(0)]],
      chefDeFamille: [''],
      salaireUnique: [''],
      allocFamiliale: [''],
      securiteSociale: [''],
      nomAssurance: [''],
      affiliationLe: [currentDateString, Validators.required],
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

    this.childForm = this.formBuilder.group({
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      genre: ['', Validators.required],
      dateAjout: [new Date().toISOString().split('T')[0]], // Set default date to today
      niveauEtude: ['', Validators.required],
      // image: [null, Validators.required]
    });
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
  console.log(enterpriseName)
    this.userForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      userFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      userLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      civility: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator]],
      placeOfBirth: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      nationality: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cinDate: ['', [Validators.required, dateOfBirthValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      pays: ['', Validators.required],
      niveauEtude: ["", Validators.required],
      dateDernierDiplome: ['', [Validators.required, dateOfBirthValidator]],
      codePostal: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],

    });
    this.Adminstrativeform = this.formBuilder.group({
      typeContrat: ['', Validators.required],
      typeEmployeur: ['', Validators.required],
      dateEntree: ['', Validators.required],
      dateRecrutement: ['', Validators.required],
      dateFinEssai: ['', Validators.required],

    });

    const avancement = this.fb.group({
      matricule: [null],
        categorie: ['', Validators.required],
        grade: ['', Validators.required],
        classe: ['', Validators.required],
        echelon: ['', Validators.required],
        dateSituation: [convertDateFormat(''), Validators.required],
    });

    const structure = this.fb.group({
        matricule: [null],
        fonction: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        dateFonction: [convertDateFormat(''), Validators.required],
        structureAttache: ['', Validators.required],
        dateAffectation: [convertDateFormat(''), Validators.required],
    });
    const titularisation = this.fb.group({
        //  DateTitulair: ['', Validators.required],
          ok: [convertDateFormat(''), Validators.required],
          matricule: [null],
        //  DateAjouterTituluration: ['', Validators.required],
    });

    this.carriereFormGroup = this.fb.group({
      avancement: avancement,
      structure: structure,
      titularisation: titularisation
    });

    this.financieresForm = this.formBuilder.group({
      matricule: [null],
      grilleSalaire: [''],
      salaireBase: ['', Validators.required],
      modePaiement: ['', Validators.required],
      numeroCompte: ['', Validators.required],
      bankName: ['', Validators.required],
      agencyName: ['', Validators.required],
      montantAssurance: ['', Validators.required],
      montantMutuelle: ['', Validators.required]
    });
    this.loadBanks();




    this.userForm.get('cin')?.valueChanges.subscribe((cin: number) => {
      const matriculeValue = `${enterpriseName}_${cin}`;
      this.userForm.get('matricule')?.setValue(matriculeValue);
      this.carriereFormGroup.get('avancement.matricule')?.setValue(matriculeValue);
      this.carriereFormGroup.get('structure.matricule')?.setValue(matriculeValue);
      this.carriereFormGroup.get('titularisation.matricule')?.setValue(matriculeValue);
      this.affaireForm.get('matriculeConjoint')?.setValue(matriculeValue);
      this.financieresForm.get('matricule')?.setValue(matriculeValue);

    });


    this.ok = this.formBuilder.group({
      User: this.userForm,
      roleName: ['User'],
      entrepriseName: [enterpriseName, Validators.required]
    });

    const dynamicId = generateDynamicId();


    const cinValue = 'Medianet_146598423';

    ['avancement', 'titularisation'].forEach(controlName => {
      this.carriereFormGroup.get(controlName)?.get('matricule')?.setValue(cinValue);
    });
 //   this.carriereFormGroup.patchValue({matricule: this.userForm.get('Medianet_146598423')?.value});
  }
  //********************************************************** */
  saveAffaireSociale(matricule: string, affaireSocialeData: any): Observable<any> {
    return new Observable(observer => {
      this.affaireService.saveAffaireSociale(matricule).subscribe(
        (data: any) => {
          console.log('Affaire Sociale saved successfully', data);
          observer.next(data);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          console.error('Error saving Affaire Sociale', error);
          this.handleSaveError(error);
          observer.error(error);
        }
      );
    });
  }

  handleSaveError(error: any): void {
    if (typeof error === 'string') {
      alert(error);
    } else {
      alert('An error occurred. Please verify the data.');
    }
  }

  loadBanks() {
    this.appService.getAllBanks().subscribe(
      (data: any[]) => {
        this.banks = data;
        console.log('banks :',this.banks)
      },
      (error) => {
        console.error('Failed to fetch banks:', error);
      }
    );
  }
// // Inside your component class
// onFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   if (file) {
//     this.childForm.patchValue({
//       image: file
//     });
//   }
// }


  loadAgenciesOfBank(bankName: string) {
    this.appService.getAllAgenciesOfBank(bankName).subscribe(
      (data: any[]) => {
        this.agencies = data;
      },
      (error) => {
        console.error('Failed to fetch agencies:', error);
      }
    );
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.financieresForm.value);
  }
  updateBankName(newBankName: string): void {
    this.financieresForm.patchValue({
      bankName: newBankName
    });
  }
  updateAgenceName(newagencyName: string): void {
    this.financieresForm.patchValue({
      agencyName: newagencyName
    });
  }



  onBankChange(event: any) {
    const selectedBankName = event.target.value;
    // Find the selected bank object
    const selectedBank = this.banks.find(bank => bank.name === selectedBankName);
    if (selectedBank) {
      this.selectedBankAgencies = selectedBank.agencies;
    } else {
      this.selectedBankAgencies = [];
    }
  }

  //*********************************************************** */


  submitForm() {
    if (this.ok.valid) {
      //console.log('Form is valid');
      //console.log('User Form Value:', this.ok.get('User')?.value);
      const UserData = {
        user: this.ok.get('User')?.value,
        roleName: this.ok.get('roleName')?.value,
        entrepriseName: this.ok.get('entrepriseName')?.value
      };
      console.log('This is my data:', UserData);

      UserData.user.dateOfBirth = convertDateFormat(UserData.user.dateOfBirth);
      UserData.user.cinDate = convertDateFormat(UserData.user.cinDate);
      UserData.user.dateDernierDiplome = convertDateFormat(UserData.user.dateDernierDiplome);



      this.appService.SaveUser(UserData).subscribe(
        data => {
          console.log('User saved successfully', data);
          this.nextStep();
        },

        error => {
          console.error('Error creating user', error);
          if (typeof error === 'string') {
            alert(error);
          } else {
            alert('Verify user data , email or CIN already exists.');
          }
        }
      );



    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.ok);
    }


  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  AdminstrativeForm() {
    if (this.Adminstrativeform.valid) {
      const matriculeValue = this.userForm.get('matricule')?.value;

      const AdminstrativeData = this.Adminstrativeform.value;
      console.log (matriculeValue , AdminstrativeData);

      this.appService.UploadEmploye(matriculeValue, AdminstrativeData).subscribe(
        data => {
          console.log('AdminstrativeData saved successfully', data);
          this.test();
        },

        error => {
          console.error('Error creating user', error);
          if (typeof error === 'string') {
            alert(error);
          } else {
            alert('Verify user data , email or CIN already exists.');
          }
        }
      );



    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.ok);
    }


  }

  FinancieresForm() {
    if (this.financieresForm.valid) {
      const matriculeValue = this.userForm.get('matricule')?.value;

      const financieresFormData = this.financieresForm.value;
      console.log (financieresFormData);

      this.appService.saveFinancieresWithBankAndAgency(financieresFormData).subscribe(
        data => {
          console.log('financieresFormData saved successfully', data);
          this.oui();
        },

        error => {
          console.error('Error creating user', error);
          if (typeof error === 'string') {
            alert(error);
          } else {
            alert('Verify user data , email or CIN already exists.');
          }
        }
      );

      /*const financieresaok = {
        grilleSalaire: financieresFormData.grilleSalaire,
        salaireDeBase: financieresFormData.salaireBase,
        modeDePaiement: financieresFormData.modePaiement,
        numeroCompte: financieresFormData.numeroCompte,
        nomBanque: financieresFormData.bankName,
        nomAgence: financieresFormData.agencyName,
        montantAssurance: financieresFormData.montantAssurance,
        montantMutuelle: financieresFormData.montantMutuelle,

      };

      this.appService.UploadEmploye(matriculeValue, financieresaok).subscribe(
        data => {
          console.log('financieresFormData saved successfully', data);
          this.Final();
        },

        error => {
          console.error('Error creating user', error);
          if (typeof error === 'string') {
            alert(error);
          } else {
            alert('Verify user data , email or CIN already exists.');
          }
        }
      );
*/


    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.ok);
    }


  }


  CarriereForm() {
    if (this.carriereFormGroup.valid) {

      const avancement = this.carriereFormGroup.value.avancement;
      const structure = this.carriereFormGroup.value.structure;
      const titularisation = this.carriereFormGroup.value.titularisation;

      const convertedAvancement = {
        ...avancement,
        dateSituation: convertDateFormat(avancement.dateSituation),
      };

      const convertedStructure = {
        ...structure,
        dateFonction: convertDateFormat(structure.dateFonction),
        dateAffectation: convertDateFormat(structure.dateAffectation),
      };

      const convertedTitularisation = {
        ...titularisation,
        ok: convertDateFormat(titularisation.ok),
      };

      console.log('Converted Data:', { avancement: convertedAvancement, structure: convertedStructure, titularisation: convertedTitularisation });
const ok = { avancement: convertedAvancement, structure: convertedStructure, titularisation: convertedTitularisation }
      // Extracting specific properties
      /*const carriereDataok = {
        categorie: convertedAvancement.categorie,
        grade: convertedAvancement.grade,
        classe: convertedAvancement.classe,
        echelon: convertedAvancement.echelon,
        dateSituation: convertedAvancement.dateSituation,
        fonction: convertedStructure.fonction,
        dateFonction: convertedStructure.dateFonction,
        structureAttache: convertedStructure.structureAttache,
        dateAffectation: convertedStructure.dateAffectation,
        dateTitularisation: convertedTitularisation.ok,
      };*/


    this.appService.AddCarriere(ok).subscribe(
      data => {
        console.log('Carrier  saved successfully', data);
        this.route.navigate(['/EmployeeList']);
        this.Final();

      }
    );
    this.Final();

    const matriculeValue = this.userForm.get('matricule')?.value;
/*
    this.appService.UploadEmploye(matriculeValue,carriereDataok).subscribe(
      data => {
        console.log('Carrier Employee saved successfully', data);
        this.route.navigate(['/EmployeeList']);

      },
      error => {
        console.error('Error uploading administrative data', error);
        if (typeof error === 'string') {
          alert(error);
        } else {
          alert('Verify user data, email, or CIN already exists.');
        }
      }
    );*/
  }}







  onAjouter(): void {
    if (this.affaireForm.valid) {
      this.affaireService.ajouterAffaire(this.affaireForm.value).subscribe(
        () => {
          this.formulaire = true;
          this.route.navigate(['/EmployeeList']);
          this.toastr.success('Affaire ajoutée avec succès', 'Succès'); // Show success toast
        },
        error => {
          console.error('Error adding affaire:', error);
          this.errorMessage = 'Something went wrong. Please try again later.';
          this.toastr.error('Une erreur est survenue lors de l\'ajout de l\'affaire', 'Erreur'); // Show error toast
          this.route.navigate(['/EmployeeList']);
        }

      );
    } else {
      console.error('Form is invalid.');
      this.markFormGroupTouched(this.affaireForm);
      this.errorMessage = 'Please fill all required fields correctly.';
      this.toastr.warning('Veuillez remplir tous les champs obligatoires correctement', 'Attention'); // Show warning toast

      Object.keys(this.affaireForm.controls).forEach(key => {
        console.log(`${key} validity:`, this.affaireForm.get(key)?.valid);
      });
    }
  }

  nextStep() {
    if (this.userForm.valid) {
      this.step = 2;
    } else {
      alert('Please check your data!');
    }
  }

  backStep() {
    this.step = 1;
  }
  test() {
    this.step = 3;
  }
  oui() {
    this.step = 4;
  }

  Final() {
    this.step = 5;
  }

  openModal4(): void {

    $('#exampleModalToggle3').modal('show');
  }


  saveEmploye():void{

    if (this.ok.valid) {
      //console.log('Form is valid');
      //console.log('User Form Value:', this.ok.get('User')?.value);
      const UserData = {
        user: this.ok.get('User')?.value,
        roleName: this.ok.get('roleName')?.value,
        entrepriseName: this.ok.get('entrepriseName')?.value
      };
      console.log('This is my data:', UserData);




      this.appService.SaveUser(UserData).subscribe(
        data => {
          console.log('User saved successfully', data);
          this.nextStep();
        },

        error => {
          console.error('Error creating user', error);
          if (typeof error === 'string') {
            alert(error);
          } else {
            alert('Verify user data , email or CIN already exists.');
          }
        }
      );



    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.ok);
    }

    const cinValue = this.userForm.get('cin')?.value;

    this.carriereFormGroup.get('cin')?.setValue(cinValue);


    const carriereData = this.carriereFormGroup.value;

    const carriereEmploye = { ...this.carriereFormGroup.value };
    delete carriereEmploye.id;
    delete carriereEmploye.cin;

    this.appService.SaveCarriere(cinValue, carriereData, carriereEmploye).subscribe(
      data => {
        console.log('Carriere historique saved successfully', data);
      },
      error => {
        console.error('Error saving Carriere historique', error);
        if (typeof error === 'string') {
          alert(error);
        } else {
          alert('Verify data.');
        }
      }
    );

  }

  addChildAndResetForm(): void {
    this.submitted = true;
    if (this.childForm.invalid) {
      console.error('Form validation failed');
      return;
    }

    const matricule = this.userData.matricule;

    this.childService.addNewChild(this.childForm.value, matricule)
      .subscribe(() => {
        console.log('Child added successfully!');
        // Reset the form after successful addition
        this.childForm.reset();
        // Redirect to AddEmployee component after successful addition
        this.router.navigate(['/AddEmployee']);
      }, error => {
        console.error('Error adding child:', error);
      });
  }
}



function generateDynamicId() {
  throw new Error('Function not implemented.');
}




