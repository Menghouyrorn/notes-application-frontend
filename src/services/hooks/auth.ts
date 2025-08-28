import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { LOGIN_KEY, LOGOUT_KEY, USER_KEY, USER_URL } from "../api/constance";
import { useToast } from "vue-toast-notification";
import { currentUser, login, logout, register } from "../api";
import { useUserStore } from "@/store/auth";
import type { UserType } from "@/types";
import axios from "axios";

const useLogoutMutation = () => {
  const router = useRouter();
  const toast = useToast();
  const userStore = useUserStore();
  return useMutation({
    mutationFn: logout,
    mutationKey: [LOGOUT_KEY],
    onSuccess: () => {
      localStorage.removeItem("token");
      window.location.reload();
      router.replace("/");
      userStore.clearUser();
      toast.success("Logout Success");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};

const useLoginMutation = () => {
  const router = useRouter();
  const toast = useToast();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: login,
    mutationKey: [LOGIN_KEY],
    onSuccess: (v) => {
      localStorage.setItem("token", v.token);
      toast.success("Login Successfully");
      axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${v.token}`,
          },
        })
        .then((v) => {
          userStore.setUser(v.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
      router.replace("/");
    },
    onError: (e) => {
      toast.error("Login error Please try again!");
    },
  });
};

const useQueryCurrentUser = () => {
  return useQuery<UserType>({
    queryKey: [USER_KEY],
    queryFn: currentUser,
  });
};

const useMutationCreateUser = () => {
  const toast = useToast();
  const router = useRouter();
  return useMutation({
    mutationKey: [USER_KEY],
    mutationFn: register,
    onSuccess: () => {
      router.replace("/auth/login");
      toast.success("Create successfully.");
    },
    onError: () => {
      toast.error("Create erros. Please try again!");
    },
  });
};

export { useLoginMutation, useLogoutMutation, useMutationCreateUser };
