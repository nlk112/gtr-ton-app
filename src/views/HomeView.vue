<script setup lang="ts">

import BottomNav from '@/components/BottomNav.vue'
import InviteModal from '@/components/InviteModal.vue'

import historyIcon from '@/assets/history_icon.svg'
import walletIcon from '@/assets/wallet_icon.svg'
import statusOkIcon from '@/assets/status_ok.svg'
import statusNotOkIcon from '@/assets/status_not_ok.svg'

const isWalletOk = ref(false)

import radarBg from '@/assets/radar_background.svg'
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { TonConnectUI } from '@tonconnect/ui'

import f0 from '@/assets/radar/radar_0.svg'
import f1 from '@/assets/radar/radar_1.svg'
import f2 from '@/assets/radar/radar_2.svg'
import f3 from '@/assets/radar/radar_3.svg'
import f4 from '@/assets/radar/radar_4.svg'
import f5 from '@/assets/radar/radar_5.svg'
import f6 from '@/assets/radar/radar_6.svg'
import f7 from '@/assets/radar/radar_7.svg'

const userName = ref('Loading...')
const userPhoto = ref('')
const isDisconnectModalOpen = ref(false)

const radarFrames = [f0, f1, f2, f3, f4, f5, f6, f7]

const currentFrame = ref(0)
const isAnimating = ref(false)
const extraCycles = ref(0)

let tonConnectUI: TonConnectUI | null = null

let intervalId: ReturnType<typeof setInterval> | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null
let animationStart = 0

const DURATION = 1000
const FRAME_TIME = DURATION / 8
const QUEUE_THRESHOLD = 300 

const gtrBalance = ref(0) // Баланс коинов GTR
const isExchangeModalOpen = ref(false) // Состояние модалки обмена

// Сохранение и загрузка GTR баланса
onMounted(() => {
    const savedGtr = localStorage.getItem('gtr_balance')
    if (savedGtr) gtrBalance.value = parseInt(savedGtr, 10)
})

watch(gtrBalance, (newVal) => {
    localStorage.setItem('gtr_balance', newVal.toString())
})

// Функция обмена
const handleExchangeRP = () => {
    if (score.value >= 1000) {
        const exchangeAmount = Math.floor(score.value / 1000) // Сколько целых тысяч RP есть
        const gainedGtr = exchangeAmount // В соотношении 1000 к 1
        
        score.value -= exchangeAmount * 1000 // Забираем RP
        gtrBalance.value += gainedGtr // Начисляем GTR
        
        alert(`Обмен завершен! Вы получили ${gainedGtr} GTR`)
        isExchangeModalOpen.value = false
    } else {
        alert('Недостаточно RP для обмена. Нужно минимум 1000 RP')
    }
}

const handleRadarClick = () => {
    score.value += currentLevelInfo.value!.rpPerClick;
    
    progress.value++;
    
    if (progress.value >= currentLevelInfo.value!.clicksNeeded) {
        if (level.value < 20) { 
            level.value++;
            progress.value = 0; 
        } else {
            progress.value = currentLevelInfo.value!.clicksNeeded; 
        }
    }
    
    if (!isAnimating.value) {
        startCycle()
    } else {
        const elapsed = Date.now() - animationStart
        const remaining = DURATION - elapsed
        if (remaining <= QUEUE_THRESHOLD) {
            extraCycles.value = 1;
        }
    }
}

const startCycle = () => {
    waveKey.value++
    isAnimating.value = true
    currentFrame.value = 0
    animationStart = Date.now()

    isAnimating.value = true
    currentFrame.value = 0
    animationStart = Date.now()
    let frameIdx = 0


    intervalId = setInterval(() => {
        frameIdx++
        if (frameIdx < 8) currentFrame.value = frameIdx
    }, FRAME_TIME)

    timeoutId = setTimeout(() => {
        clearInterval(intervalId!)
        intervalId = null
        
        if (extraCycles.value > 0) {
            extraCycles.value--
            startCycle()
        } else {
            isAnimating.value = false
            currentFrame.value = 0 
        }
    }, DURATION)
}

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
    if (timeoutId) clearTimeout(timeoutId)
})

