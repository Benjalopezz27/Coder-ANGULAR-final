import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

/**
 * Aqui estamos posicionados en la ruta base "/dashboard"
 */

const routes: Routes = [
  {
    /**
     * Si mi intencion es definir la ruta "/dashboard/home"
     */
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
