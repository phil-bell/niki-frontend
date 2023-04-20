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
    _hangLoading() {
      this.transition = "all 10s ease";
      this.progress = "80%";
    },
    _resetLoading() {
      this.transition = "";
      this.progress = "0%";
    },
    startLoading() {
      this.transition = "all 2s ease";
      this.progress = "70%";
      this.handTimeout = setTimeout(() => this._hangLoading(), 2000);
    },
    completeLoading() {
      clearTimeout(this.handTimeout);
      this.transition = "all .5s ease-in";
      this.progress = "100%";
      setTimeout(() => this._resetLoading(), 700);
    },
  },
});
