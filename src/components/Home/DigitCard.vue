<!-- components/DigitCard.vue -->
<template>
  <div
    class="relative w-[35px] max-md:w-[25px] h-[68px] max-md:h-[52px] shadow-[0_0_5px_0_#103185_inset] bg-[#020E3D] rounded-lg border-2 border-[#030B2C] flex items-center justify-center overflow-hidden"
  >
    <div
      class="top-1/2 z-50 absolute right-0 w-full h-[2px] max-md:h-px bg-[#020A2B] shadow-[0_0_3px_0_rgba(25,30,209,0.43)]"
    />
    <div class="h-[6px] z-50 absolute top-1/2 -translate-y-1/2 left-0 w-auto">
      <img :src="left" class="object-contain" />
    </div>

    <div class="h-[6px] absolute z-50 top-1/2 -translate-y-1/2 right-0 w-auto">
      <img :src="right" class="object-contain" />
    </div>

    <div
      class="text-5xl max-md:text-[28px] absolute top-[40%] right-[40%] translate-x-1/2 -translate-y-1/2 text-[#EB4102] z-10 font-BPdotsUnicase digit-display"
    >
      {{ digit }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  digit: String,
  left: String,
  right: String,
});
</script>

<style scoped>
.digit-display {
  font-variant-numeric: ordinal;
  text-shadow: 0 0 3px #eb4102;
}
</style>
