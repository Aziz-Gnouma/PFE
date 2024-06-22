import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-ajouter-formation',
  templateUrl: './ajouter-formation.component.html',
  styleUrl: './ajouter-formation.component.css'
})
export class AjouterFormationComponent implements OnInit {
  FormationForm!: FormGroup;
  userData: any; 
  categoriesList$: any;



  constructor(private formBuilder: FormBuilder ,
        private appService: AppServiceService,
         private route : Router,
         private fb: FormBuilder,
         private router: Router,
    ) { }

  ngOnInit(): void {

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
  this.FormationForm = this.formBuilder.group({
    titre: ['', Validators.required],
    duree: ['', Validators.required],
    langue: ['', Validators.required],
    niveau: ['', Validators.required],
    file: [null],
    description: ['', Validators.required],
    formateur: ['', Validators.required],
    RHMatricule: [null], // Initializing with null
    entreprise: [null], // Initializing with null
    categories: ['', Validators.required] 
  });

 
    const matriculeValue = this.userData.matricule;
    const enterpriseValue = enterpriseName;
    this.FormationForm.get('RHMatricule')?.setValue(matriculeValue);
    this.FormationForm.get('entreprise')?.setValue(enterpriseValue);
  
console.log(this.FormationForm)
  }
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const files: FileList = event.target.files;
      // Update the value of the 'file' form control with the selected file(s)
      this.FormationForm.get('file')!.setValue(files);
    }
  }

  submitForm() {
    if (this.FormationForm.valid) {
      const formData = new FormData();
  

      Object.keys(this.FormationForm.value).forEach(key => {
        if (key !== 'file') {
          formData.append(key, this.FormationForm.get(key)!.value);
        }
      });

      const files: FileList = this.FormationForm.get('file')!.value;
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
  
      console.log('Form data:', formData);
  
      this.appService.AjouterFormation(formData).subscribe(
        data => {
          console.log('Formation saved successfully', data);
         // this.router.navigate(['/ListFormation'])

        },
        (error) => {
          console.error('Failed to update formation:', error);
          alert('Formation ajouté successfully');
          this.router.navigate(['/ListFormation'])
      
        }
      );
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.FormationForm);
    }
  //  this.router.navigate(['/ListFormation'])

  }
  openModal(): void {

    $('#modalEditor').modal('show');
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
