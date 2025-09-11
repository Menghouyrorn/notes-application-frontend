import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./data";

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

  if (token && publicPages.includes(to.path)) {
    return next({ path: from.path });
  }

  next();
});

export { router };
