import { Component } from '@angular/core';
import { DocumentAuthService } from 'src/app/Services/document-auth.service';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  userData: any;
  categoriesList$: any;
  documentType: string | undefined;
  documentNumber: string | undefined;
  issuingCountry: string | undefined;
  issuingAuthority:string | undefined;

  constructor(private documentService: DocumentAuthService,
    private appService: AppServiceService) {}
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


      // const matriculeValue = this.userData.matricule;
       // const enterpriseValue = enterpriseName;
        //this.FormationForm.get('RHMatricule')?.setValue(matriculeValue);
       // this.FormationForm.get('entreprise')?.setValue(enterpriseValue);
    }
      onSubmit(): void {
    const newDoc = {
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      issuingCountry: this.issuingCountry,
      issuingAuthority: this.issuingAuthority
    };

    this.documentService.addDoc(newDoc)
      .subscribe(
        (response) => {
          console.log('Document added successfully:', response);
          // Optionally, you can navigate to a different page or show a success message.
        },
        (error) => {
          console.error('Error adding document:', error);
          // Handle error response
        }
      );
  }
}
