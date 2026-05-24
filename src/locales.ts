import { ref } from 'vue'

const savedLang = localStorage.getItem('gtr_lang') || "en"
export const currentLang = ref(savedLang)

export const setLanguage = (LangKey: string) => {
    currentLang.value = LangKey
    localStorage.setItem('gtr_lang', LangKey)
}

export const locales: Record<string, any> = {
    en: {
        langName: 'English',
    },
    ru: {
        langName: 'Русский',
    },
    de: {
        langName: 'Deutsch',
    },
    es: {
        langName: 'Español',
    },
    zh: {
        langName: '中文',
    },
    ja: {
        langName: '日本語',
    },
    fr: {
        langName: 'Français',
    },
    he: {
        langName: 'עברית',
    },
    tr: {
        langName: 'Türkçe',
    },
    it: {
        langName: 'Italiano',
    },
}