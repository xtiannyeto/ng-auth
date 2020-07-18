import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthDialogService } from './auth-dialog.service';
import { Auth } from './auth.enum';

export class User {
  name: string;
  email: string;
  passwords: { password: string; repeat: string };
}

@Component({
  selector: 'otokton-auth',
  template: `
    <button mat-button (click)="signIn()">Sign in</button>
    <button mat-button (click)="signUp()">Sign up</button>
  `,
  styles: []
})
export class AuthComponent implements OnInit {
  @Input() signInUrl: string;
  @Input() signUpUrl: string;
  @Output() signInUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() signUpUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private readonly _dialog: AuthDialogService) {}

  ngOnInit(): void {
    this.listenSignUp();
    this.listenSignIn();
  }

  listenSignUp() {
    this._dialog.signUpDialogEmitter.subscribe(data => {
      if (Auth.SIGN_IN !== data) {
        this.signUpUser.emit(data);
      }
      this.signIn();
    });
  }

  listenSignIn() {
    this._dialog.signInDialogEmitter.subscribe(data => {
      if (Auth.SIGN_UP === data) {
        this.signUp();
      } else {
        this.signInUser.emit(data);
      }
    });
  }

  signIn() {
    this._dialog.openDialogSignIn(this.signInUrl);
  }

  signUp() {
    this._dialog.openDialogSignUp(this.signUpUrl);
  }
}
