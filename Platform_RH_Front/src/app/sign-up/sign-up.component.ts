import { Component, OnInit, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppServiceService } from '../Services/app-service.service';
import { User } from '../User';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
  userForm!: FormGroup;
  isTabletOrPhoneScreen: boolean = false;
  showConfirmation: boolean = false;
  userData!: User; 
  id!: number;
  step: number = 1;

  constructor(
    private appService: AppServiceService, private route : Router,
    private fb: FormBuilder
  ) { }
 

  ngOnInit(): void {
    const userFormGroup = this.fb.group({
      userFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], 
      userLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], 
      locality: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      civility: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator]],
      placeOfBirth: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], 
      nationality: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],      
      gender: ['', Validators.required],
      cinDate: ['', [Validators.required, dateOfBirthValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
     matricule: ['']
    });



    const entrepriseFormGroup = this.fb.group({
      entrepriseName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      entrepriseDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      adresse_Entreprise: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      ville: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      code_Postal: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      pays: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],  
      tel_Entreprise: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      numFiscale: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date_Creation_Entreprise: ['', [Validators.required, dateOfBirthValidator]],
      domaine_Activite: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],  
      nb_Employees: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      site_Web: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.:/ ]+$')]],    
      dateInscriptionRegistreCommerce: ['', Validators.required],
      affiliationCaisseSociale: ['', Validators.required],
      numeroSecuriteSocial: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
      numeroCompteBancaire: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      assurance: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],    
      emailAssurance: ['', [Validators.required, Validators.email]],
      telAssurance:['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      numeroAffiliationAssurance: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
    
  
  
    this.userForm = this.fb.group({
      user: userFormGroup,
      entreprise: entrepriseFormGroup
    });
    this.userForm.get('user.cin')?.valueChanges.subscribe((cin: number) => {
      const matriculeValue = cin;
      this.userForm.get('user.matricule')?.setValue(matriculeValue);
    });
  }

  
  submitForm() {
    if (this.userForm.valid) {
      const UserData = {
        user: this.userForm.get('user')?.value, 
        entreprise: this.userForm.get('entreprise')?.value
       
      };
      UserData.user.dateOfBirth = convertDateFormat(UserData.user.dateOfBirth);
      UserData.user.cinDate = convertDateFormat(UserData.user.cinDate);
      UserData.entreprise.date_Creation_Entreprise = convertDateFormat(UserData.entreprise.date_Creation_Entreprise);
      UserData.entreprise.dateInscriptionRegistreCommerce = convertDateFormat(UserData.entreprise.dateInscriptionRegistreCommerce);
  
      console.log('This is my bd:', UserData);
      
      this.appService.RegisterUser(UserData).subscribe(
        data => {
          console.log('user saved successfully', data);
          this.route.navigate(['/']);
          // Handle success
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
      this.markFormGroupTouched(this.userForm);
    }
  }
  

  nextStep() {
    this.step++;
  }


  backStep() {
    this.step--;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


 




  onAccept(): void {
    console.log('c accepted')
    if (confirm('Are you sure you want to accept?')) {
      this.showConfirmation = true;
    }
  }

  showDeletedAlert() {
  }
  
}

