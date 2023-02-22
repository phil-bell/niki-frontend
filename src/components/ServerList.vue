<style scoped>
.servers {
  align-items: center;
  display: grid;
  justify-items: center;
}
</style>

<template>
  <div class="servers">
    <div v-for="server in servers" :key="server.pk">
      <p>{{ server.name }}</p>
      <p>{{ server.secret }}</p>
      <p><a href="/server/{{ server.pk }}/">edit</a></p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      servers: [
        {
          pk: "1",
          url: "/server/1/",
          name: "phil-pi",
          secret: "ed3ec57c-125e-443b-aac5-950ae1734e36",
          users: ["/user/1/"],
        },
        {
          pk: "2",
          url: "/server/2/",
          name: "phil-pi",
          secret: "ed3ec57c-125e-443b-aac5-950ae1734e36",
          users: ["/user/1/", "/user/2/"],
        },
      ],
    };
  },
  methods: {},
};
</script>
