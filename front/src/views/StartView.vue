<template>
  <div>
    <div class="header clearfix">{{ t('messages.callYouIn26s') }}</div>
    <label class="form-label clearfix" for="form-number">
      {{ t('messages.enterNumber') }}
    </label>
    <input v-model="number" class="form-number clearfix" id="form-number" />
    <div class="call-button" @click="call">{{ t('messages.callNow') }}</div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n' 
import { ref } from 'vue';

const {t} = useI18n();
const number = ref('');

const call = async () => {
  const responseStream = await fetch(`${process.env.VUE_APP_SERVER_URL}/call`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ number: number.value }),
  });

  const response = await responseStream.json();
  this.$router.push({ name: 'ringing', params: { callsId: response.id } });
};
</script>
