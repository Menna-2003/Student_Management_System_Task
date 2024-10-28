import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { MatchPassword } from '../../customValidation/MatchPassword';
import { CreateUserRequest } from '../../Models/create-user-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  userRegisterForm: FormGroup;

  constructor(private UserAuth: UserAuthService, private formBuilder: FormBuilder, private router: Router) {


    this.userRegisterForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: MatchPassword() });

  }

  ngOnInit() { }

  Submit() {
    let newUser: CreateUserRequest = {
      Name: this.Username?.value,
      UserName: this.Email?.value,
      Password: this.Password?.value,
    }
    this.UserAuth.Register(newUser)
    this.router.navigate(['/Home']);
  }

  get Username() {
    return this.userRegisterForm.get('username');
  }
  get Email() {
    return this.userRegisterForm.get('email');
  }
  get PhoneNumber() {
    return this.userRegisterForm.get('phoneNumber');
  }
  get Password() {
    return this.userRegisterForm.get('password');
  }
  get ConfirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

}
