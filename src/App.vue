
<style scoped>
.nav {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin-bottom: 15px;
  justify-content: start;
  background: black;
  width: 100%;
  padding: 5px;
}
.nav__link {
  color: white;
  text-decoration: none
}
.nav__link:visited {
  color: white;
}
.nav__link:hover {
  font-weight: 700;
}
.nav__link:active {
  color: rgb(236, 232, 232);
}
@media only screen and (max-width: 768px) {
  .nav {
    justify-content: center;
  }
}
</style>

<template>
  <ProgressBar />
  <Toast />
  <header>
    <div class="wrapper">
      <nav class="nav">
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

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ProgressBar from "./components/ProgressBar.vue";
import Toast from "./components/Toast.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>