const waveKey = ref(0)
const score = ref(0)

onMounted(() => {
    const saved = localStorage.getItem('gtr_score')
    if (saved) score.value = parseInt(saved, 10)

    if ((window as any).Telegram && (window as any).Telegram.WebApp) {
        const tg = (window as any).Telegram.WebApp
        tg.ready() // Сообщаем ТГ, что приложение готово к отображению
        
        // Получаем данные пользователя
        const user = tg.initDataUnsafe?.user
        
        if (user) {
            // Берем first_name, если его нет - username, иначе дефолт
            userName.value = user.first_name || user.username || 'User'
            // Если у юзера открыта аватарка, берем её
            userPhoto.value = user.photo_url || ''
        } else {
            userName.value = 'Guest' // Если зашли не через ТГ
        }
    } else {
        userName.value = 'Dev Mode' // Для тестов в браузере
    }

    tonConnectUI = new TonConnectUI({
        // Укажи здесь СВОЮ ссылку на манифест!
        manifestUrl: 'https://gtr-ton-app.vercel.app/tonconnect-manifest.json'
    });

    // Подписываемся на изменение статуса (подключился/отключился)
    tonConnectUI.onStatusChange((wallet) => {
        if (wallet) {
            // Кошелек успешно подключен! Меняем статус бейджика на зеленый
            isWalletOk.value = true;
            console.log('Подключен кошелек:', wallet.account.address);
        } else {
            // Кошелек отключен (красный бейджик)
            isWalletOk.value = false;
        }
    });
})

const handleWalletClick = async () => {
    if (!tonConnectUI) return;
    
    if (tonConnectUI.connected) {
        // Вместо мгновенного отключения просто открываем модалку
        isDisconnectModalOpen.value = true;
    } else {
        await tonConnectUI.openModal();
    }
}

const confirmDisconnect = async () => {
    if (tonConnectUI) {
        await tonConnectUI.disconnect();
    }
    isDisconnectModalOpen.value = false;
}

// Функция для отмены (закрытие модалки)
const closeDisconnectModal = () => {
    isDisconnectModalOpen.value = false;
}

watch(score, (newVal) => {
    localStorage.setItem('gtr_score', newVal.toString())
})

const level = ref(1)
const progress = ref(0)

const levelsConfig = [
    { level: 1, clicksNeeded: 500, rpPerClick: 1 },
    { level: 2, clicksNeeded: 1000, rpPerClick: 2 },
    { level: 3, clicksNeeded: 2000, rpPerClick: 3 },
    { level: 4, clicksNeeded: 3500, rpPerClick: 4 },
    { level: 5, clicksNeeded: 5000, rpPerClick: 5 },
    { level: 6, clicksNeeded: 7000, rpPerClick: 6 },
    { level: 7, clicksNeeded: 10000, rpPerClick: 7 },
    { level: 8, clicksNeeded: 15000, rpPerClick: 8 },
    { level: 9, clicksNeeded: 20000, rpPerClick: 9 },
    { level: 10, clicksNeeded: 30000, rpPerClick: 10 },
    { level: 11, clicksNeeded: 45000, rpPerClick: 12 },
    { level: 12, clicksNeeded: 60000, rpPerClick: 14 },
    { level: 13, clicksNeeded: 80000, rpPerClick: 16 },
    { level: 14, clicksNeeded: 100000, rpPerClick: 18 },
    { level: 15, clicksNeeded: 150000, rpPerClick: 20 },
    { level: 16, clicksNeeded: 200000, rpPerClick: 25 },
    { level: 17, clicksNeeded: 300000, rpPerClick: 30 },
    { level: 18, clicksNeeded: 500000, rpPerClick: 35 },
    { level: 19, clicksNeeded: 750000, rpPerClick: 40 },
    { level: 20, clicksNeeded: 1000000, rpPerClick: 50 } // Максимальный уровень
]

