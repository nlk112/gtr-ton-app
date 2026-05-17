<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-touch-callout: none;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  
  overscroll-behavior: none;
  
  -webkit-tap-highlight-color: transparent;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  pointer-events: none; 
}
</style>