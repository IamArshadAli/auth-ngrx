import { createAction, props } from '@ngrx/store';
import { Users } from '../Model/User.model';

export const BEGIN_REGISTER = '[auth] begin register';

export const beginRegister = createAction(
  BEGIN_REGISTER,
  props<{ userData: Users }>()
);

// https://github.com/nihira2020/angularngrxcrud/blob/master/src/app/app.module.ts