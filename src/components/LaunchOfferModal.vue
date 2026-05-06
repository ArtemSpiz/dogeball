<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
    >
      <button
        aria-label="Close popup"
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        @click="closeModal"
      />

      <div
        class="relative isolate w-full max-w-[860px] rounded-[36px] border border-white/30 px-5 pb-5 pt-12 md:px-9 md:pb-4 md:pt-9 text-center overflow-hidden"
        :style="popupBackgroundStyle"
      >
        <button
          aria-label="Close popup"
          class="absolute right-3 top-3 md:right-4 md:top-4 z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white transition hover:bg-black/50"
          @click="closeModal"
        >
          <CloseIcon class="h-3.5 w-3.5" />
        </button>

        <div class="pointer-events-none absolute inset-0 bg-black/45" />

        <div class="relative z-[1] uppercase text-[#FFEEE1]">
          <div class="flex flex-col gap-2">
            <p
              class="title !text-[1.15rem] md:!text-[1.55rem] !leading-[115%] !font-medium"
            >
              Last chance to buy $DOGEBALL
            </p>
            <p
              class="title !text-[1.15rem] md:!text-[1.55rem] !leading-[115%] !font-medium"
            >
              $DOGEBALL is about to launch!
            </p>
          </div>
          <div class="mt-3 md:mt-4 flex flex-col gap-2">
            <p
              class="font-grotesk text-sm md:text-[1.2rem] leading-[120%] font-medium"
            >
              Use <span class="font-extrabold">PAY35</span> for
              <span class="font-extrabold">35%</span> bonus tokens
            </p>
            <p
              class="font-grotesk text-sm md:text-[1.2rem] leading-[120%] font-medium"
            >
              Daily & weekly top buyers get
              <span class="font-extrabold">100%</span> bonus tokens!
            </p>
          </div>
        </div>

        <img
          :src="popupLogo"
          alt="$DOGEBALL logo"
          class="relative z-[1] mx-auto mt-6 md:mt-5 h-auto w-full max-w-[360px] object-contain"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import CloseIcon from "@/assets/icons/Close.vue";
import popupBackground from "@/assets/img/Popup/bg.jpg";
import popupLogo from "@/assets/img/Popup/logo.png";

const isOpen = ref(false);

const popupBackgroundStyle = computed(() => ({
  backgroundImage: `url(${popupBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const closeModal = () => {
  isOpen.value = false;
};

onMounted(() => {
  isOpen.value = true;
});
</script>
