import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.reducer';

export const selectEnrollmentsState = createFeatureSelector<fromEnrollments.State>(
  fromEnrollments.enrollmentsFeatureKey
);
export const selectEnrollments = createSelector(selectEnrollmentsState, (state)=>state.enrollments)

export const selectEnrollmentError = createSelector( selectEnrollmentsState, (state)=> state.error)