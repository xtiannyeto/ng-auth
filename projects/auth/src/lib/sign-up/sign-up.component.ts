import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auth } from '../auth.enum';
import { AuthService } from '../auth.service';
import { AuthValidator } from '../auth.validator';

@Component({
  selector: 'otokton-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  error: any;
  hidePassword = true;
  hideRepeat = true;
  url: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _auth: AuthService
  ) {
    this.url = data.url;
  }

  ngOnInit() {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.error = undefined;
    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      passwords: this._fb.group(
        {
          password: [
            '',
            Validators.compose([
              Validators.required,
              AuthValidator.passworFormat
            ])
          ],
          repeat: ['', Validators.compose([Validators.required])]
        },
        { validator: AuthValidator.areEqual }
      )
    });
  }

  getErrorMessageEmail() {
    return this.signUpForm.get('email').hasError('required')
      ? 'You must enter an email'
      : this.signUpForm.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getErrorMessagePassword() {
    return this.signUpForm
      .get('passwords')
      .get('password')
      .hasError('required')
      ? 'You must enter a password'
      : this.signUpForm
          .get('passwords')
          .get('password')
          .hasError('format')
      ? 'min 8 characters, 1 Uppercase, 1 Number, 1 Special Character'
      : '';
  }

  signup() {
    this._auth
      .signUp(
        {
          username: this.signUpForm.get('username').value,
          email: this.signUpForm.get('email').value,
          password: this.signUpForm.get('passwords').get('password').value,
          firstname: '',
          lastname: ''
        },
        this.url
      )
      .subscribe(response => {
        if (!response) {
          return;
        }
        this._dialogRef.close(response);
      });
  }

  signIn() {
    this._dialogRef.close(Auth.SIGN_IN);
  }
}
