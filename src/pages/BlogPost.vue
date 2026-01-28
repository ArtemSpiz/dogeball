<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="min-h-screen bg-[#070B1E] pt-[140px] max-md:pt-[120px] pb-20">
    <div class="max-w-[1200px] mx-auto px-5">
      <!-- Blog Post Content -->
      <article class="max-w-[800px] mx-auto">
        <!-- Title -->
        <h1 class="title mb-8 text-left">
          What is Layer 2, and Why Does it Matter?
        </h1>

        <!-- Content -->
        <div class="description text-base max-md:text-sm leading-relaxed space-y-6 text-white/90">
          <p>
            Think of the Ethereum Mainnet as a busy, expensive highway. Layer 2 (L2) is like an express lane built right above it. It handles the "heavy lifting" of thousands of transactions at lightning speed, then bundles them together and sends a single report back to the main highway.
          </p>
          
          <p>
            For a project like DOGEBALL, which operates on a custom EVM-compatible Layer 2 known as DogeChain, this technology is the "secret sauce." It allows for:
          </p>

          <ul class="list-disc list-inside space-y-3 ml-4">
            <li>
              <strong>Micro-transactions:</strong> Rewarding players with tiny amounts of tokens without fees eating the profit.
            </li>
            <li>
              <strong>Instant Feedback:</strong> When you throw a "ball" in the game, the blockchain records it in under 2 seconds.
            </li>
            <li>
              <strong>Scalability:</strong> Thousands of players can compete simultaneously without slowing down the network.
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
