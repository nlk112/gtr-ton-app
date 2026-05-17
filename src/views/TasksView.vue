<script setup lang="ts">
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'

import icox from '@/assets/iconx.svg'
import iconds from '@/assets/iconds.svg'
import icontg from '@/assets/iconTG.png'

const friends = ref([
    { id: 1, name: 'Подписаться на твиттер', avatar: icox },
    { id: 2, name: 'Подписаться на дискорд', avatar: iconds },
    { id: 3, name: 'Подписаться на телеграмм', avatar: icontg },
    { id: 4, name: 'Ожидает финального текста', avatar: iconds },
    { id: 5, name: 'Ожидает финального текста', avatar: icox },
    { id: 6, name: 'Ожидает финального текста', avatar: iconds },
    { id: 7, name: 'Ожидает финального текста', avatar: icox },
])

const isTaskModalOpen = ref(false)
const selectedTask = ref('')

const openTaskModal = (taskName: string) => {
    selectedTask.value = taskName
    isTaskModalOpen.value = true
}

const closeTaskModal = () => {
    isTaskModalOpen.value = false
}

const handleCheckCompletion = () => {
    console.log('Проверка выполнения:', selectedTask.value)
    closeTaskModal()
}

const handleGetReward = () => {
    console.log('Получение награды:', selectedTask.value)
    closeTaskModal()
}
</script>

<template>
    <div class="map-page">
        <h1 class="page-title">Bonus rewards</h1>

        <div class="invite-banner">
            <div class="invite-top-row">
                <img src="@/assets/coins.svg" class="invite-icon" alt="bonus" />
                <p class="invite-text">Выполняйте простые задания, чтобы получить бонус</p>               
            </div>
        </div>
        
        <div class="friends-header">
            Tasks
            <span class="tasks-counter">10/12</span>
        </div>

        <div class="friends-container">
            <div 
                v-for="friend in friends" 
                :key="friend.id" 
                class="friend-card"
                @click="openTaskModal(friend.name)"
            >
                <img :src="friend.avatar" class="friend-avatar" alt="icon" />
                <span class="friend-name">{{ friend.name }}</span>
            </div>
        </div>

        <!-- Модальное окно для таска -->
        <InviteModal
            :is-open="isTaskModalOpen"
            title="Подробное описание задания"
            description="описание задания\nописание задания\nописание задания\nописание задания\nописание задания\nописание задания\nописание задания\nописание задания\nописание задания"
            primary-button-text="проверить выполнение"
            secondary-button-text="получить награду"
            @close="closeTaskModal"
            @primary-click="handleCheckCompletion"
            @secondary-click="handleGetReward"
        />

        <BottomNav />
    </div>
</template>

<style scoped>
/* ... ВЕСЬ ТВОЙ СУЩЕСТВУЮЩИЙ CSS БЕЗ ИЗМЕНЕНИЙ ... */

.map-page {
    width: 100%;
    height: 100vh;
    background:
        linear-gradient(
            0deg, 
            rgb(66, 66, 66, 0),
            rgb(66, 66, 66, 0.2),
            rgb(66, 66, 66, 0.4),
            rgb(66, 66, 66, 0.6),
            rgb(66, 66, 66, 0.8),
            rgb(66, 66, 66)
        ),
        #212121;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.page-title {
    position: fixed;
    top: 3.5vh;
    left: 15vw;
    width: 70dvw;
    font-family: 'Inter', sans-serif;
    font-weight: 330;
    color: #ffffff;
    text-align: center;
    margin: 0;
    font-size: clamp(24px, 10vw, 128px); 
}

.friends-container {
    position: fixed;
    top: 35.7vh;
    left: 3%;
    width: 94%;
    height: 50vh;
    background-color: #ff000000;  
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.3vh;

    -ms-overflow-style: none; 
    scrollbar-width: none;  
}

.friends-container::-webkit-scrollbar {
    display: none;
}

.friend-card {
    flex-shrink: 0;
    flex-grow: 0;  
    background-color: rgba(217, 217, 217, 0.4);
    border-radius: 999px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    gap: 5%;
    height: 11.2vh;
    transition: transform 0.2s;
    cursor: pointer; /* ← Добавлено: показывает что можно кликнуть */
}

.friend-card:active {
    transform: scale(0.98);
}

.friend-avatar {
    height: 9.7vh;
    object-fit: contain;
    flex-shrink: 0;
    margin-left: -3%;
}

.friend-name {
    font-family: 'Inter', sans-serif;
    font-size: clamp(24px, 5vw, 22px); 
    color: #FFFFFF;
    font-weight: 300;
}

.invite-banner {
    position: fixed;
    top: 12vh;
    left: 50%;
    transform: translateX(-50%);
    
    width: 92vw;
    min-height: 15vh;
    
    background-color: rgba(255, 218, 122, 0.4);

    border-radius: clamp(16px, 10vw, 50px);
    padding: 1.4vh 6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3.5vh;
    z-index: 6;
    box-sizing: border-box;
    
    max-height: 24vh;
    overflow: hidden;
}

.invite-top-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 0.5vh;
    width: 100%;
}

.invite-icon {
    width: 23%;
    flex-shrink: 0; 
}

.invite-text {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 4.5vw, 32px);
    font-weight: 400;
    color: #ffffff;
    line-height: 1.3;
    flex: 1;
    text-align: center;
}

.friends-header {
    position: fixed;
    top: 30.5vh;
    left: 4%;
    width: 92vw;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-size: clamp(18px, 7vw, 96px);
    font-weight: 300;
    color: #FFFFFF;
    z-index: 10;
}

.tasks-counter {
    font-size: clamp(14px, 4vw, 16px);
    color: #888888;
    font-weight: 400;
}
</style>