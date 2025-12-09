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
        <path d="M24 0H0V24H24V0Z" fill="white" />
      </mask>
      <g :mask="`url(#${maskId})`">
        <path
          d="M12 24C18.6275 24 24 18.6275 24 12C24 5.37258 18.6275 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6275 5.37258 24 12 24Z"
          fill="#26A17B"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.4414 13.0371V13.0356C13.3589 13.0416 12.9336 13.0671 11.9849 13.0671C11.2274 13.0671 10.6941 13.0446 10.5066 13.0356V13.0378C7.5906 12.9096 5.4141 12.4018 5.4141 11.7943C5.4141 11.1876 7.5906 10.6798 10.5066 10.5493V12.5323C10.6971 12.5458 11.2431 12.5781 11.9976 12.5781C12.9029 12.5781 13.3566 12.5406 13.4414 12.5331V10.5508C16.3514 10.6806 18.5226 11.1883 18.5226 11.7943C18.5226 12.4018 16.3514 12.9081 13.4414 13.0371ZM13.4414 10.3446V8.5701H17.5019V5.86414H6.44611V8.5701H10.5066V10.3438C7.2066 10.4953 4.72485 11.1493 4.72485 11.9323C4.72485 12.7153 7.2066 13.3686 10.5066 13.5208V19.2073H13.4414V13.5193C16.7361 13.3678 19.2119 12.7146 19.2119 11.9323C19.2119 11.1501 16.7361 10.4968 13.4414 10.3446Z"
          fill="white"
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
const clipId = computed(() => `usdt-clip-${uid}`);
const maskId = computed(() => `usdt-mask-${uid}`);
</script>

