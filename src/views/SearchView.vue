<style>
.search {
  align-content: start;
  display: grid;
  height: 80%;
  justify-items: center;
  align-content: center;
}
.search.-searched {
  align-content: start;
  height: 90%;
}
.search__form {
  display: grid;
  grid-gap: 10px;
  width: 40%;
  max-width: 450px;
}
.search__button {
  margin-top: 4px;
}
.search__text.-error {
  color: red;
}

.search__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 1fr;
  gap: 2rem;
  width: 90%;
  justify-content: center;
}
@media only screen and (max-width: 768px) {
  .search__form {
    width: 90%;
  }
  .search__grid {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
</style>
<template>
  <main class="search" :class="{ '-searched': this.data }">
    <form @submit.prevent="submit" class="search__form">
      <lable> search: </lable>
      <input v-model="term" class="search__input" />
      <button class="search__button">search</button>
      <p class="search__text -error">{{ error }}</p>
    </form>
    <div v-if="data" class="search__grid">
      <SearchCard v-for="torrent in data" :torrent="torrent" />
    </div>
  </main>
</template>
<script>
import SearchCard from "../components/SearchCard.vue";
import { useLocationStore } from "../stores/location";
import { useProgressStore } from "../stores/progress";
import { useServerStore } from "../stores/server";
import { useUserStore } from "../stores/user";
import { http, sleep } from "../utils";

export default {
  setup() {
    const userStore = useUserStore();
    const locationStore = useLocationStore();
    const serverStore = useServerStore();
    const progressStore = useProgressStore();

    locationStore.fetchLocations();
    serverStore.fetchServers();

    return { userStore, progressStore };
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
      await sleep(1);
      this.search();
    }
  },
  methods: {
    async search() {
      this.progressStore.startLoading();
      const response = await http.post("/api/search/", {
        term: this.term,
      });

      this.data = await response.json();
      this.progressStore.completeLoading();
    },
    submit() {
      this.$router.push({ query: { term: this.term } });
      this.search();
    },
  },
  components: { SearchCard },
};
</script>
