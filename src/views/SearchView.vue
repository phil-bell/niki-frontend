<style>
.search {
  align-items: center;
  display: grid;
  height: 90%;
  justify-items: center;
}
.search__form {
  display: grid;
  grid-gap: 10px;
  width: 20%;
}
.search__input {
  height: 20px;
}
.search__button {
  height: 25px;
  display: block;
  background: white;
  border: solid 1px black;
  border-radius: 2px;
}
.search__text.-error {
  color: red;
}
</style>
<template>
  <main class="search">
    <form @submit.prevent="submit" class="search__form">
      <lable> search: </lable>
      <input v-model="term" class="search__input" />
      <button class="search__button">search</button>
      <p class="search__text -error">{{ error }}</p>
    </form>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody id="stocksTerminal">
        <tr v-for="torrent in data">
          <td>{{ torrent.name }}s</td>
        </tr>
      </tbody>
    </table>
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
      term: "",
      error: "",
      data: [],
    };
  },
  methods: {
    async submit() {
      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/search/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            term: this.term,
          }),
          mode: "cors",
        }
      );
      if (!response.ok) {
        this.error = "Theres been an error with your request";
      } else {
        this.data = await response.json();
        console.log(this.data);
      }
    },
  },
};
</script>
