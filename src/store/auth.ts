import { defineStore } from "pinia";
import { type UserType } from "@/types";

export const useUserStore = defineStore("user", {
  state: () => {
    const user = localStorage.getItem("user");
    return {
      current_user:
        user && user !== "undefined" ? (JSON.parse(user) as UserType) : null,
    };
  },
  actions: {
    setUser(user: UserType) {
      this.current_user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser() {
      this.current_user = null;
      localStorage.removeItem("user");
    },
  },
});
