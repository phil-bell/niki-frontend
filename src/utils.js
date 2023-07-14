import { useToastStore } from "./stores/toast";
import { useUserStore } from "./stores/user";

const defaultResponseStatusHandler = (status) => {
  const toastStore = useToastStore();
  switch (status) {
    case 400:
      toastStore.show("invalid form");
      break;
    case 401:
      toastStore.show("unautharised request");
      break;
    case 500:
      toastStore.show("server error");
      break;
    default:
      toastStore.show(response.status);
  }
};

const nikiFetch = async (url, method, auth, body, responseStatusHandler) => {
  const userStore = useUserStore();

  if (auth && Date.now() - userStore.lastSet > 5 * 60 * 1000) {
    await userStore.refreshUser();
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(auth && { Authorization: `Bearer ${userStore.access}` }),
  };

  const config = {
    method: method,
    headers: headers,
    mode: "cors",
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(
    `${import.meta.env.VITE_NIKI_BACKEND_URL}${url}`,
    config
  );

  if (!response.ok) {
    responseStatusHandler(response.status);
  }
  return response;
};

// prettier-ignore
export const http = {
  get: (url, auth = true, responseStatusHandler = defaultResponseStatusHandler) => nikiFetch(url, "GET", auth, null, responseStatusHandler),
  post: (url, body, auth = true, responseStatusHandler = defaultResponseStatusHandler) => nikiFetch(url, "POST", auth, body, responseStatusHandler),
  put: (url, body, auth = true, responseStatusHandler = defaultResponseStatusHandler) => nikiFetch(url, "PUT", auth, body, responseStatusHandler),
  patch: (url, body, auth = true, responseStatusHandler = defaultResponseStatusHandler) => nikiFetch(url, "PATCH", auth, body, responseStatusHandler),
  delete: (url, body, auth = true, responseStatusHandler = defaultResponseStatusHandler) => nikiFetch(url, "DELETE", auth, body, responseStatusHandler),
};

export const sleep = (m) => new Promise((r) => setTimeout(r, m));
