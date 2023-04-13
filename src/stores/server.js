import { defineStore } from "pinia";
import { http } from "../utils";

export const useServerStore = defineStore("server", {
  state: () => {
    return {
      servers: null,
    };
  },
  persist: true,
  actions: {
    async fetchServers() {
      const response = await http.get("/api/server/");
      this.servers = await response.json();
    },
  },
});
