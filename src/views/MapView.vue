<script setup lang="ts">
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'

import avatar0 from '@/assets/avatar_0.svg'

const friends = ref([
    { id: 1, name: 'Имя', avatar: avatar0 },
    { id: 2, name: 'Имя', avatar: avatar0 },
    { id: 3, name: 'Имя', avatar: avatar0 },
    { id: 4, name: 'Имя', avatar: avatar0 },
    { id: 5, name: 'Имя', avatar: avatar0 },
    { id: 6, name: 'Имя', avatar: avatar0 },
    { id: 7, name: 'Имя', avatar: avatar0 },
])

const isInviteModalOpen = ref(false)

const openInviteModal = () => {
    isInviteModalOpen.value = true
}

const closeInviteModal = () => {
    isInviteModalOpen.value = false
}

const handleInvitePrimaryClick = () => {
    console.log('Primary clicked')
    closeInviteModal()
}

const handleInviteSecondaryClick = () => {
    console.log('Secondary clicked')
    closeInviteModal()
}
</script>

<template>
    <div class="map-page">
        <h1 class="page-title">Friend List</h1>

        <div class="invite-banner">
            <div class="invite-top-row">
                <p class="invite-text">Пригласите друзей и зарабатывайте бесплатные токены</p>
                <img src="@/assets/arrow.svg" class="invite-icon" alt="arrow" />
            </div>
            <button class="invite-details" @click="openInviteModal">
                <span>Подробности</span>
                <div class="invite-chevron">
                    <img src="@/assets/chevron_down.svg" alt="" />
                </div>
            </button>

            <InviteModal
                :is-open="isInviteModalOpen"
                title="Подробности"
                description="Приглашайте друзей и получайте бонусы"
                primary-button-text="Пригласить друга"
                secondary-button-text="Закрыть"
                @close="closeInviteModal"
                @primary-click="handleInvitePrimaryClick"
                @secondary-click="handleInviteSecondaryClick"
            />
        </div>
        
        <div class="friends-header">
            Your friends({{ friends.length }})
        </div>

        <div class="friends-container">
            <div v-for="friend in friends" :key="friend.id" class="friend-card">
                <img :src="friend.avatar" class="friend-avatar" alt="avatar" />
                <span class="friend-name">{{ friend.name }}</span>
            </div>
        </div>
        <!-- Заглушка, потом здесь будет карта -->
        <BottomNav />
    </div>
</template>

<style scoped>
.map-page {
    width: 100%; height: 100vh;
    background: linear-gradient(0deg, rgba(66,66,66,0), rgba(66,66,66,0.2), rgba(66,66,66,0.4), rgba(66,66,66,0.6), rgba(66,66,66,0.8), rgb(66,66,66)), #212121;
    overflow: hidden; display: flex; flex-direction: column; align-items: center; position: relative;
}

.page-title {
    position: absolute; top: 3vh; left: 0; width: 100%;
    font-family: 'Inter', sans-serif; font-weight: 300; color: #ffffff; text-align: center; margin: 0;
    font-size: clamp(26px, 8vw, 42px); z-index: 10; pointer-events: none;
}

.invite-banner {
    position: absolute; top: 11vh; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 400px; background-color: rgba(255, 218, 122, 0.4);
    border-radius: 24px; padding: 15px 20px; display: flex; flex-direction: column; gap: 10px;
    z-index: 6; box-sizing: border-box;
}

.invite-top-row { display: flex; align-items: center; gap: 14px; }
.invite-icon { width: 40px; flex-shrink: 0; }
.invite-text { margin: 0; font-family: 'Inter', sans-serif; font-size: clamp(14px, 4vw, 16px); font-weight: 400; color: #1A1A1A; line-height: 1.3; flex: 1; }

.invite-details {
    background: none; border: none; padding: 0; margin-top: 5px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #1A1A1A; cursor: pointer;
}
.invite-chevron { width: 24px; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
.invite-chevron img { width: 100%; object-fit: contain; }

.friends-header {
    position: absolute; top: 31vh; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 400px; font-family: 'Inter', sans-serif;
    font-size: clamp(20px, 6vw, 28px); font-weight: 300; color: #FFFFFF; z-index: 10;
}

.friends-container {
    position: absolute; top: 37vh; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 400px; height: 48vh; background-color: transparent;
    overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: 12px;
    padding-bottom: 20px; -ms-overflow-style: none; scrollbar-width: none;
}
.friends-container::-webkit-scrollbar { display: none; }

.friend-card {
    flex-shrink: 0; background-color: rgba(217, 217, 217, 0.4); border-radius: 999px;
    padding: 12px 20px; display: flex; align-items: center; gap: 15px; height: 75px; transition: transform 0.2s;
}
.friend-card:active { transform: scale(0.98); }
.friend-avatar { height: 45px; width: 45px; object-fit: contain; flex-shrink: 0; }
.friend-name { font-family: 'Inter', sans-serif; font-size: clamp(16px, 5vw, 20px); color: #FFFFFF; font-weight: 400; }

@media screen and (max-height: 700px) {
    .page-title { top: 2vh; }
    .invite-banner { top: 9vh; padding: 10px 15px; }
    .friends-header { top: 27vh; }
    .friends-container { top: 33vh; height: 50vh; }
}
</style>