import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import {
  concatMap,
  filter,
  first,
  forkJoin,
  interval,
  map,
  Subscription,
  take,
  tap,
} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [];
  editingStudentId: string | null = null;

  isLoading = false;
  hasError = false;

  studentsSubscription?: Subscription;


  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {}

  ngOnDestroy(): void {
    // Este ciclo de vida se llama cuando el componente se destruye (sale de la vista);
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    
    this.loadStudentsFromObs();
    
  }

  

  loadStudentsFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
      .getStudentsObservable()
      .pipe(take(3))
      .subscribe({
        next: (students) => {
          console.log('Recibimos datos: ', students);
          this.students = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.hasError = true;
          this.isLoading = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      });
  }


  onDelete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.students = this.students.filter((el) => el.id != id);
        Swal.fire('Eliminado', 'El estudiante ha sido eliminado correctamente.', 'success');
      }
    });
  }
  

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentDialogFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...valorFormulario }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            this.students = [
              ...this.students,
              {
                id: generateRandomString(6),
                ...valorFormulario,
              },
            ];
          }
        },
      });
  }
}
