<template>
  <section
    id="presale"
    class="w-full py-[100px] max-md:py-1 max-2xl:!bg-cover bgFill flex flex-col items-center gap-4 relative bg-center bg-no-repeat min-h-screen"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- Background overlay for better widget visibility -->
    <div class="absolute inset-0 bg-black/20 -z-10"></div>

    <h2
      class="title !text-xl lg:!text-4xl max-w-[650px] max-md:max-w-[300px] text-center"
    >
      DOGEBALL Crypto Presale 2026
    </h2>
    <div
      class="relative z-10 flex flex-col gap-2.5 items-center w-full max-w-[519px] lg:max-w-[570px] p-2.5"
    >
      <Widget class="max-w-[487px] lg:max-w-[538px] w-full" />
      <BonusBanner />
    </div>

    <!-- Toast notifications -->
    <Toast />
  </section>
</template>

<script setup>
import Widget from "./Widget.vue";
import WalletTransferModal from "./modals/WalletTransferModal.vue";
import BonusBanner from "./shared/BonusBanner.vue";
import { Toast } from "./ui";
import bgImage from "@/assets/img/bg-presale.png";
</script>
