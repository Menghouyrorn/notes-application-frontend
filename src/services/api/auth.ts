import { LOGIN_URL, LOGOUT_URL, SIGNUP_URL, USER_URL } from "./constance";
import { GET, POST } from "@/services";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const login = (paylod: LoginProps) => {
  return POST({ url: LOGIN_URL }, paylod);
};

const register = (paylod: RegisterProps) => {
  return POST({ url: SIGNUP_URL }, paylod);
};

const logout = () => {
  return POST({
    url: LOGOUT_URL,
  });
};

const currentUser = () => {
  return GET({ url: USER_URL });
};

export { login, register, logout, currentUser };
