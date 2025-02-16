import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {

isLoading = false
students: Student[]=[]
isAdmin$: Observable<boolean>

constructor(
  private studentsService: StudentsService,
  private MatDialog:MatDialog,
  private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$
  }

handlestudentUpdate(data:Student[]):void{
  this.students = [...data]
}

openFormDialog(editingStudent?:Student):void{
  if(!this.MatDialog){console.log("se va a editar", editingStudent)}
  this.MatDialog.open(StudentDialogFormComponent, {
    data: {editingStudent}
  })

  .afterClosed().subscribe({
    next:(data)=>{
      if(!!data){
        if(!!editingStudent){
          this.updateStudent(editingStudent.id, data)
      } else {
        this.addStudent(data)
      }
    }}   
  })
}
updateStudent(id: string, data: { name: string }) {
  this.isLoading = true;
  this.studentsService.updateStudentById(id, data).subscribe({
    next: (data) => this.handlestudentUpdate(data),
    error: (err) => (this.isLoading = false),
    complete: () => (this.isLoading = false),
  });
}

addStudent(data: {name:string}):void{
  this.isLoading = true
  this.studentsService.addStudent(data).subscribe({
    next:(data)=>{this.handlestudentUpdate(data)},
    error:()=>{this.isLoading = false},
    complete:()=>{this.isLoading = false}
  })
}
  ngOnInit(): void {
    this.isLoading = true
    this.studentsService.getStudents().subscribe({
      next: (data) => {
        this.handlestudentUpdate(data)
      },
      error:()=>{
        this.isLoading = false
      },
      complete:()=>{
        this.isLoading = false
      }  }
    )
  }

  onDelete(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el curso de manera permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.studentsService.deleteStudentByID(id).subscribe({
          next: (data) => {
            this.handlestudentUpdate(data);
            Swal.fire('Eliminado', 'El curso ha sido eliminado correctamente.', 'success');
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire('Error', 'Hubo un problema al eliminar el curso.', 'error');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    });
  }
  
  
}
