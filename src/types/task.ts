import type { DateType } from "./date";

export interface TaskType {
  id: number;
  title: string;
  description: string;
  created_at: DateType;
  updated_at: DateType;
}
