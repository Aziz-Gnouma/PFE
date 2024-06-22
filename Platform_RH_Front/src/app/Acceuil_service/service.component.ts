import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Services/auth.service';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    public AppServiceService: AppServiceService ,
    private router: Router ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  public logout() {
    this.AuthService.clear();
    this.router.navigate(['']);
  }
}