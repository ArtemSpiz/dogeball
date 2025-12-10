<template>
  <section
    id="presale"
    class="w-full py-[100px] max-md:py-12 flex flex-col items-center gap-4 relative bg-cover bg-center bg-no-repeat min-h-screen"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- Background overlay for better widget visibility -->
    <div class="absolute inset-0 bg-black/20 -z-10"></div>

    <div
      class="relative z-10 flex flex-col gap-2.5 items-center w-full max-w-[519px] p-2.5"
    >
      <Widget class="max-w-[487px] w-full" />
      <BonusBanner />
    </div>

    <!-- Toast notifications -->
    <Toast />
  </section>
</template>

<script setup>
import Widget from "./Widget.vue";
import BonusBanner from "./shared/BonusBanner.vue";
import { Toast } from "./ui";
import bgImage from "@/assets/img/bg-presale.png";
</script>
