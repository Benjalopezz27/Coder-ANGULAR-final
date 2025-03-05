import { Component, Inject, InjectionToken } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-dialog-form',
  standalone: false,
  
  templateUrl: './user-dialog-form.component.html',
  styleUrl: './user-dialog-form.component.scss'
})
export class UserDialogFormComponent {
  isEditing = false
  roleValidator(allowedRoles: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      
      if (value && !allowedRoles.includes(value)) {
        return { 'roleInvalid': { value: control.value } };
      }
      return null;
    };
  }
userForm: FormGroup

constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UserDialogFormComponent>,
   @Inject(MAT_DIALOG_DATA) private data?: User
){
  this.userForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    role: [null, [Validators.required, this.roleValidator(['ADMIN', 'EMPLOYEE'])]],
    password: [null ,[Validators.required, Validators.min(5)]]
  })
  if(!!data){
    this.isEditing = true
    this.userForm.patchValue({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password
    })
  }
}
onSubmit(){
  if(this.userForm.invalid){
    this.userForm.markAllAsTouched()
  } else {
    this.matDialogRef.close(this.userForm.value)
    this.userForm.reset()
  }
}
}

