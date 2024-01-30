import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../Model/User.model";

const getUserState = createFeatureSelector<UserModel>('userReducer')

export const isDuplicateUser = createSelector(getUserState, (state)=> state.isDuplicate)

export const getMenuByRole = createSelector(getUserState, (state)=> state.menuList)