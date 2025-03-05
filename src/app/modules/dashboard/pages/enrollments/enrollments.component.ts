import { Component, Input, input, OnInit } from '@angular/core';
import { Course } from '../courses/models';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../../../core/services/courses.service';
import { Router } from '@angular/router';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { Enrollment } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../core/services/students.service';
import { Store } from '@ngrx/store';
import { selectEnrollmentError, selectEnrollments } from './store/enrollments.selectors';
import { forkJoin, Observable } from 'rxjs';
import { EnrollmentsActions } from './store/enrollments.actions';
import { Student } from '../students/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
enrollments$: Observable<Enrollment[]>
error$: Observable<unknown>
isAdmin$: Observable<boolean>
enrollmentForm: FormGroup
  @Input()
  inscripciones: Enrollment[] = [];
  courses: Course[] = [];
  students: Student[] = []
  isLoading: boolean = true;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private router: Router,
    private enrollmentsService: EnrollmentsService,
    private MatDialog:MatDialog,
    private store: Store,
    private authService: AuthService
    
  ) { 
    this.isAdmin$ = this.authService.isAdmin$
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required]
    })
    this.enrollments$ = this.store.select(selectEnrollments)
    this.error$ = this.store.select(selectEnrollmentError)
  }
  ngOnInit(): void {
    this.loadEnrollments();
    this.store.dispatch(EnrollmentsActions.loadEnrollments())
    this.loadStudentsandCourses()
  }

  loadStudentsandCourses():void{
    forkJoin([
      this.coursesService.getCourses(),
      this.studentsService.getStudents()
    ]).subscribe({
      next: ([courses,students])=>{
        this.courses = courses
        this.students = students
      }
    })
  }
  loadEnrollments() {
    this.isLoading = true;
    this.enrollmentsService.getEnrollments().subscribe({
      next: (data) => {
        this.inscripciones = data;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  onSubmit():void{
    if(this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched()
    }
    else {
      this.store.dispatch(EnrollmentsActions.createEnrollment({data: this.enrollmentForm.value}))
    }
  }
  handleUpdateEnrollment(data: Enrollment[]): void{
    this.inscripciones = [...data]
  }

  onDelete(id:string): void {
    if(confirm('Estas Seguro')){
      this.enrollmentsService.deleteEnrollmentById(id).subscribe({
        next:(data)=> this.handleUpdateEnrollment(data),
        error: (err)=> this.isLoading = false,
        complete: ()=>this.isLoading = false 
      })
    }
    
  }
}
