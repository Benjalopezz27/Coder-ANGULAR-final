import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-users-table',
  standalone: false,
  
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  @Input()
dataSource: User[]= []
displayedColumns: string[] = ['id','name','email','role','actions'];

 @Output()
    delete = new EventEmitter<string>()
  
  @Output()
    edit = new EventEmitter<User>()

 isAdmin$: Observable<boolean>
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.isAdmin$
      
    }
}
