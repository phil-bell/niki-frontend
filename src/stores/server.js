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
      this.servers = await http.get("/api/server/");
    },
  },
});
