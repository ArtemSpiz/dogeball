<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import { ref, onMounted, onUnmounted } from "vue";
import BgVideo from "@/assets/img/Roadmap/videoDog.mp4";
import BgPoster from "@/assets/img/Roadmap/BgHero.png";
import Seats from "@/assets/img/Roadmap/SeatsHero.png";
import { getIsMobile } from "@/utils/media.js";

const videoIframe = ref(null);
let player = null;
let hasUnmuted = false;
let unmuteAttempts = 0;
const maxUnmuteAttempts = 5;
const isMobile = getIsMobile();

// Function to unmute video with retry logic
const unmuteVideo = async (retryCount = 0) => {
  if (!player) {
    if (retryCount < 3) {
      setTimeout(() => unmuteVideo(retryCount + 1), 200);
    }
    return;
  }

  try {
    // Check if player is ready
    const ready = await player.ready().catch(() => false);
    if (!ready) {
      if (retryCount < 5) {
        setTimeout(() => unmuteVideo(retryCount + 1), 300);
      }
      return;
    }

    // Get current volume and muted state
    const currentVolume = await player.getVolume();
    const isMuted = await player.getMuted();

    // Only unmute if actually muted
    if (isMuted || currentVolume === 0) {
      await player.setVolume(1);
      await player.setMuted(false);

      // Verify it worked
      const newMuted = await player.getMuted();
      const newVolume = await player.getVolume();

      if (!newMuted && newVolume > 0) {
        hasUnmuted = true;
        unmuteAttempts = 0;
      } else if (retryCount < maxUnmuteAttempts) {
        // Retry if it didn't work
        setTimeout(() => unmuteVideo(retryCount + 1), 300);
      }
    } else {
      hasUnmuted = true;
    }
  } catch (error) {
    console.error("Error unmuting video:", error);
    if (retryCount < maxUnmuteAttempts) {
      setTimeout(() => unmuteVideo(retryCount + 1), 500);
    }
  }
};

// Handle volume/mute changes - re-unmute if browser mutes it again
const handleVolumeChange = async (data) => {
  if (hasUnmuted && isMobile && (data.muted || data.volume === 0)) {
    // Video got muted again, try to unmute
    unmuteAttempts++;
    if (unmuteAttempts < maxUnmuteAttempts) {
      setTimeout(() => unmuteVideo(0), 100);
    }
  }
};

// Handle first user interaction on mobile
const handleFirstInteraction = () => {
  if (isMobile) {
    unmuteVideo(0);
    // Remove listeners after first interaction
    document.removeEventListener("touchstart", handleFirstInteraction);
    document.removeEventListener("click", handleFirstInteraction);
    window.removeEventListener("scroll", handleFirstInteraction);
  }
};

onMounted(() => {
  // Wait for Vimeo Player API to load
  const initPlayer = () => {
    if (typeof window.Vimeo?.Player !== "undefined" && videoIframe.value) {
      player = new window.Vimeo.Player(videoIframe.value);

      // Wait for player to be ready, then set up listeners
      player
        .ready()
        .then(() => {
          // Listen for volume/mute changes on mobile to detect re-muting
          if (isMobile) {
            player.on("volumechange", handleVolumeChange);
            player.on("play", () => {
              // Try to unmute when video plays
              if (!hasUnmuted) {
                setTimeout(() => unmuteVideo(0), 500);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error initializing Vimeo player:", error);
        });

      // On mobile, listen for first user interaction to unmute
      if (isMobile) {
        document.addEventListener("touchstart", handleFirstInteraction, {
          once: true,
        });
        document.addEventListener("click", handleFirstInteraction, {
          once: true,
        });
        window.addEventListener("scroll", handleFirstInteraction, {
          once: true,
        });

        // Also try to unmute after a short delay in case user already interacted
        setTimeout(() => {
          if (!hasUnmuted) {
            unmuteVideo(0);
          }
        }, 1000);
      }
    } else {
      // Retry if Vimeo API not loaded yet
      setTimeout(initPlayer, 100);
    }
  };

  initPlayer();
});

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener("touchstart", handleFirstInteraction);
  document.removeEventListener("click", handleFirstInteraction);
  window.removeEventListener("scroll", handleFirstInteraction);

  // Clean up player
  if (player) {
    try {
      player.off("volumechange", handleVolumeChange);
    } catch (e) {
      // Ignore cleanup errors
    }
    player.destroy();
  }
});
</script>

<template>
  <div
    class="relative 2xl:min-h-[1240px] px-5 h-screen max-md:h-[500px] items-center pt-[120px] max-[400px]:bg-contain max-md:pt-[100px] text-center min-h-[500px] flex flex-col bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/BgHero.png')] max-[400px]:bg-[url('@/assets/img/Roadmap/BgHeroMob.png')]"
  >
    <!-- Video container -->
    <div
      class="absolute w-full h-full max-w-[1025px] bottom-[120px] max-h-[515px] 2xl:max-h-[1050px] 2xl:max-w-[1820px] 2xl:h-[62%] max-xl:h-[370px] max-[400px]:px-4 max-[400px]:bottom-[130px] max-md:w-screen max-md:max-w-[800px] max-md:max-h-[350px] max-[400px]:max-h-[180px] max-md:bottom-0 z-[1] overflow-hidden rounded-md right-1/2 translate-x-1/2"
    >
      <!-- Wrapper for object-fill behavior -->
      <div
        class="absolute inset-0 w-full h-full max-[400px]:w-[95%] max-[400px]:mx-auto"
      >
        <!-- <iframe
          ref="videoIframe"
          src="https://player.vimeo.com/video/1147054834?h=e62c5467b8&autoplay=1&loop=1&muted=0&autopause=0&controls=0&playsinline=1"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          class="w-full h-full"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        ></iframe> -->

        <iframe
          ref="videoIframe"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/FxYGETaP3yo?si=pFqSHKlnCePAKabJ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="w-full h-full"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        ></iframe>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 z-[2] bg-gradient-to-t from-[#00000060] via-[#00000010] to-transparent pointer-events-none"
      ></div>
    </div>

    <div
      class="w-full h-auto absolute bottom-0 z-10 right-1/2 translate-x-1/2 min-w-[1200px] max-md:min-w-[600px]"
    >
      <img :src="Seats" class="object-contain w-full" />
    </div>

    <div
      class="title max-w-[700px] max-sm:max-w-[300px] text-[32px] max-sm:text-[22px] z-30"
    >
      {{ t("roadmap.welcome") }}
    </div>
  </div>
</template>
