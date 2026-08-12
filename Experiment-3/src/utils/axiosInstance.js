import axios from "axios";
import { loadSession, saveSession, clearSession, refreshAccessToken } from "./auth";
import { isTokenExpired } from "./jwt";

// jsonplaceholder is a free public test API — used here just so the
// "GET /posts/1" demo button on the Dashboard fires a real HTTP request
// through this instance with a real Authorization header attached.
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// --- request interceptor: attach the access token -------------------------
axiosInstance.interceptors.request.use((config) => {
  const session = loadSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// --- response interceptor: on 401, try to refresh once, then retry --------
let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const session = loadSession();

    const looksExpired =
      error.response?.status === 401 ||
      (session?.accessToken && isTokenExpired(session.accessToken));

    if (looksExpired && session?.refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        refreshPromise = refreshPromise || refreshAccessToken(session.refreshToken);
        const { accessToken } = await refreshPromise;
        refreshPromise = null;

        saveSession({ ...session, accessToken });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        clearSession();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
