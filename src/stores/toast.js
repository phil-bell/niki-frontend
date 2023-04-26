import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => {
    return {
      right: "-290px",
      message: "",
    };
  },
  actions: {
    show(message) {
      this.message = message;
      this.right = "10px";
      setTimeout(() => this.hide(), 2000);
    },
    hide() {
      this.right = "-290px";
    },
  },
});
