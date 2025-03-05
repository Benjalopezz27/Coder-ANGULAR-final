import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Enrollment } from '../../models/index';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { EnrollmentsService } from '../../../../../../core/services/enrollments.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enrollment-table',
  standalone: false,
  
  templateUrl: './enrollment-table.component.html',
  styleUrl: './enrollment-table.component.scss'
})
export class EnrollmentTableComponent {
  isAdmin$: Observable<boolean>
  constructor(private store: Store, private enrollmentsService: EnrollmentsService, private authService: AuthService){
    this.isAdmin$ = this.authService.isAdmin$
  }
  @Input()

  dataSource: Enrollment[]= [];
  displayedColumns: string[] = ['id', 'course', 'student', 'actions'];
  Enrollments: Enrollment[] = []
  
  @Output()
  delete = new EventEmitter<string>()

}
