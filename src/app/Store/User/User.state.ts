import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../Model/User.model";

export const userAdapter = createEntityAdapter<Users>();

export const userState: UserModel = userAdapter.getInitialState();