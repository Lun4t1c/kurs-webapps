<template>
  <div class="flex fixed top-0 h-16 z-20 bg-purple-900 text-white w-full">
    <nav class="nav-containter flex flex-row">
      <a class="nav-item" href="/"> Home </a>
    </nav>
  </div>
</template>

<style>
.nav-container {
  display: flex;
  flex-direction: row;
  background-color: #0c0a0f;
  color: #fff;
  width: 100%;
}

.nav-item {
  text-decoration: none;
  color: inherit;
}

.nav-text {
  padding: 1rem;
}

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