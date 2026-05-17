<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    import homeActive from '@/assets/icons/home_active.svg'
    import homeInactive from '@/assets/icons/home_inactive.svg'

    import mapActive from '@/assets/icons/map_active.svg'
    import mapInactive from '@/assets/icons/map_inactive.svg'

    import settingsActive from '@/assets/icons/settings_active.svg'
    import settingsInactive from '@/assets/icons/settings_inactive.svg'
</script>

<template>
    <nav class="bottom-nav">
        <button class="nav-btn" @click="router.push('/')">
            <img :src="route.path === '/' ? homeActive : homeInactive" alt="" />
        </button>
        <button class="nav-btn" @click="router.push('map')">
            <img :src="route.path === '/map' ? mapActive : mapInactive" alt="" />
        </button>
        <button class="nav-btn" @click="router.push('tasks')">
            <img :src="route.path === '/tasks' ? settingsActive : settingsInactive" alt="" />
        </button>
    </nav>
</template>

<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: min(11.2vh, 105px);
    background-color: #FFDA7A;
    z-index: 100;
    border-radius: 50px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 21%;
}

.nav-btn {
  height: 61%; 
  aspect-ratio: 1 / 1;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-btn:active {
  transform: scale(0.9);
}
</style>