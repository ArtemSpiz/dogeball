<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted } from "vue";
import Star from "@/assets/icons/Star.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";

const { t } = useI18n();

const carouselRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// Sample blog data - using English placeholders
// All blog posts must have thumbnails
const PLACEHOLDER_THUMBNAIL = "https://placehold.net/600x400.png";

const blogPosts = computed(() => [
  {
    title: "Understanding $DOGEBALL Tokenomics and Presale Strategy",
    rating: 4.5,
    author: "Crypto Analyst",
    authorDescription: "Expert in blockchain economics and token distribution models",
    link: "#",
    thumbnail: PLACEHOLDER_THUMBNAIL,
  },
  {
    title: "How to Play $DOGEBALL: Complete Game Guide",
    rating: 5.0,
    author: "Gaming Expert",
    authorDescription: "Professional game reviewer and crypto gaming enthusiast",
    link: "#",
    thumbnail: PLACEHOLDER_THUMBNAIL,
  },
  {
    title: "Ethereum Layer 2 Explained: Why $DOGEBALL Chose L2",
    rating: 4.8,
    author: "Blockchain Developer",
    authorDescription: "Specialist in Layer 2 scaling solutions and EVM compatibility",
    link: "#",
    thumbnail: PLACEHOLDER_THUMBNAIL,
  },
  {
    title: "$DOGEBALL Staking Tutorial: Maximize Your Rewards",
    rating: 4.7,
    author: "DeFi Strategist",
    authorDescription: "DeFi expert focused on yield optimization and staking strategies",
    link: "#",
    thumbnail: PLACEHOLDER_THUMBNAIL,
  },
  {
    title: "The Future of Play-to-Earn Gaming with $DOGEBALL",
    rating: 4.9,
    author: "Gaming Industry Analyst",
    authorDescription: "Researcher studying the intersection of gaming and blockchain technology",
    link: "#",
    thumbnail: PLACEHOLDER_THUMBNAIL,
  },
]);

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

onMounted(() => {
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
    <div class="title uppercase text-center">{{ t("blog.title") }}</div>

    <div class="w-full max-w-[1600px] px-5 relative">
      <!-- Left Arrow Button -->
      <button
        v-if="canScrollLeft"
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-full p-3 hover:bg-[rgba(53,19,147,1)] transition-all max-md:hidden"
        aria-label="Scroll left"
      >
        <ArrowLeft class="w-6 h-6 text-white" />
      </button>

      <!-- Right Arrow Button -->
      <button
        v-if="canScrollRight"
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[rgba(53,19,147,0.8)] backdrop-blur-sm rounded-full p-3 hover:bg-[rgba(53,19,147,1)] transition-all max-md:hidden"
        aria-label="Scroll right"
      >
        <ArrowRight class="w-6 h-6 text-white" />
      </button>

      <!-- Carousel Container -->
      <div
        ref="carouselRef"
        class="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        @scroll="checkScrollButtons"
      >
        <div class="flex gap-6 max-md:gap-4 pb-4 items-stretch">
          <a
            v-for="(post, index) in blogPosts"
            :key="index"
            :href="post.link"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] snap-center flex-shrink-0"
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
                <div class="flex items-center gap-2 flex-shrink-0">
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
        </div>
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
