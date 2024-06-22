import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.css']
})
export class ModifierFormationComponent implements OnInit {
  id!: number;
  formation!: any;
  FormationForm!: FormGroup;
  categoriesList$: any;

  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('id formation :', this.id);
    this.categoriesList$ = this.appServiceService.getAllCategories();
  
 
    this.formationbyid();
  }
  
  formationbyid(): void 
  {
    this.appServiceService.getFormationById(this.id).subscribe(
      (data: any) => {
        this.formation = data;
        console.log('formation:', this.formation);
        this.initializeForm();      }
    );
  }
  
  initializeForm(): void {
      this.FormationForm = this.formBuilder.group({
        titre: [this.formation.titre, Validators.required],
        duree: [this.formation.duree , Validators.required],
        langue: [this.formation.langue, Validators.required],
        niveau: [this.formation.niveau, Validators.required],
        description: [this.formation.description, Validators.required],
        formateur: [this.formation.formateur, Validators.required],
        statut: [this.formation.statut],
        entreprise: [this.formation.entreprise],
        categories: [this.formation.categories[0].id, Validators.required]
      });

      this.FormationForm.valueChanges.subscribe(() => {
        this.FormationForm.patchValue(this.formation);
      });
      console.log(this.FormationForm);
    
  }
  
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const files: FileList = event.target.files;
      this.FormationForm.get('file')!.setValue(files);
    }
  }

  updateFormation(): void {

    
    this.FormationForm.patchValue(this.FormationForm.value);


    let updatedUserData = { ...this.FormationForm.value };
    console.log('hola , ',updatedUserData)

    this.appServiceService.modifierFormation(this.id, updatedUserData).subscribe(
      (response) => {
        console.log('Formation updated successfully:', response);
        alert('Formation updated successfully');
      },
      (error) => {
        console.error('Failed to update formation:', error);
        alert('Formation updated successfully');
        this.router.navigate(['/ListFormation'])
      }
    );
    
  }
}
