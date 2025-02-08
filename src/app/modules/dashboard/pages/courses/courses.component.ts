import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: false,
  
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {


isLoading = false
Courses: Course[]=[]
constructor(
  private courseService: CoursesService,
  private MatDialog:MatDialog) {}

handleCoursesUpdate(data:Course[]):void{
  this.Courses = [...data]
}

openFormDialog(editingCourse?:Course):void{
  if(!this.MatDialog){console.log("se va a editar", editingCourse)}
  this.MatDialog.open(CourseFormDialogComponent, {
    data: {editingCourse}
  })

  .afterClosed().subscribe({
    next:(data)=>{
      if(!!data){
        if(!!editingCourse){
          this.updateCourse(editingCourse.id, data)
      } else {
        this.addCourse(data)
      }
    }}   
  })
}
updateCourse(id: string, data: { name: string }) {
  this.isLoading = true;
  this.courseService.updateCourseById(id, data).subscribe({
    next: (data) => this.handleCoursesUpdate(data),
    error: (err) => (this.isLoading = false),
    complete: () => (this.isLoading = false),
  });
}

addCourse(data: {name:string}):void{
  this.isLoading = true
  this.courseService.addCourse(data).subscribe({
    next:(data)=>{this.handleCoursesUpdate(data)},
    error:()=>{this.isLoading = false},
    complete:()=>{this.isLoading = false}
  })
}
  ngOnInit(): void {
    this.isLoading = true
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data)
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
        this.courseService.deleteCourseByID(id).subscribe({
          next: (data) => {
            this.handleCoursesUpdate(data);
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
