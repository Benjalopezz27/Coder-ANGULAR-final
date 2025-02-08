import { Injectable } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../shared/utils';
import { delay, interval, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  

  getStudentsObservable(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      const students = [
        {
          id: generateRandomString(6),
          name: 'Juan',
          lastName: 'Perez',
        },
        {
          id: generateRandomString(6),
          name: 'Pedro',
          lastName: 'Rodriguez',
        },
      ];

      setInterval(() => {
        
        subscriber.next(students);

        
        if (students.length === 10) {
          subscriber.complete(); 
        }
      }, 1000);
    });
  }

}
