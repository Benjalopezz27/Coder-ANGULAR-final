import { Course } from "../../courses/models";

export interface Student {
  id: string;
  name: string;
  lastName: string;
  age: number;
  mail: string;
  phone: string;
  courses?: Course[]
}
