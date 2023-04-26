<style>
.toast {
  position: absolute;
  border: solid 1px black;
  border-radius: 3px;
  right: v-bind(right);
  top: 10px;
  width: 250px;
  min-height: 50px;
  display: grid;
  justify-content: center;
  transition: all 0.5s ease;
  padding: 10px;
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
    const { right, message } = storeToRefs(this.toastStore);
    return {
      right: right,
      message: message,
    };
  },
};
</script>
