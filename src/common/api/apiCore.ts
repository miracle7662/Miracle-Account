import jwtDecode from "jwt-decode";
import axios from "axios";
import config from "@/config";

// --------------------------
// BASE CONFIG
// --------------------------
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;

const AUTH_SESSION_KEY = "user";
const LOCAL_SESSION_KEY = "WINDOW_AUTH_SESSION";

// --------------------------
// AUTH HEADER SETTER
// --------------------------
const setAuthorization = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Token attached");
  } else {
    delete axios.defaults.headers.common["Authorization"];
    console.log("❌ Token removed");
  }
};

// --------------------------
// SAFE SESSION GETTER
// --------------------------
const getUserFromSession = () => {
  const str = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!str) return null;

  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

// --------------------------
// REQUEST INTERCEPTOR
// --------------------------
axios.interceptors.request.use(
  (config) => {
    const user = getUserFromSession();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------
// RESPONSE INTERCEPTOR
// --------------------------
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ---- 404 → do nothing ----
    if (status === 404) {
      return Promise.resolve({ data: null, status: 404 });
    }

    // ---- 401 → DO NOT LOGOUT ----
    if (status === 401) {
      console.warn("⚠️ 401 Unauthorized (token kept, no logout)");
      return Promise.reject(error);
    }

    // ---- 403 → restricted ----
    if (status === 403) {
      window.location.href = "/access-denied";
      return Promise.reject(error);
    }

    // ---- other errors ----
    const msg =
      error.response?.data?.message || error.message || "Unknown error";

    return Promise.reject(msg);
  }
);

// --------------------------
// APICore Class
// --------------------------
class APICore {
  get = (url: string, params: any) => {
    if (params && Object.keys(params).length > 0) {
      const q = new URLSearchParams(params).toString();
      return axios.get(`${url}?${q}`);
    }
    return axios.get(url);
  };

  getFile = (url: string, params: any) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return axios.get(url + q, { responseType: "blob" });
  };

  getMultiple = (urls: string[], params: any) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    const reqs = urls.map((u) => axios.get(u + q));
    return axios.all(reqs);
  };

  create = (url: string, data: any) => axios.post(url, data);
  updatePatch = (url: string, data: any) => axios.patch(url, data);
  update = (url: string, data: any) => axios.put(url, data);
  delete = (url: string) => axios.delete(url);

  createWithFile = (url: string, data: any) => {
    const form = new FormData();
    for (const k in data) form.append(k, data[k]);
    return axios.post(url, form);
  };

  updateWithFile = (url: string, data: any) => {
    const form = new FormData();
    for (const k in data) form.append(k, data[k]);
    return axios.patch(url, form);
  };

  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    if (!user?.token) return false;

    const decoded: any = jwtDecode(user.token);
    return decoded.exp > Date.now() / 1000;
  };

  setLoggedInUser = (session: any) => {
    if (session) {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
       localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
      

      if (session.token) setAuthorization(session.token);
    } else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
       localStorage.removeItem(LOCAL_SESSION_KEY);
      
      setAuthorization(null);
    }
  };

  getLoggedInUser = () => getUserFromSession();

  setUserInSession = (modifiedUser: any) => {
    const data = getUserFromSession();
    if (!data) return;

    const updated = { ...data, ...modifiedUser };
    this.setLoggedInUser(updated);
  };
}

// --------------------------
// INITIAL AUTH LOAD
// --------------------------
const user = getUserFromSession();
if (user?.token) {
  setAuthorization(user.token);
  } else {
  const ls = localStorage.getItem(LOCAL_SESSION_KEY);
  if (ls) {
    const parsed = JSON.parse(ls);
    new APICore().setLoggedInUser(parsed);
    console.log("🔁 Restored session from localStorage");
  }
}

export { APICore, setAuthorization };
