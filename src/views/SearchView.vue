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
  width: 20%;
}
.search__input {
  height: 20px;
  border-radius: 2px;
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

.search__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  gap: 3rem;
  width: 80%;
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
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
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
        this.data = null;
      } else {
        this.error = null;
        this.data = await response.json();
        console.log(this.data);
      }
    },
    submit() {
      this.$router.push({ query: { term: this.term } });
      this.search();
    },
  },
  components: { SearchCard },
};
</script>
