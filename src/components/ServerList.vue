<script setup></script>

<style scoped>
.servers {
  align-items: center;
  display: grid;
  justify-items: center;
  widows: 100%;
}
.servers__server {
  width: 60%;
}
</style>

<template>
  <div class="servers">
    <div class="servers__server" v-for="server in servers" :key="server.pk">
      <p>{{ server.name }}</p>
      <p>{{ server.address }}</p>
      <p>{{ server.public_key }}</p>
      <p><a href="/server/{{ server.pk }}/">edit</a></p>
      <hr />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      servers: null,
      errors: null,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchData() {
      const userStore = useUserStore();

      const response = await fetch(
        `${import.meta.env.VITE_NIKI_BACKEND_URL}/api/server/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userStore.access}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      this.servers = await response.json();

      if (!response.ok) {
        this.error = (data && data.message) || response.status;
        console.error("There was an error!", this.error);
      }
    },
  },
};
</script>
