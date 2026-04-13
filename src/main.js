import "./main.css";

import { trackPageView } from "@/utils/analytics";
import { ViteSSG } from "vite-ssg";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";
import { routes } from "./router";
import i18n from "./i18n";

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app, router, isClient, initialState }) => {
    // Setup i18n
    app.use(i18n);

    // Setup head management for meta tags
    const head = createHead();
    app.use(head);

    // Helper function to update meta tags
    const updateMetaTags = (to) => {
      if (!to.meta) return;

      const baseUrl = "https://www.dogeballtoken.com/";
      const title = to.meta.title || "$DOGEBALL";
      const description =
        to.meta.description ||
        "Join $DOGEBALL – the ultimate meme coin presale on Ethereum L2.";
      const ogTitle = to.meta.ogTitle || title;
      const ogDescription = to.meta.ogDescription || description;
      const ogImage = to.meta.ogImage || `${baseUrl}/logo.png`;
      const canonical = to.meta.canonical || `${baseUrl}${to.path}`;

      // Use push to update tags (will replace previous tags with same keys)
      head.push({
        title,
        meta: [
          { name: "title", content: title },
          { name: "description", content: description },
          { property: "og:type", content: "website" },
          { property: "og:url", content: `${baseUrl}${to.path}` },
          { property: "og:title", content: ogTitle },
          { property: "og:description", content: ogDescription },
          { property: "og:image", content: ogImage },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:url", content: `${baseUrl}${to.path}` },
          { name: "twitter:title", content: ogTitle },
          { name: "twitter:description", content: ogDescription },
          { name: "twitter:image", content: ogImage },
        ],
        link: [{ rel: "canonical", href: canonical }],
      });
    };

    // Setup router scroll behavior
    router.scrollBehavior = (to, from, savedPosition) => {
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
    };

    router.beforeEach((to, from, next) => {
      // Update meta tags before navigation
      updateMetaTags(to);

      if (isClient && typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      next();
    });

    router.afterEach((to) => {
      if (isClient && typeof window !== "undefined") {
        trackPageView(to.fullPath);
      }

      if (isClient && typeof window !== "undefined") {
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }, 10);

        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }, 100);
      }
    });

    // Set initial meta tags for the first route
    if (router.currentRoute.value.meta) {
      updateMetaTags(router.currentRoute.value);
    }
  }
);
