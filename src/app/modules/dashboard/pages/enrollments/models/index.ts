export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    status: "active" | "inactive" | "pending";
}