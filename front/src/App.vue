<template>
  <div
    class="flex flex-row justify-center bg-slate-900 h-screen text-yellow-100 font-class"
  >
    <div class="flex m-14">
      <router-view />
      <SideMenuComponent />
    </div>
  </div>
</template>

<script setup>
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
  background: rgb(11, 72, 177);
  color: #fff;
  border-radius: 20px;
  width: fit-content;
}

.btn-standard:hover {
  background: rgb(9, 43, 105);
}

.btn-standard:active {
  background: rgb(57, 92, 158);
}

.btn-standard:disabled,
.btn-standard[disabled]{
	background: #636161;
}

.btn-danger {
  vertical-align: middle;
  background: #850404;
  color: #fff;
  border-radius: 5px;
  width: fit-content;
}

.btn-danger:hover {
  background: #d20606;
}

.divider-h {
  width: 100%;
  height: 0.2rem;
  background-color: wheat;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
