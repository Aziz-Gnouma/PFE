import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../Services/app-service.service';
import { formatDate } from '@angular/common';


function formatDateToString(date: string): string {
  if (date && date.includes('-')) {
    // Split the date string into parts using "-"
    const parts = date.split('-');
    // Reformat the date to "dd/MM/yyyy" format
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  // If date is not provided or not in the expected format, return it as is
  return date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userData: any; 
  userForm!: FormGroup;
  step: number = 1;

  constructor(
    private appServiceService: AppServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('UserData');
  
    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData); 
      console.log('UserData', this.userData);
      this.createForm(); 
    } else {
      console.error('User Data not found in local storage...'); 
    }
  }
  initialPasswordValue: string | null = null;
  createForm() {
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
      locality: [this.userData.locality]
    });
    this.initialPasswordValue = this.userForm.get('userPassword')?.value;

    this.userForm.valueChanges.subscribe(() => {
      this.userForm.patchValue(this.userData);
    });
  }
  

  

  updateProfile() {
    if (this.userForm.valid) {
        let dateOfBirth = this.userForm.get('dateOfBirth')?.value;
  
        // Format the date of birth as "dd/MM/yyyy"
        if (dateOfBirth) {
            dateOfBirth = formatDateToString(dateOfBirth);
        }
  
        // Update the dateOfBirth field in the form with the formatted date
        this.userForm.patchValue({ dateOfBirth });
  
    
    
        let updatedUserData = {
            ...this.userForm.value
        };
        const newPassword = this.userForm.get('userPassword')?.value;
        const isPasswordDirty = this.userForm.get('userPassword')?.dirty;

        const isPasswordModified = this.initialPasswordValue !== newPassword;
        console.log("Updated User Data with formatted dateOfBirth:", updatedUserData);

        if (isPasswordModified) {
            updatedUserData.userPassword = newPassword;
        } else {
            delete updatedUserData.userPassword;
        }

        delete updatedUserData.dateOfBirth;

        const userId = this.userData.matricule;
        const roleName = this.userData.role && this.userData.role.length > 0 ? this.userData.role[0].roleName : '';
  
        console.log('Final Updated UserData:', updatedUserData);
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

  
  
  
  nextStep() {
    this.step = 2;
  }

  backStep() {
    this.step = 1;
  }

  FinalStep() {
    this.step = 3;
  }
}
