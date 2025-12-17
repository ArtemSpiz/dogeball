<template>
  <Teleport to="body">
    <div
      :class="[
        'fixed px-5 top-0 left-0 w-full h-full z-[100] flex items-center justify-center transition-opacity duration-300',
        rootClasses,
      ]"
    >
      <div
        :class="[
          'absolute top-0 left-0 w-full h-full bg-[#000]/70 backdrop-blur-sm transition-opacity duration-300',
          backdropClasses,
        ]"
        @click="$emit('close')"
      />

      <div
        v-bind="attrs"
        :class="[
          'relative z-[1] p-6 max-md:p-4 rounded-3xl max-md:rounded-2xl w-full max-w-[28rem] flex flex-col gap-6 text-white max-h-[calc(100%-2rem)] overflow-y-auto transition-all duration-300',
          'border border-white/20 bg-[rgba(23,138,184,0.40)] shadow-[0_0_14px_0_#5464D8] backdrop-blur-[5px]',
          modalClasses,
          props.class,
        ]"
        :style="{
          '--text-secondary': '#aaa',
          '--border': '#fff',
          'color-scheme': 'dark',
          ...props.style,
        }"
      >
        <div class="flex items-center justify-between">
          <h2 v-if="title" class="text-xl font-bold">
            {{ title }}
          </h2>

          <button
            aria-label="Close modal"
            @click="$emit('close')"
            class="rounded-full flex items-center justify-center w-8 h-8 p-2 transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 ml-auto"
          >
            <CloseIcon class="w-full h-full" />
          </button>
        </div>

        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, useAttrs } from "vue";
import CloseIcon from "@/assets/icons/Close.vue";

defineEmits(["close"]);

const attrs = useAttrs();

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: String,
  class: String,
  style: Object,
});

const rootClasses = computed(() =>
  !props.open ? "pointer-events-none opacity-0" : "opacity-100"
);
const backdropClasses = computed(() =>
  !props.open ? "opacity-0" : "opacity-100"
);
const modalClasses = computed(() =>
  !props.open ? "scale-95 opacity-0" : "scale-100 opacity-100"
);
</script>
