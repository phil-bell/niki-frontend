import { defineStore } from "pinia";
import { http } from "../utils";

export const useLocationStore = defineStore("locations", {
  state: () => {
    return {
      locations: null,
    };
  },
  persist: true,
  actions: {
    async fetchLocations() {
      this.servers = await http.get("/api/location/");
    },
  },
});
