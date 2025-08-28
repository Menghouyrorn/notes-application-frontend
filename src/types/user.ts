import { type DateType } from "./date";
import type { TaskType } from "./task";

export interface UserType {
  id: number;
  name: string;
  email: string;
  tasks: TaskType[];
  created_at: DateType;
  updated_at: DateType;
}
