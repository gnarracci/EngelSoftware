import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { UsersComponent } from './pages/users/users.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { NotallowedComponent } from './pages/notallowed/notallowed.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { TemplateDocumentComponent } from './pages/template-document/template-document.component';
import { InstallationsComponent } from './pages/installations/installations.component';
import { InstallationConfigComponent } from './pages/installation-config/installation-config.component';
import { DynamicDocumentsComponent } from './pages/dynamic-documents/dynamic-documents.component';
import { DescriptionTemplateComponent } from './pages/description-template/description-template.component';
import { HistoricalActivitiesComponent } from './pages/historical-activities/historical-activities.component';
import { ActiveDocumentsComponent } from './pages/active-documents/active-documents.component';
import { FilterObjsPipe } from './pipes/filter-objs.pipe';
import { StaticalDocumentsComponent } from './pages/statical-documents/statical-documents.component';
import { LoginEnterpriseComponent } from './pages/login-enterprise/login-enterprise.component';
import { DashboardEnterpriseComponent } from './pages/dashboard-enterprise/dashboard-enterprise.component';
import { SetupEnterpriseComponent } from './pages/setup-enterprise/setup-enterprise.component';
import { PdfviewComponent } from './pages/pdfview/pdfview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    NotfoundComponent,
    ContactusComponent,
    SettingsComponent,
    DocumentsComponent,
    UsersComponent,
    TrackingComponent,
    RemindersComponent,
    CompaniesComponent,
    NotallowedComponent,
    FilterPipe,
    TemplateDocumentComponent,
    InstallationsComponent,
    InstallationConfigComponent,
    DynamicDocumentsComponent,
    DescriptionTemplateComponent,
    HistoricalActivitiesComponent,
    ActiveDocumentsComponent,
    FilterObjsPipe,
    StaticalDocumentsComponent,
    LoginEnterpriseComponent,
    DashboardEnterpriseComponent,
    SetupEnterpriseComponent,
    PdfviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi: true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
