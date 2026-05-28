<script setup lang="ts">
import { onMounted } from 'vue'

import f0 from '@/assets/radar/radar_0.svg'
import f1 from '@/assets/radar/radar_1.svg'
import f2 from '@/assets/radar/radar_2.svg'
import f3 from '@/assets/radar/radar_3.svg'
import f4 from '@/assets/radar/radar_4.svg'
import f5 from '@/assets/radar/radar_5.svg'
import f6 from '@/assets/radar/radar_6.svg'
import f7 from '@/assets/radar/radar_7.svg'
import radarBg from '@/assets/radar_background.svg'

import icox from '@/assets/iconx.svg'
import iconds from '@/assets/iconds.svg'
import icontg from '@/assets/iconTG.png'
import iconton from '@/assets/iconTON.png'

onMounted(() => {
  const imagesToPreload = [
    f0, f1, f2, f3, f4, f5, f6, f7, radarBg,
    icox, iconds, icontg, iconton
  ]

  imagesToPreload.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})
</script>

<template>
  <router-view />

  <div class="landscape-overlay">
    <div class="landscape-content">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 4V20C7 21.1046 7.89543 22 9 22H15C16.1046 22 17 21.1046 17 20V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4Z" stroke="#FFDA7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 18H12.01" stroke="#FFDA7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 9C20 9 22 11 22 12C22 13 20 15 20 15" stroke="#FFDA7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 15C4 15 2 13 2 12C2 11 4 9 4 9" stroke="#FFDA7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h2>Поверните телефон</h2>
      <p>Для корректной работы приложения используйте вертикальную ориентацию.</p>
    </div>
  </div>
</template>



<style>
#tc-widget-root {
    position: relative;
    z-index: 99999 !important;
}

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

.landscape-overlay {
  display: none; /* По умолчанию скрыто */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #212121; /* Под твой дизайн */
  z-index: 999999; /* Поверх абсолютно всего */
  justify-content: center;
  align-items: center;
}

.landscape-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 20px;
}

.landscape-content h2 {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: clamp(20px, 5vw, 24px);
  font-weight: 600;
}

.landscape-content p {
  color: #888888;
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: clamp(14px, 4vw, 16px);
  line-height: 1.5;
  max-width: 80%;
}

@media screen and (max-width: 1000px) and (max-height: 600px) and (orientation: landscape) {
  .landscape-overlay {
    display: flex !important;
  }
}
</style>