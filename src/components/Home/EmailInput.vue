<script setup>
  import CustomButton from '@/ui/CustomButton.vue';
</script>

<template>
  <div
    class="hidden mx-auto max-lg:flex my-12 w-full max-w-[325px] flex-col p-4 gap-4 border border-[#8B94F5] rounded-2xl bg-[rgba(53,19,147,0.52)] backdrop-blur-[5px] shadow-[0_0_20px_0_#263166]"
  >
    <div>
      <div class="text-sm leading-[140%] font-grotesk">
        Enter email to be added to the Whitelist
      </div>
      <input
        class="py-1 w-full px-2 h-10 border border-[#DCDCDC] rounded-lg bg-[rgba(255,255,255,0.06)] text-base font-medium text-[rgba(255,255,255,0.30)]"
        placeholder="your email"
      />
    </div>
    <CustomButton title="Get early access!" class="w-full" />
  </div>
</template>

<style lang="scss" scoped></style>
