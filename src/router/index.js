import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:city",
      name: "detail",
      component: Detail,
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
    },
  ],
});

export default router;
