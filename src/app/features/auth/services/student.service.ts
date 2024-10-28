import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'
import { IApiResponse } from '../Models/iapi-response';
import { PostIStudent } from '../Models/post-istudent';
import { PutIStudent } from '../Models/put-istudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain' // Specify the expected response type
    })
  };

  constructor(private httpClient: HttpClient) { }

  GetAllStudents(): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(`${environment.APIUrl}/Student/Get`)
      .pipe(
        catchError(this.handleError)
      );
  }

  CreateStudent(newStudent: PostIStudent): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.APIUrl}/Student/Post`,
      JSON.stringify(newStudent),
      this.httpOptions
    );
  }

  EditStudent(student: PutIStudent): Observable<any> {
    return this.httpClient.put<any>(`${environment.APIUrl}/Student/PUT`, student, {
      headers: this.httpOptions.headers,
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    );
  }

  GetEditableByID(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIUrl}/Student/GetEditableByID?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  DeleteStudent(id: number) {
    const url = `${environment.APIUrl}/Student/Delete?id=${id}`;
    return this.httpClient.delete(url, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

}
