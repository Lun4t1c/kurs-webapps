<template>
  <div class="flex fixed top-0 w-full h-16 z-20">
    <nav class="nav-containter flex flex-row bg-purple-900 text-white w-full">
      <a class="nav-item" href="/">
        <div class="nav-text">Home</div>
      </a>
    </nav>
  </div>
</template>

<style>
/* Assuming your base styles are reset or defined elsewhere */
body {
  margin: 0;
  padding: 0;
}

.flex {
  display: flex;
  background-color: #2e035f;
}

.fixed {
  position: fixed;
}

.top-0 {
  top: 0;
}

.w-full {
  width: 100%;
}

.h-16 {
  height: 4rem; /* Assuming the base font size is 16px, so 4rem equals 64px */
}

.z-20 {
  z-index: 20;
}

.nav-container {
  display: flex;
  flex-direction: row;
  background-color: #6b46c1; /* Tailwind color: bg-purple-900 */
  color: #fff; /* Tailwind color: text-white */
  width: 100%;
}

.nav-item {
  text-decoration: none;
  color: inherit;
}

.nav-text {
  padding: 1rem; /* Assuming you want some padding around the text */
}

/* You can add more styles as needed */

.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  padding-left: 1rem;
  padding-right: 1rem;

  max-width: 100%;
}

@media (max-width: 1110px) {
  .nav-item {
    padding-right: 0;
  }

  .nav-text {
    display: none;
  }

  .nav-containter {
    justify-content: space-between;
  }
}

.nav-item:hover {
  background: #2e035f;
}

.nav-item:active {
  background: #4b2279;
}

.nav-item-icon {
  max-height: 1.5rem;
  margin-right: 0.5rem;
}
</style>