import { createReducer, on } from '@ngrx/store';
import { userState } from './User.state';
import { duplicateUserSuccess, fetchMenuSuccess } from './User.action';

const _userReducer = createReducer(
  userState,
  on(duplicateUserSuccess, (state, action) => {
    return { ...state, isDuplicate: action.isDuplicate };
  }),
  on(fetchMenuSuccess, (state, action) => {
    return { ...state, menuList: action.menuList };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
