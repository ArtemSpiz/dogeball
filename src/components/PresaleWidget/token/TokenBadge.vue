<template>
  <div
    class="flex items-center gap-2 py-1 px-2 sm:pr-4 pl-1 flex-shrink-0 w-[140px] sm:w-[180px] rounded-full border border-[#DCDCDC] bg-white/5"
  >
    <template v-if="isDogeball">
      <DogeballIcon class="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
      <p
        class="text-white font-grotesk text-lg max-md:text-base font-medium leading-5 font-feature-off"
      >
        $DOGEBALL
      </p>
    </template>
    <template v-else-if="isCard">
      <CardIcons />
      <p
        class="text-white font-grotesk text-lg font-medium leading-5 font-feature-off"
      >
        Card
      </p>
    </template>
    <template v-else>
      <component
        v-if="tokenIcon"
        :is="tokenIcon"
        class="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
      />
      <p
        class="text-white font-grotesk text-lg max-md:text-sm font-medium leading-5 font-feature-off"
      >
        {{ displayName }}
      </p>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { CardIcons, DogeballIcon } from "../icons";
import { getTokenIcon, getTokenDisplayName } from "../utils/tokens";

const props = defineProps({
  token: {
    type: Object,
    default: null,
  },
  isDogeball: {
    type: Boolean,
    default: false,
  },
});

const isCard = computed(() => {
  return props.token?.symbol?.toUpperCase() === "CARD";
});

const tokenIcon = computed(() => {
  return getTokenIcon(props.token);
});

const displayName = computed(() => {
  return getTokenDisplayName(props.token);
});
</script>
