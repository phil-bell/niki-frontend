<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink v-if="!userStore.authenticated" to="/">Login</RouterLink>
        <a v-else @click="userStore.logout">Logout</a>
        <span v-show="userStore.authenticated"> - </span>
        <RouterLink v-show="userStore.authenticated" to="/search/"
          >Search</RouterLink
        >
        <span v-show="userStore.authenticated"> - </span>
        <RouterLink v-show="userStore.authenticated" to="/servers/"
          >Servers</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
