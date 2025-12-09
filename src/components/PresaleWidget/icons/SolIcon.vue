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
        :id="maskId"
        style="mask-type: luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M23.7209 0H0.279083V23.4419H23.7209V0Z" fill="white" />
      </mask>
      <g :mask="`url(#${maskId})`">
        <path
          d="M12 23.4419C18.4733 23.4419 23.7209 18.1942 23.7209 11.7209C23.7209 5.24764 18.4733 0 12 0C5.52672 0 0.279083 5.24764 0.279083 11.7209C0.279083 18.1942 5.52672 23.4419 12 23.4419Z"
          :fill="`url(#${gradientId})`"
        />
        <path
          d="M7.05842 14.6594C7.14437 14.5734 7.26253 14.5233 7.38789 14.5233H18.7548C18.9625 14.5233 19.0664 14.774 18.9196 14.9208L16.6741 17.1663C16.5881 17.2522 16.47 17.3023 16.3446 17.3023H4.9777C4.76999 17.3023 4.66613 17.0517 4.81297 16.9048L7.05842 14.6594Z"
          fill="white"
        />
        <path
          d="M7.05842 6.2756C7.14794 6.18965 7.26616 6.13953 7.38789 6.13953H18.7548C18.9625 6.13953 19.0664 6.39019 18.9196 6.53703L16.6741 8.78248C16.5881 8.86844 16.47 8.91856 16.3446 8.91856H4.9777C4.76999 8.91856 4.66613 8.6679 4.81297 8.52105L7.05842 6.2756Z"
          fill="white"
        />
        <path
          d="M16.6741 10.4406C16.5881 10.3547 16.47 10.3046 16.3446 10.3046H4.9777C4.76999 10.3046 4.66613 10.5553 4.81297 10.7021L7.05842 12.9475C7.14437 13.0335 7.26253 13.0836 7.38789 13.0836H18.7548C18.9625 13.0836 19.0664 12.8329 18.9196 12.6861L16.6741 10.4406Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        :id="gradientId"
        x1="12"
        y1="0"
        x2="12"
        y2="23.4419"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#11EFAA" />
        <stop offset="1" stop-color="#D428FC" />
      </linearGradient>
      <clipPath :id="clipId">
        <rect width="24" height="23.4419" fill="white" />
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
const clipId = computed(() => `sol-clip-${uid}`);
const maskId = computed(() => `sol-mask-${uid}`);
const gradientId = computed(() => `sol-gradient-${uid}`);
</script>

