import { useQuery, useMutation } from "@tanstack/vue-query";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  getTaskUsers,
  updateTask,
} from "../api";
import { TASK_KEY } from "../api/constance";
import { useOnhandleQuery, useWatchQueryParams } from "@/hooks";
import {
  type ResponseWithPagination,
  type TaskType,
  type UserType,
  ResponseKey,
} from "@/types";

const useQueryTasks = () => {
  const search_params = useWatchQueryParams(["title"]);
  return useQuery<ResponseWithPagination<TaskType>>({
    queryFn: () => getTasks(search_params.value),
    queryKey: [TASK_KEY],
  });
};

const useQueryTask = (id: number) => {
  return useQuery<TaskType>({
    queryKey: [TASK_KEY],
    queryFn: () => getTask(id),
  });
};

const useMutationCreateTask = () => {
  const { onSuccess, onError } = useOnhandleQuery();
  return useMutation({
    mutationFn: createTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      onSuccess({ queryKey: [TASK_KEY], type: ResponseKey.CREATE });
    },
    onError: () => {
      onError({ type: ResponseKey.CREATE });
    },
  });
};

const useMutationEditTask = () => {
  const { onSuccess, onError } = useOnhandleQuery();
  return useMutation({
    mutationFn: updateTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      onSuccess({ queryKey: [TASK_KEY], type: ResponseKey.UPDATE });
    },
    onError: () => {
      onError({ type: ResponseKey.UPDATE });
    },
  });
};

const useMutationDeleteTask = () => {
  const { onSuccess, onError } = useOnhandleQuery();
  return useMutation({
    mutationFn: deleteTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      onSuccess({ queryKey: [TASK_KEY], type: ResponseKey.DELETE });
    },
    onError: () => {
      onError({ type: ResponseKey.DELETE });
    },
  });
};

const useQueryUserTasks = () => {
  const params = useWatchQueryParams([
    "title",
    "sort_title",
    "find_today",
    "find_week",
  ]);
  return useQuery<UserType>({
    queryKey: [TASK_KEY, params],
    queryFn: () => getTaskUsers(params.value),
  });
};

export {
  useQueryTask,
  useQueryTasks,
  useMutationCreateTask,
  useMutationDeleteTask,
  useMutationEditTask,
  useQueryUserTasks,
};
