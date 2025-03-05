import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './pages/users-details/users-details.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent

},
{
  path: 'id',
  component: UsersDetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
