<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Star from "@/assets/icons/Star.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import Spinner from "@/components/PresaleWidget/ui/Spinner.vue";
import { getYouTubeVideos } from "@/api/youtube";

const { t } = useI18n();

const carouselRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const blogPosts = ref([]);
const isLoading = ref(true);
const error = ref(null);

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return { fullStars, hasHalfStar, emptyStars };
};

const checkScrollButtons = () => {
  if (!carouselRef.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;
};

const getCardsPerView = () => {
  const width = window.innerWidth;
  if (width < 768) return 1; // xs
  if (width < 1024) return 2; // md
  if (width < 1280) return 3; // lg
  return 4; // xl
};

const scrollLeft = () => {
  if (!carouselRef.value) return;
  const cardsPerView = getCardsPerView();
  const containerWidth = carouselRef.value.clientWidth;
  const gap = window.innerWidth <= 768 ? 16 : 24;
  const scrollAmount = (containerWidth - gap * (cardsPerView - 1)) / cardsPerView + gap;
  carouselRef.value.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  if (!carouselRef.value) return;
  const cardsPerView = getCardsPerView();
  const containerWidth = carouselRef.value.clientWidth;
  const gap = window.innerWidth <= 768 ? 16 : 24;
  const scrollAmount = (containerWidth - gap * (cardsPerView - 1)) / cardsPerView + gap;
  carouselRef.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

const staticBlogPosts = [
  {
    title: "What is DOGEBALL Crypto 2026: An Introduction to High-Performance P2E Gaming",
    publishedDate: "January 27",
    content: "If you have spent any time in the gaming world recently, you've likely noticed a trend. The initial excitement around \"Play-to-Earn\" has often been met with a frustrating reality: high gas fees, slow transaction speeds, and games that feel more like chores than entertainment...",
    link: "/blog-01",
    isInternal: true, // Flag to indicate internal link
  },
  {
    title: "Is DOGEBALL Crypto the Most Productive Meme Coin of 2026? Let's Find Out",
    publishedDate: "January 28",
    content: "For years, the dream of \"Play-to-Earn\" (P2E) has been held back by a single, frustrating reality: the Ethereum mainnet was never built for high-speed gaming. Imagine trying to play a fast-paced game where every move costs $20 in gas fees and takes 3 minutes to confirm...",
    link: "/blog-02",
    isInternal: true, // Flag to indicate internal link
  },
  {
    title: "Best Crypto to Buy in 2026: How to Win Big in the $1M DOGEBALL Arena",
    publishedDate: "January 29",
    content: "In the early days of crypto, \"gaming\" usually meant clicking a button once an hour and hoping for a reward. Those days are over. As the DOGEBALL crypto 2026 era takes hold, the community is moving toward high-adrenaline, skill-based competition that rewards real talent...",
    link: "/blog-03",
    isInternal: true, // Flag to indicate internal link
  },
];

const fetchBlogPosts = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await getYouTubeVideos();
    
    if (response.success && response.data) {
      // Map API response to component structure
      blogPosts.value = response.data.map((item) => ({
        title: item.title,
        rating: item.rating || null, // Handle null rating
        author: item.author,
        authorDescription: item.authorDescription,
        link: item.youtubeUrl,
        thumbnail: item.thumbnailUrl,
        isInternal: false, // External link
      }));
      
      // Add static blog posts after YouTube videos
      blogPosts.value.push(...staticBlogPosts);
    } else {
      error.value = "Failed to load blog posts";
      // Even if API fails, show the static blog posts
      blogPosts.value = [...staticBlogPosts];
    }
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    error.value = "Failed to load blog posts";
    // Even if API fails, show the static blog posts
    blogPosts.value = [...staticBlogPosts];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchBlogPosts();
  
  if (carouselRef.value) {
    carouselRef.value.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();
  }
});
</script>

