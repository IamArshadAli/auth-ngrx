import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user.service';
import {
  beginLogin,
  beginRegister,
  duplicateUser,
  duplicateUserSuccess,
} from './User.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../Common/App.action';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private route: Router
  ) {}

  _userRegister = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      exhaustMap((action) => {
        return this.userService.registerUser(action.userData).pipe(
          map(() => {
            this.route.navigate(['login']);
            return showAlert({
              message: 'Registered Successfully!',
              resultType: 'pass',
            });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Registration Failed due to: ' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _userLogin = createEffect(() =>
    this.action$.pipe(
      ofType(beginLogin),
      exhaustMap((action) => {
        return this.userService.loginUser(action.userCredentials).pipe(
          map((data) => {
            if (!data.length)
              return showAlert({
                message: 'Login Failed: Invalid Credentials',
                resultType: 'fail',
              });
            const _userData = data[0];
            if (_userData.status === false)
              return showAlert({
                message: 'InActive User',
                resultType: 'fail',
              });
            this.userService.setUserDataToLocalStorage(_userData);
            this.route.navigate(['']);
            return showAlert({ message: 'Login Success', resultType: 'pass' });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Login Failed due to: ' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _duplicateUserName = createEffect(() =>
    this.action$.pipe(
      ofType(duplicateUser),
      switchMap((action) => {
        return this.userService.duplicateUserName(action.username).pipe(
          switchMap((data) => {
            if (!data.length)
              return of(duplicateUserSuccess({ isDuplicate: false }));

            return of(
              duplicateUserSuccess({ isDuplicate: true }),
              showAlert({
                message: 'Username Already Exists!',
                resultType: 'fail',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Registration Failed due to: ' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
