<template>
  <div
    class="flex flex-col p-5 m-5 rounded-lg text-2xl font-bold text-black bg-yellow-500"
  >
    <div class="mb-5">{{ t("messages.callYouIn26s") }}</div>

    <div class="flex flex-col items-center">
      <label class="form-label" for="form-number">
        {{ t("messages.enterNumber") }}
      </label>
      <input v-model="number" class="form-number" id="form-number" />
    </div>

    <button class="btn-standard self-center m-5 px-5" @click="call">
      {{ t("messages.callNow") }}
    </button>
    <button class="btn-standard self-center m-5 px-5" @click="testCall">
      TEST
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
//import router from "../router";
import { toast } from "vue3-toastify";
const { t } = useI18n();

const number = ref("");

const testCall = async () => {
  const responseStream = await fetch(
    `${process.env.VUE_APP_SERVER_URL}/history`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  console.log(await responseStream.json());
};

const call = async () => {
  const toastId = toast(t("toasts.calling"), {
    autoClose: 8000,
    position: toast.POSITION.TOP_RIGHT,
  });

  const responseStream = await fetch(`${process.env.VUE_APP_SERVER_URL}/call`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ number: number.value }),
  });

  const response = await responseStream.json();
  if (response.status === "FAILED") {
    console.error("Could not call");
    toast.update(toastId, {
      type: toast.TYPE.INFO,
      render: t("toasts.couldNotCall"), // ToastContent<T>
    });
  } else {
    toast.update(toastId, { content: "Nie działa ;(" });
  }
};
</script>
