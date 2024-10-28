import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, window } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { CreateUserRequest } from '../Models/create-user-request';
import { LoginRequest } from '../Models/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLoggedSubject: BehaviorSubject<boolean>;

  constructor(private userService: UserService, private router: Router) {
    const loggedIn = !!localStorage.getItem('token');
    this.isLoggedSubject = new BehaviorSubject<boolean>(loggedIn);

  }

  Register(newUser: CreateUserRequest) {
    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('User Created successfully: ', response);
        this.Login(newUser)
        // localStorage.setItem('token', response.Data);
      },
      error: (err) => {
        console.error('Error Creating User: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })
  }

  // Expose isLoggedSubject as an Observable
  get isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  // Utility to directly get the value of the login status
  get isUserLogged(): boolean {
    return this.isLoggedSubject.value;
  }

  private setLoggedIn(value: boolean) {
    this.isLoggedSubject.next(value);
  }

  Logout() {
    let token = localStorage.getItem('token')
    if (this.isUserLogged && token) {
      this.userService.logout(token).subscribe({
        next: (response) => {
          console.log('Logged out successfully: ', response);
          localStorage.removeItem('token');
          this.setLoggedIn(false);  // Notify subscribers of the logout status change
          this.router.navigate(['/Home']);
        },
        error: (err) => {
          console.error('Error Logging out: ', err);
          if (err.error && err.error.errors) {
            console.error('Validation errors: ', err.error.errors);
          }
        }
      })

    }
    else {
      console.log('No user logged in')
    }
  }

  Login(user: LoginRequest) {
    this.userService.login(user).subscribe({
      next: (response) => {
        console.log('Logged in successfully: ', response);
        localStorage.setItem('token', response.Data);
        this.setLoggedIn(true);  // Notify subscribers of the login status change
        this.router.navigate(['/Home'])
      },
      error: (err) => {
        console.error('Error Logging in: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })

  }

}
