<style>
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
  border: solid 1px black;
  border-radius: 3px;
}
.login__input:focus {
  height: 28px;
  border-radius: 3px;
}
.login__input:hover {
  height: 28px;
  border-radius: 3px;
}
.login__button {
  height: 35px;
  display: block;
  background: white;
  border: solid 1px black;
  border-radius: 3px;
  color: black;
}
.login__label {
  display: block;
}
.login__text.-error {
  color: red;
}
@media only screen and (max-width: 768px) {
  .login__form{
    width: 80%;
  }
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
import { useProgressStore } from "../stores/progress";
import { useToastStore } from "../stores/toast";
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    const progressStore = useProgressStore();
    const toastStore = useToastStore();

    return { userStore, progressStore, toastStore };
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
          this.toastStore.show("incorrect username or password");
          break;
        case 401:
          this.toastStore.show("unautharised request");
          break;
        case 500:
          this.toastStore.show("server error");
          break;
        default:
          this.toastStore.show(response.status);
      }
    },
    async submit() {
      this.progressStore.startLoading();
      await this.userStore.login(this.form.username, this.form.password);
      this.progressStore.completeLoading();
    },
  },
};
</script>