const currentLevelInfo = computed(() => {
    return levelsConfig.find(c => c.level === level.value) || levelsConfig[levelsConfig.length - 1]
})

const progressPercent = computed(() => {
    return Math.min((progress.value / currentLevelInfo.value!.clicksNeeded) * 100, 100)
})

onMounted(() => {
    const savedScore = localStorage.getItem('gtr_score')
    const savedProgress = localStorage.getItem('gtr_progress')
    const savedLevel = localStorage.getItem('gtr_level')
    
    if (savedScore) score.value = parseInt(savedScore, 10)
    if (savedProgress) progress.value = parseInt(savedProgress, 10)
    if (savedLevel) level.value = parseInt(savedLevel, 10)
})

watch([score, progress, level], ([newScore, newProgress, newLevel]) => {
    localStorage.setItem('gtr_score', newScore.toString())
    localStorage.setItem('gtr_progress', newProgress.toString())
    localStorage.setItem('gtr_level', newLevel.toString())
})
</script>

<template>
    <div class="page-container">
        <h1 class="page-title">Global Token Radar</h1>
        
        <div class="top-bar">
            <div class="user-pill">
                <img v-if="userPhoto" :src="userPhoto" class="user-avatar" alt="Avatar" />
                
                <div v-else class="user-avatar-fallback">
                    {{ userName.charAt(0).toUpperCase() }}
                </div>
                
                <span class="user-name">{{ userName }}</span>
            </div>
            <div class="icons-pill">
                <img :src="historyIcon" class="pill-icon" alt="History" />
                
                <div class="wallet-wrapper" @click="handleWalletClick" style="cursor: pointer;">
                    <img :src="walletIcon" class="pill-icon" alt="Wallet" />
                    <img 
                    :src="isWalletOk ? statusOkIcon : statusNotOkIcon" 
                    class="status-badge" 
                    alt="Wallet Status" 
                    />
                </div>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-info">
                <span class="progress-text">{{ progress }}/{{ currentLevelInfo!.clicksNeeded }}</span>
                <span class="level-text">Частоты {{ level }}</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
        </div>


        <div class="score-display">
            {{ score }} RP </div>

        <div class="radar-container" @click="handleRadarClick">
            <img :src="radarBg" class="radar-layer-bg" alt="" />
            <div class="radar-wave" :key="waveKey"></div>
            <img :src="radarFrames[currentFrame]" class="radar-layer-main" alt="Radar" />
        </div>

        <InviteModal
            :isOpen="isDisconnectModalOpen"
            title="Отключить кошелек"
            description="Вы уверены, что хотите отключить свой TON кошелек?"
            primaryButtonText="Отмена"
            secondaryButtonText="Отключить"
            @close="closeDisconnectModal"
            @primaryClick="closeDisconnectModal"
            @secondaryClick="confirmDisconnect"
        />

        <div class="exchange-button" @click="isExchangeModalOpen = true">
            <span class="dollar-sign">$</span>
        </div>

        <InviteModal
            :isOpen="isExchangeModalOpen"
            title="Обмен валюты"
            :description="`У вас есть: ${score} RP\nВаш баланс: ${gtrBalance} GTR\n\nКурс обмена: 1000 RP = 1 GTR`"
            primaryButtonText="Обменять 1000 RP"
            secondaryButtonText="Отмена"
            @close="isExchangeModalOpen = false"
            @primaryClick="handleExchangeRP"
            @secondaryClick="isExchangeModalOpen = false"
        />

        <BottomNav />
    </div>
</template>

<style scoped>

