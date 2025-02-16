import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentDetailsComponent } from './pages/enrollment-details/enrollment-details.component';
import { EnrollmentDialogFormComponent } from './components/enrollment-dialog-form/enrollment-dialog-form.component';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentDetailsComponent,
    EnrollmentDialogFormComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule
  ]
})
export class EnrollmentsModule { }
