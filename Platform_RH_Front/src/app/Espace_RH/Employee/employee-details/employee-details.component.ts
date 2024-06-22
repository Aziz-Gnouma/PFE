


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Structure } from 'src/app/Employee';
import { AffaireSocialeService } from 'src/app/Services/affaire-sociale.service';
import { AffaireSociale } from 'src/app/models/affaire-sociale';
declare var bootstrap: any;
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
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

export class EmployeeDetailsComponent implements OnInit {
  userData: any;
  userForm!: FormGroup;
  step: number = 1;
  EmployeeData!: Employee | Employee[];
  showModal: boolean = false;
  selectedUser: Employee | undefined;
  carriereFormGroup!: FormGroup;
  financieresForm!: FormGroup;
  avancement!: FormGroup;
  structure!: FormGroup;
  titularisation!: FormGroup;
  id!: string;
  StructureData:Structure [] =[];
  banks: any[] = [];
  agencies: any[] = [];
  selectedBankAgencies: any[] = [];
  affaires: AffaireSociale[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  affaireData: any;
  modalUserData: any;
  affaireSocialeData!: FormGroup;

  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private affaireService: AffaireSocialeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.snapshot.params['id']
    this.id = this.route.snapshot.params['id'];
    console.log('id employee data:', this.id);


    this.reloadData();

    this.affaireSocialeData = this.fb.group({
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



    this.structure = this.fb.group({
        matricule: [this.route.snapshot.params['id']],
        fonction: ['', Validators.required],
        dateFonction: [convertDateFormat(''), Validators.required],
        structureAttache: ['', Validators.required],
        dateAffectation: [convertDateFormat(''), Validators.required],
    });
     this.titularisation = this.fb.group({
          matricule: [this.route.snapshot.params['id']],
          ok: [convertDateFormat(''), Validators.required],
    });

    this.avancement = this.fb.group({
      matricule: [this.route.snapshot.params['id']],
      categorie: ['', Validators.required],
      grade: ['', Validators.required],
      classe: ['', Validators.required],
      echelon: ['', Validators.required],
      dateSituation: [convertDateFormat(''), Validators.required]

    });
    this.financieresForm = this.formBuilder.group({
      matricule: [this.route.snapshot.params['id']],
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
  }

  listerAffaires(): void {
    this.affaireService.listerAffaires()
      .subscribe(
        (affaires: AffaireSociale[]) => {
          // Filter out duplicate entries
        },
        error => {
          console.error('Error fetching affaires:', error);
        }
      );
  }
  getPaginatedItems(): AffaireSociale[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.affaires.slice(startIndex, startIndex + this.itemsPerPage);
  }
  PasswordValue: string | null = null;


  createForm() {
    this.userForm = this.formBuilder.group({
      userFirstName: [this.userData.userFirstName, Validators.required],
      userLastName: [this.userData?.userLastName, Validators.required],
      email: [this.userData?.email, [Validators.required, Validators.email]],
      civility: [this.userData?.civility, [Validators.required]],
      matricule: [this.userData?.matricule],
      dateOfBirth: [this.userData?.dateOfBirth],
      placeOfBirth: [this.userData?.placeOfBirth],
      nationality: [this.userData?.nationality],
      gender: [this.userData?.gender],
      cin: [this.userData?.cin],
      cinDate: [this.userData?.cinDate],
      phoneNumber: [this.userData?.phoneNumber],
      address: [this.userData?.address],
      locality: [this.userData?.locality],
      codePostal: [this.userData?.codePostal],
      pays: [this.userData?.pays],
      niveauEtude: [this.userData?.niveauEtude],
      dateDernierDiplome: [this.userData?.dateDernierDiplome],
      typeContrat: [this.userData?.typeContrat],
      typeEmployeur: [this.userData?.typeEmployeur],
      dateEntree: [this.userData?.dateEntree],
      dateRecrutement: [this.userData?.dateRecrutement],
      dateFinEssai: [this.userData?.dateFinEssai],
      dateTitularisation: [this.userData?.dateTitularisation],
      chefDeFamille: [this.userData?.chefDeFamille],
      salaireUnique: [this.userData?.salaireUnique],
      allocationFamille: [this.userData?.allocationFamille],
      numeroSecuriteSociale: [this.userData?.numeroSecuriteSociale],
      dateAffiliation: [this.userData?.dateAffiliation],
      exonereeSecuriteSociale: [this.userData?.exonereeSecuriteSociale],
      dateDebutExonereeSecuriteSociale: [this.userData?.dateDebutExonereeSecuriteSociale],
      dateFinExonereeSecuriteSociale: [this.userData?.dateFinExonereeSecuriteSociale],
      affiliationAssuranceGroupe: [this.userData?.affiliationAssuranceGroupe],
      nomAssurance: [this.userData?.nomAssurance],
      numeroAffiliationAssurance: [this.userData?.numeroAffiliationAssurance],
      dateAffiliationAssurance: [this.userData?.dateAffiliationAssurance],
      affiliationMutuelle: [this.userData?.affiliationMutuelle],
      nomMutuelle: [this.userData?.nomMutuelle],
      numeroAffiliationMutuelle: [this.userData?.numeroAffiliationMutuelle],
      dateAffiliationMutuelle: [this.userData?.dateAffiliationMutuelle],
      categorie: [this.userData?.categorie],
      grade: [this.userData?.grade],
      classe: [this.userData?.classe],
      echelon: [this.userData?.echelon],
      dateSituation: [this.userData?.dateSituation],
      fonction: [this.userData?.fonction],
      dateFonction: [this.userData?.dateFonction],
      structureAttache: [this.userData?.structureAttache],
      dateAffectation: [this.userData?.dateAffectation],
      motifDepart: [this.userData?.motifDepart],
      dateDepart: [this.userData?.dateDepart],
      situation: [this.userData?.situation],
      userPassword: [this.userData.userPassword, [Validators.required]],
      grilleSalaire: [this.userData?.grilleSalaire],
      salaireDeBase: [this.userData?.salaireDeBase],
      modeDePaiement: [this.userData?.modeDePaiement],
      numeroCompte: [this.userData?.numeroCompte],
      nomBanque: [this.userData?.nomBanque],
      nomAgence: [this.userData?.nomAgence],
      montantAssurance: [this.userData?.montantAssurance],
      montantMutuelle: [this.userData?.montantMutuelle],
      entrepriseName: [this.userData?.entrepriseName] ,
      situationFamiliale: [this.userData?.situationFamiliale],
      prenomConjoint: [this.userData?.prenomConjoint],
      nbEnfants: [this.userData?.nbEnfants],
      nbEnfantsImposables: [this.userData?.nbEnfantsImposables],
      affiliationLe: [this.userData?.affiliationLe],   });

      this.PasswordValue = this.userForm.get('userPassword')?.value;


    this.userForm.valueChanges.subscribe(() => {
      this.userForm.patchValue(this.userData);
    });
  }

  CarriereForm() {
    this.avancement.get('matricule')?.setValue(this.id);

    const convertedAvancement = {
      ...this.avancement.value,
      dateSituation: convertDateFormat(this.avancement.get('dateSituation')?.value),
    };

    const ok={avancement: convertedAvancement}
    console.log('ok',ok)

    const matriculeValue = this.avancement.get('matricule')?.value;

    if (this.avancement && this.avancement.valid) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir enregistrer l'avancement pour cet employé ?");
      if (isConfirmed) {
        this.appServiceService.AddCarriere(ok).subscribe(
          data => {
            console.log('Carrier saved successfully', data);
            this.reloadData();
            this.closeModal()
            this.avancement.reset();
          }

        );
        this.reloadData();
        this.closeModal()
        this.avancement.reset();
      } else {
        console.log('Operation canceled.');
      }



    } else {
      console.error('Carriere form is invalid');
    }

  }
  structureForm() {
    this.structure.get('matricule')?.setValue(this.id);

    const convertedstructure = {
      ...this.structure.value,
      dateFonction: convertDateFormat(this.structure.get('dateFonction')?.value),
      dateAffectation: convertDateFormat(this.structure.get('dateAffectation')?.value)
  };

    const ok={structure: convertedstructure}
    console.log('ok',ok)

    const matriculeValue = this.structure.get('matricule')?.value;

    if (this.structure && this.structure.valid) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir enregistrer le date de Titularisation pour cet employé ?");
      if (isConfirmed) {
        this.appServiceService.AddCarriere(ok).subscribe(
          data => {
            console.log('Carrier saved successfully', data);

          }
        );
        this.reloadData();
        this.closeModal()
        this.structure.reset();
      } else {
        console.log('Operation canceled.');
      }


    } else {
      console.error('Carriere form is invalid');
    }

  }
  affaireSocialeForm() {
    // Set values for the form controls
    this.affaireSocialeData.get('matriculeConjoint')?.setValue(this.userData?.matricule);
    this.affaireSocialeData.get('prenomConjoint')?.setValue(this.userData?.userFirstName);

    // Convert dates if needed
    const convertedAffaireSociale = {
      ...this.affaireSocialeData.value,
      affiliationLe: convertDateFormat(this.affaireSocialeData.get('affiliationLe')?.value),
      // Convert other date fields if needed
    };

    // Prepare the payload
    const payload = { affaireSociale: convertedAffaireSociale };

    // Confirm before saving
    if (this.affaireSocialeData && this.affaireSocialeData.valid) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir enregistrer les données de l'affaire sociale pour cet employé ?");
      if (isConfirmed) {
        // Make the API call to save data
        this.affaireService.saveAffaireSociale(payload).subscribe(
          data => {
            console.log('Affaire sociale saved successfully', data);
            // Reload data and close modal after successful save
            this.reloadData();
            this.closeModal();
            // Reset the form after successful save
            this.affaireSocialeData.reset();
          },
          error => {
            console.error('Failed to save affaire sociale data:', error);
          }
        );
      } else {
        console.log('Operation canceled.');
      }
    } else {
      console.error('Affaire sociale form is invalid');
    }
  }

  titularisationForm() {
    this.titularisation.get('matricule')?.setValue(this.id);

    const convertedtitularisation = {
      ...this.titularisation.value,
      ok: convertDateFormat(this.titularisation.get('ok')?.value),
    };

    const convertedEmploye = {
      ...this.titularisation.value,

      dateTitularisation: convertDateFormat(this.titularisation.get('ok')?.value),
        };
    delete convertedEmploye.matricule;
    const ok={titularisation: convertedtitularisation}
    console.log('ok',ok)

    const matriculeValue = this.titularisation.get('matricule')?.value;

    if (this.titularisation && this.titularisation.valid) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir enregistrer le titularisation pour cet employé ?");
      if (isConfirmed) {
        this.appServiceService.AddCarriere(ok).subscribe(
          data => {
            console.log('titularisation saved successfully', data);

          }
        );
        this.reloadData();
        this.closeModal()
        this.titularisation.reset();
      } else {
        console.log('Operation canceled.');
      }


      const matriculeValue =this.id;

      this.appServiceService.UploadEmploye2(this.id,convertedEmploye).subscribe(
        data => {
          console.log('titularisation Employee saved successfully', data);
          this.reloadData();
          this.closeModal3()
          this.titularisation.reset();
       //   this.showToast();

        },

      );

    } else {
      console.error('Carriere form is invalid');
    }

  }


