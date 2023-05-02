import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => {
    return {
      top: "-100px",
      message: "",
    };
  },
  actions: {
    show(message) {
      this.message = message;
      this.top = "10px";
      setTimeout(() => this.hide(), 2000);
    },
    hide() {
      this.top = "-290px";
    },
  },
});
