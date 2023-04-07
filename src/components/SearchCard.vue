<style scoped>
.card {
  border: 1px solid;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto min-content;
  grid-template-areas:
    "name"
    ".";
}
.card__detail {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40px 50px 30px;
  grid-template-areas:
    ". ."
    ". ."
    "button button";
  align-items: center;
}

.card__form {
  display: grid;
  grid-template-rows: 40px 50px 30px;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "server-label server"
    "location-label location"
    "cancel download";
  align-items: center;
}
.card__text {
  padding: 0 15px;
}

.card__text.-server {
  grid-area: server-label;
}
.card__text.-location {
  grid-area: location-label;
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
  background: white;
  height: 30px;
}

.card__select {
  margin: 5px;
  height: 30px;
}

.card__select.-location {
  grid-area: location;
}
.card__select.-server {
  grid-area: server;
}
.card__button.-cancel {
  grid-area: cancel;
  border-right: 1px solid black;
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
    <form v-if="adding" @submit.prevent="submit" class="card__form">
      <div class="card__text -server">server:</div>
      <select v-model="server" class="card__select -server">
        <option v-for="server in this.serverStore.servers" :value="server.pk">
          {{ server.name }}
        </option>
      </select>
      <div class="card__text -location">location:</div>
      <select v-model="location" class="card__select -location">
        <option
          v-for="location in this.locationStore.locations"
          :value="location.pk"
        >
          {{ location.path }}
        </option>
      </select>
      <button
        class="card__button -card -cancel"
        type="button"
        @click="toggleAdd"
      >
        cancel
      </button>
      <button class="card__button -card -download" type="submit">
        download
      </button>
    </form>
    <div v-else class="card__detail">
      <div class="card__text">status:</div>
      <div class="card__text">{{ status }}</div>
      <div class="card__text">seeders:</div>
      <div class="card__text">{{ seeders }}s</div>
      <button class="card__button -card" @click="toggleAdd">add</button>
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "../stores/location";
import { useServerStore } from "../stores/server";
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    const locationStore = useLocationStore();
    const serverStore = useServerStore();
    return { locationStore, userStore, serverStore };
  },
  props: {
    name: String,
    status: String,
    seeders: String,
    magnet: String,
  },
  data() {
    return {
      adding: false,
      location: null,
      server: null,
    };
  },
  methods: {
    async submit() {
      await this.serverStore.fetchServers();
      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/torrent/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.userStore.access}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            magnet: this.magnet,
            server: this.server,
            location: this.location,
          }),
          mode: "cors",
        }
      );
      if (!response.ok) {
        this.error = "Theres been an error with your request";
      } else {
        this.error = null;
        this.data = await response.json();
      }
    },
    async toggleAdd() {
      this.adding = !this.adding;
    },
  },
};
</script>
