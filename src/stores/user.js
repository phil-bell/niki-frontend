import { defineStore } from "pinia";
import router from "../router/index";
export const useUserStore = defineStore("storeId", {
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
    async refreshUser() {
      const response = await fetch("http://0.0.0.0:8000/api/refresh/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: this.refresh,
        }),
        mode: "cors",
      });

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
