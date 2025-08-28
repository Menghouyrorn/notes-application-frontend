import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./data";
import { useUserStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const publicPages = ["/auth/login", "/auth/signup", "/auth/forgetpassword"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !token) {
    return next({ path: "/auth/login" });
  }

  next();
});

export { router };
