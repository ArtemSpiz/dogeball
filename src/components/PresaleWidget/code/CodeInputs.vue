<template>
  <div
    class="flex gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl h-12 px-3 items-center transition-colors focus-within:border-white/40"
  >
    <!-- Applied State -->
    <div v-if="appliedText" class="flex items-center gap-2 flex-1">
      <svg
        class="w-4 h-4 text-emerald-400 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p class="text-emerald-400 flex-1 leading-tight text-sm font-medium truncate">
        {{ appliedText }}
      </p>
    </div>

    <!-- Input State -->
    <input
      v-else
      ref="inputRef"
      class="flex-1 outline-none self-stretch min-w-0 bg-transparent text-white placeholder:text-white/40 text-sm font-grotesk"
      size="1"
      :placeholder="placeholder || label"
      :value="code"
      :disabled="loading"
      @input="handleInput"
      @keydown.enter="handleApply"
    />

    <!-- Action Button -->
    <PillButton
      :loading="loading"
      :disabled="!appliedText && !code.trim()"
      :class="{ 'animate-pulse': hasUrlDefault && !appliedText }"
      class="!px-3"
      @click="handleClick"
    >
      {{ appliedText ? "Change" : "Apply" }}
    </PillButton>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PillButton } from "../ui";

const props = defineProps({
  appliedText: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
  },
  urlKey: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["apply", "change"]);

const code = ref("");
const hasUrlDefault = ref(false);
const inputRef = ref(null);

onMounted(() => {
  const urlValue = new URLSearchParams(window.location.search).get(props.urlKey);
  if (urlValue) {
    hasUrlDefault.value = true;
    code.value = urlValue;
  }
});

const handleInput = (e) => {
  code.value = e.target.value;
};

const handleApply = () => {
  if (!code.value.trim() || props.loading) return;
  emit("apply", code.value.trim());
};

const handleClick = () => {
  if (props.appliedText) {
    emit("change");
    code.value = "";
    // Focus input after change
    setTimeout(() => inputRef.value?.focus(), 100);
    return;
  }
  handleApply();
};
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out 4;
}
</style>
