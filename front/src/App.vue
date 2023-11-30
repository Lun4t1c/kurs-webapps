<template>
  <div class="flex flex-row justify-center bg-slate-900 h-screen text-yellow-100 font-class">
    <NavComponent />
    <router-view />
  </div>
</template>

<script setup>
  import NavComponent from './components/shared/NavComponent.vue'
</script>

<style>
.font-class{
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.clearfix:after {
  content: "";
  clear: both;
  display: table;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 1.15em;
}
.box {
  text-align: center;
}
.text {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
.header,
.form-number {
  margin-bottom: 50px;
}
.header {
  margin-top: 50px;
  font-size: 38px;
  font-weight: 600;
}
.form-label {
  font-size: 32px;
  font-weight: 600;
}
.form-number {
  width: 400px;
  height: 55px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 28px;
  letter-spacing: 2px;
  text-align: center;
}
.call-button,
.call-button-bottom {
  width: 300px;
  height: 75px;
  vertical-align: middle;
  font-size: 22px;
  font-weight: 600;
  line-height: 75px;
  background: #008000;
  cursor: pointer;
  color: #fff;
  border-radius: 20px;
  margin: 0 auto;
}

.call-button-bottom {
  margin-top: 300px;
}
.call-button:hover {
  filter: brightness(80%);
}
.error {
  border: 1px solid #ff0000;
  background: rgb(255, 170, 170);
}
</style>
