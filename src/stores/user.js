import { defineStore } from "pinia";

export const useUserStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: null,
      access: null,
      refresh: null,
      authenticated: false,
    };
  },
  actions: {
    setUser(username, access, refresh) {
      this.username = username;
      this.access = access;
      this.refresh = refresh;
      this.authenticated = true;
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
