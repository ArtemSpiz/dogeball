<template>
  <Teleport to="body">
    <div
      :class="[
        'fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center',
        rootClasses
      ]"
    >
      <div
        :class="[
          'absolute top-0 left-0 w-full h-full bg-[#000]/70 transition-opacity',
          backdropClasses
        ]"
        @click="$emit('close')"
      />
      <div
        {...others}
        :class="[
          'bg-[#1F0F5B] shadow-[0_0_20px_0_#263166] border border-[#8B94F5] relative z-[1] p-4 rounded-xl w-full max-w-[25rem] flex flex-col gap-4 text-[#fff] max-h-[calc(100%-2rem)] overflow-y-auto transition-transform',
          modalClasses,
          props.class
        ]"
        :style="{'--text-secondary': '#aaa', '--border': '#fff', 'color-scheme': 'dark', ...props.style}"
      >
        <p v-if="title" class="text-center text-lg font-bold">{{title}}</p>
        <button
          aria-label="Close modal"
          @click="$emit('close')"
          className="rounded-full flex items-center justify-center w-8 h-8 p-[0.375rem] absolute top-4 right-4 transition-colors hover:bg-[#000]/10"
        >
          <CloseIcon className="w-full h-full" />
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { computed } from 'vue';
  import CloseIcon from "@/assets/icons/Close.vue"

  defineEmits(["close"])
  const props = defineProps({
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String
    },
    class: {
      type: String
    },
    style: {
      type: Object
    }
  })

  const rootClasses = computed(() => !props.open ? "pointer-events-none" : "")
  const backdropClasses = computed(() => !props.open ? "opacity-0" : "")
  const modalClasses = computed(() => !props.open ? "translate-y-[calc(100vh+2rem)]" : "");
</script>