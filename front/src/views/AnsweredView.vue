<template>
  <div class="box">
    <div class="text">{{ t("messages.callEnded") }}</div>
    <div class="call-button-bottom" @click="$router.push(`/`)">
      {{ t("messages.tryAgain") }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>