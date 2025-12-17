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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 100);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: "smooth" });
      }, 0);
    });
  },
});

router.beforeEach((to, from, next) => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, 10);

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, 100);
});

export default router;
