import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'
import { LoginRequest } from '../Models/login-request';
import { CreateUserRequest } from '../Models/create-user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain' // Specify the expected response type
    })
  };

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginRequest): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.APIUrl}/User/Login`, JSON.stringify(credentials), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createUser(newUser: CreateUserRequest): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.APIUrl}/User/POST`, JSON.stringify(newUser), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'token': token,
      }),
    };

    return this.httpClient.post<any>(`${environment.APIUrl}/User/Logout`, '', httpOptions).pipe(
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
