import { Component, OnInit, signal } from '@angular/core';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-details',
  standalone: false,
  
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  readonly panelOpenState = signal(false);
  course: Course | null = null
  errorMessage= '';
  constructor(private coursesService: CoursesService, private activatedRoute: ActivatedRoute){
  }
  isLoading = false
  ngOnInit(): void {
    this.isLoading = true
    this.coursesService.getCourseDetails(this.activatedRoute.snapshot.params['id']).subscribe( {next:(course)=>{
      this.course=course
      this.errorMessage = ''
    },
  complete:()=>{this.isLoading = false},
  error:(err)=>{this.isLoading = false
    if(err instanceof HttpErrorResponse){
      if(err.status === 404){
        this.errorMessage = 'El curso no fue encontrado'
      }
    }
  }
    })
  }
}
