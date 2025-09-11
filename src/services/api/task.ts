import { TASK_URL } from "./constance";
import { GET, POST, DELETE, PATCH } from "@/services";

interface TaskProp {
  title: string;
  description: string;
}

interface TaskUpdate {
  id: number;
  payload: TaskProp;
}

const getTasks = (params: string) => {
  return GET({ url: TASK_URL + `?${params}` });
};

const getTask = (id: number) => {
  return GET({ url: TASK_URL + `/${id}` });
};

const createTask = (paylod: TaskProp) => {
  return POST({ url: TASK_URL }, paylod);
};

const updateTask = (data: TaskUpdate) => {
  return PATCH(
    {
      url: TASK_URL + `/${data.id}`,
    },
    data.payload
  );
};

const deleteTask = (id: number) => {
  return DELETE({ url: TASK_URL + `/${id}` });
};

const getTaskUsers = (params: string) => {
  return GET({ url: TASK_URL + `/user?${params}` });
};

export { getTask, getTasks, createTask, updateTask, deleteTask, getTaskUsers };
