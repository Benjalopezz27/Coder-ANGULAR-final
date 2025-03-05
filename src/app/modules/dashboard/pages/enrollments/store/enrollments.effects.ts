import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EnrollmentsEffects {
  private actions$= inject(Actions)

  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() => this.enrollmentService.getEnrollments().pipe(
        map((res)=> EnrollmentsActions.loadEnrollmentsSuccess({data: res}) ),
        catchError((error)=>  of(EnrollmentsActions.loadEnrollmentsFailure({error})))
      
      ))
    );
  });

  constructor( private enrollmentService: EnrollmentsService) {}

  createEnrollment$ = createEffect(()=>{
    return this.actions$.pipe(

      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action) => this.enrollmentService.createEnrollment(action.data).pipe(
        map((enrollment)=> EnrollmentsActions.createEnrollmentSuccess( {data:enrollment }) ),
        catchError((error)=>  of(EnrollmentsActions.createEnrollmentFailure({error})))
      
      ))
    )
  })
}
