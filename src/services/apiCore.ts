import axios, {
  Axios,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

interface ApiCore {
  url: string;
  config?: AxiosRequestConfig | undefined;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

const GET = (data: ApiCore) => {
  return api
    .get(data.url, data.config)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

const POST = (data: ApiCore, body?: any) => {
  return api
    .post(data.url, body, data.config)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

const PATCH = (data: ApiCore, body: any) => {
  return api
    .patch(data.url, body, data.config)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

const DELETE = (data: ApiCore) => {
  return api
    .delete(data.url, data.config)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export { GET, POST, PATCH, DELETE };
