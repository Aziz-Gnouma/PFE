import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Carrier } from '../Carriere'; // Import the Carrier interface

@Component({
  selector: 'app-update-carrieree',
  templateUrl: './update-carrieree.component.html',
  styleUrls: ['./update-carrieree.component.css']
})
export class UpdateCarriereeComponent implements OnInit {
  CarrierData: any; // Define the type of CarrierData
  userForm!: FormGroup;
  step: number = 1;
 

  constructor(
    private appServiceService: AppServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Call createForm() when the component initializes
    this.createForm();

    const cin = this.route.snapshot.params['id'];
    this.appServiceService.getCarrierByCIN(cin).subscribe(
      (data: Carrier | Carrier[]) => {
        this.CarrierData = data;
        this.userForm.patchValue(data);
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  createForm() {
    // Initialize the form with validators
    this.userForm = this.formBuilder.group({
      salaire: ['', Validators.required],
      categorie: ['', Validators.required],
      dateEntree: ['', Validators.required],
      fonction: ['', Validators.required],
      grade: ['', Validators.required],
      natureDiplome: ['', Validators.required],
      niveauEducation: ['', Validators.required],
      languesMaitrisees: ['', Validators.required],
      experienceProfessionnelle: ['', Validators.required],
      competencesSpecialisees: ['', Validators.required],
      dateDepart: ['', Validators.required],
    });
  }

  updateCarrier() {
    if (this.userForm.valid) {
      // Update the user profile if the form is valid
      const updatedCarriere = { ...this.userForm.value };
      const userId = this.CarrierData?.cin;

      if (userId) {
        this.appServiceService.updateCarriereById(userId, updatedCarriere).subscribe(
          (response) => {
            console.log('Carriere updated successfully:', response);
            // Redirect to the list page after successful update
          },
          (error) => {
            console.error('Failed to update Carriere:', error);
            const errorMessage = error.error ? error.error : 'An error occurred while updating profile.';
            console.error('Error response:', errorMessage);
          }
        );
      } else {
        console.error('User ID is undefined');
      }
    } else {
      console.error('Form is invalid');
    }
  }


}
