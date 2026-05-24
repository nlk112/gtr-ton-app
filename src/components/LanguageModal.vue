<script setup lang="ts">
import { locales, currentLang, setLanguage } from '@/locales'

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits(['close'])

const handleSelect = (key: string) => {
    setLanguage(key)
    emit('close')
}
</script>

<template>
    <Transition name="modal">
        <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Выберите язык / Language</h3>
                </div>

                <div class="modal-body">
                    <div class="lang-grid">
                        <button 
                            v-for="(data, key) in locales" 
                            :key="key"
                            class="lang-btn"
                            :class="{ 'active': currentLang === key }"
                            @click="handleSelect(String(key))"
                        >
                            {{ data.langName }}
                        </button>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn-secondary" @click="emit('close')">Закрыть</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background-color: rgba(0, 0, 0, 0.6); z-index: 1000; padding: 20px;
}

.modal-content {
    background-color: #212121; border-radius: 24px;
    width: 100%; max-width: 400px; padding: 24px;
    display: flex; flex-direction: column; gap: 20px;
}

.modal-title {
    font-family: 'Inter', sans-serif; font-size: clamp(18px, 5vw, 22px);
    font-weight: 600; color: #FFFFFF; margin: 0; text-align: center; width: 100%;
}

.lang-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 12px;
    margin-top: 10px;
}

.lang-btn {
    background-color: #333333;
    color: #F0F0F0;
    border: 2px solid transparent;
    border-radius: 16px;
    padding: 16px 10px;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.lang-btn.active {
    background-color: rgba(255, 218, 122, 0.1);
    border-color: #FFDA7A;
    color: #FFDA7A;
}

.lang-btn:active { transform: scale(0.95); }

.modal-actions { margin-top: 8px; }
.btn-secondary {
    width: 100%; padding: 16px 24px; border-radius: 999px;
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500;
    background-color: #333333; color: #888888; border: none; cursor: pointer; transition: transform 0.2s;
}
.btn-secondary:active { transform: scale(0.98); opacity: 0.8; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-content, .modal-leave-active .modal-content { transition: transform 0.3s ease; }
.modal-enter-from .modal-content, .modal-leave-to .modal-content { transform: scale(0.95); }
</style>