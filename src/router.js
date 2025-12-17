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
    // Якщо є збережена позиція (браузерна навігація назад/вперед)
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 100);
      });
    }

    // Для нових переходів - завжди скролимо вгору
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: "instant" });
      }, 0);
    });
  },
});

router.beforeEach((to, from, next) => {
  // Примусово скролимо вгору перед переходом
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  next();
});

router.afterEach(() => {
  // Додатковий скрол після завершення переходу
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 10);

  // І ще один для мобільних браузерів
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 100);
});

export default router;