  loadBanks() {
    this.appServiceService.getAllBanks().subscribe(
      (data: any[]) => {
        this.banks = data;
        console.log('banks :',this.banks)
      },
      (error) => {
        console.error('Failed to fetch banks:', error);
      }
    );
  }

  loadAgenciesOfBank(bankName: string) {
    this.appServiceService.getAllAgenciesOfBank(bankName).subscribe(
      (data: any[]) => {
        this.agencies = data;
      },
      (error) => {
        console.error('Failed to fetch agencies:', error);
      }
    );
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

  FinancieresForm() {
    this.financieresForm.get('matricule')?.setValue(this.id);

    const convertedfinancieresForm = {
      ...this.financieresForm.value,
    };
    const ok = this.financieresForm.value;



    const matriculeValue = this.financieresForm.get('matricule')?.value;

    if (this.financieresForm && this.financieresForm.valid) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir enregistrer le financieresForm pour cet employé ?");
      if (isConfirmed) {
        this.appServiceService.saveFinancieresWithBankAndAgency(convertedfinancieresForm).subscribe(
          data => {
            console.log('financieresForm saved successfully', data);
            this.reloadData();
            this.closeModal3()
            this.financieresForm.reset();
          }
        );
        this.reloadData();
        this.closeModal3()
        this.financieresForm.reset();
      } else {
        console.log('Operation canceled.');
      }

    } else {
      console.error('Carriere form is invalid');
    }

  }
  reloadData() {


    this.appServiceService.getEmployeByID(this.id).subscribe(
      (data: Employee | Employee[]) => {
        this.userData = data;

        this.appServiceService.getAdmistrativeBymatricule(this.userData.matricule).subscribe(AdmistrativeInfo => {
          Object.assign(this.userData, {
            typeContrat: AdmistrativeInfo.typeContrat,
            typeEmployeur: AdmistrativeInfo.typeEmployeur,
            dateEntree: AdmistrativeInfo.dateEntree,
            dateRecrutement: AdmistrativeInfo.dateRecrutement,
            dateFinEssai: AdmistrativeInfo.dateFinEssai,
          });
          console.log('Merged administrative info:', {
            typeContrat: AdmistrativeInfo?.typeContrat,
            typeEmployeur: AdmistrativeInfo?.typeEmployeur,
            dateEntree: AdmistrativeInfo?.dateEntree,
            dateRecrutement: AdmistrativeInfo?.dateRecrutement,
            dateFinEssai: AdmistrativeInfo?.dateFinEssai,
          });
          this.userForm.patchValue(this.userData);
          this.createForm();
        });


        this.appServiceService.getCareerInformation(this.userData.matricule).subscribe(careerInfo => {
          Object.assign(this.userData, {
            categorie: careerInfo.avancement[0].categorie,
            grade: careerInfo.avancement[0].grade,
            classe: careerInfo.avancement[0].classe,
            echelon: careerInfo.avancement[0].echelon,
            dateSituation: careerInfo.avancement[0].dateSituation,
            dateAjouter: careerInfo.avancement[0].dateAjouter,
          });

          Object.assign(this.userData, {
            fonction: careerInfo.structure[0].fonction,
            dateFonction: careerInfo.structure[0].dateFonction,
            structureAttache: careerInfo.structure[0].structureAttache,
            dateAffectation: careerInfo.structure[0].dateAffectation,
            dateAjouter_structure: careerInfo.structure[0].dateAjouter,
          });

          Object.assign(this.userData, {
            dateTitularisation: careerInfo.titularisation[0].ok,
            dateAjouter_titularisation: careerInfo.titularisation[0].dateAjouter,
          });

          this.userForm.patchValue(this.userData);
          this.createForm();
        });

        this.appServiceService.getUserfinancieres(this.userData.matricule).subscribe(UserfinancieresInfo => {
          Object.assign(this.userData, {
            grilleSalaire: UserfinancieresInfo[0].grilleSalaire,
            salaireDeBase: UserfinancieresInfo[0].salaireBase,
            modeDePaiement: UserfinancieresInfo[0].modePaiement,
            numeroCompte: UserfinancieresInfo[0].numeroCompte,
            nomBanque: UserfinancieresInfo[0].bank.name,
            nomAgence: UserfinancieresInfo[0].agency.name,
            montantMutuelle: UserfinancieresInfo[0].montantMutuelle,
            montantAssurance: UserfinancieresInfo[0].montantAssurance,
          });


          this.userForm.patchValue(this.userData);
          this.createForm();
        });

        this.affaireService.getAffaireById(this.userData.matricule).subscribe(UserAffairesInfo => {
          if (Array.isArray(UserAffairesInfo) && UserAffairesInfo.length > 0) {
            const affaire = UserAffairesInfo[0]; // Access the first element of the array

            Object.assign(this.userData, {
              situationFamiliale: affaire.situationFamiliale,
              prenomConjoint: affaire.prenomConjoint,
              nbEnfants: affaire.nbEnfants,
              nbEnfantsImposables: affaire.nbEnfantsImposables,
              chefDeFamille: affaire.chefDeFamille,
              nomAssurance: affaire.nomAssurance,
              affiliationLe: affaire.affiliationLe,
              allocFamiliale: affaire.allocFamiliale,
              securiteSociale: affaire.securiteSociale,
              exonere: affaire.exonere,
              affiliationRegime: affaire.affiliationRegime,
              affiliationAssurance:affaire.affiliationAssurance,
              affiliationMutuelle: affaire.affiliationMutuelle,
              affiliationAssuranceGroupe: affaire.affiliationAssuranceGroupe,
              affiliationCss: affaire.affiliationCss,
              numeroAffiliationAssurance:affaire,
              nomMutuelle: affaire.nomMutuelle,
              numeroAffiliationMutuelle: affaire.numeroAffiliationMutuelle
            });
            console.log('Merged UserAffairesInfo info:', {
              situationFamiliale: affaire.situationFamiliale,
              prenomConjoint: affaire.prenomConjoint,
              nbEnfants: affaire.nbEnfants,
              nbEnfantsImposables: affaire.nbEnfantsImposables,
              chefDeFamille: affaire.chefDeFamille,
              nomAssurance: affaire.nomAssurance,
              affiliationLe: affaire.affiliationLe,
            });
          } else {
            console.log('No UserAffairesInfo found or it is empty.');
          }

          this.userForm.patchValue(this.userData);
          this.createForm();
        });


        console.log('Fetched employee data:', this.userData);

      },
      (error) => {
        console.error('Failed to fetch employee data:', error);
      }
    );

  }
  convertDateFormat(date: string): string {
    // Check if date is provided and in the expected format
    if (date && date.includes('-')) {
      // Split the date string into parts using "-"
      const parts = date.split('-');
      // Reformat the date to "dd/MM/yyyy" format
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    // If date is not provided or not in the expected format, return it as is
    return date;
  }

  initialPasswordValue: string | null = null;
  passwordModified: boolean = false;

  updateProfile() {
    this.userForm = this.formBuilder.group({
      userFirstName: [this.userData.userFirstName, Validators.required],
      userLastName: [this.userData.userLastName, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      userPassword: [this.userData.userPassword, [Validators.required]],
      civility: [this.userData.civility, [Validators.required]],
      matricule: [this.userData.matricule],
      dateOfBirth: [this.userData.dateOfBirth],
      placeOfBirth: [this.userData.placeOfBirth],
      nationality: [this.userData.nationality],
      gender: [this.userData.gender],
      cinDate: [this.userData.cinDate],
      phoneNumber: [this.userData.phoneNumber],
      address: [this.userData.address],
      locality: [this.userData.locality],
    });
    this.initialPasswordValue = this.userForm.get('userPassword')?.value;


    this.userForm.valueChanges.subscribe(() => {
      this.userForm.patchValue(this.userData);
    });


    if (this.userForm.valid) {
      // Patch the form with the current form values
      this.userForm.patchValue(this.userForm.value);
      this.initialPasswordValue = this.userForm.get('userPassword')?.value;

      const newPassword = this.userForm.get('userPassword')?.value;
      const isPasswordChanged = this.userForm.get('userPassword')?.dirty;

      let updatedUserData = { ...this.userForm.value , dateOfBirth: convertDateFormat(this.userForm.get('dateOfBirth')?.value)};

      // Check if the password has been modified
      const isPasswordModified = this.PasswordValue !== newPassword;

      console.log("Updated User Data with formatted dateOfBirth:", updatedUserData);

      if (isPasswordModified) {
        updatedUserData.userPassword = newPassword;
      } else {
        delete updatedUserData.userPassword;
      }

      const userId = this.userData.matricule;
      const roleName = this.userData.role && this.userData.role.length > 0 ? this.userData.role[0].roleName : '';

      console.log('Updated UserData:', updatedUserData);
      console.log('Role Name:', roleName);

      this.appServiceService.updateUserRoleById(userId, updatedUserData, roleName).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.userData = updatedUserData;
          localStorage.setItem('UserData', JSON.stringify(updatedUserData));
        },
        (error) => {
          console.error('Failed to update profile:', error);
          const errorMessage = error.error ? error.error : 'An error occurred while updating profile.';
          console.error('Error response:', errorMessage);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  updateProfile1() {
    this.userForm = this.formBuilder.group({

      typeContrat: [this.userData?.typeContrat],
      typeEmployeur: [this.userData?.typeEmployeur],
      dateEntree: [this.userData?.dateEntree],
      dateRecrutement: [this.userData?.dateRecrutement],
      dateFinEssai: [this.userData?.dateFinEssai],
    });
    this.initialPasswordValue = this.userForm.get('userPassword')?.value;

    this.userForm.valueChanges.subscribe(() => {
      this.userForm.patchValue(this.userData);
    });
    const updatedUserData = { ...this.userForm.value };
    const newPassword = this.userForm.get('userPassword')?.value; // Potential source of error
    const isPasswordModified = this.initialPasswordValue !== newPassword;

    // Remove sensitive data from updatedUserData
    delete updatedUserData.userPassword;
    delete updatedUserData.dateOfBirth;

    const userId = this.userData.matricule;
    const roleName = this.userData.role && this.userData.role.length > 0 ? this.userData.role[0].roleName : '';

    console.log('Final Updated UserData:', updatedUserData);
    console.log('Role Name:', roleName);

    // Subscribe to the update service
    this.appServiceService.updateContartById(userId, updatedUserData).subscribe(
        (response) => {
            console.log('Profile updated successfully:', response);
            // Update local userData and store it in localStorage
            this.userData = { ...this.userData, ...updatedUserData };
            localStorage.setItem('UserData', JSON.stringify(this.userData));
        },
        (error) => {
            console.error('Failed to update profile:', error);
            const errorMessage = error.error ? error.error : 'An error occurred while updating profile.';
            console.error('Error response:', errorMessage);
        }
    );
    console.log('Profile modified successfully');
}



  Historiquedetails() {
    this.router.navigate(['Historiquedetails', this.id]);
  }
  Financieredetails() {
    this.router.navigate(['Financieredetails', this.id]);
  }
  Affairedetails() {
    this.router.navigate(['Affairehistoriques', this.id]);
  }
  AStep() {
    this.step = 1;
  }

  BStep() {
    this.step = 2;
  }

  CStep() {
    this.step = 3;
  }

  DStep() {
    this.step = 4;
  }
  EStep() {
    this.step = 5;
  }

  openModalContrat(): void {

    $('#ContratModal').modal('show');
  }

  closeModalContrat(): void {
    $('#ContratModal').modal('hide');
    }

  openModal0(): void {

    $('#exampleModalToggle0').modal('show');
    this.modalUserData = this.userData;
  }

  closeModal0(): void {
    $('#exampleModalToggle0').modal('hide');
    }

  openModal(): void {

    $('#exampleModalToggle').modal('show');
  }

  closeModal(): void {
    $('#exampleModalToggle').modal('hide');
    }



    openModal2(): void {

      $('#exampleModalToggle2').modal('show');
    }

    closeModal2(): void {
      $('#exampleModalToggle2').modal('hide');
      }
      openModal3(): void {

        $('#exampleModalToggle3').modal('show');
      }

      closeModal3(): void {
        $('#exampleModalToggle3').modal('hide');
        }

    openModal4(): void {

          $('#exampleModalToggle4').modal('show');
        }

      closeModal4(): void {
          $('#exampleModalToggle4').modal('hide');
          }
    showToast(): void {
      const toastTrigger = document.getElementById('liveToastBtn');
      const toastLiveExample = document.getElementById('liveToast');
      if (toastLiveExample) {
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        console.log('Toast shown successfully');

        setTimeout(() => {
          toast.hide();
          console.log('Toast hidden after 5 seconds');
        }, 5000);
      } else {
        console.error('Toast element not found');
      }
    }

}
