<template>
  <div class="flex flex-col relative">
    <button
      ref="buttonRef"
      :class="[
        'h-11 rounded-md px-3 flex items-center justify-between transition-all border',
        selected
          ? 'border-[#007BF9] bg-[#007BF9] text-white shadow-md'
          : 'bg-white/15 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30',
      ]"
      @click="handleClick"
    >
      <div :class="['flex gap-2 max-sm:gap-1 items-center', { 'mx-auto': isCard }]">
        <!-- Card Icons -->
        <CardIcons v-if="isCard" />
        <!-- Token Icon -->
        <template v-else-if="(value || defaultToken) && !isMoreButton">
          <component
            v-if="tokenIcon"
            :is="tokenIcon"
            class="w-6 h-6 max-sm:w-5 max-sm:h-5 flex-shrink-0"
          />
        </template>

        <div class="flex flex-col text-start items-start leading-none">
          <p class="max-sm:text-xs text-white font-grotesk text-base font-medium leading-5 font-feature-off">
            {{ text }}
          </p>
          <p
            v-if="showChain"
            :class="[
              'text-[0.625rem] max-sm:text-[0.5rem]',
              selected ? 'text-white/70' : 'text-white/50',
            ]"
          >
            {{ (value ?? defaultToken ?? tokens[0])?.chain?.toUpperCase() }}
          </p>
        </div>
      </div>

      <!-- Dropdown Arrow -->
      <ChevronDownIcon
        v-if="(!isCard && !isMoreButton) || tokens.length > 1"
        :size="16"
        class="w-4 h-4 flex-shrink-0 transition-transform"
        :class="{ 'rotate-180': dropdownOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="(!isCard && !isMoreButton) || tokens.length > 1"
      :class="[
        'flex flex-col bg-[rgba(10,15,46,0.95)] backdrop-blur-md border border-white/20 rounded-lg',
        'absolute top-[calc(100%+0.5rem)] w-full z-10 max-h-60 overflow-y-auto min-w-28 max-sm:max-h-52 shadow-xl',
        'transition-opacity duration-200',
        dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ]"
    >
      <button
        v-for="token in tokens"
        :key="token.id"
        class="flex items-center gap-2 p-2 hover:bg-white/10 max-sm:gap-1.5 justify-start transition-colors"
        @click="handleTokenSelect(token)"
      >
        <component
          v-if="getTokenIconComponent(token)"
          :is="getTokenIconComponent(token)"
          class="w-6 h-6 max-sm:w-5 max-sm:h-5 flex-shrink-0"
        />
        <div class="flex flex-col text-start leading-none">
          <p class="text-white">{{ token.symbol.toUpperCase() }}</p>
          <p class="text-[0.625rem] text-white/60">
            {{ token.chain.toUpperCase() }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { CardIcons, ChevronDownIcon } from "../icons";
import { getTokenIcon } from "../utils/tokens";

const props = defineProps({
  tokens: {
    type: Array,
    required: true,
  },
  value: {
    type: Object,
    default: null,
  },
  defaultLabel: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  defaultToken: {
    type: Object,
    default: null,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:value"]);

const dropdownOpen = ref(false);
const buttonRef = ref(null);

const text = computed(() => {
  if (props.placeholder === "More") {
    return props.value?.symbol.toUpperCase() ?? "More";
  }
  return (
    props.value?.symbol.toUpperCase() ??
    props.defaultLabel ??
    props.defaultToken?.symbol.toUpperCase() ??
    props.placeholder ??
    "None"
  );
});

const isMoreButton = computed(() => {
  return props.placeholder === "More" || props.defaultLabel === "More";
});

const isCard = computed(() => {
  return text.value.toUpperCase() === "CARD";
});

const showChain = computed(() => {
  return !isCard.value && (props.value || props.defaultToken);
});

const tokenIcon = computed(() => {
  if (!props.value && !props.defaultToken) return null;
  return getTokenIcon(props.value ?? props.defaultToken);
});

const getTokenIconComponent = (token) => {
  return getTokenIcon(token);
};

const handleClick = () => {
  if (isCard.value && props.tokens.length === 1) {
    emit("update:value", props.tokens[0]);
  } else {
    dropdownOpen.value = !dropdownOpen.value;
  }
};

const handleTokenSelect = (token) => {
  emit("update:value", token);
  dropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (buttonRef.value && !buttonRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
