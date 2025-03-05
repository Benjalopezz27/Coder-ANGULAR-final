import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';
import { UsersDetailsComponent } from './pages/users-details/users-details.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UserDialogFormComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
