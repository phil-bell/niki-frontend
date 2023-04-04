import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useServerStore = defineStore("server", {
  state: () => {
    return {
      servers: null,
    };
  },
  persist: true,
  actions: {
    async fetchServers() {
      const userStore = useUserStore();

      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/server/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userStore.access}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      if (response.ok) {
          this.servers = await response.json();
          console.log(this.servers)
      }
    },
  },
});
