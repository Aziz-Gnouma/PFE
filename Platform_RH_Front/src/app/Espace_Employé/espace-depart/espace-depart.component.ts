import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-depart',
  templateUrl: './espace-depart.component.html',
  styleUrl: './espace-depart.component.css'
})
export class EspaceDepartComponent  implements OnInit{


  userData: any; 
  userForm!: FormGroup;
  isLoading: boolean = false;
  responseMessage: string = '';

  constructor(
    private appServiceService: AppServiceService,
    private router : Router,

    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('UserData');
  
    if (storedUserData !== null) {
      this.userData = JSON.parse(storedUserData); 
      console.log('UserData', this.userData);
      this.fetchDepartByMatricule(this.userData.matricule);
      this.createForm(); 

    } else {
      console.error('User Data not found in local storage...'); 
    }
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      employeeName: [this.userData.userFirstName +' '+this.userData.userLastName, Validators.required],
      employeeEmail: [this.userData.email, [Validators.required, Validators.email]],
    matricule: [this.userData.matricule],
      cin: [this.userData.cin],
      departDate: ['', Validators.required],
      departType: ['', Validators.required]
    });
    this.userForm.valueChanges.subscribe(() => {
      this.userForm.patchValue(this.userData);
    });
  }

  fetchDepartByMatricule(matricule: string) {
    this.appServiceService.GetDepart(matricule)
      .subscribe(
        response => {
          if (!response) {
            this.responseMessage = '';
            console.log('Depart null');

          } else {
            this.responseMessage = 'La demande de départ a déjà été soumise. Veuillez patienter pour notre réponse. Merci!';
            console.log('Depart not null');
            this.userForm.reset();
          }
          console.log('Depart fetched successfully:', response);
        },
        error => {
          console.error('Error fetching Depart by matricule:', error);
        }
      );
  }
  
  
  
    
  demandeDepart() {
    this.userForm.patchValue(this.userForm.value);

    console.log("heyyyy :::",this.userForm.value);
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.responseMessage = 'Veuillez patienter pendant que nous accédons à votre requête...';

    this.appServiceService.DemandeDepart(this.userForm.value)
      .subscribe(
        response => {
          this.responseMessage = 'Your request has been submitted successfully.';
          this.userForm.reset();

        },
        error => {
          this.router.navigate(['EspaceDepart']);
        }

      )

      .add(() => {
        this.isLoading = false;
      });

  }
 
}