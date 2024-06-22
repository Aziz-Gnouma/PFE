import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dash-entrepreneur',
  templateUrl: './dash-entrepreneur.component.html',
  styleUrls: ['./dash-entrepreneur.component.css']
})
export class DashEntrepreneurComponent implements OnInit {
  enterpriseName: string = ''; 

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const storedEnterpriseName = localStorage.getItem('enterpriseName');

    if (storedEnterpriseName !== null) {
      this.enterpriseName = storedEnterpriseName; 
      console.log('Enterprise Name:', this.enterpriseName);
    } else {
      console.error('Enterprise Name not found in local storage.'); 
    }
  }

  goToAllEmployees() {
    this.router.navigate(['/allEmployees']);
  }
}
