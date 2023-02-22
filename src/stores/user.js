import { defineStore } from "pinia";

export const useUserStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: null,
      access: null,
      refresh: null,
    };
  },
  actions: {
    setUser(username, access, refresh) {
      this.username = username;
      this.access = access;
      this.refresh = refresh;
    },
  },
});
