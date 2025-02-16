import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models';
import { StudentsService } from '../../../../../../core/services/students.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-detail',
  standalone: false,

  templateUrl: './student-detail.component.html',
  styles: ``,
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null
  errorMessage = ''

  constructor(private studentService: StudentsService, private route: ActivatedRoute){}
  isLoading = false
  ngOnInit(): void {
    this.isLoading = true
    this.studentService.getStudentDetails(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.student = data
        this.errorMessage = ''
      },
      complete: () => {
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
        if(err instanceof HttpErrorResponse){
              if(err.status === 404){
                this.errorMessage = 'El estudiante no fue encontrado'
              }
            }
      },
      
    })
  }
}
