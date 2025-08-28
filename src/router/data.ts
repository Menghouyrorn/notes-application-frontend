import ForgetPassword from "@/views/Auth/ForgetPassword.vue";
import Login from "@/views/Auth/Login.vue";
import SignUp from "@/views/Auth/SignUp.vue";
import HomePage from "@/views/HomePage.vue";
import ViewDetails from "@/views/ViewDetails.vue";

export const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/signup",
    component: SignUp,
  },
  {
    path: "/auth/forgetpassword",
    component: ForgetPassword,
  },
  {
    path: "/notes/:id",
    component: ViewDetails,
  },
];
