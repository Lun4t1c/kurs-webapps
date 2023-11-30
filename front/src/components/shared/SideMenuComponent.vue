<template>
  <div>
    <button @click="toggleMenu">Toggle Menu</button>
    <div :class="{ 'menu-hidden': isMenuHidden }" class="side-menu">
      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
    <div class="main-content">
      <p>Main Content Here</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuHidden: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuHidden = !this.isMenuHidden;
    },
  },
};
</script>

<style>
.side-menu {
  width: 200px;
  height: 100%;
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
</style>