<template>
  <div
    id="blog"
    class="flex flex-col items-center justify-center gap-10 max-md:gap-8 py-20 max-md:py-12 bg-[center_center] bg-cover bg-no-repeat bg-[url('@/assets/img/bg-blog.jpg')] relative"
  >
    <!-- Title with mobile buttons -->
    <div class="w-full max-w-[1600px] lg:max-w-[1200px] px-5 flex items-center justify-between gap-4 max-md:flex md:hidden">
      <div class="title">{{ t("blog.title") }}</div>
      
      <!-- Navigation Buttons (Mobile only) -->
      <div v-if="!isLoading && !error && blogPosts.length > 1" class="flex items-center gap-2 flex-shrink-0">
        <button
          @click="scrollLeft"
          class="bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-lg p-2 hover:bg-[rgba(53,19,147,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll left"
          :disabled="!canScrollLeft"
        >
          <ArrowLeft class="w-5 h-5 text-white" />
        </button>

        <button
          @click="scrollRight"
          class="bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-lg p-2 hover:bg-[rgba(53,19,147,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll right"
          :disabled="!canScrollRight"
        >
          <ArrowRight class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>

    <!-- Title (Desktop only - centered) -->
    <div class="w-full max-w-[1600px] lg:max-w-[1200px] px-5 hidden md:block">
      <div class="title text-center">{{ t("blog.title") }}</div>
    </div>

    <div class="w-full max-w-[1600px] lg:max-w-[1200px] px-5 relative">

      <!-- Carousel Container -->
      <div
        ref="carouselRef"
        class="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        @scroll="checkScrollButtons"
      >
        <div class="flex gap-6 max-md:gap-4 pb-4 items-stretch">
          <!-- Loading state -->
          <div v-if="isLoading" class="w-full flex items-center justify-center py-20">
            <Spinner :size="12" class="text-white" />
          </div>
          
          <!-- Error state -->
          <div v-else-if="error" class="w-full text-center py-10 text-white">
            {{ error }}
          </div>
          
          <!-- No posts state -->
          <div v-else-if="blogPosts.length === 0" class="w-full text-center py-10 text-white">
            No blog posts available
          </div>
          
          <!-- Blog posts -->
          <template v-for="(post, index) in blogPosts" v-else :key="index">
            <!-- YouTube/External Posts -->
            <a
              v-if="!post.isInternal"
              :href="post.link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] snap-center flex-shrink-0"
            >
              <div
                class="p-6 max-md:p-4 gap-4 backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all hover:scale-[1.02] cursor-pointer h-[400px] w-full"
              >
                <div
                  class="absolute inset-0 rounded-2xl"
                  style="
                    background: linear-gradient(
                      145deg,
                      rgba(255, 255, 255, 0.6) 0%,
                      rgba(255, 255, 255, 0.1) 40%,
                      rgba(255, 255, 255, 0.6) 100%
                    );
                    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    padding: 1px;
                  "
                ></div>

                <div class="flex flex-col gap-3 z-10 flex-1 min-h-0">
                  <!-- Thumbnail Image -->
                  <div class="w-full h-[200px] max-md:h-[170px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      :src="post.thumbnail"
                      :alt="post.title"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <!-- Title -->
                  <div
                    class="text-xl max-md:text-lg font-bold leading-[110%] line-clamp-2 flex-shrink-0"
                  >
                    {{ post.title }}
                  </div>

                  <!-- Rating -->
                  <div v-if="post.rating" class="flex items-center gap-2 flex-shrink-0">
                    <div class="flex items-center gap-1">
                      <Star
                        v-for="i in renderStars(post.rating).fullStars"
                        :key="'full-' + i"
                        class="w-4 h-4 text-[#FFD700] fill-current"
                      />
                      <Star
                        v-if="renderStars(post.rating).hasHalfStar"
                        class="w-4 h-4 text-[#FFD700] fill-current opacity-50"
                      />
                      <Star
                        v-for="i in renderStars(post.rating).emptyStars"
                        :key="'empty-' + i"
                        class="w-4 h-4 text-gray-400 fill-current"
                      />
                    </div>
                    <span class="text-sm font-medium">{{ post.rating }}</span>
                  </div>

                  <!-- Author -->
                  <div class="flex flex-col gap-1 pt-2 border-t border-white/20 flex-shrink-0 mt-auto">
                    <div class="text-base max-md:text-sm font-semibold line-clamp-1">
                      {{ post.author }}
                    </div>
                    <div
                      class="text-sm max-md:text-xs text-white/80 leading-[120%] line-clamp-1"
                    >
                      {{ post.authorDescription }}
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <!-- Internal Blog Post (Same Style as YouTube Cards) -->
            <RouterLink
              v-else
              :to="post.link"
              class="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] snap-center flex-shrink-0"
            >
              <div
                class="p-6 max-md:p-4 gap-4 backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all hover:scale-[1.02] cursor-pointer h-[400px] w-full"
              >
                <div
                  class="absolute inset-0 rounded-2xl"
                  style="
                    background: linear-gradient(
                      145deg,
                      rgba(255, 255, 255, 0.6) 0%,
                      rgba(255, 255, 255, 0.1) 40%,
                      rgba(255, 255, 255, 0.6) 100%
                    );
                    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    padding: 1px;
                  "
                ></div>

                <div class="flex flex-col gap-5 z-10 flex-1 min-h-0">
                  <!-- Title -->
                  <div
                    class="mt-4 text-3xl max-md:text-2xl font-bold leading-[110%] line-clamp-2 flex-shrink-0"
                  >
                    {{ post.title }}
                  </div>

                  <!-- Published Date -->
                  <div class="text-sm text-white/60 flex-shrink-0">
                    {{ post.publishedDate }}
                  </div>

                  <!-- Content Preview -->
                  <div
                    class="mt-4 text-md text-white/80 leading-[140%] line-clamp-4 flex-1"
                  >
                    {{ post.content }}
                  </div>

                  <!-- READ MORE Link -->
                  <div class="flex flex-col gap-1 flex-shrink-0 mt-auto">
                    <span class="text-blue-400 underline text-sm font-medium">
                      READ MORE
                    </span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </template>
        </div>
      </div>

      <!-- Navigation Buttons (Desktop only - below carousel) -->
      <div v-if="!isLoading && !error && blogPosts.length > 1" class="hidden md:flex items-center justify-center gap-2 mt-6">
        <button
          @click="scrollLeft"
          class="bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-lg p-2 hover:bg-[rgba(53,19,147,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll left"
          :disabled="!canScrollLeft"
        >
          <ArrowLeft class="w-5 h-5 text-white" />
        </button>

        <button
          @click="scrollRight"
          class="bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-lg p-2 hover:bg-[rgba(53,19,147,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll right"
          :disabled="!canScrollRight"
        >
          <ArrowRight class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
