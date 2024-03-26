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
import { TemplatesComponent } from './pages/templates/templates.component';
import { UsersComponent } from './pages/users/users.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { NotallowedComponent } from './pages/notallowed/notallowed.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TreeModule } from 'primeng/tree';
import { TemplateDocumentComponent } from './pages/template-document/template-document.component';

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
    TemplatesComponent,
    UsersComponent,
    TrackingComponent,
    RemindersComponent,
    CompaniesComponent,
    NotallowedComponent,
    FilterPipe,
    TemplateDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi: true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
