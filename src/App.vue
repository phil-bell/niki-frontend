<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink v-if="!userStore.authenticated" class="nav__link" to="/"
          >login</RouterLink
        >
        <a v-else @click="userStore.logout" class="nav__link" href="#"
          >logout</a
        >
        <span v-show="userStore.authenticated"> - </span>
        <RouterLink
          v-show="userStore.authenticated"
          to="/search/"
          class="nav__link"
          >search</RouterLink
        >
        <!-- <span v-show="userStore.authenticated"> - </span> -->
        <!-- <RouterLink v-show="userStore.authenticated" to="/servers/"
          >servers</RouterLink
        > -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.nav__link {
  color: black;
}
.nav__link:visited {
  color: black;
}
.nav__link:hover {
  font-weight: 700;
}
.nav__link:active {
  color: rgb(126, 126, 126);
}
</style>
