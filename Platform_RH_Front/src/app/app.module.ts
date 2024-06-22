import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppServiceService } from './Services/app-service.service';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { AuthGuard } from './Auth/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashAdminComponent } from './Espace_Admin/dash-admin/dash-admin.component';
import { SidebarComponent } from './Espace_Admin/sidebar/sidebar.component';
import { ListEntrepreneursComponent } from './Espace_Admin/list-entrepreneurs/list-entrepreneurs.component';
import { AcceuilComponent } from './Espace_Acceuil/acceuil/acceuil.component';
import { ForbiddenComponent } from './Espace_Acceuil/acceuil/Erreur/forbidden/forbidden.component';
import { HeaderComponent } from './header/header.component';
import { AvancementilterPipe, FicheDePaieFilterPipe, RoleFilterPipe, StructureFilterPipe, TitularisationFilterPipe, UserFilterPipe } from './user-filter.pipe';
import { EnterpriseFilterPipe } from './user-filter.pipe';
import { ListEntrepriseComponent } from './Espace_Admin/list-entreprise/list-entreprise.component';
import { DashEntrepreneurComponent } from './Espace_Entrepreneur/dash-entrepreneur/dash-entrepreneur.component';
import { ServiceUnavailableComponent } from './Espace_Acceuil/acceuil/Erreur/forbidden/service-unavailable/service-unavailable.component';
import { ListArchivedComponent } from './Espace_Admin/list-archived/list-archived.component';
import { ServiceComponent } from './Acceuil_service/service.component';
import { ListInactiveEntrepriseComponent } from './Espace_Admin/list-inactive-entreprise/list-inactive-entreprise.component';
import { NewUsersComponent } from './Espace_Admin/new-users/new-users.component';
import { AllNewUsersComponent } from './Espace_Admin/all-new-users/all-new-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './Espace_Entrepreneur/employees/employees.component';
import { AjouterRhComponent } from './Espace_Entrepreneur/ajouter-rh/ajouter-rh.component';
import { ListArchiverComponent } from './Espace_Entrepreneur/list-archiver/list-archiver.component';
import { ProfileComponent } from './profile/profile.component';
import { AjouterCarriereComponent } from './ajouter-carriere/ajouter-carriere.component';
import { UpdateCarriereeComponent } from './update-carrieree/update-carrieree.component';
import { AddEmployeeComponent } from './Espace_RH/Employee/add-employee/add-employee.component';
import { DashboardRHComponent } from './Espace_RH/Employee/dashboard-rh/dashboard-rh.component';
import { DetailsAffaireComponent } from './Espace_RH/Affaire_Sociale/details-affaire/details-affaire.component';
import { AddAffaireSComponent } from './Espace_RH/Affaire_Sociale/add-affaire-s/add-affaire-s.component';
import { EditAffaireComponent } from './Espace_RH/Affaire_Sociale/edit-affaire/edit-affaire.component';
import { ListAffairesComponent } from './Espace_RH/Affaire_Sociale/list-affaire/list-affaire.component';
import { AddSanctionComponent } from './Espace_RH/Sanctions-Reward/add-Sanction/add-sanction/add-sanction.component';
import { DetailsSanctionsComponent } from './Espace_RH/Sanctions-Reward/details-sanctions/details-sanctions.component';
import { AddRewardComponent } from './Espace_RH/Sanctions-Reward/add-Reward/add-reward/add-reward.component';
import { EmployeeListComponent } from './Espace_RH/Employee/employee-list/employee-list.component';
import { ListRewardComponent } from './Espace_RH/Sanctions-Reward/list-Reward/list-reward/list-reward.component';
import { EmployeeDetailsComponent } from './Espace_RH/Employee/employee-details/employee-details.component';
import { AddChildComponent } from './Espace_RH/Affaire_Sociale/add-child/add-child.component';
import { EmployeeFilterPipe } from 'employee-filter.pipe';
import { HistoriqueCarriereComponent } from './Espace_RH/Employee/historique-carriere/historique-carriere.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DateFormatPipe, HistoriqueFinanceComponent } from './Espace_RH/Employee/historique-finance/historique-finance.component';
import { CustomDateFormatPipe, FicheDePaieComponent } from './Espace_RH/fiche-de-paie/fiche-de-paie.component';
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
import { CongesListComponent } from './Espace_RH/Conges-Absences/conges-list/conges-list.component';
import { ListSanctionComponent } from './Espace_RH/Sanctions-Reward/list-Sanction/list-sanction/list-sanction.component';
import { EditRewardComponent } from './Espace_RH/Sanctions-Reward/edit-Reward/edit-reward/edit-reward.component';
import { EditSanctionComponent } from './Espace_RH/Sanctions-Reward/edit-Sanction/edit-sanction/edit-sanction.component';
import { ValidAbsencesComponent } from './Espace_RH/Conges-Absences/valid-absences/valid-absences.component';
import { AddAbsenceComponent } from './Espace_RH/Conges-Absences/add-absence/add-absence.component';
import { ValidCongesComponent } from './Espace_RH/Conges-Absences/valid-conges/valid-conges.component';
import { AddDemandeComponent } from './Espace_RH/Conges-Absences/add-demande/add-demande.component';
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
import { AppDocumentInfoComponent } from './Espace_RH/Documents/app-document-info/app-document-info.component';
import { AttestationDisplayComponent } from './Espace_RH/Documents/attestation-display/attestation-display.component';
import { AttestationDeTravailComponent } from './Espace_RH/Documents/attestation-de-travail/attestation-de-travail.component';
import { SanctionsListEmployeeComponent } from './Espace_RH/Sanctions-Reward/sanctions-list-employee/sanctions-list-employee.component';
import { RewardsListEmployeeComponent } from './Espace_RH/Sanctions-Reward/rewards-list-employee/rewards-list-employee.component';
import { RankingCvsComponent } from './Espace_RH/Recrutement/ranking-cvs/ranking-cvs.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { GenerateStarsPipe } from './generate-stars.pipe';
import { PostOffreRhComponent } from './Espace_RH/Recrutement/post-offre-rh/post-offre-rh.component';

