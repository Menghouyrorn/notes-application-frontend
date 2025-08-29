import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  getTaskUsers,
  updateTask,
} from "../api";
import { TASK_KEY, USER_KEY } from "../api/constance";
import { useWatchQueryParams } from "@/hooks";
import { useToast } from "vue-toast-notification";
import type { ResponseWithPagination, TaskType, UserType } from "@/types";

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
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_KEY] });
      toast.success("create successfully!");
    },
    onError: () => {
      toast.error("error");
    },
  });
};

const useMutationEditTask = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: updateTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_KEY] });
      toast.success("Update successfully !");
    },
    onError: () => {
      toast.error("Error");
    },
  });
};

const useMutationDeleteTask = () => {
  const queryClients = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: deleteTask,
    mutationKey: [TASK_KEY],
    onSuccess: () => {
      toast.success("Delete successfully !");
      queryClients.invalidateQueries({ queryKey: [TASK_KEY] });
    },
    onError: () => {
      toast.error("Error");
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
