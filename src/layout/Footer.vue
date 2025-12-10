<script setup>
import Telegram from "@/assets/icons/Telegram.vue";
import X from "@/assets/icons/X.vue";
import Logo from "@/assets/img/Logo.png";
import Moscot from "@/assets/img/Moscot.png";

const LinksFooter = [
  {
    title: "Terms & conditions",
    link: "/TermsandConditions.pdf",
  },
  {
    title: "Cookies policy",
    link: "/CookiesPolicy.pdf",
  },
  {
    title: "Privacy policy",
    link: "/PrivacyPolicy.pdf",
  },
];
</script>

<template>
  <div
    class="gap-6 p-8 !pb-0 max-md:pt-8 items-end max-md:px-5 flex justify-between h-max max-md:flex-col max-md:items-center max-md:justify-center max-md:text-center max-md:bg-[radial-gradient(508.28%_36.84%_at_50%_86.86%,#1B0D37_0%,#020323_100%)]"
  >
    <div class="flex flex-col gap-6 pb-8 max-md:pb-0 max-md:items-center">
      <div class="h-[60px] w-auto">
        <img :src="Logo" class="object-contain" />
      </div>
      <div class="flex flex-col max-md:items-center">
        <div class="flex flex-col gap-2 max-md:flex-row">
          <a
            v-for="(link, i) in LinksFooter"
            :key="i"
            :href="link.link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-base whitespace-nowrap font-medium capitalize leading-[120%]"
          >
            {{ link.title }}
          </a>
        </div>
        <div class="flex items-center gap-4 mt-4">
          <a
            href="https://t.me/dogeballtoken"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Telegram />
          </a>
          <a
            href="https://x.com/dogeballtoken"
            rel="noopener noreferrer"
            target="_blank"
          >
            <X />
          </a>
        </div>
      </div>
    </div>

    <div class="w-[180px] h-auto max-md:w-[160px] max-md:hidden">
      <img
        :src="Moscot"
        class="object-contain shadow-[0_0_6px_0_#0D072C_inset]"
      />
    </div>

    <div class="flex flex-col justify-between gap-2 pb-8 max-md:pb-0">
      <div
        class="text-base font-normal leading-[120%] max-w-[365px] max-md:max-w-[320px] max-md:mx-auto"
      >
        Disclaimer: $DOGEBALL is a utility backed meme coin. Cryptocurrency
        markets are highly volatile, invest with caution. Cryptocurrency may be
        unregulated in your jurisdiction. Beware of '$DOGEBALL' copycat websites
        and social media channels (official links on this website only).
      </div>
      <div class="description">
        Copyright © 2025 DOGEBALL. All rights reserved.
      </div>
    </div>

    <div class="w-[180px] h-auto max-md:w-[160px] md:hidden">
      <img
        :src="Moscot"
        class="object-contain shadow-[0_0_6px_0_#0D072C_inset]"
      />
    </div>
  </div>
</template>

<style scoped></style>
