<script setup>
import { Vue3Marquee } from "vue3-marquee";
import { computed, onMounted, onUnmounted, ref } from "vue";
import FeaturedLogo1 from "@/assets/img/Home/FeaturedLogo1.png";
import FeaturedLogo2 from "@/assets/img/Home/FeaturedLogo2.png";
import FeaturedLogo3 from "@/assets/img/Home/FeaturedLogo3.png";
import FeaturedLogo4 from "@/assets/img/Home/FeaturedLogo4.png";
import FeaturedLogo5 from "@/assets/img/Home/FeaturedLogo5.png";
import FeaturedLogo6 from "@/assets/img/Home/FeaturedLogo6.png";
import FeaturedLogo7 from "@/assets/img/Home/FeaturedLogo7.png";

const Logos = [
  { logo: FeaturedLogo1 },
  { logo: FeaturedLogo2 },
  { logo: FeaturedLogo3 },
  { logo: FeaturedLogo4 },
  { logo: FeaturedLogo5 },
  { logo: FeaturedLogo6 },
  { logo: FeaturedLogo7 },
];

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const duration = computed(() => (isMobile.value ? 25 : 20));
</script>

<template>
  <div class="border-t border-b border-white py-6 max-md:py-5">
    <Vue3Marquee
      :duration="duration"
      :pause-on-hover="false"
      :clone="true"
      direction="normal"
      class="marquee-container"
    >
      <div
        v-for="(logo, idx) in Logos"
        :key="idx"
        class="h-7 w-auto shrink-0 mx-5"
      >
        <img
          :src="logo.logo"
          class="object-contain cursor-pointer h-full w-auto grayscale transition-all duration-300 hover:grayscale-0"
        />
      </div>
    </Vue3Marquee>
  </div>
</template>

<style scoped>
.marquee-container {
  display: flex;
  align-items: center;
}
</style>
