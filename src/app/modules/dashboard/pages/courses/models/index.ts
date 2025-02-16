import { Student } from "../../students/models";
import { Teacher } from "../../teachers/models";


export interface Course {
    id: string;
    name: string;
    teachers?: Teacher[];
    students?: Student[]
}