<style>
.search {
  align-content: start;
  display: grid;
  height: 90%;
  justify-items: center;
}
.search__form {
  display: grid;
  grid-gap: 10px;
  width: 40%;
  max-width: 450px;
}
.search__input {
  height: 20px;
  border-radius: 2px;
  border: 1px solid black;
  height: 30px;
}
.search__button {
  display: block;
  background: white;
  border: solid 1px black;
  border-radius: 2px;
  height: 30px;
}
.search__text.-error {
  color: red;
}

.search__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 1fr;
  gap: 3rem;
  width: 70%;
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
    <div v-if="data" class="search__grid">
      <SearchCard
        v-for="torrent in data"
        :name="torrent.name"
        :status="torrent.status"
        :seeders="torrent.seeders"
        :magnet="torrent.magnet"
      />
    </div>
  </main>
</template>
<script>
import SearchCard from "../components/SearchCard.vue";
import { useLocationStore } from "../stores/location";
import { useServerStore } from "../stores/server";
import { useUserStore } from "../stores/user";
import { http } from "../utils";

export default {
  setup() {
    const userStore = useUserStore();
    const locationStore = useLocationStore();
    const serverStore = useServerStore();

    locationStore.fetchLocations();
    serverStore.fetchServers();

    return { userStore };
  },
  data() {
    return {
      term: null,
      error: null,
      data: null,
    };
  },
  async mounted() {
    if (this.$route.query.term) {
      this.term = this.$route.query.term;
      this.search();
    }
  },
  methods: {
    async search() {
      this.data = await http.post("/api/search/", {
        term: this.term,
      });
      // const response = await fetch(
      //   `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/search/`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       term: this.term,
      //     }),
      //     mode: "cors",
      //   }
      // );
      // if (!response.ok) {
      //   this.error = "Theres been an error with your request";
      //   this.data = null;
      // } else {
      //   this.error = null;
      //   this.data = await response.json();
      // }
    },
    submit() {
      this.$router.push({ query: { term: this.term } });
      this.search();
    },
  },
  components: { SearchCard },
};
</script>
