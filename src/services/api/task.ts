import axios from "axios";
import { TASK_URL } from "./constance";

interface TaskProp {
  title: string;
  description: string;
}

interface TaskUpdate {
  id: number;
  payload: TaskProp;
}

const getTasks = (params: string) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return axios
    .get(TASK_URL + `?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const getTask = (id: number) => {
  const token = localStorage.getItem("token");
  return axios
    .get(TASK_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data.data)
    .catch((e) => {
      throw e;
    });
};

const createTask = (paylod: TaskProp) => {
  const token = localStorage.getItem("token");
  return axios
    .post(TASK_URL, paylod, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const updateTask = (data: TaskUpdate) => {
  const token = localStorage.getItem("token");
  return axios
    .patch(TASK_URL + `/${data.id}`, data.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const deleteTask = (id: number) => {
  const token = localStorage.getItem("token");
  return axios
    .delete(TASK_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const getTaskUsers = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(TASK_URL + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data.data)
    .catch((e) => {
      throw e;
    });
};

export { getTask, getTasks, createTask, updateTask, deleteTask, getTaskUsers };
