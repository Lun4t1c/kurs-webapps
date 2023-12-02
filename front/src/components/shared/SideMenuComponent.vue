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

      <div class="divider-h"></div>

      <div class="flex">
        <font-awesome-icon
          icon="phone"
          class="icon-transition w-6 m-1 text-blue-50"
        />
        <div>{{ t("sideMenu.callsInProgress") }}</div>
      </div>

      <div class="divider-h"></div>

      <div class="flex flex-col">
        <div class="flex">
          <font-awesome-icon
            icon="clock"
            class="icon-transition w-6 m-1 text-blue-50"
          />
          <div>{{ t("sideMenu.callsHistory") }}</div>
        </div>

        <HistoryItemComponent :historyItem="{number: '434234', date: new Date()}" />
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
import { ref } from "vue";
import PolishIcon from "../../assets/icons/polish.png";
import EnglishIcon from "../../assets/icons/english.png";
import HistoryItemComponent from "../shared/HistoryItemComponent.vue";

const i18nInstance = useI18n();
const isMenuHidden = ref(true);
const selectedIcon = ref("bars");

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
