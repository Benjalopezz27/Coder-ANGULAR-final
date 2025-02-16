import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) { }
  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(`${environment.baseApiUrl}/enrollments`, enrollment)
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${environment.baseApiUrl}/enrollments`)

}
getEnrollmentsByFilters(courseId:string): Observable<Enrollment[]> {
  return this.httpClient.get<Enrollment[]>(`${environment.baseApiUrl}/enrollments?courseId=${courseId}`)
}
changeEnrollmentStatus(id: string, status: string): Observable<Enrollment> {
  return this.httpClient.patch<Enrollment>(`${environment.baseApiUrl}/enrollments/${id}`, { status: status });
}

getEnrollmentDetails(id:string): Observable<Enrollment> {
  return this.httpClient.get<Enrollment>(`${environment.baseApiUrl}/enrollments/${id}`)

}
}