<style>
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.progress-container {
  width: 100%;
  background-color: transparent;
  height: 2px;
  display: block;
}
.progress-bar {
  background-color: white;
  width: v-bind(progress);
  display: block;
  height: inherit;
  transition: v-bind(transition);
}
</style>

<template>
  <div class="progress-container fixed-top">
    <span class="progress-bar"></span>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useProgressStore } from "../stores/progress";

export default {
  setup() {
    const progressStore = useProgressStore();

    return { progressStore };
  },
  data() {
    const { progress, transition } = storeToRefs(this.progressStore);
    return {
      progress: progress,
      transition: transition,
    };
  },
};
</script>
