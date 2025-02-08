import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

// La ruta base actual es "/dashboard/students"

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
  {
    // El path conformado es /dashboard/students/ID
    path: ':id',
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
