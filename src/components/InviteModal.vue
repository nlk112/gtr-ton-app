<script setup lang="ts">
interface Props {
    isOpen: boolean
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
    isPrimaryDisabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'primaryClick', 'secondaryClick'])

const handleClose = () => emit('close')
const handlePrimaryClick = () => emit('primaryClick')
const handleSecondaryClick = () => emit('secondaryClick')
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
        <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
            <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">{{ title }}</h2>
                <button class="modal-close" @click="handleClose">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#FFDA7A" stroke-width="2" stroke-linecap="round"/>
                </svg>
                </button>
            </div>
            
            <div class="modal-body">
                <p class="modal-description" v-html="description"></p>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary" :disabled="isPrimaryDisabled" @click="handlePrimaryClick">
                {{ primaryButtonText }}
                </button>
                <button class="btn-secondary" @click="handleSecondaryClick">
                {{ secondaryButtonText }}
                </button>
            </div>
            </div>
        </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(35, 35, 35, 0.9); */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    }

.modal-content {
    background-color: #212121;
    position: relative;
    border-radius: 24px;
    width: 100%;
    max-width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    color: #FFFFFF;
    margin: 0;
    text-align: center;
    flex: 1;
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
}

.modal-close:hover {
    opacity: 0.8;
}

.modal-body {
    display: flex;
    flex-direction: column;
}

.modal-description {
    text-align: center; 
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #888888;
    margin: 0;
    white-space: pre-line;
}

.modal-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
}

.btn-primary,
.btn-secondary {
    width: 100%;
    padding: 16px 24px;
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: transform 0.2s, opacity 0.2s;
}

.btn-primary {
    background-color: #FFDA7A;
    color: #1A1A1A;
}

.btn-primary:active {
    transform: scale(0.98);
    opacity: 0.9;
}

.btn-secondary {
    background-color: #333333;
    color: #888888;
    }

.btn-secondary:active {
    transform: scale(0.98);
    opacity: 0.8;
}

.modal-content::-webkit-scrollbar {
    width: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 4px;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    transform: scale(0.95);
}

.btn-primary:disabled {
    background-color: #444444; 
    color: #777777;            
    cursor: not-allowed;       
    transform: none !important;
    opacity: 0.8;
}
</style>