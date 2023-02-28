import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
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
      path: "/search/",
      name: "server-list",
      component: SearchView,
    },
    {
      path: "/servers/",
      name: "server-list",
      component: ServerView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (!userStore.authenticated && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
