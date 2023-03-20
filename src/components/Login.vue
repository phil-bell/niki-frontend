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
  height: 20px;
}
.login__button {
  height: 25px;
  display: block;
  background: white;
  border: solid 1px black;
  border-radius: 2px;
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
    async submit() {
      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/token/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.form.username,
            password: this.form.password,
          }),
          mode: "cors",
        }
      );
      if (!response.ok) {
        switch (response.status) {
          case 400:
            this.error = "Incorrect username or poassword";
            break;
          default:
            this.error = "Theres been an error with your request";
        }
      } else {
        const data = await response.json();
        this.userStore.setUser(this.form.username, data.access, data.refresh);
        this.$router.push("/search");
      }
    },
  },
};
</script>
