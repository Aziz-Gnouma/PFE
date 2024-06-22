import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashAdminComponent } from './Espace_Admin/dash-admin/dash-admin.component';
import { ListEntrepreneursComponent } from './Espace_Admin/list-entrepreneurs/list-entrepreneurs.component';
import { AcceuilComponent } from './Espace_Acceuil/acceuil/acceuil.component';
import { ForbiddenComponent } from './Espace_Acceuil/acceuil/Erreur/forbidden/forbidden.component';
import { ServiceComponent } from './Acceuil_service/service.component';
import { ListEntrepriseComponent } from './Espace_Admin/list-entreprise/list-entreprise.component';
import { DashEntrepreneurComponent } from './Espace_Entrepreneur/dash-entrepreneur/dash-entrepreneur.component';
import { ServiceUnavailableComponent } from './Espace_Acceuil/acceuil/Erreur/forbidden/service-unavailable/service-unavailable.component';
import { ListArchivedComponent } from './Espace_Admin/list-archived/list-archived.component';
import { ListInactiveEntrepriseComponent } from './Espace_Admin/list-inactive-entreprise/list-inactive-entreprise.component';
import { NewUsersComponent } from './Espace_Admin/new-users/new-users.component';
import { AllNewUsersComponent } from './Espace_Admin/all-new-users/all-new-users.component';
import { EmployeesComponent } from './Espace_Entrepreneur/employees/employees.component';
import { AjouterRhComponent } from './Espace_Entrepreneur/ajouter-rh/ajouter-rh.component';
import { ListArchiverComponent } from './Espace_Entrepreneur/list-archiver/list-archiver.component';
import { ProfileComponent } from './profile/profile.component';
import { AjouterCarriereComponent } from './ajouter-carriere/ajouter-carriere.component';
import { UpdateCarriereeComponent } from './update-carrieree/update-carrieree.component';
import { AddAffaireSComponent } from './Espace_RH/Affaire_Sociale/add-affaire-s/add-affaire-s.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddEmployeeComponent } from './Espace_RH/Employee/add-employee/add-employee.component';
import { EmployeeListComponent } from './Espace_RH/Employee/employee-list/employee-list.component';
import { DashboardRHComponent } from './Espace_RH/Employee/dashboard-rh/dashboard-rh.component';

