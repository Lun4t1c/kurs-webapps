<template>
  <div
    class="flex flex-row justify-center bg-slate-900 h-screen text-yellow-100 font-class"
  >
    <NavComponent />

    <div class="flex m-14">
      <router-view />
      <SideMenuComponent />
    </div>
  </div>
</template>

<script setup>
import NavComponent from "./components/NavComponent.vue";
import SideMenuComponent from "./components/SideMenuComponent.vue";
</script>

<style>
.font-class {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.btn-standard {
  vertical-align: middle;
  font-weight: 600;
  line-height: 75px;
  background: #008000;
  cursor: pointer;
  color: #fff;
  border-radius: 20px;
  width: fit-content;
}

.divider-h {
  width: 100%;
  height: 0.2rem;
  background-color: wheat;
}
</style>
