import { ref } from 'vue'

const savedLang = localStorage.getItem('gtr_lang') || 'en'
export const currentLang = ref(savedLang)

export const setLanguage = (langKey: string) => {
    currentLang.value = langKey
    localStorage.setItem('gtr_lang', langKey)
}

//{{ t('home.leveltext') }}
//"t('home.')"

export const locales: Record<string, any> = {
    ru: {
        langName: 'Русский',
        exchangeModal: {
            title: 'Обмен валюты',
            balance: 'Ваш баланс:',
            currentAccount: 'Текущий счет:',
            available: 'Доступно к обмену:',
            rate: 'Курс: 1000 RP = 1 GTR',
            btnExchange: 'Обменять',
            btnNothing: 'Нечего обменивать',
            btnCancel: 'Отмена'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: "Частоты",
            inviteModaltitle: "Отключить кошелек",
            inviteModalPrimaryButtonText: "Отмена",
            inviteModalSecondaryButtonText: "Отключить",
            inviteModaldescription: "Вы уверены, что хотите отключить свой TON кошелек?",
        },
        tasks: {
            title: 'Бонусные награды',
            subtitle: 'Выполняйте простые задания, чтобы получить бонус',
            listTitle: 'Задания'
        },
        infoModal: {
            title: 'Как это работает?',
            btnOk: 'Отлично, понятно!',
            btnClose: 'Закрыть',
            // Прямо целиком вставляем твой текст в косых кавычках
            text: `📡 <b>Исследуйте частоты:</b> кликайте по радару, чтобы сканировать пространство и добывать Radar Points (RP).<br><br>
⚡ <b>Повышайте уровень:</b> заполняйте шкалу, чтобы открывать новые частоты. Чем выше уровень, тем больше RP приносит каждый ваш клик.<br><br>
🎁 <b>Бонусы:</b> выполняйте простые задания и зовите друзей, чтобы зарабатывать еще больше.<br><br>
💰 <b>Обмен на GTR:</b> конвертируйте накопленные RP в ценные токены GTR прямо на главном экране!`
        }
    },
    en: {
        langName: 'English',
        home: {
            title: 'Global Token Radar',
            frequency: 'Frequencies',
            exchangeBtn: 'Exchange'
        },
        tasks: {
            title: 'Bonus Rewards',
            subtitle: 'Complete simple tasks to get a bonus',
            listTitle: 'Tasks'
        },
        infoModal: {
            title: 'How it works?',
            step1: '📡 <b>Explore frequencies:</b> click on the radar...',
        }
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

export const t = (path: string): string => {
    const keys = path.split('.')
    let current = locales[currentLang.value]
    
    for (const key of keys) {
        if (current && current[key] !== undefined) {
            current = current[key]
        } else {
            return path 
        }
    }
    return current
}