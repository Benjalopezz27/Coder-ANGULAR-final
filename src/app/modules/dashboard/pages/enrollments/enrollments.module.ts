import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentDetailsComponent } from './pages/enrollment-details/enrollment-details.component';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from './store/enrollments.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from './store/enrollments.reducer';
import { EnrollmentTableComponent } from './components/enrollment-table/enrollment-table.component';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentDetailsComponent,
    EnrollmentTableComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects])
  ]
})
export class EnrollmentsModule { }
