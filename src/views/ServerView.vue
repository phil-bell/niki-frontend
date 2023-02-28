<style>
main {
  height: 80%;
  display: grid;
  align-content: center;
  grid-template-rows: minmax(min-content, max-content);
}
</style>

<template>
  <main>
    <ServerList />
    <ServerAdd />
  </main>
</template>

<script setup lang="ts">
import ServerAdd from "../components/ServerAdd.vue";
import ServerList from "../components/ServerList.vue";
</script>
