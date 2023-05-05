<style>
.toast {
  align-items: center;
  background: black;
  border-radius: 3px;
  color: white;
  display: grid;
  justify-content: center;
  min-height: 50px;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: v-bind(top);
  transition: all 0.5s ease;
  width: 250px;
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
