import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly _snackBar: MatSnackBar
  ) {}

  signIn(user, url: string): Observable<any> {
    return this.httpClient.post(url, user).pipe(
      tap(response => {
        if (!response) {
          return;
        }
        this._snackBar.open('Authentification', 'SUCCESS', {
          duration: 2000
        });
      }),
      catchError(error => {
        this._snackBar.open(error, 'Failed', {
          duration: 2000
        });
        return of(undefined);
      })
    );
  }

  signUp(user, url): Observable<any> {
    return this.httpClient.post(url, user).pipe(
      tap(response => {
        if (!response) {
          return;
        }
        this._snackBar.open('Sign up', 'SUCCESS', {
          duration: 2000
        });
      }),
      catchError(error => {
        this._snackBar.open(error, 'Failed', {
          duration: 2000
        });
        return of(undefined);
      })
    );
  }

  logout(url: string): void {
    this.httpClient.post(url, {}).subscribe(response => {
      if (!response) {
        return;
      }
      this._snackBar.open('Sign up', 'SUCCESS', {
        duration: 2000
      });
    });
  }
}
