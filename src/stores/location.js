import { defineStore } from "pinia";
import { http } from "../utils";

export const useLocationStore = defineStore("location", {
  state: () => {
    return {
      locations: null,
    };
  },
  actions: {
    async fetchLocations() {
      const response = await http.get("/api/location/");
      this.locations = await response.json();
    },
  },
});
