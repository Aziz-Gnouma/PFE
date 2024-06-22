import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { ChildService } from 'src/app/Services/child-service.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {
  childForm!: FormGroup;
  submitted = false;
  userData: any;
  categoriesList$: any;
  constructor(
    private formBuilder: FormBuilder,
    private childService: ChildService,
    private appService: AppServiceService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

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



    this.childForm = this.formBuilder.group({
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      genre: ['', Validators.required],
      dateAjout: [formattedDate],
        niveauEtude: ['', Validators.required]
    });

    this.openChildModal();
  }

  openChildModal(): void {
    $('#childModal').modal('show');
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.childForm.patchValue({
        image: file
      });
    }
  }

  submitChildForm(): void {
    this.submitted = true;
    if (this.childForm.invalid) {
      console.error('Form validation failed');
      return;
    }

    const matricule = this.userData.matricule;

    this.childService.addNewChild(this.childForm.value, matricule)
     .subscribe(() => {
        console.log('Child added successfully!');
        this.router.navigate(['/AddEmployee']);
      }, error => {
        console.error('Error adding child:', error);
      });
  }
}
