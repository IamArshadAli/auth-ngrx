import { createAction, props } from '@ngrx/store';
import { UserCredentials, Users } from '../Model/User.model';

export const BEGIN_REGISTER = '[auth] begin register';
export const BEGIN_LOGIN = '[auth] begin login';
export const DUPLICATE_USER = '[auth] duplicate user';
export const DUPLICATE_USER_SUCCESS = '[auth] duplicate user success';

export const beginRegister = createAction(
  BEGIN_REGISTER,
  props<{ userData: Users }>()
);

export const beginLogin = createAction(
  BEGIN_LOGIN,
  props<{ userCredentials: UserCredentials }>()
);

export const duplicateUser = createAction(
  DUPLICATE_USER,
  props<{ username: string }>()
);

export const duplicateUserSuccess = createAction(
  DUPLICATE_USER_SUCCESS,
  props<{ isDuplicate: boolean }>()
);

// https://github.com/nihira2020/angularngrxcrud/blob/master/src/app/app.module.ts
