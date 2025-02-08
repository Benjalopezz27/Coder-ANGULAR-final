import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Course } from "../../modules/dashboard/pages/courses/models";
import { generateRandomString } from "../../shared/utils";

let MY_FAKE_BASADATE: Course[]= [
    {
        id:generateRandomString(6),
        name: 'JavaScript'
    },
    {
        id: generateRandomString(6),
        name: 'Angular'
    },
    {
        id:generateRandomString(6),
        name:'RxJS'
    }
]


@Injectable({ providedIn: "root"})
export class CoursesService {

updateCourseById(id: string, data:{ name: string } ): Observable<Course[]>{
        MY_FAKE_BASADATE = MY_FAKE_BASADATE.map((course) => 
           course.id === id ? {...course, ...data} : course
        )
        return this.getCourses()
        
      }
addCourse(payload: {name: string}): Observable<Course[]>{
    MY_FAKE_BASADATE.push({
        ...payload,
        id: generateRandomString(6)
    })
    return this.getCourses()
}
getCourses(): Observable<Course[]> {
    return of([...MY_FAKE_BASADATE]).pipe(delay(200))
}
deleteCourseByID(id:string): Observable<Course[]>{
    MY_FAKE_BASADATE = MY_FAKE_BASADATE.filter(course => course.id != id)
    return this.getCourses()
}
}