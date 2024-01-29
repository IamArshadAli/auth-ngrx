import { createReducer } from "@ngrx/store";
import { userState } from "./User.state";

const _userReducer = createReducer(userState)

export function UserReducer(state: any, action: any) {}