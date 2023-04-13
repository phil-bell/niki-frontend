<style scoped>
.login {
  align-items: center;
  display: grid;
  height: 100%;
  justify-items: center;
}
.login__form {
  display: grid;
  grid-gap: 10px;
  width: 20%;
}
.login__input {
  height: 30px;
}
.login__button {
  height: 35px;
  display: block;
  background: white;
  border: solid 1px black;
  border-radius: 3px;
}
.login__label {
  display: block;
}
.login__text.-error {
  color: red;
}
</style>

<template>
  <main class="login">
    <form @submit.prevent="submit" class="login__form">
      <label> username: </label>
      <input v-model="form.username" class="login__input -username" />
      <lable> password: </lable>
      <input
        v-model="form.password"
        class="login__input -password"
        type="password"
      />
      <button class="login__button" type="submit">Login</button>
      <p class="login__text -error">{{ error }}</p>
    </form>
  </main>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    responseStatusHandler(status) {
      switch (status) {
        case 400:
          alert("incorrect username or password");
          break;
        case 401:
          alert("unautharised request");
          break;
        case 500:
          alert("server error");
          break;
        default:
          alert(response.status);
      }
    },
    async submit() {

      this.userStore.login(this.form.username, this.form.password);
    },
  },
};
</script>
