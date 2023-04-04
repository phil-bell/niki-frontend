import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useLocationStore = defineStore("locations", {
  state: () => {
    return {
      locations: null,
    };
  },
  persist: true,
  actions: {
    async fetchLocations() {
      const userStore = useUserStore();

      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/location/`,
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
        this.locations = await response.json();
      }
    },
  },
});
