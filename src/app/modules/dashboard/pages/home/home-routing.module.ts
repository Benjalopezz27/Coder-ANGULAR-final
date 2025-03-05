import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UsersComponent } from '../users/users.component';
import { StudentsComponent } from '../students/students.component';
import { CoursesComponent } from '../courses/courses.component';

/**
 * Aqui partimos de la ruta base "/dashboard/home"
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'users', component: UsersComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
