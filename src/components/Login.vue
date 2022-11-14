<script setup lang="ts">
  import { ref } from 'vue'

  const username = ref()
  const password = ref()

</script>

<template>
  <div class="login">
    <form method="POST" action="/api/login/" class="login__form">
      <input id="username" name="username" class="login__input -username" v-model="username">
      <input id="password" name="password" class="login__input -password" type="password" v-model="password">
      <button type="submit" class="login__button">Login</button>
    </form>
  </div>
</template>

<style scoped>
  .login{
    align-items: center;
    display: grid;
    height: 100%;
    justify-items: center;
  }
  .login__form{
    display: grid;
    grid-gap: 5px;
    width: 20%;
  }
</style>