import { defineStore } from "pinia";
import router from "../router/index";
import { http } from "../utils";
export const useUserStore = defineStore("users", {
  state: () => {
    return {
      username: null,
      access: null,
      refresh: null,
      authenticated: false,
      lastSet: null,
    };
  },
  persist: true,
  actions: {
    setUser(username, access, refresh) {
      this.username = username;
      this.access = access;
      this.refresh = refresh;
      this.authenticated = true;
      this.lastSet = Date.now();
    },
    logout() {
      this.username = null;
      this.access = null;
      this.refresh = null;
      this.authenticated = false;
      router.push("/login");
    },
    responseStatusHandler(status) {
      switch (status) {
        case 400:
          alert("incorrect username or password");
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
    },
    async login(username, password) {
      const response = await http.post(
        "/api/token/",
        {
          username: username,
          password: password,
        },
        false,
        this.responseStatusHandler
      );
      if (response.status == 200) {
        const data = await response.json();

        this.setUser(username, data.access, data.refresh);
        router.push("/search");
      }
    },
    async refreshUser() {
      const response = await http.post(
        "/api/token/refresh/",
        {
          access: this.access,
          refresh: this.refresh,
        },
        false
      );

      if (!response.ok) {
        this.logout();
      }

      const data = await response.json();
      this.setUser(this.username, data.access, this.refresh);
    },
  },
});
