import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../Services/app-service.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  userPassword!: string;
  errorMessage!: string;

  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.appServiceService.login(loginForm.value).subscribe(
        (response: any) => {
          this.authService.setRoles(response.user.role);
          this.authService.setToken(response.jwtToken);
          

  
          const etat = response.user.entreprise[0].etat;
  
          if (etat == -1) {
            console.log('Enterprise is inactive.');
            this.router.navigate(['/ServiceUnavailable']); 
            return; 
          }
  
          const role = response.user.role[0].roleName;
          const Enterprise = response.user.entreprise[0].entrepriseName;
          const EnterpriseAdresse = response.user.entreprise[0].adresse_Entreprise;

          const User = response.user;
          const Name = response.user.userFirstName +' '+ response.user.userLastName ;
          localStorage.setItem('UserData', User);
          localStorage.setItem('UserName', Name);

          
          if (role === 'Admin') {
            console.log('Welcome Admin');
            console.log(response);
            console.log(etat);
            this.router.navigate(['/Admin']);
          } else if  (role === 'Gerant')  {
            console.log('Welcome Gerant');
            this.router.navigate(['/Gerant']);
            localStorage.setItem('enterpriseName', Enterprise); 

            console.log(Enterprise);

           // this.router.navigate(['/service']);
          }
          else if  (role === 'GRH')  {
            console.log('Welcome GRH');
            this.router.navigate(['/dashboard_RH']);
            localStorage.setItem('enterpriseName', Enterprise); 
            localStorage.setItem('EnterpriseAdresse', EnterpriseAdresse); 


            console.log(Enterprise);
          }
          else  {
            console.log('Welcome Employé');
            this.router.navigate(['/dashboard_RH']);
            localStorage.setItem('enterpriseName', Enterprise); 

          }
          localStorage.setItem('UserData', JSON.stringify(User));

          console.log( 'User data ',User);
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
