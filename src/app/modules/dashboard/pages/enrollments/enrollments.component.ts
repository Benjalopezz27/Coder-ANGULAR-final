import { Component, Input, input, OnInit } from '@angular/core';
import { Course } from '../courses/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../../../../core/services/courses.service';
import { Router } from '@angular/router';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { Enrollment } from './models';
import { EnrollmentDialogFormComponent } from './components/enrollment-dialog-form/enrollment-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {

  displayedColumns: string[] = ['Course', 'Student','Status', 'Actions'];

  @Input()
  inscripciones: Enrollment[] = [];
  dataSource: Enrollment[] = []; 
  cursos: Course[] = [];
  searchForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  studentId: string | undefined
  courseId: string | undefined;
  constructor(private fb: FormBuilder, private coursesService: CoursesService,
    private router: Router,
    private enrollmentsService: EnrollmentsService,
    private MatDialog:MatDialog,
    
  ) { 
    this.searchForm = this.fb.group({
      courseId: [''] 
    })
  }
  ngOnInit(): void {
    this.loadEnrollments();
    this.loadCourses();
  }

  
  loadEnrollments() {
    this.isLoading = true;
    this.enrollmentsService.getEnrollments().subscribe({
      next: (data) => {
        this.inscripciones = data;
        this.dataSource = this.inscripciones;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
loadCourses() {
  this.isLoading = true;
  this.coursesService.getCourses().subscribe({
    next: (data) => {
      this.cursos = data;
    },
    error: () => {
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    },
  });
}

filter(): void{
  const courseId = this.searchForm.get('courseId')?.value;
  this.enrollmentsService.getEnrollmentsByFilters(courseId).subscribe({
    next: (data) => {
      this.inscripciones = data;
    },
    error: () => {
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
    })
}
changeStatus(enrollment: Enrollment, status: 'active' | 'inactive' | 'pending') {
  this.isLoading = true;
  enrollment.status = status;
  this.enrollmentsService.changeEnrollmentStatus(enrollment.id, enrollment.status).subscribe({
    next: (data) => {
      this.loadEnrollments();
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = `Error al cambiar el estado: ${err.message || err}`
    },
    complete: () => {
      this.isLoading = false;
    },
  });
}

openFormDialog():void{
  this.MatDialog.open(EnrollmentDialogFormComponent, {
    data: {
      
    }
  })
}
}
