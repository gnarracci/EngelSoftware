import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Descriptem } from 'src/app/interfaces/descriptem';
import { Fields } from 'src/app/interfaces/fields';
import { Template } from 'src/app/interfaces/template';
import { Types } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class DescripTempService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://3j5c3z51-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  saveTemp(data: Descriptem): Observable<Descriptem> {
    return this.http
      .post<Descriptem>(`${this.API_URI}api/statics`, data)
      .pipe(catchError(this.handlerError));
  }

  getAllDatatypes(): Observable<Types> {
    return this.http
      .get<Types>(`${this.API_URI}api/types`)
      .pipe(catchError(this.handlerError));
  }

  getAllTemplates(): Observable<Descriptem> {
    return this.http
      .get<Descriptem>(`${this.API_URI}api/statics`)
      .pipe(catchError(this.handlerError));
  }

  getTemplate(id: string): Observable<Descriptem> {
    return this.http
      .get<Descriptem>(`${this.API_URI}api/statics/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getNameTemplate(id: string): Observable<Descriptem> {
    return this.http
      .get<Descriptem>(`${this.API_URI}api/statics/nt/${id}`)
      .pipe(catchError(this.handlerError));
  }

  updateTemplate(id: string, updatedTemplate: Descriptem): Observable<Descriptem> {
    return this.http
      .put<Descriptem>(
        `${this.API_URI}api/statics/update/${id}`,
        updatedTemplate
      )
      .pipe(catchError(this.handlerError));
  }

  deleteTemplate(id: string): Observable<Descriptem> {
    return this.http
      .delete(`${this.API_URI}api/statics/${id}`)
      .pipe(catchError(this.handlerError));
  }

  // Add Folder
  addFolder(id: string, folder: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/statics/${id}`, folder)
      .pipe(catchError(this.handlerError));
  }

  deleteFolder(id: string): Observable<Fields> {
    return this.http
      .delete<Fields>(`${this.API_URI}api/statics/deletefolder/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getFolders(id: string): Observable<Fields> {
    return this.http
      .get<Fields>(`${this.API_URI}api/statics/folders/${id}`)
      .pipe(catchError(this.handlerError));
  }
  // Add Field under Folder
  addFieldsWF(id: string, subfield: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/statics/subfield/${id}`, subfield)
      .pipe(catchError(this.handlerError));
  }
  // Add Field under name Template directly
  addField(id: string, field: Fields): Observable<Fields> {
    return this.http
      .put<Fields>(`${this.API_URI}api/statics/nf/${id}`, field)
      .pipe(catchError(this.handlerError));
  }

  // Get Template Folders
  getLength(id: string): Observable<Fields> {
    return this.http
      .get<Fields>(`${this.API_URI}api/statics/length/${id}`)
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
