import { createReducer, on } from '@ngrx/store';
import { userState } from './User.state';
import { duplicateUserSuccess } from './User.action';

const _userReducer = createReducer(
  userState,
  on(duplicateUserSuccess, (state, action) => {
    return { ...state, isDuplicate: action.isDuplicate };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
