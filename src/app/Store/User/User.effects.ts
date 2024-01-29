import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user.service';
import { beginRegister } from './User.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
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
}
