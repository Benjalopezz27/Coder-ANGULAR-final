import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { Student } from '../../models/index';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-students-table',
  standalone: false,
  
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})
export class StudentsTableComponent {
  @Input()
    
    dataSource: Student[] = []
  
    @Output()
    delete = new EventEmitter<string>()
  
    @Output()
    edit = new EventEmitter<Student>()
  
  
    displayedColumns: string[] = ['id','name','actions'];
  
    isAdmin$: Observable<boolean>
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.isAdmin$
      
    }

  }

