import { Component, Inject } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

interface CourseFormDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-form-dialog',
  standalone: false,
  
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})
export class CourseFormDialogComponent {
  

  courseForm: FormGroup;
  constructor(private MatDialogRef:MatDialogRef<CourseFormDialogComponent>,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data?: CourseFormDialogData
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]]
      
    });
    if(!!data && !!data.editingCourse){
      this.courseForm.patchValue(data.editingCourse)
    }
  }

onConfirm(): void {
  if (this.courseForm.invalid) {
    this.courseForm.markAllAsTouched();
  } else {
    this.MatDialogRef.close(this.courseForm.value);
    
  }
  
}
}
