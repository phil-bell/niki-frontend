<style>
  main {
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-rows: minmax(min-content, max-content);
  }
</style>

<template>
  <main>
    <ServerAdd/>
    <ServerList/>
  </main>
</template>

<script setup lang="ts">
  import ServerAdd from "../components/ServerAdd.vue"
  import ServerList from "../components/ServerList.vue"
</script>