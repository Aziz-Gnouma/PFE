
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../Services/app-service.service';
import { User } from 'src/app/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrl: './list-reclamations.component.css'
})

export class ListReclamationsComponent implements OnInit {
  Reclamtions: any; 
  searchTerm: string = ''; 
  showModal: boolean = false; 
  selectedUser: User | undefined; 


  constructor(private appService: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getReclamtionsList();
  }
 


  getReclamtionsList(): void {
    this.appService.getReclamtions().subscribe((data: any) => {
      this.Reclamtions = data;
    });
  }

  Accepter(Id: number) {
    const confirmed = confirm('Êtes-vous sûr de vouloir accepter cette reclamation ?');
    if (confirmed)

    this.appService.AccepterReclamation(Id).subscribe(
      () => {
        this.router.navigateByUrl('/ListReclamations');

      },
      (error) => {
        console.error('Error reclamation', error);
      }
    );

  }

  Annuler(Id: number) {
    const confirmed = confirm('Êtes-vous sûr de vouloir Refuser cette reclamation ?');
    if (confirmed)
    this.appService.AnnulerReclamtion(Id).subscribe(
      () => {
        this.router.navigateByUrl('/ListReclamations');
      },
      (error) => {
        console.error('Error reclamation:', error);
      }
    );
  }


  openModal(user: User): void {
    console.log("Opening modal for user:", user);
    this.selectedUser = user;
    $('#exampleModalToggle').modal('show');
  }
  
  closeModal(): void {
    console.log("Closing modal");
    this.showModal = false;
  }
  goToGerantList(){
    this.getReclamtionsList();
  }
  
}
