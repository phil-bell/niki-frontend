<style>
.toast {
  position: absolute;
  border: solid 1px black;
  border-radius: 3px;
  right: 10px;
  top: v-bind(top);
  width: 250px;
  min-height: 50px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  padding: 10px;
  display: grid;
  background: white;
}
</style>
<template>
  <div class="toast">{{ message }}</div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";

export default {
  setup() {
    const toastStore = useToastStore();

    return { toastStore };
  },
  data() {
    const { top, message, display } = storeToRefs(this.toastStore);
    return {
      top: top,
      message: message,
      display: display,
    };
  },
};
</script>
