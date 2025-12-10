<script setup>
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
</script>

<template>
  <div class="overflow-hidden border-t p-6 max-md:p-5§ border-b border-white">
    <div class="flex animate-scroll whitespace-nowrap">
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
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-scroll {
  animation: scroll 45s linear infinite;
}
</style>
