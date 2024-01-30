import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user.service';
import {
  beginLogin,
  beginRegister,
  duplicateUser,
  duplicateUserSuccess,
  fetchMenu,
  fetchMenuSuccess,
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
      switchMap((action) => {
        return this.userService.loginUser(action.userCredentials).pipe(
          switchMap((data) => {
            if (!data.length)
              return of(
                showAlert({
                  message: 'Login Failed: Invalid Credentials',
                  resultType: 'fail',
                })
              );
            const _userData = data[0];
            if (_userData.status === false)
              return of(
                showAlert({
                  message: 'InActive User',
                  resultType: 'fail',
                })
              );
            this.userService.setUserDataToLocalStorage(_userData);
            this.route.navigate(['']);
            return of(
              fetchMenu({ userRole: _userData.role }),
              showAlert({ message: 'Login Success', resultType: 'pass' })
            );
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

  _loadMenuByRole = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMenu),
      exhaustMap((action) => {
        return this.userService.getMenuByUserRole(action.userRole).pipe(
          map((data) => {
            return fetchMenuSuccess({ menuList: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to fetch Menu List',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
