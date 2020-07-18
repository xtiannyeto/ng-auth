import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auth } from '../auth.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'otokton-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;
  url: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _auth: AuthService
  ) {
    this.url = data.url;
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  getErrorMessage() {
    return this.signInForm.get('email').hasError('required')
      ? 'You must enter a value'
      : this.signInForm.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  signUp() {
    this.dialogRef.close(Auth.SIGN_UP);
  }

  signIn() {
    this._auth.signIn(this.signInForm.value, this.url).subscribe(response => {
      if (!response) {
        return;
      }
      this.dialogRef.close(response);
    });
  }
}
