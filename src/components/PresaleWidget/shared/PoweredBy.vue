<template>
  <a
    href="https://presale.gg"
    target="_blank"
    class="flex items-center justify-center gap-2 mt-2 text-white text-center font-grotesk text-xs font-medium leading-4 transition-opacity hover:opacity-80"
  >
    {{ t("presale.poweredBy") }}
    <PresaleGgIcon :size="16" />
    Presale.gg
  </a>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { PresaleGgIcon } from "../icons";

const { t } = useI18n();
</script>
