import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { Observable, concatMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) { }
  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(`${environment.baseApiUrl}/enrollments`, data)
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${environment.baseApiUrl}/enrollments`)

}
getEnrollmentDetails(id:string): Observable<Enrollment> {
  return this.httpClient.get<Enrollment>(`${environment.baseApiUrl}/enrollments/${id}`)

}
deleteEnrollmentById(id:string): Observable<Enrollment[]>{
  return this.httpClient.delete(`${environment.baseApiUrl}/enrollments/${id}`).pipe(concatMap(()=> this.getEnrollments()))
} 
}