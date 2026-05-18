<script setup lang="ts">
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'

import { TonConnectUI } from '@tonconnect/ui'

const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://ТВОЯ-ССЫЛКА-НА-VERCEL.vercel.app/tonconnect-manifest.json' // 👈 Укажи свой домен!
});

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

const friends = ref<Task[]>([
    { 
        id: 1, 
        name: 'Верификация кошелька', 
        avatar: iconton, 
        description: 'Для подтверждения активности аккаунта совершите тестовый перевод 0.5 TON на указанный адрес.',
        link: 'verification', 
        address: 'UQCk6aQqhFNLfatGk3fCKkB79IB0yeiSZg9yfBvtETARiGA6',
        reward: 2
    },
    { 
        id: 2, 
        name: 'Подписаться на X', 
        avatar: icox, 
        description: 'Подпишитесь на наш официальный аккаунт в X (Twitter), чтобы первыми узнавать все новости проекта.',
        link: 'https://x.com/gtfrtoken',
        reward: 1
    },
    { 
        id: 3, 
        name: 'Подписаться на Telegram', 
        avatar: icontg, 
        description: 'Вступайте в наше официальное сообщество в Telegram. Там мы проводим розыгрыши и общаемся.',
        link: 'https://t.me/GTRTon',
        reward: 1
    },
    { id: 4, name: 'Ожидает текста', avatar: iconds, description: 'Скоро здесь появится новое задание', link: '', reward: 0 },
    { id: 5, name: 'Ожидает текста', avatar: iconds, description: 'Скоро здесь появится новое задание', link: '', reward: 0 },
    { id: 6, name: 'Ожидает текста', avatar: icox, description: 'Скоро здесь появится новое задание', link: '', reward: 0 },
    { id: 7, name: 'Ожидает текста', avatar: iconds, description: 'Скоро здесь появится новое задание', link: '', reward: 0 },
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

// 4. Функция для открытия ссылки из задания
const handleGoToLink = async () => {
    if (!selectedTask.value?.link) return;

    if (selectedTask.value.link === 'verification') {
        if (!tonConnectUI?.connected) {
            alert('Сначала подключите кошелек на главной странице!');
            return;
        }

        if (!selectedTask.value.address) {
            alert('Адрес кошелька для верификации не настроен.');
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
            
            alert('Транзакция отправлена в сеть! Нажмите "Проверить" через минуту.');
            
        } catch (e) {
            // Если пользователь нажал "Отмена" внутри кошелька
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
    // Тут в будущем будет запрос к бэкенду на проверку подписки
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
            <!-- <span class="tasks-counter">10/12</span> -->
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
                ? `${selectedTask.description}<br><br><span style='color: #FFDA7A; font-weight: 600; font-size: 16px;'>🎁 Награда: +${selectedTask.reward} GTR</span>`
                : `${selectedTask.description}<br><br><span style='color: #888888; font-weight: 500; font-size: 16px;'>🎁 Награда: Скоро</span>`"
            
            primary-button-text="Перейти к заданию"
            secondary-button-text="Проверить"
            
            :is-primary-disabled="selectedTask.reward === 0" 
            
            @close="closeTaskModal"
            @primary-click="handleGoToLink"
            @secondary-click="handleCheckCompletion"
        />

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
    border-radius: 24px; padding: 15px 20px; display: flex; align-items: center; justify-content: center;
    z-index: 6; box-sizing: border-box;
}

.invite-top-row { display: flex; align-items: center; justify-content: center; gap: 14px; width: 100%; }
.invite-icon { width: 50px; flex-shrink: 0; }
.invite-text { margin: 0; font-family: 'Inter', sans-serif; font-size: clamp(14px, 4vw, 18px); font-weight: 400; color: #ffffff; line-height: 1.3; flex: 1; text-align: center; }

.friends-header {
    position: absolute; top: 27vh; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 400px; display: flex; justify-content: space-between; align-items: baseline;
    font-family: 'Inter', sans-serif; font-size: clamp(20px, 6vw, 28px); font-weight: 300; color: #FFFFFF; z-index: 10;
}

.friends-container {
    position: absolute; top: 33vh; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 400px; height: 50vh; background-color: transparent;
    overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: 12px;
    padding-bottom: 20px; -ms-overflow-style: none; scrollbar-width: none;
}
.friends-container::-webkit-scrollbar { display: none; }

.friend-card {
    flex-shrink: 0; background-color: rgba(217, 217, 217, 0.4); border-radius: 999px;
    padding: 12px 20px; display: flex; align-items: center; gap: 15px; height: 75px; transition: transform 0.2s; cursor: pointer;
}
.friend-card:active { transform: scale(0.98); }
.friend-avatar { height: 50px; width: 50px; object-fit: contain; flex-shrink: 0; }
.friend-name { font-family: 'Inter', sans-serif; font-size: clamp(16px, 5vw, 20px); color: #FFFFFF; font-weight: 400; }

@media screen and (max-height: 700px) {
    .page-title { top: 2vh; }
    .invite-banner { top: 9vh; padding: 10px 15px; }
    .friends-header { top: 24vh; }
    .friends-container { top: 30vh; height: 55vh; }
}
</style>