import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Fields } from 'src/app/interfaces/fields';
import { Template } from 'src/app/interfaces/template';
import { Types } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  saveTemp(data: Template): Observable<Template> {
    return this.http
      .post<Template>(`${this.API_URI}api/dynamics`, data)
      .pipe(catchError(this.handlerError));
  }

  getAllDatatypes(): Observable<Types> {
    return this.http
      .get<Types>(`${this.API_URI}api/types`)
      .pipe(catchError(this.handlerError));
  }

  getAllTemplates(): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics`)
      .pipe(catchError(this.handlerError));
  }

  getTemplate(id: string): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getNameTemplate(id: string): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics/nt/${id}`)
      .pipe(catchError(this.handlerError));
  }

  deleteTemplate(id: string): Observable<Template> {
    return this.http
      .delete(`${this.API_URI}api/dynamics/${id}`)
      .pipe(catchError(this.handlerError));
  }

  // Add Folder
  addFolder(id: string, folder: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/dynamics/${id}`, folder)
      .pipe(catchError(this.handlerError));
  }

  deleteFolder(id: string): Observable<Fields> {
    return this.http
      .delete<Fields>(`${this.API_URI}api/dynamics/deletefolder/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getFolders(id: string): Observable<Fields> {
    return this.http
      .get<Fields>(`${this.API_URI}api/dynamics/folders/${id}`)
      .pipe(catchError(this.handlerError));
  }
  // Add Field under Folder
  addFieldsWF(id: string, subfield: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/dynamics/subfield/${id}`, subfield)
      .pipe(catchError(this.handlerError));
  }
  // Add Field under name Template directly
  addField(id: string, field: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/dynamics/nf/${id}`, field)
      .pipe(catchError(this.handlerError));
  }

  // Get Template Folders
  getLength(id: string): Observable<Fields> {
    return this.http
      .get<Fields>(`${this.API_URI}api/dynamics/length/${id}`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error has occurred', error.error);
    } else {
      console.error('Server return status code', error.status, error.error);
    }
    return throwError(
      () => new Error('Something went wrong!, please try again')
    );
  }
}
