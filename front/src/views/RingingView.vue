<template>
  <div class="box">
    <div class="text-2xl text-white">
      {{ t("messages.callStarting") }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>