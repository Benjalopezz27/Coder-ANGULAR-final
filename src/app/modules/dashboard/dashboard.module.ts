import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, NavMenuComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    StudentsModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
