import { useUserStore } from "./stores/user";

const nikiFetch = async (url, method, auth, body = null) => {
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
    switch (response.status) {
      case 400:
        alert("invalid form");
        break;
      case 401:
        alert("unautharised request");
        break;
      case 500:
        alert("server error");
        break;
      default:
        alert(response.status);
    }
  } else {
    const data = await response.json();
    return data;
  }
};

export const http = {
  get: (url, auth = true) => nikiFetch(url, "GET", auth),
  post: (url, body, auth = true) => nikiFetch(url, "POST", auth, body),
  put: (url, body, auth = true) => nikiFetch(url, "PUT", auth, body),
  patch: (url, body, auth = true) => nikiFetch(url, "PATCH", auth, body),
  delete: (url, body, auth = true) => nikiFetch(url, "DELETE", auth, body),
};
