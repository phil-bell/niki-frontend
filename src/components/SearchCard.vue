<style scoped>
.card {
  border: 1px solid;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "name"
    ".";
}
.card__detail {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ". ."
    ". ."
    "button button";
}

.card__form {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "location location"
    "cancel download";
}
.card__text {
  padding: 0 15px;
}
.card__text.-name {
  padding: 5px;
  grid-area: name;
  word-wrap: break-word;
}

.card__button.-card {
  grid-area: button;
  border: 0;
  border-top: 1px solid;
  border-radius: 0;
}

.card__select.-location {
  grid-area: location;
}
.card__button.-cancel {
  grid-area: cancel;
}
.card__button.-download {
  grid-area: download;
}
</style>
<template>
  <div class="card">
    <div class="card__text -name">
      <strong>{{ name }}</strong>
    </div>
    <div v-if="adding" class="card__form">
      <select class="card__select -location">
        <option>Movies</option>
        <option>TV</option>
      </select>
      <button class="card__button -card -cancel " @click="adding = !adding">cancel</button>
      <button class="card__button -card -download">download</button>
    </div>
    <div v-else class="card__detail">
      <div class="card__text">status:</div>
      <div class="card__text">{{ status }}</div>
      <div class="card__text">seeders:</div>
      <div class="card__text">{{ seeders }}s</div>
      <button class="card__button -card" @click="adding = !adding">add</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  props: {
    name: String,
    status: String,
    seeders: String,
  },
  data() {
    return {
      adding: false,
    };
  },
  methods: {},
};
</script>
