import axios from "axios";
import { LOGIN_URL, LOGOUT_URL, SIGNUP_URL, USER_URL } from "./constance";

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
  return axios
    .post(LOGIN_URL, paylod)
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const register = (paylod: RegisterProps) => {
  return axios
    .post(SIGNUP_URL, paylod)
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const logout = () => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      LOGOUT_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

const currentUser = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((v) => v.data)
    .catch((e) => {
      throw e;
    });
};

export { login, register, logout, currentUser };
