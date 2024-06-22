import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  API = 'http://localhost:9090';
  API2 = 'http://localhost:9095';
  API3 = 'http://localhost:9099';
  APIChat = 'http://localhost:8080';


  APIF = 'http://localhost:9999';
  APIFormation ='http://localhost:8091';


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor( private httpclient: HttpClient , private route :Router,
    private AuthService : AuthService )
  {}

  public login(loginData: any) {
    return this.httpclient.post(this.API + '/auth/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }



  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.AuthService.getRoles();

    if (userRoles && userRoles.length > 0) {
      // Loop through each role assigned to the user
      for (const userRole of userRoles) {
        // Check if the user role matches any of the allowed roles
        if (allowedRoles.includes(userRole.roleName)) {
          return true; // Return true if a match is found
        }
      }
    }

    return false; // Return false if no match is found or userRoles is empty
  }
  getAllEmployes(NomEntreprise: String): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/AllEmploye/${NomEntreprise}`);
  }
  getCareerInformation(matricule: string): Observable<any> {
    return this.httpclient.get<any>(`${this.API2}/GetCarriere/${matricule}`);
  }
  getUserfinancieres(matricule: string): Observable<any> {
    return this.httpclient.get<any>(`${this.APIF}/Userfinancieres/${matricule}`);
  }
  getAdmistrativeBymatricule(matricule: string): Observable<any> {
    return this.httpclient.get<any>(`${this.API}/auth/Adminstrative/${matricule}`);
  }
  
  getALLUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/AllUsers`);
  }

  gettotalUsersWithRoleNewDemande(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/totalUsersWithRoleNewDemande`);
  }
  gettotalUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/totalUsers`);
  }
  getTotalEnterprises(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/totalEnterprises`);
  }

  getAdminUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/AllUsers/Admin`);
  }
  getCarrierUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API2}/AllCarrier`);
  }
  getCarrierByCIN(cin:Number): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API2}/GetCarrier/${cin}`);
  }

  getEmployeByID(id:String): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.API}/auth/Employe/${id}`);
  }


  SaveUser(userData: any): Observable<any> {
    return this.httpclient.post<any>(`${this.API}/auth/AddNewUser`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message) {
          // Handle specific error message (e.g., email or CIN already exists)
          return throwError(error.error.message);
        } else {
          // Handle other errors
          return throwError('Verify your data , email or CIN already exists.');
        }
      })
    );
  }


  SaveCarriere(cin: String, carriereEmploye: any , carriereData :any): Observable<any> {
    alert("Carriere saved ");
  
    const request1 = this.httpclient.post(`${this.API}/auth/registerNewEmploye/${cin}`, carriereData);
    const request2 = this.httpclient.post(`${this.API2}/createNewCarrier`, carriereEmploye);
  
    return forkJoin([request1, request2]);
}

  
AddCarriere ( carriereDataok :any): Observable<any> {
  return  this.httpclient.post(`${this.API2}/createNewCarrier`, carriereDataok)

}

public GetAvancementbyId(id: string):Observable<any[]> {

  return this.httpclient.get<any[]>(`${this.API2}/GetAvancement/${id}`);
}
public GetTitularisationbyId(id: string):Observable<any[]> {

  return this.httpclient.get<any[]>(`${this.API2}/GetTitularisation/${id}`);
}

public GetStructurebyId(id: string):Observable<any[]> {

  return this.httpclient.get<any[]>(`${this.API2}/GetStructure/${id}`);
}



  UploadEmploye (cin: number, carriereEmploye :any): Observable<any> {
    return this.httpclient.post(`${this.API}/auth/registerNewEmploye/${cin}`, carriereEmploye)
  }
  
  UploadEmploye2 (cin: String, carriereEmploye :any): Observable<any> {
    return this.httpclient.post(`${this.API}/auth/registerNewEmploye/${cin}`, carriereEmploye)
  }


  RegisterUser(userData: any): Observable<any> {
    return this.httpclient.post<any>(`${this.API}/auth/registerNewUser`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message) {
          // Handle specific error message (e.g., email or CIN already exists)
          return throwError(error.error.message);
        } else {
          // Handle other errors
          return throwError('Verify your data , your information or your Enreprise already exists.');
        }
      })
    );
  }

  public getUserbyId(id: number):Observable<any[]> {

    return this.httpclient.get<any[]>(`${this.API}/auth/user/${id}`);
  }
  
  updateUserRoleById(userId: number, updatedUserData: any, roleName: string): Observable<any> {
    alert("Your Information Updated successfully");

    return this.httpclient.put(`${this.API}/auth/updateUserRole/${userId}`, { user: updatedUserData, roleName: roleName });

  }

  updateContartById(userId: string, updatedUserData: any): Observable<any> {
    alert("Your Contrat Updated successfully");

    return this.httpclient.put(`${this.API}/auth/updateContrat/${userId}`,updatedUserData);

  }

  updateCarriereById(cin: number, updatedCarriereData: any): Observable<any> {
    alert("Your Information Updated successfully");
    this.route.navigate(['/allEmployees']);

    return this.httpclient.put(`${this.API2}/UpdateCarrier/${cin}`, updatedCarriereData );

  }



  public archiveAdminUser(id: number): Observable<Object> {
    alert('Cet entrepreneur a été archivé avec succès.')
    return this.httpclient.put(`${this.API}/auth/archiveGerant/${id}`, {});
  }

public desarchiveAdminUser(id: number): Observable<Object> {
  alert('Cet entrepreneur a été desarchivé avec succès.')
    return this.httpclient.put(`${this.API}/auth/desarchiveGerant/${id}`, {});
  }

  public archiveGRHUser(id: number): Observable<Object> {
    alert('Cet Rh a été archivé avec succès.')
    return this.httpclient.put(`${this.API}/auth/archiveGRH/${id}`, {});
  }

  public desarchiveGRHUser(id: number): Observable<Object> {
    alert('Cet Rh a été desarchivé avec succès.')
    return this.httpclient.put(`${this.API}/auth/desarchiveGRH/${id}`, {});
  }
  public archiveEmployeUser(id: string): Observable<Object> {
    alert('Cet Employé a été archivé avec succès.')
    return this.httpclient.put(`${this.API}/auth/archiveEmploye/${id}`, {});
  }
  public desarchiveEmployeUser(id: number): Observable<Object> {

    return this.httpclient.put(`${this.API}/auth/desarchiveEmploye/${id}`, {});
  }
  
  
    public ActiverUser(id: number): Observable<Object> {

      return this.httpclient.post(`${this.API}/auth/ActiverUser/${id}`, {});
    }

    public SendConfirmation(id: number): Observable<Object> {

      return this.httpclient.post(`${this.API}/auth/SendConfirmation/${id}`, {});
    }



    public DeleteUser(id: number , entrepriseId: string): Observable<Object> {

      return this.httpclient.delete(`${this.API}/auth/delete/${id}/entreprise/${entrepriseId}`, {});
    }

    SaveC(userData: any): Observable<any> {
      return this.httpclient.post<any>(`${this.API2}/createNewCarrier`, userData).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.message) {
            return throwError(error.error.message);
          } else {
            return throwError('Verify your data , email or CIN already exists.');
          }
        })
      );
    }

    getAllBanks(): Observable<any> {
      return this.httpclient.get(`${this.APIF}/banks`);
    }
  
    getOrCreateBank(bankName: string): Observable<any> {
      return this.httpclient.get(`${this.APIF}/${bankName}`);
    }
    getAllAgenciesOfBank(bankName: string): Observable<any> {
      return this.httpclient.get(`${this.APIF}/${bankName}`);
    }
    saveFinancieresWithBankAndAgency(financieresFormData: any): Observable<any> {
      return this.httpclient.post(`${this.APIF}/financieres`, financieresFormData);
    }


    DemandeDepart(userForm: any): Observable<any> {
      return this.httpclient.post(`${this.API3}/DemandeDepart`, userForm);
    }
    
    GetDepart(matricule: string): Observable<any> {
      return this.httpclient.get(`${this.API3}/GetDepart/${matricule}`);
    }
    getAllDeparts(): Observable<any> {
      return this.httpclient.get(`${this.API3}/AllDepart`);
    }
    AcceptDepart(departId: string, employeeName: string, employeeEmail: string): Observable<any> {
      const requestBody = { departId, employeeName, employeeEmail };
      return this.httpclient.post(`${this.API3}/acceptDeparture`, requestBody);
    }
    AnnulerDepart(departId: string, employeeName: string, employeeEmail: string): Observable<any> {
      const requestBody = { departId, employeeName, employeeEmail };
      return this.httpclient.post(`${this.API3}/annulerDeparture`, requestBody);
    }
    

    getFinancieresById(matricule: string): Observable<any> {
      return this.httpclient.get(`${this.APIF}/financieres/${matricule}`);
    }

    getAllFicheDePaie(): Observable<any> {
      return this.httpclient.get(`${this.APIF}/AllFicheDePaie`);
    }
 
    getFicheDePaiEById(matricule: string, date: string): Observable<Blob> {
      const url = `${this.APIF}/GenerateFiche/${matricule}/${date}`;
  
      return this.httpclient.get(url, { responseType: 'blob' });
    }
  

    calculateSalary(employeeForCalculation: any): Observable<any> {
      return this.httpclient.post<any>(`${this.APIF}/calculerSalaire`, employeeForCalculation).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.message) {
            // Handle specific error message (e.g., email or CIN already exists)
            return throwError(error.error.message);
          } else {
            return throwError('Verify your data , email or CIN already exists.');
          }
        })
      );
    }

    AjouterFormation(FormationData: any): Observable<any> {
      return this.httpclient.post(`${this.APIFormation}/ajouterFormation`, FormationData);
    }
    getAllCategories(): Observable<any> {
      return this.httpclient.get(`${this.APIFormation}/AllCategory`);
    }
    getFormations(entreprise: string): Observable<any> {
      return this.httpclient.get(`${this.APIFormation}/AllFormations/${entreprise}`);
    }
    getFormationById(id: number): Observable<any> {
      return this.httpclient.get(`${this.APIFormation}/formations/${id}`);
    }
    modifierFormation(id: number,updatedFormation: any): Observable<any> {
      return this.httpclient.put(`${this.APIFormation}/modifierFormation/${id}`,updatedFormation);
    }

    supprimerFormation(id: number): Observable<any> {
      return this.httpclient.delete(`${this.APIFormation}/DeleteFormation/${id}`);
    }

    TelechargerFormation(id: number):  Observable<Blob> {
      const url = `${this.APIFormation}/GetFormation/${id}`;
  
      return this.httpclient.get(url, { responseType: 'blob' });
    }
    chat(chatId: string, userMessage: string): Observable<string> {
      const encodedMessage = encodeURIComponent(userMessage);
            return this.httpclient.get(`${this.APIChat}/chat/${chatId}/${encodedMessage}`, { responseType: 'text' });
    }
    getReclamtions(): Observable<any> {
      return this.httpclient.get(`${this.APIChat}/ALLRECLAMATION`);
    }
    AccepterReclamation(id: number): Observable<any> {
      return this.httpclient.put(`${this.APIChat}/AcceptRECLAMATION/${id}`, {});
    }
    AnnulerReclamtion(id: number): Observable<any> {
      return this.httpclient.delete(`${this.APIChat}/DeleteRECLAMATION/${id}`);
    }
    getALLtotalReclamations(): Observable<any[]> {
      return this.httpclient.get<any[]>(`${this.APIChat}/totalReclamations`);
    }
}
