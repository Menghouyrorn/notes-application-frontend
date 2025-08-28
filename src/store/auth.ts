import { defineStore } from "pinia";
import { type UserType } from "@/types";

export const useUserStore = defineStore("user", {
  state: () => ({
    current_user: JSON.parse(
      localStorage.getItem("user") || "null"
    ) as UserType | null,
  }),
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
