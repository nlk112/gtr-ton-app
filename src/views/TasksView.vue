<script setup lang="ts">
// 👇 Добавили computed
import { ref, computed } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'
import { t } from '@/locales'

import { tonConnectUI } from '@/tonconnect'

import icox from '@/assets/iconx.svg'
import iconds from '@/assets/iconds.svg'
import icontg from '@/assets/iconTG.png'
import iconton from '@/assets/iconTON.png'

interface Task {
    id: number;
    name: string;
    avatar: string;
    description: string;
    link: string;
    reward: number;
    address?: string;
}

const friends = computed<Task[]>(() => [
    { 
        id: 1, 
        name: t('tasks.items.verificationName'), 
        avatar: iconton, 
        description: t('tasks.items.verificationDesc'),
        link: 'verification', 
        address: 'UQCk6aQqhFNLfatGk3fCKkB79IB0yeiSZg9yfBvtETARiGA6',
        reward: 2
    },
    { 
        id: 2, 
        name: t('tasks.items.xName'), 
        avatar: icox, 
        description: t('tasks.items.xDesc'),
        link: 'https://x.com/gtfrtoken',
        reward: 1
    },
    { 
        id: 3, 
        name: t('tasks.items.tgName'), 
        avatar: icontg, 
        description: t('tasks.items.tgDesc'),
        link: 'https://t.me/GTRTon',
        reward: 1
    },
    { id: 4, name: t('tasks.items.waitName'), avatar: iconds, description: t('tasks.items.waitDesc'), link: '', reward: 0 },
    { id: 5, name: t('tasks.items.waitName'), avatar: iconds, description: t('tasks.items.waitDesc'), link: '', reward: 0 },
    { id: 6, name: t('tasks.items.waitName'), avatar: icox, description: t('tasks.items.waitDesc'), link: '', reward: 0 },
    { id: 7, name: t('tasks.items.waitName'), avatar: iconds, description: t('tasks.items.waitDesc'), link: '', reward: 0 },
])

const isTaskModalOpen = ref(false)
const selectedTask = ref<Task | null>(null)

const openTaskModal = (task: Task) => {
    selectedTask.value = task
    isTaskModalOpen.value = true
}

const closeTaskModal = () => {
    isTaskModalOpen.value = false
    setTimeout(() => selectedTask.value = null, 300) 
}

const handleGoToLink = async () => {
    if (!selectedTask.value?.link) return;

    if (selectedTask.value.link === 'verification') {
        if (!tonConnectUI?.connected) {
            // 👇 Перевели алерт
            alert(t('tasks.alerts.connectWallet'));
            return;
        }

        if (!selectedTask.value.address) {
            // 👇 Перевели алерт
            alert(t('tasks.alerts.noAddress'));
            return;
        }

        try {
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 360,
                messages: [
                    {
                        address: selectedTask.value.address, 
                        amount: "500000000" 
                    }
                ]
            }

            await tonConnectUI.sendTransaction(transaction);
            
            // 👇 Перевели алерт
            alert(t('tasks.alerts.txSent'));
            
        } catch (e) {
            console.error('Пользователь отменил транзакцию или произошла ошибка:', e);
        }
        return;
    }

    const url = selectedTask.value.link;
    const tgWindow = window as any; 

    if (tgWindow.Telegram && tgWindow.Telegram.WebApp) {
        const tg = tgWindow.Telegram.WebApp;
        if (url.includes('t.me')) {
            tg.openTelegramLink(url);
        } else {
            tg.openLink(url);
        }
    } else {
        window.open(url, '_blank');
    }
}

const handleCheckCompletion = () => {
    console.log(`Проверка выполнения задания: ${selectedTask.value?.name}. Награда: ${selectedTask.value?.reward}`)
    closeTaskModal()
}
</script>

<template>
    <div class="map-page">
        <h1 class="page-title" :style="{ fontSize: t('tasks.titleSize') }">
            {{ t('tasks.title') }}
        </h1>

        <div class="invite-banner">
            <div class="invite-top-row">
                <img src="@/assets/coins.svg" class="invite-icon" alt="bonus" />
                <p class="invite-text">{{ t('tasks.banner') }}</p>              
            </div>
        </div>
        
        <div class="friends-header">
            {{ t('tasks.listHeader') }}
        </div>

        <div class="friends-container">
            <div 
                v-for="friend in friends" 
                :key="friend.id" 
                class="friend-card"
                @click="openTaskModal(friend)" 
            >
                <img :src="friend.avatar" class="friend-avatar" alt="icon" />
                <span class="friend-name">{{ friend.name }}</span>
            </div>
        </div>

        <InviteModal
            v-if="selectedTask"
            :is-open="isTaskModalOpen"
            :title="selectedTask.name"
            
            :description="selectedTask.reward > 0 
                ? `${selectedTask.description}<br><br><span style='color: #FFDA7A; font-weight: 600; font-size: 16px;'>${t('tasks.rewardAmount')}${selectedTask.reward} GTR</span>`
                : `${selectedTask.description}<br><br><span style='color: #888888; font-weight: 500; font-size: 16px;'>${t('tasks.rewardSoon')}</span>`"
            
            :primary-button-text="t('tasks.modalBtnGo')"
            :secondary-button-text="t('tasks.modalBtnCheck')"
            
            :is-primary-disabled="selectedTask.reward === 0" 
            
            @close="closeTaskModal"
            @primary-click="handleGoToLink"
            @secondary-click="handleCheckCompletion"
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
    left: 5vw;
    width: 90dvw;
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
    left: 2.5%;
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
    cursor: pointer;
}

.friend-card:active {
    transform: scale(0.98);
}

.friend-avatar {
    height: 9.7vh;
    object-fit: contain;
    flex-shrink: 0;
    margin-left: -4%;
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

@media screen and (max-height: 700px) {
    /* Чуть уменьшаем главный заголовок, чтобы он не давил на баннер */
    .page-title { 
        top: 2vh; 
        font-size: clamp(22px, 6vw, 32px); 
    }

    /* Опускаем баннер ниже и делаем его компактнее внутри */
    .invite-banner { 
        top: 10vh; /* Опустили ниже */
        padding: 12px 15px; 
        gap: 8px; /* Уменьшили дырки между элементами */
    }

    /* Уменьшаем текст в баннере, чтобы он не раздувал высоту */
    .invite-text {
        font-size: 13px;
    }

    /* Опускаем заголовок списка ниже баннера */
    .friends-header { 
        top: 32vh; 
        font-size: clamp(18px, 5vw, 24px); /* Чуть мельче */
    }

    /* Опускаем сам список */
    .friends-container { 
        top: 37vh; 
        height: 48vh; 
    }
}
</style>