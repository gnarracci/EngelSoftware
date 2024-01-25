import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { UsersComponent } from './pages/users/users.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { CompaniesComponent } from './pages/companies/companies.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies-update 1 /:id', component: CompaniesComponent},
  { path: 'templates', component: TemplatesComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'users-management', component: UsersComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
