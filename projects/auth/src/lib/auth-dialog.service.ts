import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  signInDialogEmitter: EventEmitter<any> = new EventEmitter<any>();
  signUpDialogEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private zone: NgZone, private dialog: MatDialog) {}

  openDialogSignIn(url: string) {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '500px',
      data: { url }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!(data === undefined)) {
        this.signInDialogEmitter.emit(data);
      }
    });
  }

  openDialogSignUp(url: string) {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '500px',
      data: { url }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.signUpDialogEmitter.emit(data);
    });
  }
}
