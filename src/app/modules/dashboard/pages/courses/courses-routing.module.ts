import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: ':id',
    component: CourseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
