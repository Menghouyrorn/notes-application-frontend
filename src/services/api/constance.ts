const URL = import.meta.env.VITE_API_BACKEND;

const USER_URL = URL + "/api/user";
const USER_KEY = "user";

const LOGIN_URL = URL + "/api/login";
const LOGIN_KEY = "login";

const SIGNUP_URL = URL + "/api/register";
const SIGNUP_KEY = "register";

const LOGOUT_URL = URL + "/api/logout";
const LOGOUT_KEY = "logout";

const TASK_URL = URL + "/api/tasks";
const TASK_KEY = "tasks";

export {
  USER_URL,
  USER_KEY,
  LOGIN_KEY,
  LOGIN_URL,
  SIGNUP_KEY,
  SIGNUP_URL,
  LOGOUT_KEY,
  LOGOUT_URL,
  TASK_KEY,
  TASK_URL,
};
