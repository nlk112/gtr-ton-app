<script setup lang="ts">

import LanguageModal from '@/components/LanguageModal.vue'
import { currentLang } from '@/locales'

const isLangModalOpen = ref(false)

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

const isInfoModalOpen = ref(false)

const infoText = `
📡 <b>Исследуйте частоты:</b> кликайте по радару, чтобы сканировать пространство и добывать Radar Points (RP).<br><br>
⚡ <b>Повышайте уровень:</b> заполняйте шкалу, чтобы открывать новые частоты. Чем выше уровень, тем больше RP приносит каждый ваш клик.<br><br>
🎁 <b>Бонусы:</b> выполняйте простые задания и зовите друзей, чтобы зарабатывать еще больше.<br><br>
💰 <b>Обмен на GTR:</b> конвертируйте накопленные RP в ценные токены GTR прямо на главном экране!
`

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

// Вычисляем, какую максимальную сумму RP (кратную 1000) можно обменять прямо сейчас
const maxExchangeableRP = computed(() => Math.floor(score.value / 1000) * 1000)

// Вычисляем, сколько GTR за это веяние начислится (1000 к 1)
const possibleGtrGained = computed(() => Math.floor(score.value / 1000))

// Сохранение и загрузка GTR баланса
onMounted(() => {
    const savedGtr = localStorage.getItem('gtr_balance')
    if (savedGtr) gtrBalance.value = parseInt(savedGtr, 10)
})

watch(gtrBalance, (newVal) => {
    localStorage.setItem('gtr_balance', newVal.toString())
})

