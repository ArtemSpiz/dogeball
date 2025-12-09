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
          fill="#EAAF20"
        />
        <path
          d="M9.15479 10.5518L12 7.70655L14.8468 10.5533L16.5023 8.89767L12 4.39539L7.49918 8.89622L9.15479 10.5518ZM4.67444 11.721L6.33005 10.0654L7.9856 11.721L6.33005 13.3766L4.67444 11.721ZM9.15479 12.8902L12 15.7354L14.8468 12.8887L16.5023 14.5435L12 19.0465L7.49918 14.5457L7.49701 14.5435L9.15479 12.8902ZM16.0144 11.721L17.67 10.0654L19.3256 11.721L17.67 13.3766L16.0144 11.721ZM13.6791 11.7195H13.6805V11.721L12 13.4015L10.3218 11.7239L10.3188 11.721L10.3218 11.7188L10.6155 11.4243L10.7583 11.2814L12 10.0405L13.6798 11.7202L13.6791 11.7195Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
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
const clipId = computed(() => `bnb-clip-${uid}`);
const maskId = computed(() => `bnb-mask-${uid}`);
</script>

