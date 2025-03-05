import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    course?: Course
    student?: Student
}