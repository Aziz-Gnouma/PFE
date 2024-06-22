import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';

function dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);
  if (selectedDate >= currentDate) {
    return { 'futureOrCurrentDate': true };
  }
  
  return null;
}
function convertDateFormat(inputDate: string): string {
  const parts = inputDate.split('-');
  if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } else {
      return inputDate;
  }
}
@Component({
  selector: 'app-ajouter-rh',
  templateUrl: './ajouter-rh.component.html',
  styleUrls: ['./ajouter-rh.component.css']
})
export class AjouterRhComponent implements OnInit {
  userForm!: FormGroup;
  ok! :FormGroup;

  constructor(private formBuilder: FormBuilder ,     private appService: AppServiceService, private route : Router
    ) { }

  ngOnInit(): void {
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
      locality: ['', Validators.required]
    });
    this.userForm.get('cin')?.valueChanges.subscribe((cin: number) => {
      const matriculeValue = `${enterpriseName}_${cin}`;
      this.userForm.get('matricule')?.setValue(matriculeValue);
  
    });
   

    this.ok = this.formBuilder.group({
      User: this.userForm,
      roleName: ['GRH', Validators.required],
      entrepriseName: [enterpriseName, Validators.required]
    });
  }
  
  

  submitForm() {
    if (this.ok.valid) {
      //console.log('Form is valid');
      //console.log('User Form Value:', this.ok.get('User')?.value);
      const UserData = {
        user: this.ok.get('User')?.value, 
        roleName: this.ok.get('roleName')?.value,
        entrepriseName: this.ok.get('entrepriseName')?.value
      };
      UserData.user.dateOfBirth = convertDateFormat(UserData.user.dateOfBirth);
      UserData.user.cinDate = convertDateFormat(UserData.user.cinDate);
      console.log('This is my data:', UserData);
      
      this.appService.SaveUser(UserData).subscribe(
        data => {
          console.log('User saved successfully', data);
          this.route.navigate(['/allEmployees']);
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
}
