import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey)


export const SelectAuthUserEmail = createSelector(selectAuthState, (state) => state.auhtUser?.email)
export const selectAuthUser = createSelector(selectAuthState,(state)=>state.auhtUser)