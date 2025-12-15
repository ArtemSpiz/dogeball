<script setup>
  import { presaleApi } from '@/api';
  import { useAccount, useToast } from '@/composables';
  import { ref } from 'vue';
  import Modal from '../ui/Modal.vue';
  import Input from '../ui/Input.vue';
  import Button from '../ui/Button.vue';
  import Spinner from '../ui/Spinner.vue';

  const props = defineProps({
    open: {type: Boolean, required: true},
  })
  const emit = defineEmits(["close"])

  const loading = ref(false)
  const name = ref("")
  const email = ref("")
  const mobile = ref("")
  const accountData = useAccount()
  const { showSuccess, showInfo, showError } = useToast()

  const submit = async () => {
    if (loading.value) return
    loading.value = true;
    try {
      await presaleApi.postLeads({
        email: email.value,
        name: name.value,
        mobile: mobile.value,
        wallet_address: accountData.address.value ?? undefined,
      });
      showSuccess("Successfully submitted details");
      emit("close")
    } catch (err) {
      const msg = presaleApi.getApiErrorMessage(err, "Error submitting details");
      if (msg.toLowerCase() === "user details already exist") {
        showInfo(msg);
        emit("close")
        loading.value = false;
        return
      }
      showError(msg);
    }
    loading.value = false;
  };

  const handleNameInput = (e) => name.value = e.currentTarget.value;
  const handleEmailInput = (e) => email.value = e.currentTarget.value;
  const handleMobileInput = (e) => mobile.value = e.currentTarget.value;

</script>

<template>
  <Modal
    title="Stay in Touch" 
    :open="props.open"
    @close="$emit('close')"
  >
    <p>
      Submit your contact details to keep up to date with the latest DOGEBALL
      news
    </p>
    <Input
      label="Name"
      :value="name"
      @input="handleNameInput"
      placeholder="John Smith"
    />
    <Input
      label="Email"
      :value="email"
      @input="handleEmailInput"
      placeholder="john.smith@email.com"
    />
    <Input
      label="Phone Number (optional)"
      :value="mobile"
      @input="handleMobileInput"
      placeholder="(555) 555-1234"
    />
    <Button @click="submit" variant="primary">
      <Spinner v-if="loading" :size="5" />
      <template v-else>Submit</template>
    </Button>
  </Modal>
</template>