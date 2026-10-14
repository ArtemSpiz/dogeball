<template>
  <div
    class="flex flex-col w-full rounded-3xl text-white font-normal relative p-6 max-md:p-5 items-center gap-5 text-center border border-white/20 bg-[rgba(23,138,184,0.40)] shadow-[0_0_14px_0_#5464D8] backdrop-blur-[5px]"
    :aria-busy="status === 'checking' || claiming"
  >
    <!-- Status -->
    <div class="flex flex-col items-center gap-3" aria-live="polite">
      <div
        :class="[
          'flex items-center justify-center w-14 h-14 rounded-full border',
          statusTone,
        ]"
      >
        <Spinner v-if="status === 'checking'" :size="7" />
        <DogeballIcon v-else-if="status === 'disconnected'" :size="32" />
        <component :is="statusIcon" v-else class="w-7 h-7" />
      </div>
      <h3
        class="font-grotesk text-2xl max-md:text-xl font-semibold leading-tight"
      >
        {{ t(`claim.${status}.title`) }}
      </h3>
      <p
        class="font-grotesk text-sm sm:text-base text-white/80 leading-[140%] max-w-[400px]"
      >
        {{ t(`claim.${status}.text`) }}
      </p>
    </div>

    <!-- Amount -->
    <div
      v-if="showAmount"
      class="flex flex-col items-center gap-2 self-stretch p-4 rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)]"
    >
      <span
        class="text-white/70 font-grotesk text-xs sm:text-sm font-medium uppercase tracking-[0.06em]"
      >
        {{
          status === "claimed"
            ? t("claim.claimedAmount")
            : t("claim.claimableAmount")
        }}
      </span>
      <span
        class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-grotesk text-2xl sm:text-3xl font-semibold leading-none"
      >
        <DogeballIcon :size="28" />
        <span class="tabular-nums">{{ formattedAmount }}</span>
        <span class="text-[#59A6FD] text-base sm:text-lg">
          {{ CLAIM_TOKEN_SYMBOL }}
        </span>
      </span>
    </div>

    <!-- Action -->
    <Button
      variant="primary"
      class="w-full h-11 px-6 !bg-[#EB4102] !bg-none text-base font-semibold"
      style="border-radius: 80px"
      :disabled="action.disabled"
      @click="action.onClick"
    >
      <Spinner v-if="claiming" :size="5" />
      <span v-else>{{ action.label }}</span>
    </Button>

    <p
      v-if="status === 'eligible'"
      class="-mt-1 text-white/60 font-grotesk text-xs sm:text-sm leading-[140%]"
    >
      {{ t("claim.gasNote") }}
    </p>
  </div>
</template>

<script setup>
/* global BigInt */
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { formatUnits } from "viem";
import claimAbi from "@/abi/claim.json";
import {
  CLAIM_CHAIN_ID,
  CLAIM_CONTRACT_ADDRESS,
  CLAIM_TOKEN_DECIMALS,
  CLAIM_TOKEN_SYMBOL,
} from "@/config/claim";
import { getWagmiConfig, useToast, useWallet } from "@/composables";
import { getPublicClient } from "@/presale-gg/web3";
import { formatPrecision } from "@/utils/format";
import CheckCircle from "@/assets/icons/CheckCircle.vue";
import XCircle from "@/assets/icons/XCircle.vue";
import ErrorIcon from "@/assets/icons/Error.vue";
import { Button, Spinner } from "../PresaleWidget/ui";
import { DogeballIcon } from "../PresaleWidget/icons";

const { t } = useI18n();
const { address, isConnected, showConnectWalletModal } = useWallet();
const toast = useToast();

// The connected wallet's { amount, proof } from public/claims/, or null if it isn't on the list
const userClaim = ref(null);
// From the contract: true/false once read, undefined while unknown, so a failed read
// never shows the claim button
const hasClaimed = ref(undefined);
const checking = ref(false);
const readError = ref(false);
const claiming = ref(false);

// Claims are split by the first two hex characters of the address (scripts/build-claims.mjs)
const fetchClaim = async (account) => {
  const key = account.toLowerCase();
  const res = await fetch(
    `${import.meta.env.BASE_URL}claims/${key.slice(2, 4)}.json`
  );
  if (!res.ok) throw new Error(`Claim list request failed (${res.status})`);
  const chunk = await res.json();
  return chunk[key] ?? null;
};

let checkId = 0;
const checkClaim = async () => {
  const id = ++checkId;
  const account = address.value;
  userClaim.value = null;
  hasClaimed.value = undefined;
  readError.value = false;
  checking.value = Boolean(account);
  if (!account) return;

  try {
    const entry = await fetchClaim(account);
    if (id !== checkId) return;
    userClaim.value = entry;
    if (!entry) return;

    const client = await getPublicClient(CLAIM_CHAIN_ID);
    const claimed = await client.readContract({
      address: CLAIM_CONTRACT_ADDRESS,
      abi: claimAbi,
      functionName: "hasClaimed",
      args: [account],
    });
    if (id === checkId) hasClaimed.value = claimed;
  } catch (err) {
    if (id !== checkId) return;
    console.warn("Could not check claim status:", err);
    readError.value = true;
  } finally {
    if (id === checkId) checking.value = false;
  }
};

