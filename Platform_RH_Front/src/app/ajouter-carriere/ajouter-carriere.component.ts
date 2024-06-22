import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-carriere',
  templateUrl: './ajouter-carriere.component.html',
  styleUrls: ['./ajouter-carriere.component.css']
})
export class AjouterCarriereComponent implements OnInit {
  userForm!: FormGroup;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppServiceService
  ) { }

  ngOnInit(): void {
  
    this.userForm = this.formBuilder.group({
      id: ['123'], 
      cin:[this.route.snapshot.params['id']],
      grilleDeSalaire: ['', Validators.required],
      grilleDeDattes: ['', Validators.required],
      dateCategorie: ['', Validators.required],
      categorieProchaine: ['', Validators.required],
      echelle: ['', Validators.required],
      dateEchelle: ['', Validators.required],
      echelleProchaine: ['', Validators.required],
      echelon: ['', Validators.required],
      echelonDeDates: ['', Validators.required],
      dateRabattement: ['', Validators.required],
      echelonProchain: ['', Validators.required],
      college: ['', Validators.required],
      dateCollege: ['', Validators.required],
      fonction: ['', Validators.required],
      dateFonction: ['', Validators.required],
      grade: ['', Validators.required],
      noteDeDate: ['', Validators.required],
      dateEssai: ['', Validators.required],
      titularisation: ['', Validators.required],
      gradeProchain: ['', Validators.required],
      natureDuDiplome: ['', Validators.required],
      motifDeDepart: ['', Validators.required],
      retraitePrevue: ['', Validators.required],
      dateDepart: ['', Validators.required],
    });
    
  }

  submitForm() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      console.log('Form data:', userData);
      
     
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.userForm);
    }
  }
  

  goToList() {
    console.log('Navigating to allEmployees route');
    this.router.navigate(['/EmployeeList']).then(() => {
      console.log('Navigation to allEmployees route successful');
    }).catch(error => {
      console.error('Error navigating to allEmployees route:', error);
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