import { EmployeeDetailsComponent } from './Espace_RH/Employee/employee-details/employee-details.component';
import { EditAffaireComponent } from './Espace_RH/Affaire_Sociale/edit-affaire/edit-affaire.component';
import { EmployeesListComponent } from './Espace_RH/Affaire_Sociale/employees-list/employees-list.component';
import { AddSanctionComponent } from './Espace_RH/Sanctions-Reward/add-Sanction/add-sanction/add-sanction.component';
import { ListSanctionComponent } from './Espace_RH/Sanctions-Reward/list-Sanction/list-sanction/list-sanction.component';
import { AddRewardComponent } from './Espace_RH/Sanctions-Reward/add-Reward/add-reward/add-reward.component';
import { ListRewardComponent } from './Espace_RH/Sanctions-Reward/list-Reward/list-reward/list-reward.component';
import { ListAffairesComponent } from './Espace_RH/Affaire_Sociale/list-affaire/list-affaire.component';
import { HistoriqueCarriereComponent } from './Espace_RH/Employee/historique-carriere/historique-carriere.component';
//import { EditAffaireComponent } from './Espace_RH/Affaire_sociale/edit-affaire/edit-affaire.component';
import { AddChildComponent } from './Espace_RH/Affaire_Sociale/add-child/add-child.component';
import { HistoriqueFinanceComponent } from './Espace_RH/Employee/historique-finance/historique-finance.component';
import { FicheDePaieComponent } from './Espace_RH/fiche-de-paie/fiche-de-paie.component';
import { MesFicheDePaieComponent } from './Espace_Employé/mes-fiche-de-paie/mes-fiche-de-paie.component';
import { DashEmployeComponent } from './Espace_Employé/dash-employe/dash-employe.component';
import { EspaceDepartComponent } from './Espace_Employé/espace-depart/espace-depart.component';
import { ListDepartComponent } from './Espace_RH/list-depart/list-depart.component';
import { HistoriqueAffaireComponent } from './Espace_RH/historique-affaire/historique-affaire.component';
import { AjouterFormationComponent } from './Espace_RH/Formatioon/ajouter-formation/ajouter-formation.component';
import { ListFormationComponent } from './Espace_RH/Formatioon/list-formation/list-formation.component';
import { ModifierFormationComponent } from './Espace_RH/Formatioon/modifier-formation/modifier-formation.component';
import { ListFormationsComponent } from './Espace_Employé/EspaceFormation/list-formations/list-formations.component';
import { DetailsFormationComponent } from './Espace_Employé/EspaceFormation/details-formation/details-formation.component';
import { EditSanctionComponent } from './Espace_RH/Sanctions-Reward/edit-Sanction/edit-sanction/edit-sanction.component';
import { EditRewardComponent } from './Espace_RH/Sanctions-Reward/edit-Reward/edit-reward/edit-reward.component';
import { AddDemandeComponent } from './Espace_RH/Conges-Absences/add-demande/add-demande.component';
import { ValidCongesComponent } from './Espace_RH/Conges-Absences/valid-conges/valid-conges.component';
import { AddAbsenceComponent } from './Espace_RH/Conges-Absences/add-absence/add-absence.component';
import { ValidAbsencesComponent } from './Espace_RH/Conges-Absences/valid-absences/valid-absences.component';
import { CongesListComponent } from './Espace_RH/Conges-Absences/conges-list/conges-list.component';
import { ListEmployeeSancRecComponent } from './Espace_RH/Sanctions-Reward/list-employee-sanc-rec/list-employee-sanc-rec.component';
import { ListChildComponent } from './Espace_RH/Affaire_Sociale/list-child/list-child.component';
import { AbsencesListComponent } from './Espace_RH/Conges-Absences/absences-list/absences-list.component';
import { ChatbotComponent } from './chat-bot/chatbot/chatbot.component';
import { ListSanctionRecEmployeeComponent } from './Espace_RH/Employee/list-sanction-rec-employee/list-sanction-rec-employee.component';
import { ListReclamationsComponent } from './Espace_Acceuil/list-reclamations/list-reclamations.component';
import { CongesListEmployeeComponent } from './Espace_RH/Conges-Absences/conges-list-employee/conges-list-employee.component';
import { AbsencesListEmployeeComponent } from './Espace_RH/Conges-Absences/absences-list-employee/absences-list-employee.component';
import { AddOffreEmploiComponent } from './Espace_RH/Recrutement/add-offre-emploi/add-offre-emploi.component';
import { ListOffreEmploiComponent } from './Espace_RH/Recrutement/list-offre-emploi/list-offre-emploi.component';
import { PostulerOffreComponent } from './Espace_RH/Recrutement/postuler-offre/postuler-offre.component';
import { DocAuthentiqueComponent } from './Espace_RH/Documents/doc-authentique/doc-authentique.component';
import { AddDocumentComponent } from './Espace_RH/Documents/add-document/add-document.component';
import { DetailsDocAuthComponent } from './Espace_RH/Documents/details-doc-auth/details-doc-auth.component';
import { AttestationDeTravailComponent } from './Espace_RH/Documents/attestation-de-travail/attestation-de-travail.component';
import { AttestationDisplayComponent } from './Espace_RH/Documents/attestation-display/attestation-display.component';
import { RewardsListEmployeeComponent } from './Espace_RH/Sanctions-Reward/rewards-list-employee/rewards-list-employee.component';
import { SanctionsListEmployeeComponent } from './Espace_RH/Sanctions-Reward/sanctions-list-employee/sanctions-list-employee.component';
import { RankingCvsComponent } from './Espace_RH/Recrutement/ranking-cvs/ranking-cvs.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { PostOffreRhComponent } from './Espace_RH/Recrutement/post-offre-rh/post-offre-rh.component';