// First error in the cause chain with the given viem error name. Matching on name
// avoids importing viem's error classes (and their ABI decoding) into the homepage bundle.
const findCause = (err, name) => {
  for (let e = err; e; e = e.cause) if (e.name === name) return e;
  return null;
};

const isUserRejection = (err) =>
  Boolean(findCause(err, "UserRejectedRequestError")) ||
  /user (rejected|denied)|rejected the request/i.test(err?.message ?? "");

const claimTokens = async () => {
  const entry = userClaim.value;
  const account = address.value;
  if (claiming.value || !entry || !account || hasClaimed.value !== false) return;
  claiming.value = true;

  try {
    // Loaded on click so the transaction code stays out of the homepage bundle
    const [config, { getChainId, switchChain, writeContract }] =
      await Promise.all([getWagmiConfig(), import("@wagmi/core")]);
    if (getChainId(config) !== CLAIM_CHAIN_ID) {
      try {
        await switchChain(config, { chainId: CLAIM_CHAIN_ID });
      } catch (err) {
        console.warn("Could not switch to Ethereum:", err);
        if (isUserRejection(err)) toast.showInfo(t("claim.toast.cancelled"));
        else toast.showError(t("claim.toast.switchNetwork"));
        return;
      }
    }

    const client = await getPublicClient(CLAIM_CHAIN_ID);
    const args = [BigInt(entry.amount), entry.proof];
    let gas;
    try {
      const estimate = await client.estimateContractGas({
        address: CLAIM_CONTRACT_ADDRESS,
        abi: claimAbi,
        functionName: "claim",
        args,
        account,
      });
      gas = (estimate * 15n) / 10n;
    } catch (err) {
      // A revert means the claim would fail on-chain, so don't ask the wallet to send it
      if (findCause(err, "ContractFunctionRevertedError")) throw err;
      console.warn("Could not estimate claim gas:", err);
    }

    const hash = await writeContract(config, {
      chainId: CLAIM_CHAIN_ID,
      account,
      address: CLAIM_CONTRACT_ADDRESS,
      abi: claimAbi,
      functionName: "claim",
      args,
      ...(gas ? { gas } : {}),
    });
    const receipt = await client.waitForTransactionReceipt({
      hash,
      timeout: 10 * 60_000,
    });
    if (receipt.status !== "success") {
      throw new Error(`Claim transaction ${hash} reverted`);
    }

    if (address.value === account) hasClaimed.value = true;
    toast.showSuccess(t("claim.toast.success"));
  } catch (err) {
    console.error("Claim error:", err);
    const revert = findCause(err, "ContractFunctionRevertedError");
    if (revert?.data?.errorName === "AlreadyClaimed") {
      if (address.value === account) hasClaimed.value = true;
      toast.showInfo(t("claim.toast.alreadyClaimed"));
    } else if (isUserRejection(err)) {
      toast.showInfo(t("claim.toast.cancelled"));
    } else if (findCause(err, "ChainMismatchError")) {
      toast.showError(t("claim.toast.switchNetwork"));
    } else if (findCause(err, "WaitForTransactionReceiptTimeoutError")) {
      toast.showInfo(t("claim.toast.pending"));
    } else if (revert) {
      toast.showError(t("claim.toast.unavailable"));
    } else {
      toast.showError(t("claim.toast.failed"));
    }
  } finally {
    claiming.value = false;
  }
};

const status = computed(() => {
  if (!isConnected.value || !address.value) return "disconnected";
  if (checking.value) return "checking";
  if (readError.value) return "error";
  if (!userClaim.value) return "notEligible";
  if (hasClaimed.value === true) return "claimed";
  if (hasClaimed.value === false) return "eligible";
  return "error";
});

const statusIcon = computed(
  () =>
    ({
      eligible: CheckCircle,
      claimed: CheckCircle,
      notEligible: XCircle,
      error: ErrorIcon,
    })[status.value]
);

const statusTone = computed(
  () =>
    ({
      eligible: "border-[#59A6FD]/60 bg-[#59A6FD]/15 text-[#59A6FD]",
      claimed: "border-emerald-400/60 bg-emerald-400/15 text-emerald-300",
      notEligible: "border-white/25 bg-white/10 text-white/70",
      error: "border-amber-400/60 bg-amber-400/15 text-amber-300",
    })[status.value] ?? "border-white/25 bg-white/10 text-white"
);

const showAmount = computed(
  () => status.value === "eligible" || status.value === "claimed"
);

const formattedAmount = computed(() =>
  userClaim.value
    ? formatPrecision(
        formatUnits(BigInt(userClaim.value.amount), CLAIM_TOKEN_DECIMALS),
        0,
        2
      )
    : ""
);

const action = computed(() => {
  switch (status.value) {
    case "disconnected":
      return {
        label: t("claim.disconnected.button"),
        onClick: showConnectWalletModal,
      };
    case "eligible":
      return {
        label: t("claim.eligible.button"),
        onClick: claimTokens,
        disabled: claiming.value,
      };
    case "error":
      return { label: t("claim.error.button"), onClick: checkClaim };
    default:
      return { label: t(`claim.${status.value}.button`), disabled: true };
  }
});

watch(address, checkClaim, { immediate: true });
</script>
