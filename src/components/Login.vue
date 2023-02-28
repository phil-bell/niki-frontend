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
</style>

<template>
  <div class="login">
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
    </form>
  </div>
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
    };
  },
  methods: {
    async submit() {
      const response = await fetch("http://0.0.0.0:8000/api/token/", {
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
      });
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        console.error("There was an error!", error);
      }
      this.userStore.setUser(this.form.username, data.access, data.refresh);
      this.$router.push("/search");
    },
  },
};
</script>
