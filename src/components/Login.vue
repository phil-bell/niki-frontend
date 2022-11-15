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

<template>
  <div class="login">
    <form @submit.prevent="submit" class="login__form">
      <input v-model="form.username" class="login__input -username">
      <input v-model="form.password" class="login__input -password" type="password">
      <button class="login__button" type="submit">Login</button>
    </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
        }
      }
    },
    methods: {
      async submit() {
        console.log(this.form)
      }
    }
  }

</script>
