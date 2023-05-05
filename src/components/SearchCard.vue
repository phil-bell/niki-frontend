<style>
.card {
  border: solid 1px black;
  border-radius: 3px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto min-content;
  grid-template-areas:
    "name"
    ".";
  height: 188px;
  width: 300px;
  background: white;
  margin: 1px;
}
.card:hover {
  margin: 0;
  border: solid 2px black;
}
.card__content {
  align-items: center;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40px 50px 30px;
  grid-template-areas:
    ". ."
    ". ."
    "button button";
}

.card__content.-success {
  grid-template-areas:
    ". ."
    ". ."
    "button button";
}

.card__content.-form {
  grid-template-areas:
    "server-label server"
    "location-label location"
    "cancel download";
}
.card__text {
  color: black;
  padding: 0 15px;
}

.card__text.-success {
  grid-area: success-text;
  justify-self: center;
  margin-bottom: 15px;
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

.card__button {
  grid-area: button;
  border-radius: 0;
  background: black;
  height: 30px;
  color: white;
}

.card__button.-cancel {
  grid-area: cancel;
  border-right: 1px solid white;
  border-radius: 0;
}

.card__button.-download {
  grid-area: download;
  border-radius: 0;
}

.card__select {
  margin: 5px;
}

.card__select.-location {
  grid-area: location;
}
.card__select.-server {
  grid-area: server;
}
@media only screen and (max-width: 768px) {
  .card {
    width: 100%;
  }
}
</style>
<template>
  <div class="card">
    <div class="card__text -name">
      <strong>{{ torrent.name.replaceAll(".", " ") }}</strong>
    </div>
    <div v-if="added" class="card__content -success">
      <div class="card__text">server:</div>
      <div class="card__text">{{ this.server?.name }}</div>
      <div class="card__text">location:</div>
      <div class="card__text">{{ this.location?.path }}</div>
      <!-- <div class="card__text">{{ this.location?.path }}</div> -->
      <button class="card__button">view progress (coming soon)</button>
    </div>
    <form
      v-else-if="adding"
      @submit.prevent="submit"
      class="card__content -form"
    >
      <div class="card__text -server">server:</div>
      <select v-model="server" class="card__select -server">
        <option v-for="server in this.serverStore.servers" :value="server">
          {{ server.name }}
        </option>
      </select>
      <div class="card__text -location">location:</div>
      <select v-model="location" class="card__select -location">
        <option
          v-for="location in this.locationStore.locations"
          :value="location"
        >
          {{ location.path }}
        </option>
      </select>
      <button class="card__button -cancel" type="button" @click="toggleAdd">
        cancel
      </button>
      <button class="card__button -download" type="submit">download</button>
    </form>
    <div v-else class="card__content">
      <div class="card__text">size:</div>
      <div class="card__text">{{ this.size() }}</div>
      <div class="card__text">seeders:</div>
      <div class="card__text">{{ torrent.seeders }}</div>
      <button class="card__button" @click="toggleAdd">add</button>
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "../stores/location";
import { useServerStore } from "../stores/server";
import { useToastStore } from "../stores/toast";
import { useUserStore } from "../stores/user";
import { http } from "../utils";
export default {
  setup() {
    const userStore = useUserStore();
    const locationStore = useLocationStore();
    const serverStore = useServerStore();
    const toastStore = useToastStore();
    return { locationStore, userStore, serverStore, toastStore };
  },
  props: {
    torrent: Object,
  },
  data() {
    return {
      adding: false,
      added: false,
      location: null,
      server: null,
    };
  },
  methods: {
    async submit() {
      const response = await http.post("/api/torrent/", {
        magnet: this.torrent.magnet,
        server: this.server?.pk,
        location: this.location?.pk,
      });

      if (response.ok) {
        this.toastStore.show("successfully added");
        this.added = !this.added;
      }
    },
    async toggleAdd() {
      this.adding = !this.adding;
    },
    size() {
      const sizes = [
        "Bytes",
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB",
      ];

      const i = Math.floor(Math.log(this.torrent.size) / Math.log(1024));

      return `${parseFloat(
        (this.torrent.size / Math.pow(1024, i)).toFixed(2)
      )} ${sizes[i]}`;
    },
  },
};
</script>
