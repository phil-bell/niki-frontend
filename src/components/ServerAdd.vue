<style scoped>
.server-add {
  align-items: center;
  display: grid;
  justify-items: center;
}
.server-add__form {
  display: grid;
  grid-gap: 5px;
  width: 20%;
}
</style>

<template>
  <div class="server-add">
    <form @submit.prevent="submit" class="server-add__form">
      <input v-model="form.secret" class="server-add__input -username" />
      <button class="server-add__button" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      form: {
        secret: "",
      },
    };
  },
  methods: {
    submit() {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      };
      fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/server/`,
        requestOptions
      )
        .then((response) => response.json())
    },
  },
};
</script>
