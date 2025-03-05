import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './models/index';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';


@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[]= []
  isLoading = false
  isAdmin$: Observable<boolean>
    constructor(private authService: AuthService,private matDialog:MatDialog,private usersService: UsersService, private httpClient: HttpClient, private store: Store){
      this.isAdmin$ = this.authService.isAdmin$
    }
  handleUserUpdate(data:User[]):void{
    this.users = [...data]
  }
  updateUser(id: string, data: {name: string, email: string, role: string, password: string}){
    this.usersService.updateUserById(id,data).subscribe({
      next: (data)=>{this.handleUserUpdate(data)},
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }
  addUser(data: {name: string, email:string, role: string, password: string}): void{
    this.usersService.addUser(data).subscribe({
      next: (data)=>{this.handleUserUpdate(data)},
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }
  openFormDialog(editingUser?:User):void{
    this.matDialog.open(UserDialogFormComponent,{
      data: {editingUser}
    })
    .afterClosed().subscribe({
      next: (data)=>{
        if(!!data){
          if(!!editingUser){
            this.updateUser(editingUser.id, data)
          } else {
            this.addUser(data)
          }
        }
      }
    })
  }
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.handleUserUpdate(data)
      },
      error:()=>{
        this.isLoading = false
      },
      complete:()=>{
        this.isLoading = false
      }  }
    )
  }

onDelete(id:string){
  this.usersService.deleteUserById(id).subscribe({
    next: (data)=>{
      this.handleUserUpdate(data)
    },
    error: (err)=>{
      this.isLoading= false
    },
    complete: ()=>{
      this.isLoading=false
    }
  })
}
}
