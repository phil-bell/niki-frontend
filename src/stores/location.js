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
      const response =  await http.get("/api/location/")
      this.servers = await response.json();
    },
  },
});
