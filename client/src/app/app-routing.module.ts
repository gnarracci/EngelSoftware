import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { UsersComponent } from './pages/users/users.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { authGuard } from './guards/authguard.guard';
import { hasRoleGuard } from './guards/has-role.guard';
import { NotallowedComponent } from './pages/notallowed/notallowed.component';
import { TemplateDocumentComponent } from './pages/template-document/template-document.component';
import { InstallationsComponent } from './pages/installations/installations.component';
import { InstallationConfigComponent } from './pages/installation-config/installation-config.component';
import { DynamicDocumentsComponent } from './pages/dynamic-documents/dynamic-documents.component';
import { DescriptionTemplateComponent } from './pages/description-template/description-template.component';
import { HistoricalActivitiesComponent } from './pages/historical-activities/historical-activities.component';
import { ActiveDocumentsComponent } from './pages/active-documents/active-documents.component';
import { StaticalDocumentsComponent } from './pages/statical-documents/statical-documents.component';
import { LoginEnterpriseComponent } from './pages/login-enterprise/login-enterprise.component';
import { DashboardEnterpriseComponent } from './pages/dashboard-enterprise/dashboard-enterprise.component';
import { SetupEnterpriseComponent } from './pages/setup-enterprise/setup-enterprise.component';
import { PdfviewComponent } from './pages/pdfview/pdfview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { roles: ['admin', 'user'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: { roles: ['admin'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: { roles: ['admin', 'user'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'tracking',
    component: TrackingComponent,
    data: { roles: ['admin', 'user'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'reminders',
    component: RemindersComponent,
    data: { roles: ['admin', 'user'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { roles: ['admin'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    data: { roles: ['admin', 'user'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'users-management',
    component: UsersComponent,
    data: { roles: ['admin'] },
    canActivate: [authGuard, hasRoleGuard],
  },
  {
    path: 'not-allowed',
    component: NotallowedComponent,
  },
  {
    path: 'template-document',
    component: TemplateDocumentComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'installations',
    component: InstallationsComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'installation-config',
    component: InstallationConfigComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'dynamic-documents',
    component: DynamicDocumentsComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'description-template',
    component: DescriptionTemplateComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'historical-activities',
    component: HistoricalActivitiesComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'active-documents',
    component: ActiveDocumentsComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'statical-documents',
    component: StaticalDocumentsComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'login-enterprise',
    component: LoginEnterpriseComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'dashboard-enterprise',
    component: DashboardEnterpriseComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'setup-enterprise',
    component: SetupEnterpriseComponent,
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'pdfview/:id',
    component: PdfviewComponent,
    data() { roles: ['admin', 'user'] },
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
