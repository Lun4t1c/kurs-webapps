<template>
  <div>
    <div :class="{ 'menu-hidden': isMenuHidden }" class="side-menu">
      <button @click="toggleMenu">
        <transition name="icon-fade" mode="out-in">
          <font-awesome-icon
            :key="selectedIcon"
            :icon="selectedIcon"
            class="icon-transition h-8 text-blue-50 hover:text-blue-400"
          />
        </transition>
      </button>

      <div class="flex flex-col">
        <div class="divider-h"></div>
        
        <font-awesome-icon
          icon="phone"
          class="icon-transition w-6 m-1 text-blue-50"
        />
        <div>{{ t("sideMenu.callsInProgress") }}</div>

        <div v-for="(item, index) in callsInProgress" :key="index">
          <CallInProgressComponent :callItem="item" />
        </div>
      </div>

      <div class="flex flex-col">
        <div class="divider-h"></div>

        <div class="flex">
          <font-awesome-icon
            icon="clock"
            class="icon-transition w-6 m-1 text-blue-50"
          />
          <div>{{ t("sideMenu.callsHistory") }}</div>
        </div>

        <div v-for="(item, index) in callsHistory" :key="index">
          <HistoryItemComponent :historyItem="item" />
        </div>
      </div>

      <div class="divider-h"></div>

      <div
        :class="{ 'flex-col': isMenuHidden, 'flex-row': !isMenuHidden }"
        class="flex"
      >
        <button class="w-6 m-1" @click="switchLocale('en')">
          <img :src="EnglishIcon" />
        </button>
        <button class="w-6 m-1" @click="switchLocale('pl')">
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
    callsInProgress.value.push({ id: callId, number: number });
  });

  socket.on("newHistoryItem", (item) => {
    callsHistory.value.push(item);
  });

  socket.on("statusUpdate", (callId, newStatus) => {
    switch (newStatus) {
      case "NEW":
        break;
    }
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
    if (Array.isArray(data)) {
      // `data` is an array of objects
      data.forEach(x => {
        console.log(x);
        callsHistory.value.push(x);
      })
      console.log('calls', callsHistory.value);
    } else {
      console.error("The response data is not an array.");
    }
  } else {
    console.error("Failed to fetch data from the server.");
  }
  //callsHistory.value = await response.json();
};
</script>

<style>
.side-menu {
  width: 200px;
  height: 100%;
  padding: 0.5rem;
  background-color: #333;
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

/* Add styles for the transition */
.icon-transition-enter-active,
.icon-transition-leave-active {
  transition: opacity 2.5s;
}
.icon-transition-enter, .icon-transition-leave-to /* .icon-transition-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
