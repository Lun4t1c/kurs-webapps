<template>
  <div class="box">
    <div class="text">{{ t("messages.callEnded") }}</div>
    <div class="call-button-bottom" @click="$router.push(`/`)">
      {{ t("messages.tryAgain") }}
    </div>
  </div>
</template>