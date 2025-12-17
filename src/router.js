import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "./pages/About.vue";
import Roadmap from "./pages/Roadmap.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/eth-l2", name: "ETH L2", component: About },
  { path: "/play-$DOGEBALL", name: "Roadmap", component: Roadmap },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
      left: 0,
      behavior: "auto", // важливо для мобільних
    };
  },
});

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
