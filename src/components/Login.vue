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
  height: 20px;
}
</style>

<template>
  <div class="login">
    <form @submit.prevent="submit" class="login__form">
      <input v-model="form.username" class="login__input -username" />
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
    submit() {
      const data = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.form.username,
          password: this.form.password,
        }),
        referrerPolicy: "no-referrer",
        mode: "cors",
      };
      fetch("http://0.0.0.0:8000/api/token/", data)
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.userStore.setUser(this.form.username, data.access, data.refresh);
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
