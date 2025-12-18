<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const isOpen = ref(false);
const dropdownRef = ref(null);

// Language configuration
const languages = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
  { code: "vi", name: "Vietnamese", flag: "https://flagcdn.com/w40/vn.png" },
  { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
  { code: "nl", name: "Dutch", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "ja", name: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "tr", name: "Turkish", flag: "https://flagcdn.com/w40/tr.png" },
  { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "it", name: "Italian", flag: "https://flagcdn.com/w40/it.png" },
  { code: "no", name: "Norwegian", flag: "https://flagcdn.com/w40/no.png" },
  { code: "zh", name: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "ru", name: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "pt", name: "Portuguese", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { code: "fi", name: "Finnish", flag: "https://flagcdn.com/w40/fi.png" },
  { code: "da", name: "Danish", flag: "https://flagcdn.com/w40/dk.png" },
  { code: "th", name: "Thai", flag: "https://flagcdn.com/w40/th.png" },
];

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

const availableLanguages = computed(() => {
  return languages.filter((lang) => lang.code !== locale.value);
});

const emit = defineEmits(["change"]);

const selectLanguage = (langCode) => {
  emit("change", langCode);
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative inline-block w-[100px] max-lg:w-full" ref="dropdownRef">
    <!-- Trigger / Current language -->
    <button
      @click="toggleDropdown"
      class="w-full bg-[rgb(28,32,62)] rounded-[20px] px-3 py-2.5 flex items-center justify-between gap-2"
    >
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        >
          <img
            :src="currentLanguage.flag"
            :alt="currentLanguage.name"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <span class="text-white text-xs font-bold whitespace-nowrap">
          {{ currentLanguage.code.toUpperCase() }}
        </span>
      </div>
      <svg
        :class="[
          'w-3.5 h-3.5 text-white transition-transform duration-200 flex-shrink-0',
          isOpen ? 'rotate-180' : '',
        ]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown list -->
    <div
      v-if="isOpen && availableLanguages.length > 0"
      class="absolute right-0 top-full mt-1 w-[320px] max-lg:w-full max-lg:left-0 max-lg:right-0 bg-[rgb(28,32,62)] rounded-[20px] overflow-hidden z-50"
    >
      <div
        class="grid grid-cols-2 max-lg:grid-cols-1 max-lg:max-h-[200px] max-lg:overflow-y-auto"
      >
        <div
          v-for="lang in availableLanguages"
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-[rgba(255,238,225,0.16)]"
        >
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          >
            <img
              :src="lang.flag"
              :alt="lang.name"
              class="w-full h-full object-cover rounded-full"
            />
          </div>
          <span class="text-white text-sm font-medium">{{ lang.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Click outside to close */
</style>
