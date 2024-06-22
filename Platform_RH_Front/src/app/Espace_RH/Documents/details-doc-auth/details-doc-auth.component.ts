import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { DocumentAuthService } from 'src/app/Services/document-auth.service';
@Component({
  selector: 'app-details-doc-auth',
  templateUrl: './details-doc-auth.component.html',
  styleUrls: ['./details-doc-auth.component.css']
})
export class DetailsDocAuthComponent implements OnInit {
  cin: string | undefined;
  userFirstName: string | undefined;
  userLastName: string | undefined;
  userData: any;
  categoriesList$: any;
  documents: any;
  constructor(private appService: AppServiceService,private documentService: DocumentAuthService) { }

  ngOnInit(): void {
    const enterpriseName = localStorage.getItem('enterpriseName') || '';
    console.log(enterpriseName)
    this.categoriesList$ = this.appService.getAllCategories();
    const storedUserData = localStorage.getItem('UserData');

    if (storedUserData !== null) {
      const userData = JSON.parse(storedUserData);
      this.cin = userData.cin;
      this.userFirstName = userData.userFirstName;
      this.userLastName = userData.userLastName;
      this.userData = userData; // add this line to store userData in component variable
    } else {
      console.error('User Data not found in local storage...');
    }

    // move the following line inside the if block to ensure userData is defined
    if (this.userData) {
      console.log('UserData', this.userData);
    }

    this.documentService.getAllDocs().subscribe(
      (response) => {
        this.documents = response;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }
}
