import { Component, Inject } from '@angular/core';
import { CourseFormDialogComponent } from '../../../courses/components/course-form-dialog/course-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from '../../models/index';
import { EnrollmentsService } from '../../../../../../core/services/enrollments.service';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { StudentsService } from '../../../../../../core/services/students.service';

@Component({
  selector: 'app-enrollment-dialog-form',
  standalone: false,
  
  templateUrl: './enrollment-dialog-form.component.html',
  styleUrl: './enrollment-dialog-form.component.scss'
})
export class EnrollmentDialogFormComponent {
  
  enrollmentForm: FormGroup
  constructor(private studentsService : StudentsService, private coursesService : CoursesService, private enrollmentsService: EnrollmentsService,private MatDialogRef:MatDialogRef<EnrollmentDialogFormComponent>,private fb: FormBuilder,
    ) {
      this.enrollmentForm = this.fb.group({
        studentId: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
        
      });
      
}

onConfirm(): void {
  if (this.enrollmentForm.invalid) {
    this.enrollmentForm.markAllAsTouched();
  } else {
    this.MatDialogRef.close(this.enrollmentForm.value);
    
  }
  
}
}
