import { defineStore } from "pinia";

export const useUserStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: null,
      token: null,
    };
  },
  actions: {
    setUser(username, token) {
      this.username = username;
      this.token = token;
    },
  },
});
