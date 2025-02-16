import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentDetailsComponent } from './pages/enrollment-details/enrollment-details.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentsComponent
},
{
  path: ':id',
  component: EnrollmentDetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
