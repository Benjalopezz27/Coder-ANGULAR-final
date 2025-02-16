import { Component, OnInit, signal } from '@angular/core';
import { EnrollmentsService } from '../../../../../../core/services/enrollments.service';
import { ActivatedRoute } from '@angular/router';
import { Enrollment } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enrollment-details',
  standalone: false,
  
  templateUrl: './enrollment-details.component.html',
  styleUrl: './enrollment-details.component.scss'
})
export class EnrollmentDetailsComponent implements OnInit {
  readonly panelOpenState = signal(false);
enrollment: Enrollment | null = null

constructor(private enrollmentsService: EnrollmentsService, private activatedRoute: ActivatedRoute){}
isLoading = false
  ngOnInit(): void {
    this.enrollmentsService.getEnrollmentDetails(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (data) => {
        this.isLoading = true
        this.enrollment = data
      },
      complete: () => {
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
        if(err instanceof HttpErrorResponse){
                      if(err.status === 404){
                        console.log(err)
                      }
                    }
      }
      })
    };
  }



