import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      username: [''],
      password: [''],
    });
  }
  ngOnInit(): void {}

  signup(formSignUp: NgForm) {
    this.authService.signup(formSignUp.value);
    console.log(formSignUp.value);
  }
}
