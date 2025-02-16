import { Injectable } from "@angular/core";
import { concat, concatMap, delay, Observable, of } from "rxjs";
import { Course } from "../../modules/dashboard/pages/courses/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";



@Injectable({ providedIn: "root"})
export class CoursesService {

constructor(private httpClient: HttpClient){}

updateCourseById(id: string, data:{ name: string } ): Observable<Course[]>{
    return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data).pipe(concatMap(() => this.getCourses()));
        
      }
addCourse(payload: {name: string}): Observable<Course[]>{
    return this.httpClient.post<Course[]>(`${environment.baseApiUrl}/courses`, payload).pipe(concatMap(()=>this.getCourses()))
}
getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`)
}
deleteCourseByID(id:string): Observable<Course[]>{
     return this.httpClient.delete(`${environment.baseApiUrl}/courses/${id}`).pipe(concatMap(() => this.getCourses()));
}
getCourseDetails(id:string): Observable<Course>{

return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${id}?_embed=teachers&_embed=students`)
}
}