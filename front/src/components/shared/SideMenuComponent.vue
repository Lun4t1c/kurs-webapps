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

      <button class="btn-standard" @click="switchLocale('en')">English</button>

      <div class="divider-h"></div>

      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";

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
