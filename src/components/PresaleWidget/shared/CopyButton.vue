<template>
  <button
    type="button"
    :class="[
      'flex items-center justify-center cursor-pointer transition-opacity flex-shrink-0',
      'hover:opacity-80',
      sizeClasses,
    ]"
    :title="title"
    @click="handleCopy"
  >
    <CopyIcon v-if="!copied" :size="iconSize" :color="color" :class="iconSizeClasses" />
    <CheckIcon v-else :size="iconSize" :class="iconSizeClasses" />
  </button>
</template>

<script setup>
import { ref, computed } from "vue";
import { CopyIcon, CheckIcon } from "../icons";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Copy",
  },
  size: {
    type: String,
    default: "md",
    validator: (val) => ["sm", "md", "lg"].includes(val),
  },
  color: {
    type: String,
    default: "white",
  },
});

const emit = defineEmits(["copied"]);

const copied = ref(false);

const sizeClasses = computed(() => {
  const sizes = {
    sm: "p-0.5",
    md: "p-1 sm:p-1.5",
    lg: "p-2",
  };
  return sizes[props.size];
});

const iconSizeClasses = computed(() => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5 sm:w-6 sm:h-6",
    lg: "w-6 h-6 sm:w-7 sm:h-7",
  };
  return sizes[props.size];
});

const iconSize = computed(() => {
  const sizes = { sm: 16, md: 20, lg: 24 };
  return sizes[props.size];
});

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    emit("copied");
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = props.text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    copied.value = true;
    emit("copied");
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>

