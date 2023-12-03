<template>
  <div>
    <div :class="{ 'menu-hidden': isMenuHidden }" class="side-menu">
      <button @click="toggleMenu">
        <transition name="icon-fade" mode="out-in">
          <font-awesome-icon
            :key="selectedIcon"
            :icon="selectedIcon"
            class="icon-transition h-12 text-blue-50 hover:text-blue-400"
          />
        </transition>
      </button>

      <div class="flex flex-col">
        <div class="divider-h"></div>

        <div class="flex">
          <font-awesome-icon
            icon="phone"
            class="icon-transition h-10 m-1 text-blue-50"
          />
          <div class="ml-3 text-2xl">
            {{ t("sideMenu.callsInProgress") }}
          </div>
        </div>

        <div
          v-if="callsInProgress.length === 0 && !isMenuHidden"
          class="self-center text-2xl"
        >
          {{ t("sideMenu.empty") }}
        </div>
        <div v-for="(item, index) in callsInProgress" :key="index">
          <CallInProgressComponent :callItem="item" />
        </div>
      </div>

      <div class="divider-h"></div>

      <div class="flex flex-col">
        <div class="flex">
          <font-awesome-icon
            icon="clock"
            class="icon-transition h-10 m-1 text-blue-50"
          />
          <div class="ml-3 text-2xl">{{ t("sideMenu.callsHistory") }}</div>
        </div>

        <div
          v-if="callsHistory.length === 0 && !isMenuHidden"
          class="self-center text-2xl"
        >
          {{ t("sideMenu.empty") }}
        </div>
        <div class="overflow-y-auto">
          <div v-for="(item, index) in callsHistory" :key="index" class="mb-1">
            <HistoryItemComponent
              :historyItem="item"
              :deleteCallback="() => deleteHistoryItem(item._id)"
            />
          </div>
        </div>
      </div>

      <div class="divider-h"></div>

      <div
        :class="{ 'flex-col': isMenuHidden, 'flex-row': !isMenuHidden }"
        class="flex"
      >
        <button class="w-8 m-1" @click="switchLocale('en')">
          <img :src="EnglishIcon" />
        </button>
        <button class="w-8 m-1" @click="switchLocale('pl')">
          <img :src="PolishIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref, onMounted } from "vue";
import io from "socket.io-client";
import PolishIcon from "../assets/icons/polish.png";
import EnglishIcon from "../assets/icons/english.png";
import CallInProgressComponent from "./shared/CallInProgressComponent.vue";
import HistoryItemComponent from "./shared/HistoryItemComponent.vue";

const i18nInstance = useI18n();
const isMenuHidden = ref(true);
const selectedIcon = ref("bars");
const callsInProgress = ref([]);
const callsHistory = ref([]);

onMounted(() => {
  startListeningStatusUpdate();
  fetchCallsHistory();
});

const toggleMenu = () => {
  isMenuHidden.value = !isMenuHidden.value;
  updateIcon();
};

const updateIcon = () => {
  selectedIcon.value = isMenuHidden.value ? "bars" : "arrow-right";
};

const switchLocale = (newLocale) => {
  i18nInstance.locale.value = newLocale;
};

const startListeningStatusUpdate = async () => {
  const socket = io(process.env.VUE_APP_SERVER_URL, {
    reconnection: false,
    transports: ["websocket", "polling"],
  });

  socket.on("newCall", (callId, number) => {
    callsInProgress.value.push({ id: callId, number: number, status: "NEW" });
  });

  socket.on("newHistoryItem", (item) => {
    callsHistory.value.unshift(item);
  });

  socket.on("statusUpdate", (callId, newStatus) => {
    callsInProgress.value = callsInProgress.value.map((call) => {
      if (call.id === callId) return { ...call, status: newStatus };
      return call;
    });
  });

  socket.on("callStopped", (callId) => {
    removeCallInProgress(callId);
  });
};

const fetchCallsHistory = async () => {
  const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/history`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    const data = await response.json();
    callsHistory.value = data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  } else {
    console.error("Failed to fetch data from the server.");
  }
};

const removeCallInProgress = async (callId) => {
  setTimeout(() => {
    callsInProgress.value = callsInProgress.value.filter(
      (call) => call.id !== callId
    );
  }, 1000);
};

const deleteHistoryItem = async (itemId) => {
  const responseStream = await fetch(
    `${process.env.VUE_APP_SERVER_URL}/history`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ documentId: itemId }),
    }
  );

  const response = await responseStream.json();
  if (response.status === "OK")
    callsHistory.value = callsHistory.value.filter(
      (call) => call._id !== itemId
    );
};
</script>

<style>
.side-menu {
  width: 300px;
  height: 100%;
  padding: 0.5rem;
  background-color: #080124;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 30;
}

.menu-hidden {
  transform: translateX(80%);
}

.main-content {
  margin-right: 200px;
  transition: margin-right 0.3s ease-in-out;
}

.menu-hidden + .main-content {
  margin-right: 0;
}

.icon-transition-enter-active,
.icon-transition-leave-active {
  transition: opacity 2.5s;
}

.icon-transition-enter, .icon-transition-leave-to {
  opacity: 0;
}
</style>
