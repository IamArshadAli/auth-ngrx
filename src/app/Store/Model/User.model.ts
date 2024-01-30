import { EntityState } from "@ngrx/entity";


export interface Users {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    gender: string;
    status: boolean;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserInfo {
    username: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
}

export interface Roles {
    code: string;
    name: string;
}

export interface Menus {
    code: string;
    name: string;
}

export interface RoleAccess {
    code: string;
    menu: string;
}

export interface UserModel extends EntityState<Users> {
    isDuplicate: boolean;
    menuList: RoleAccess[];
}