const routes: Routes = [
  {path: '', component: AcceuilComponent },
  {path: 'welcome', component: WelcomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'chatbot', component: ChatbotComponent },
  {path: 'add-affaire', component: AddAffaireSComponent },
  {path: 'list-affaire', component: ListAffairesComponent },
  {path: 'SingUp', component: SignUpComponent  },
  {path: 'forbidden', component: ForbiddenComponent },
  {path: 'ServiceUnavailable', component: ServiceUnavailableComponent },

  {path: 'Profile', component: ProfileComponent },
  {path: 'AddCarriere/:id', component: AjouterCarriereComponent },
  {path: 'UpdateCarriere/:id', component: UpdateCarriereeComponent },
  {path: 'Entrepreuneurs', component: ListEntrepreneursComponent },
  {path: 'Entreprises', component: ListEntrepriseComponent },
  {path: 'ArchivedEntrepreuneurs', component: ListArchivedComponent },
  {path: 'InactiveEntreprises', component: ListInactiveEntrepriseComponent },
  {path: 'NewUsers/:id', component: NewUsersComponent },
  {path: 'ALLNewUsers', component: AllNewUsersComponent },
  {path: 'sidebarr', component: SideBarComponent },
{path: 'edit-affaire/:id', component: EditAffaireComponent },
{path: 'list-employeess', component: EmployeesListComponent },
{path: 'AddChild', component: AddChildComponent },

{path: 'Add-affaire', component: AddAffaireSComponent },

  {path: 'Admin', component: DashAdminComponent ,canActivate:[AuthGuard], data: {roles:['Admin']}},
  {path: 'Entrepreuneurs', component: ListEntrepreneursComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },
  {path: 'Entreprises', component: ListEntrepriseComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },
  {path: 'ArchivedEntrepreuneurs', component: ListArchivedComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },
  {path: 'InactiveEntreprises', component: ListInactiveEntrepriseComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },
  {path: 'NewUsers/:id', component: NewUsersComponent  ,canActivate:[AuthGuard], data: {roles:['Admin']}},
  {path: 'ALLNewUsers', component: AllNewUsersComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },
  {path: 'ListReclamations', component: ListReclamationsComponent ,canActivate:[AuthGuard], data: {roles:['Admin']} },


//this is for Entrepreuner



  {path: 'Gerant', component: DashEntrepreneurComponent , canActivate:[AuthGuard], data: {roles:['Gerant']}},
  {path: 'allEmployees', component: EmployeesComponent },
  {path: 'AjouterRH', component: AjouterRhComponent },
  {path: 'ArchivedEmployees', component: ListArchiverComponent },

  {path: 'Affairehistoriques/:id', component: HistoriqueAffaireComponent },
  {path: 'listChilds', component:  ListChildComponent},

  {path: 'AddEmployee', component: AddEmployeeComponent , canActivate:[AuthGuard], data: {roles:['GRH']}  },

  {path: 'EmployeeList', component: EmployeeListComponent, canActivate:[AuthGuard], data: {roles:['GRH']} },
  {path: 'DetailsEmplyee/:id', component: EmployeeDetailsComponent , canActivate:[AuthGuard], data: {roles:['GRH']}   },
  {path: 'Historiquedetails/:id', component: HistoriqueCarriereComponent , canActivate:[AuthGuard], data: {roles:['GRH']}    },
  {path: 'Financieredetails/:id', component: HistoriqueFinanceComponent , canActivate:[AuthGuard], data: {roles:['GRH']}   },
  {path: 'FicheDePaie', component: FicheDePaieComponent , canActivate:[AuthGuard], data: {roles:['GRH','Gerant']}   },
  {path: 'ListDepart', component:  ListDepartComponent , canActivate:[AuthGuard], data: {roles:['GRH','Gerant']}   },
  {path: 'ListFormation', component:  ListFormationComponent , canActivate:[AuthGuard], data: {roles:['GRH','Gerant']}   },
  {path: 'AjouterFormation', component:  AjouterFormationComponent, canActivate:[AuthGuard], data: {roles:['GRH']}    },
  {path: 'ModifierFormation/:id', component:  ModifierFormationComponent , canActivate:[AuthGuard], data: {roles:['GRH']}   },
  {path: 'ListRecompSanction', component:  ListEmployeeSancRecComponent , canActivate:[AuthGuard]   },
  {path: 'ListRecompSanctionEmployee', component:  ListSanctionRecEmployeeComponent , canActivate:[AuthGuard]  },



  {path: 'dashboard_RH', component: DashboardRHComponent , canActivate:[AuthGuard], data: {roles:['GRH','User']}  },




  {path: 'service', component: ServiceComponent  },
  {path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  {path: 'MonDash', component: DashEmployeComponent , canActivate:[AuthGuard] },

  {path: 'FormationDetails/:id', component: DetailsFormationComponent , canActivate:[AuthGuard]  },
  {path: 'MesFormation', component: ListFormationsComponent  , canActivate:[AuthGuard]  },

  {path: 'MesFicheDePaie', component: MesFicheDePaieComponent  , canActivate:[AuthGuard]  },
  {path: 'EspaceDepart', component: EspaceDepartComponent , canActivate:[AuthGuard]  },



  // this is for sanction crud
  {path: 'add-sanction/:userId', component: AddSanctionComponent , canActivate:[AuthGuard], data: {roles:['GRH']} },
  {path: 'list-sanction', component: ListSanctionComponent , canActivate:[AuthGuard]},
  {path:'edit-sanction/:id', component: EditSanctionComponent , canActivate:[AuthGuard], data: {roles:['GRH']}},
  {path:'edit-reward/:id',component:EditRewardComponent , canActivate:[AuthGuard], data: {roles:['GRH']}},
  {path:'rewardlistemployee',component:RewardsListEmployeeComponent , canActivate:[AuthGuard]},
  {path:'sanctionlistemployee',component:SanctionsListEmployeeComponent , canActivate:[AuthGuard]},
//this is for reward crud
{path: 'add-reward/:userId', component: AddRewardComponent , canActivate:[AuthGuard]},
{path: 'list-reward', component: ListRewardComponent , canActivate:[AuthGuard]},
// code for conges and absences
{path:'add-demande', component :AddDemandeComponent , canActivate:[AuthGuard]},
{path:'valid-conges', component:ValidCongesComponent, canActivate:[AuthGuard], data: {roles:['GRH']}},
///////absence
{path:'createAbs', component:AddAbsenceComponent},
{path:'validAbs', component:ValidAbsencesComponent, canActivate:[AuthGuard], data: {roles:['GRH']}},
{path:'congesList', component:CongesListComponent, canActivate:[AuthGuard]},
{path:'AbsencesList1', component:AbsencesListComponent, canActivate:[AuthGuard]},
{path:'congesListEmployee', component:CongesListEmployeeComponent, canActivate:[AuthGuard]},
{path:'AbsencesListEmployee', component:AbsencesListEmployeeComponent, canActivate:[AuthGuard]},
{path:'addOffre', component:AddOffreEmploiComponent, canActivate:[AuthGuard], data: {roles:['GRH']}},
{path:'listOffre', component:ListOffreEmploiComponent},
{ path: 'postuler/:id', component: PostulerOffreComponent },
{ path: 'rankscvs', component: RankingCvsComponent, canActivate:[AuthGuard], data: {roles:['GRH']} },
//////////Doc euth
{path: 'listDoc', component: DocAuthentiqueComponent , canActivate:[AuthGuard] },
{path: 'addDoc', component: AddDocumentComponent , canActivate:[AuthGuard]},
{path: 'details-doc-auth', component: DetailsDocAuthComponent , canActivate:[AuthGuard]},
{path: 'attestation-de-travail/:id', component: AttestationDeTravailComponent , canActivate:[AuthGuard] },
{path: 'attestationTravail', component: AttestationDisplayComponent  , canActivate:[AuthGuard]},
{path: 'postulelistrh', component: PostOffreRhComponent , canActivate:[AuthGuard], data: {roles:['GRH']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
