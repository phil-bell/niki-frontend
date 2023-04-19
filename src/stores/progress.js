import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", {
  state: () => {
    return {
      progress: "0%",
      transition: "all 2s ease",
      handTimeout: null,
    };
  },
  actions: {
    startLoading() {
      this.progress = "70%";
      this.handTimeout = setTimeout(() => this.hangLoading(), 2000);
    },
    hangLoading() {
      this.transition = "all 10s ease";
      this.progress = "80%";
    },
    completeLoading() {
      clearTimeout(this.handTimeout);
      this.transition = "all .5s ease-in";
      this.progress = "100%";
      setTimeout(() => this.resetLoading(), 700);
    },
    resetLoading() {
      this.progress = "0%";
      this.transition = "";
    },
  },
});
