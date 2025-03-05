import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer, AuthState } from "./auth/auth.reducer";

export interface RootState {
    [authFeatureKey]: AuthState
}

export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureKey]: authReducer

}