@NgModule({
    declarations: [
      AppComponent,
      AcceuilComponent,
      ServiceComponent,
      HeaderComponent,
      DashboardComponent,
        AddAffaireSComponent,
        EditAffaireComponent,
        LoginComponent,
        EmployeeDetailsComponent,
        ForbiddenComponent,
        ListAffairesComponent,
        DetailsAffaireComponent,
        SignUpComponent,
        DashAdminComponent,
        SidebarComponent,
        ListEntrepreneursComponent,
        UserFilterPipe,
        AvancementilterPipe,
        TitularisationFilterPipe,
        StructureFilterPipe,
        RoleFilterPipe,
        EnterpriseFilterPipe,
        ListEntrepriseComponent,
        DashEntrepreneurComponent,
        ServiceUnavailableComponent,
        ListArchivedComponent,
        HistoriqueCarriereComponent,
        HistoriqueFinanceComponent,
        ListInactiveEntrepriseComponent,
        NewUsersComponent,
        AllNewUsersComponent,
        EmployeesComponent,
        AjouterRhComponent,
        ListArchiverComponent,
        ProfileComponent,
        AjouterCarriereComponent,
        UpdateCarriereeComponent,
        AddEmployeeComponent,
        DashboardRHComponent,
        AddSanctionComponent,
        DetailsSanctionsComponent,
        AddRewardComponent,
        EmployeeListComponent,
        ListRewardComponent,
        EmployeeFilterPipe,
        DateFormatPipe,
        FicheDePaieComponent,
        DashEmployeComponent,
        FicheDePaieFilterPipe,
        MesFicheDePaieComponent,
        EspaceDepartComponent,
        ListDepartComponent,
        CustomDateFormatPipe,
        AddChildComponent,
        HistoriqueAffaireComponent,
        AjouterFormationComponent,
        ListFormationComponent,
        ModifierFormationComponent,
        ListFormationsComponent,
        DetailsFormationComponent,
        ValidCongesComponent,
        AddAbsenceComponent,
        ValidAbsencesComponent,
        ListRewardComponent,
        EditSanctionComponent,
        EditRewardComponent,
        ListSanctionComponent,
        CongesListComponent,
        AddDemandeComponent,
        ListEmployeeSancRecComponent,
        ListChildComponent,
        AbsencesListComponent,
        ChatbotComponent,
        ListSanctionRecEmployeeComponent,
        ListReclamationsComponent,
        CongesListEmployeeComponent,
        AbsencesListEmployeeComponent,
        AddOffreEmploiComponent,
        ListOffreEmploiComponent,
        PostulerOffreComponent,
        DocAuthentiqueComponent,
        AddDocumentComponent,
        DetailsDocAuthComponent,
        AttestationDeTravailComponent,
        AppDocumentInfoComponent,
        AttestationDisplayComponent,
        SanctionsListEmployeeComponent,
        RewardsListEmployeeComponent,
        RankingCvsComponent,
        WelcomeComponent,
        GenerateStarsPipe,
        PostOffreRhComponent
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AppServiceService,
    ],
    bootstrap: [AppComponent],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center', // Position the toast at the top center
            closeButton: true, // Display close button
            timeOut: 3000, // Duration the toast is displayed (3 seconds)
            progressBar: true, // Display a progress bar
            enableHtml: true, // Allow HTML content in toast message
            // You can customize other options here
        }),
    ]
})
export class AppModule { }