.page-container {
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

.top-bar {
    position: absolute;
    top: 19vh;    
    left: 50%;    
    transform: translateX(-50%); 
    display: flex;
    gap: clamp(8px, 1.6vw, 21px);
}

.user-pill {
    background-color: #FFDA7A;
    height: clamp(10px, 6.5vh, 60px);
    width: clamp(120px, 65vw, 310px); 
    border-radius: 999px; 
    display: flex;
    align-items: center;
}

.user-avatar {
    width: clamp(24px, 4vh, 42px);
    height: clamp(24px, 4vh, 42px);
    border-radius: 50%;
    margin-left: 8px; /* Отступ от левого края плашки */
    object-fit: cover;
}

.user-avatar-fallback {
    width: clamp(24px, 4vh, 42px);
    height: clamp(24px, 4vh, 42px);
    border-radius: 50%;
    margin-left: 8px;
    background-color: #212121; /* Темный фон под стать дизайну */
    color: #FFDA7A; /* Желтый текст */
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: clamp(12px, 2vh, 18px);
}

.user-name {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: #212121; /* Контрастный цвет на желтом фоне */
    margin-left: 10px;
    font-size: clamp(18px, 4vw, 24px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Добавит троеточие, если имя слишком длинное */
    padding-right: 15px;
}

.icons-pill {
    background-color: #FFDA7A;
    height: clamp(10px, 6.5vh, 100px);
    width: clamp(60px, 26.5vw, 110px); 
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.pill-icon {
    height: clamp(10px, 4.1vh, 32px);
    object-fit: contain;
}

.wallet-wrapper {
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-badge {
    position: absolute;
    bottom: -13%;
    right: +43%;
    width: 75%; 
    object-fit: contain;
    pointer-events: none;
}

.radar-container {
    position: absolute;
    top: 64vh;  
    left: 50%;

    transform: translate(-50%, -50%);
    width: clamp(200px, 72.4vw, 400px);
    aspect-ratio: 1 / 1;
    position: absolute;
    cursor: pointer;
    user-select: none;

}

.radar-layer-bg {
    position: absolute;
    width: 110%;       
    top: 50%;       
    left: 50%;
    transform: translate(-50%, -50%);
    
    z-index: 0;
    pointer-events: none;
}

.radar-wave {
    position: absolute;
    top: 50%; left: 50%;
    width: 100%; height: 100%;
    border-radius: 50%;
    border: 2px solid #FFDA7A;
    box-shadow: 0 0 15px rgba(255, 218, 122, 0.4);
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
    z-index: 1;
    pointer-events: none;
    will-change: transform, opacity;
    animation: radarPulse 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.radar-layer-main {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: contain;
    z-index: 2;
    pointer-events: none;
}

@keyframes radarPulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

.score-display {
    position: absolute;
    top: 36vh; 
    left: 50%;
    transform: translateX(-50%);
    
    font-family: 'Inter', sans-serif;
    font-weight: 300; 
    font-size: clamp(32px, 10vw, 128px); 
    color: #FFFFFF;
    text-align: center;
    white-space: nowrap;
    
    pointer-events: none; 
    user-select: none;
    z-index: 10;
}

.progress-section {
    position: absolute;
    top: 28.5vh;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(200px, 74.3vw, 400px);
    z-index: 5;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1px;
    padding: 0 5px;
}

.progress-text {
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 4.7vw, 24px);
    color: rgb(255, 255, 255);
    font-weight: 400;
}

.level-text {
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 4.7vw, 24px);
    color: rgb(255, 255, 255);
    font-weight: 400;
}

.progress-bar-bg {
    width: 100%;
    height: clamp(6px, 1.5vh, 13px);
    background-color: rgba(217, 217, 217, 0.4);
    border-radius: 999px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: rgba(217, 217, 217, 1);
    border-radius: 999px;
    transition: width 0.3s ease;
    width: 0%; 
}

.exchange-button {
    position: absolute;
    right: 8vw; /* Отступ справа */
    bottom: 16vh; /* Над нижним меню */
    width: clamp(50px, 12vw, 70px);
    height: clamp(50px, 12vw, 70px);
    background-color: #FFDA7A;
    border-radius: 20px; /* Скругленные углы как на скрине */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 20;
    transition: transform 0.2s;
}

.exchange-button:active {
    transform: scale(0.9);
}

.dollar-sign {
    font-family: 'Inter', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #212121;
}
</style>