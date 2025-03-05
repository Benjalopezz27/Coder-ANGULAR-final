import { createReducer, on } from "@ngrx/store";
import { User } from "../../modules/dashboard/pages/users/models";
import { AuthActions } from "./auth.action";

export const authFeatureKey = 'auth';

export interface AuthState {
    auhtUser: User | null
}
const initialState: AuthState = {
    auhtUser: null
}

export const authReducer = createReducer(initialState,
    on(AuthActions.setAuthUser, (state, action) => {
        return {...state, auhtUser: action.user}}
    ),
    on(AuthActions.unsetAuthUser, (state)=>{
        return {
            ...state,
            auhtUser:null
        }
    })
)
