import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ServerView from "../views/ServerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: HomeView,
    },
    {
      path: "/servers/",
      name: "server-list",
      component: ServerView,
    },
  ],
});

export default router;