// Обновленная функция моментального обмена всего доступного баланса
const handleExchangeRP = () => {
    const totalRpToDeduct = maxExchangeableRP.value
    const totalGtrToAward = possibleGtrGained.value
    
    if (totalRpToDeduct >= 1000) {
        score.value -= totalRpToDeduct     // Списываем сразу всё доступное RP, кратное 1000
        gtrBalance.value += totalGtrToAward // Начисляем всю сумму GTR
        
        alert(`Успешно обменено ${totalRpToDeduct} RP на ${totalGtrToAward} GTR!`)
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
    { level: 20, clicksNeeded: 1000000, rpPerClick: 50 } 
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

        <div class="info-button" @click="isInfoModalOpen = true">
            <span class="info-icon">i</span>
        </div>

        <InviteModal
            :isOpen="isInfoModalOpen"
            title="Как это работает?"
            :description="infoText"
            primaryButtonText="Отлично, понятно!"
            secondaryButtonText="Закрыть"
            @close="isInfoModalOpen = false"
            @primaryClick="isInfoModalOpen = false"
            @secondaryClick="isInfoModalOpen = false"
        />
        
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

        <div class="lang-button" @click="isLangModalOpen = true">
            <span class="lang-text">{{ currentLang.toUpperCase() }}</span>
        </div>

        <LanguageModal 
            :is-open="isLangModalOpen" 
            @close="isLangModalOpen = false" 
        />

        <InviteModal
            :isOpen="isExchangeModalOpen"
            title="Обмен валюты"
            
            :description="`Ваш баланс: <span style='color: #FFDA7A; font-size: 16px; font-weight: 600;'>${score} RP</span><br>Текущий счет: <span style='color: #FFDA7A; font-size: 16px; font-weight: 600;'>${gtrBalance} GTR</span><br><br>Доступно к обмену:<br><b>${maxExchangeableRP} RP ➔ +${possibleGtrGained} GTR</b><br><br><span style='color: #888888; font-size: 12px;'>Курс: 1000 RP = 1 GTR</span>`"
            
            :primaryButtonText="possibleGtrGained > 0 ? `Обменять ${maxExchangeableRP} RP` : 'Нечего обменивать'"
            secondaryButtonText="Отмена"
            
            :is-primary-disabled="possibleGtrGained === 0"
            
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
    position: absolute;
    top: 5vh;
    left: 0;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
    margin: 0;
    font-size: clamp(36px, 9vw, 64px); 
    z-index: 10;
    pointer-events: none;
}

/* 2. КНОПКА ИНФО: привязали к процентам (%) вместо vw */
.info-button {
    position: absolute;
    top: 1.5vh; 
    right: 5%; /* 👈 Это гарантирует, что кнопка не уедет за край */
    width: clamp(28px, 4vh, 36px);
    height: clamp(28px, 4vh, 36px);
    background-color: #212121; 
    border: 1.5px solid #FFDA7A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: transform 0.2s, background-color 0.2s;
}

.info-button:active { transform: scale(0.9); background-color: #FFDA7A; }
.info-button:active .info-icon { color: #212121; }
.info-icon { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: #FFDA7A; font-style: italic; }

/* 3. ВЕРХНЯЯ ПАНЕЛЬ (Юзер + Кошелек) */
.top-bar {
    position: absolute;
    top: 13vh;    
    left: 50%;    
    transform: translateX(-50%); 
    display: flex;
    justify-content: center;
    width: 90%;
    gap: 15px;
}

.user-pill {
    background-color: #FFDA7A;
    height: clamp(40px, 6vh, 60px);
    flex: 1;
    max-width: 250px;
    border-radius: 999px; 
    display: flex;
    align-items: center;
    overflow: hidden;
}

.user-avatar, .user-avatar-fallback {
    width: clamp(28px, 4.5vh, 42px);
    height: clamp(28px, 4.5vh, 42px);
    border-radius: 50%;
    margin-left: 6px;
    flex-shrink: 0;
}

.user-avatar { object-fit: cover; }
.user-avatar-fallback {
    background-color: #212121; color: #FFDA7A; 
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
}

.user-name {
    font-family: 'Inter', sans-serif; font-weight: 500; color: #212121;
    margin-left: 10px; font-size: clamp(14px, 4vw, 18px);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 15px;
}

.icons-pill {
    background-color: #FFDA7A;
    height: clamp(40px, 6vh, 60px);
    width: clamp(80px, 20vw, 110px); 
    border-radius: 999px; display: flex; align-items: center; justify-content: space-evenly;
}

.pill-icon { height: clamp(20px, 3vh, 32px); object-fit: contain; }
.wallet-wrapper { position: relative; display: flex; align-items: center; justify-content: center; }
.status-badge { position: absolute; bottom: -10%; right: 40%; width: 75%; object-fit: contain; pointer-events: none; }

/* 4. ПРОГРЕСС И СЧЕТ */
.progress-section {
    position: absolute;
    top: 22vh;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    max-width: 400px;
    z-index: 5;
}

.progress-info { display: flex; justify-content: space-between; margin-bottom: 4px; padding: 0 5px; }
.progress-text, .level-text { font-family: 'Inter', sans-serif; font-size: clamp(12px, 4vw, 16px); color: #FFF; font-weight: 400; }
.progress-bar-bg { width: 100%; height: 10px; background-color: rgba(217, 217, 217, 0.4); border-radius: 999px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: #D9D9D9; border-radius: 999px; transition: width 0.3s ease; }

.score-display {
    position: absolute;
    top: 30vh; 
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

/* 5. РАДАР */
.radar-container {
    position: absolute;
    top: 61vh;  
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(250px, 76vw, 390px); 
    aspect-ratio: 1 / 1;
    cursor: pointer;
    user-select: none;
}

.radar-layer-bg { position: absolute; width: 110%; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0; pointer-events: none; }
.radar-wave {
    position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; border-radius: 50%;
    border: 2px solid #FFDA7A; box-shadow: 0 0 15px rgba(255, 218, 122, 0.4); opacity: 0;
    transform: translate(-50%, -50%) scale(1); z-index: 1; pointer-events: none; will-change: transform, opacity;
    animation: radarPulse 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
.radar-layer-main { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2; pointer-events: none; }
@keyframes radarPulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; } 100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; } }

/* 6. КНОПКА ОБМЕНА ($) */
.exchange-button {
    position: absolute;
    right: 5%; /* 👈 Проценты вместо vw */
    bottom: 14vh; 
    width: clamp(45px, 12vw, 65px);
    height: clamp(45px, 12vw, 65px);
    background-color: #FFDA7A;
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); z-index: 20; transition: transform 0.2s;
}

.exchange-button:active { transform: scale(0.9); }
.dollar-sign { font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; color: #212121; }

.lang-button {
    position: absolute;
    left: 20px; /* 👈 Прижата к левому краю */
    bottom: 14vh; 
    width: clamp(45px, 12vw, 65px);
    height: clamp(45px, 12vw, 65px);
    background-color: #FFDA7A;
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); z-index: 20; transition: transform 0.2s;
}

.lang-button:active { transform: scale(0.9); }
.lang-text { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 700; color: #212121; }

/* --- АДАПТАЦИЯ ПОД НЕВЫСОКИЕ ЭКРАНЫ --- */
@media screen and (max-height: 700px) {
    .page-title, .info-button { top: 2vh; }
    .top-bar { top: 10vh; }
    .progress-section { top: 18vh; }
    
    /* Корректируем счёт на маленьких экранах */
    .score-display { 
        top: 27vh; 
        font-size: clamp(32px, 9vw, 58px); 
    }
    
    /* Корректируем радар на маленьких экранах */
    .radar-container { 
        top: 59vh; 
        width: clamp(200px, 55vw, 280px); 
    }
    
    .exchange-button { bottom: 12vh; width: 45px; height: 45px; }
    .dollar-sign { font-size: 24px; }

    .exchange-button { bottom: 12vh; width: 45px; height: 45px; right: 16px; }
    .lang-button { bottom: 12vh; width: 45px; height: 45px; left: 16px; }
    .dollar-sign { font-size: 24px; }
    .lang-text { font-size: 16px; }
}
</style>