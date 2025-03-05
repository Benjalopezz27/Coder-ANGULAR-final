import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment } from '../models';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{data: Enrollment[]}>(),
    'Load Enrollments Failure': props<{error: unknown}>(),
    

    'Create Enrollment': props<{data: Omit<Enrollment, 'id'>}>(),
    'Create Enrollment Success': props<{data: Enrollment}>(),
    'Create Enrollment Failure': props<{error: unknown}>(),
    
    'Delete Enrollment': props<{id: string}>(),
    'Delete Enrollment Success': props<{data: Enrollment[]}>(),
    'Delete Enrollment Failure': props<{error: unknown}>(),
    
  }  
  })
    
  
  

