import { Injectable } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

import { HttpClient } from '@angular/common/http';
import { concatMap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  constructor(private httpClient: HttpClient){}
  updateStudentById(id: string, data:{ name: string } ): Observable<Student[]>{
      return this.httpClient.patch<Student>(`${environment.baseApiUrl}/students/${id}`, data).pipe(concatMap(() => this.getStudents()));
          
        }
  addStudent(payload: {name: string}): Observable<Student[]>{
      return this.httpClient.post<Student[]>(`${environment.baseApiUrl}/students`, payload).pipe(concatMap(()=>this.getStudents()))
  }
  getStudents(): Observable<Student[]> {
      return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`)
  }
  deleteStudentByID(id:string): Observable<Student[]>{
       return this.httpClient.delete(`${environment.baseApiUrl}/students/${id}`).pipe(concatMap(() => this.getStudents()));
  }
  getStudentDetails(id:string): Observable<Student>{
  
  return this.httpClient.get<Student>(`${environment.baseApiUrl}/students/${id}?_embed=courses`)
  }

  }


