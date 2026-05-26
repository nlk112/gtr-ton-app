<script setup lang="ts">
import { ref, computed } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'

import { t } from '@/locales'

import avatar0 from '@/assets/avatar_0.svg'

const friends = computed(() => [
    { id: 1, name: `${t('friends.defaultName')} 1`, avatar: avatar0 },
    { id: 2, name: `${t('friends.defaultName')} 2`, avatar: avatar0 },
    { id: 3, name: `${t('friends.defaultName')} 3`, avatar: avatar0 },
    { id: 4, name: `${t('friends.defaultName')} 4`, avatar: avatar0 },
    { id: 5, name: `${t('friends.defaultName')} 5`, avatar: avatar0 },
    { id: 6, name: `${t('friends.defaultName')} 6`, avatar: avatar0 },
    { id: 7, name: `${t('friends.defaultName')} 7`, avatar: avatar0 },
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
        <h1 class="page-title">
            {{ t('friends.title') }}
        </h1>

        <div class="invite-banner">
            <div class="invite-top-row">
                <p class="invite-text">{{ t('friends.inviteBanner') }}</p>
                <img src="@/assets/arrow.svg" class="invite-icon" alt="arrow" />
            </div>
            <button class="invite-details" @click="openInviteModal">
                <span>{{ t('friends.details') }}</span>
                <div class="invite-chevron">
                    <img src="@/assets/chevron_down.svg" alt="" />
                </div>
            </button>

            <InviteModal
                :is-open="isInviteModalOpen"
                :title="t('friends.details')"
                :description="t('friends.modalDesc')"
                :primary-button-text="t('friends.btnInvite')"
                :secondary-button-text="t('friends.btnClose')"
                @close="closeInviteModal"
                @primary-click="handleInvitePrimaryClick"
                @secondary-click="handleInviteSecondaryClick"
            />
        </div>
        
        <div class="friends-header">
            {{ t('friends.yourFriends') }} ({{ friends.length }})
        </div>

        <div class="friends-container">
            <div v-for="friend in friends" :key="friend.id" class="friend-card">
                <img :src="friend.avatar" class="friend-avatar" alt="avatar" />
                <span class="friend-name">{{ friend.name }}</span>
            </div>
        </div>
        <BottomNav />
    </div>
</template>

<style scoped>
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
    left: 5vw;
    width: 90dvw;
    font-family: 'Inter', sans-serif;
    font-weight: 330;
    color: #ffffff;
    text-align: center;
    margin: 0;
    font-size: clamp(24px, 10vw, 128px); 
}

.friends-header {
    position: relative;
    width: 92vw;
    margin-top: 2.5vh; /* 👈 Вот он, динамический отступ от баннера! */
    text-align: left;
    font-family: 'Inter', sans-serif;
    font-size: clamp(18px, 7vw, 96px);
    font-weight: 300;
    color: #FFFFFF;
    z-index: 10;
    flex-shrink: 0;
}

.friends-container {
    position: relative;
    width: 94vw;
    flex: 1; 
    margin-top: 1.5vh;
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
    gap: 7%;
    height: 11.2vh;
    transition: transform 0.2s;
}

.friend-card:active {
    transform: scale(0.98);
}

.friend-avatar {
    height: 7vh;
    object-fit: contain;
    flex-shrink: 0;
    margin-left: 2.3%;
}

.friend-name {
    font-family: 'Inter', sans-serif;
    font-size: clamp(24px, 10vw, 128px); 
    color: #FFFFFF;
    font-weight: 300;
}

.invite-banner {
    position: relative;
    width: 92vw;
    min-height: 20vh;
    background-color: rgba(255, 218, 122, 0.4);
    border-radius: clamp(16px, 10vw, 50px);
    padding: 1.4vh 6vw;
    display: flex;
    flex-direction: column;
    gap: 3.5vh;
    z-index: 6;
    box-sizing: border-box;
    max-height: 24vh;
    overflow: hidden;
    flex-shrink: 0; /* Запрещаем баннеру сплющиваться */
}

.invite-top-row {
    display: flex;
    align-items: flex-start; 
    gap: 14px;   
    margin-top: 0.5vh;           
}

.invite-text {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 4.5vw, 32px);
    font-weight: 400;
    color: #1A1A1A;
    line-height: 1.3;
    flex: 1;
}

.invite-icon {
    width: 16%;
    flex-shrink: 0; 
    align-self: flex-start; 
    margin-top: 4.5%;
    margin-right: 5%;
    margin-left: 5%;
}

.invite-details {
    background: none;
    border: none;
    padding: 0;
    
    margin-top: auto; 
    margin-left: auto;
    margin-right: auto;
    
    display: flex;
    gap: 0.2vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 4.5vw, 32px);
    font-weight: 400;
    color: #1A1A1A;
    cursor: pointer;
}

.invite-chevron {
    width: 27%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.invite-chevron img {
    width: 100%;
    object-fit: contain;
}

.main-content {
    position: fixed;
    top: 12vh;
    width: 100%;
    height: 75vh; /* Ограничиваем высоту, чтобы список не залезал под BottomNav */
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5;
}

@media screen and (max-height: 700px) {
    .page-title { 
        top: 2vh; 
    }

    /* Поднимаем всю обертку выше */
    .main-content {
        top: 10vh;
        height: 78vh;
    }

    .invite-banner { 
        max-height: 19vh;
        padding: 12px 15px; 
        gap: 8px; 
    }

    .invite-text {
        font-size: clamp(13px, 4.5vw, 32px);
    }

    .friends-header { 
        font-size: clamp(18px, 5vw, 24px); 
        margin-top: 1.5vh; /* Чуть уменьшаем отступ */
    }
}
</style>