import { defineStore } from "pinia";
import router from "../router/index";
export const useUserStore = defineStore("users", {
  state: () => {
    return {
      username: null,
      access: null,
      refresh: null,
      authenticated: false,
    };
  },
  persist: true,
  actions: {
    setUser(username, access, refresh) {
      this.username = username;
      this.access = access;
      this.refresh = refresh;
      this.authenticated = true;
    },
    logout() {
      this.username = null;
      this.access = null;
      this.refresh = null;
      this.authenticated = false;
      router.push("/login");
    },
    async login(username, password) {
      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/token/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          mode: "cors",
        }
      );
      if (!response.ok) {
        switch (response.status) {
          case 400:
            this.error = "Incorrect username or poassword";
            break;
          default:
            this.error = "Theres been an error with your request";
        }
      } else {
        const data = await response.json();
        this.setUser(username, data.access, data.refresh);
        this.$router.push("/search");
      }
    },
    async refreshUser() {
      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}api/refresh/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: this.refresh,
          }),
          mode: "cors",
        }
      );

      if (!response.ok) {
        (this.username = null),
          (this.access = null),
          (this.refresh = null),
          (this.authenticated = false);
      }

      const data = response.json();

      this.access = data.access;
      this.authenticated = true;
    },
  },
});
