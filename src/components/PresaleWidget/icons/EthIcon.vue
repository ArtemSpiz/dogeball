<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <mask
        :id="`${maskId}`"
        style="mask-type: luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M23.7209 0H0.279068V23.4419H23.7209V0Z" fill="white" />
      </mask>
      <g :mask="`url(#${maskId})`">
        <path
          d="M12 23.4419C18.4733 23.4419 23.7209 18.1942 23.7209 11.7209C23.7209 5.24764 18.4733 0 12 0C5.52671 0 0.279068 5.24764 0.279068 11.7209C0.279068 18.1942 5.52671 23.4419 12 23.4419Z"
          fill="#627EEA"
        />
        <path
          d="M12.3652 2.93018V9.42798L17.8572 11.882L12.3652 2.93018Z"
          fill="white"
          fill-opacity="0.602"
        />
        <path
          d="M12.3652 2.93018L6.87248 11.882L12.3652 9.42798V2.93018Z"
          fill="white"
        />
        <path
          d="M12.3652 16.0929V20.508L17.8609 12.9048L12.3652 16.0929Z"
          fill="white"
          fill-opacity="0.602"
        />
        <path
          d="M12.3652 20.508V16.0922L6.87248 12.9048L12.3652 20.508Z"
          fill="white"
        />
        <path
          d="M12.3652 15.0709L17.8572 11.8821L12.3652 9.42944V15.0709Z"
          fill="white"
          fill-opacity="0.2"
        />
        <path
          d="M6.87248 11.8821L12.3652 15.0709V9.42944L6.87248 11.8821Z"
          fill="white"
          fill-opacity="0.602"
        />
      </g>
    </g>
    <defs>
      <clipPath :id="clipId">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
});

const uid = Math.random().toString(36).slice(2, 9);
const clipId = computed(() => `eth-clip-${uid}`);
const maskId = computed(() => `eth-mask-${uid}`);
</script>

