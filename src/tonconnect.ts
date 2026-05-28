// src/tonconnect.ts
import { TonConnectUI } from '@tonconnect/ui'

// Создаем ОДИН общий экземпляр для всей игры
export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://gtr-ton-app.vercel.app/tonconnect-manifest.json'
});