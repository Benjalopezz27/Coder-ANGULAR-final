import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  enrollments: Enrollment[],
  isLoading: boolean
  error: unknown
}

export const initialState: State = {
  enrollments: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, state => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state,action)=> {
    return {
      ...state,
      enrollments: action.data,
      isLoading: false,
      error: null
    }
  } ),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state,action)=>{
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),
  on(EnrollmentsActions.createEnrollment, (state)=>{
    return {
      ...state,
      isLoading: true
    }
  }),
  on(EnrollmentsActions.createEnrollmentSuccess, (state,action)=>{
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data]
    }
  }),
  on(EnrollmentsActions.createEnrollmentFailure, (state,action)=>{
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),
  on(EnrollmentsActions.deleteEnrollment, (state, { id }) => ({
    ...state,
    enrollments: state.enrollments.filter((enrollment) => enrollment.id !== id),
  })),


);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

