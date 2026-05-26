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
    en: {
        langName: 'English',
        exchangeModal: {
            title: 'Currency Exchange',
            balance: 'Your balance:',
            currentAccount: 'Current account:',
            available: 'Available to exchange:',
            rate: 'Rate: 1000 RP = 1 GTR',
            btnExchange: 'Exchange',
            btnNothing: 'Nothing to exchange',
            btnCancel: 'Cancel'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: "Frequencies",
            inviteModaltitle: "Disconnect wallet",
            inviteModalPrimaryButtonText: "Cancel",
            inviteModalSecondaryButtonText: "Disconnect",
            inviteModaldescription: "Are you sure you want to disconnect your TON wallet?",
        },
        tasks: {
            title: 'Bonus rewards',
            titleSize: 'clamp(24px, 9vw, 128px)',
            banner: 'Complete simple tasks to get a bonus',
            listHeader: 'Tasks',
            modalBtnGo: 'Go to task',
            modalBtnCheck: 'Check',
            rewardSoon: '🎁 Reward: Soon',
            rewardAmount: '🎁 Reward: +',
            alerts: {
                connectWallet: 'Please connect your wallet on the main page first!',
                noAddress: 'Wallet address for verification is not set.',
                txSent: 'Transaction sent to the network! Click "Check" in a minute.'
            },
            items: {
                verificationName: 'Wallet verification',
                verificationDesc: 'To confirm account activity, make a test transfer of 1 USDT to the specified address.',
                xName: 'Follow on X',
                xDesc: 'Follow our official X (Twitter) account to be the first to know all project news.',
                tgName: 'Join Telegram',
                tgDesc: 'Join our official Telegram community. We host giveaways and chat there.',
                waitName: 'Waiting for text',
                waitDesc: 'A new task will appear here soon'
            }
        },
        infoModal: {
            title: 'How it works?',
            btnOk: 'Got it!',
            btnClose: 'Close',
            text: `📡 <b>Explore frequencies:</b> click on the radar to scan space and mine Radar Points (RP).<br><br>
⚡ <b>Level up:</b> fill the bar to unlock new frequencies. The higher the level, the more RP each click brings.<br><br>
🎁 <b>Bonuses:</b> complete simple tasks and invite friends to earn even more.<br><br>
💰 <b>Exchange for GTR:</b> convert accumulated RP into valuable GTR tokens right on the main screen!`
        },
        friends: {
            defaultName: 'Name',
            title: 'Friend list',
            inviteBanner: 'Invite friends and earn free tokens',
            details: 'Details',
            modalDesc: 'Invite friends and get bonuses',
            btnInvite: 'Invite a friend',
            btnClose: 'Close',
            yourFriends: 'Your friends'
        }
    },
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
            titleSize: 'clamp(24px, 9vw, 128px)',
            banner: 'Выполняйте простые задания, чтобы получить бонус',
            listHeader: 'Задания',
            modalBtnGo: 'Перейти к заданию',
            modalBtnCheck: 'Проверить',
            rewardSoon: '🎁 Награда: Скоро',
            rewardAmount: '🎁 Награда: +',
            alerts: {
                connectWallet: 'Сначала подключите кошелек на главной странице!',
                noAddress: 'Адрес кошелька для верификации не настроен.',
                txSent: 'Транзакция отправлена в сеть! Нажмите "Проверить" через минуту.'
            },
            items: {
                verificationName: 'Верификация кошелька',
                verificationDesc: 'Для подтверждения активности аккаунта совершите тестовый перевод 1USDT на указанный адрес.',
                xName: 'Подписаться на X',
                xDesc: 'Подпишитесь на наш официальный аккаунт в X (Twitter), чтобы первыми узнавать все новости проекта.',
                tgName: 'Подписаться на Telegram',
                tgDesc: 'Вступайте в наше официальное сообщество в Telegram. Там мы проводим розыгрыши и общаемся.',
                waitName: 'Ожидает текста',
                waitDesc: 'Скоро здесь появится новое задание'
            }
        },
        infoModal: {
            title: 'Как это работает?',
            btnOk: 'Отлично, понятно!',
            btnClose: 'Закрыть',
            text: `📡 <b>Исследуйте частоты:</b> кликайте по радару, чтобы сканировать пространство и добывать Radar Points (RP).<br><br>
⚡ <b>Повышайте уровень:</b> заполняйте шкалу, чтобы открывать новые частоты. Чем выше уровень, тем больше RP приносит каждый ваш клик.<br><br>
🎁 <b>Бонусы:</b> выполняйте простые задания и зовите друзей, чтобы зарабатывать еще больше.<br><br>
💰 <b>Обмен на GTR:</b> конвертируйте накопленные RP в ценные токены GTR прямо на главном экране!`
        },
        friends: {
            defaultName: 'Имя',
            title: 'Список друзей',
            inviteBanner: 'Пригласите друзей и зарабатывайте бесплатные токены',
            details: 'Подробности',
            modalDesc: 'Приглашайте друзей и получайте бонусы',
            btnInvite: 'Пригласить друга',
            btnClose: 'Закрыть',
            yourFriends: 'Ваши друзья'
        }
    },
    de: {
        langName: 'Deutsch',
        exchangeModal: {
            title: 'Währungsumtausch',
            balance: 'Ihr Guthaben:',
            currentAccount: 'Aktuelles Konto:',
            available: 'Zum Umtausch verfügbar:',
            rate: 'Kurs: 1000 RP = 1 GTR',
            btnExchange: 'Umtauschen',
            btnNothing: 'Nichts zum Umtauschen',
            btnCancel: 'Abbrechen'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: 'Frequenzen',
            inviteModaltitle: 'Wallet trennen',
            inviteModalPrimaryButtonText: 'Abbrechen',
            inviteModalSecondaryButtonText: 'Trennen',
            inviteModaldescription: 'Sind Sie sicher, dass Sie Ihre TON-Wallet trennen möchten?',
        },
        tasks: {
            title: 'Bonus belohnungen',
            titleSize: 'clamp(22px, 8vw, 110px)', // Чуть уменьшил шрифт, так как слово Bonusbelohnungen длинное
            banner: 'Erledigen Sie einfache Aufgaben, um einen Bonus zu erhalten',
            listHeader: 'Aufgaben',
            modalBtnGo: 'Zur Aufgabe',
            modalBtnCheck: 'Überprüfen',
            rewardSoon: '🎁 Belohnung: Bald',
            rewardAmount: '🎁 Belohnung: +',
            alerts: {
                connectWallet: 'Bitte verbinden Sie zuerst Ihre Wallet auf der Hauptseite!',
                noAddress: 'Die Wallet-Adresse für die Verifizierung ist nicht konfiguriert.',
                txSent: 'Transaktion an das Netzwerk gesendet! Klicken Sie in einer Minute auf "Überprüfen".'
            },
            items: {
                verificationName: 'Wallet-Verifizierung',
                verificationDesc: 'Um die Kontoaktivität zu bestätigen, tätigen Sie eine Testüberweisung von 1 USDT an die angegebene Adresse.',
                xName: 'X folgen',
                xDesc: 'Folgen Sie unserem offiziellen X (Twitter)-Konto, um als Erster alle Projektnachrichten zu erfahren.',
                tgName: 'Telegram beitreten',
                tgDesc: 'Treten Sie unserer offiziellen Telegram-Community bei. Dort veranstalten wir Gewinnspiele und tauschen uns aus.',
                waitName: 'Warten auf Text',
                waitDesc: 'Hier wird bald eine neue Aufgabe erscheinen'
            }
        },
        infoModal: {
            title: 'Wie funktioniert das?',
            btnOk: 'Alles klar!',
            btnClose: 'Schließen',
            text: `📡 <b>Frequenzen erkunden:</b> Klicken Sie auf das Radar, um den Raum zu scannen und Radar Points (RP) zu sammeln.<br><br>
⚡ <b>Aufsteigen:</b> Füllen Sie die Leiste, um neue Frequenzen freizuschalten. Je höher das Level, desto mehr RP bringt jeder Klick.<br><br>
🎁 <b>Boni:</b> Erledigen Sie einfache Aufgaben und laden Sie Freunde ein, um noch mehr zu verdienen.<br><br>
💰 <b>Umtausch in GTR:</b> Wandeln Sie Ihre gesammelten RP direkt auf dem Hauptbildschirm in wertvolle GTR-Token um!`
        },
        friends: {
            defaultName: 'Name',
            title: 'Freundesliste',
            inviteBanner: 'Freunde einladen und kostenlose Token verdienen',
            details: 'Details',
            modalDesc: 'Freunde einladen und Boni erhalten',
            btnInvite: 'Freund einladen',
            btnClose: 'Schließen',
            yourFriends: 'Ihre Freunde'
        }
    },
    es: {
        langName: 'Español',
        exchangeModal: {
            title: 'Cambio de divisas',
            balance: 'Tu saldo:',
            currentAccount: 'Cuenta actual:',
            available: 'Disponible para cambiar:',
            rate: 'Tasa: 1000 RP = 1 GTR',
            btnExchange: 'Cambiar',
            btnNothing: 'Nada que cambiar',
            btnCancel: 'Cancelar'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: "Frecuencias",
            inviteModaltitle: "Desconectar billetera",
            inviteModalPrimaryButtonText: "Cancelar",
            inviteModalSecondaryButtonText: "Desconectar",
            inviteModaldescription: "¿Estás seguro de que quieres desconectar tu billetera TON?",
        },
        tasks: {
            title: 'Recompensas de bonificación',
            titleSize: 'clamp(20px, 7vw, 110px)', // Немного уменьшили для длинного слова "bonificación"
            banner: 'Completa tareas sencillas para conseguir un bono',
            listHeader: 'Tareas',
            modalBtnGo: 'Ir a la tarea',
            modalBtnCheck: 'Verificar',
            rewardSoon: '🎁 Recompensa: Pronto',
            rewardAmount: '🎁 Recompensa: +',
            alerts: {
                connectWallet: '¡Por favor, conecta tu billetera en la página principal primero!',
                noAddress: 'La dirección de la billetera para verificación no está configurada.',
                txSent: '¡Transacción enviada a la red! Haz clic en "Verificar" en un minuto.'
            },
            items: {
                verificationName: 'Verificación de billetera',
                verificationDesc: 'Para confirmar la actividad de la cuenta, realiza una transferencia de prueba de 1 USDT a la dirección indicada.',
                xName: 'Seguir en X',
                xDesc: 'Sigue nuestra cuenta oficial en X (Twitter) para ser el primero en conocer todas las noticias del proyecto.',
                tgName: 'Unirse a Telegram',
                tgDesc: 'Únete a nuestra comunidad oficial en Telegram. Allí realizamos sorteos y chateamos.',
                waitName: 'Esperando texto',
                waitDesc: 'Pronto aparecerá una nueva tarea aquí'
            }
        },
        infoModal: {
            title: '¿Cómo funciona?',
            btnOk: '¡Entendido!',
            btnClose: 'Cerrar',
            text: `📡 <b>Explora frecuencias:</b> haz clic en el radar para escanear el espacio y extraer Radar Points (RP).<br><br>
⚡ <b>Sube de nivel:</b> llena la barra para desbloquear nuevas frecuencias. Cuanto mayor sea el nivel, más RP te dará cada clic.<br><br>
🎁 <b>Bonificaciones:</b> completa tareas sencillas e invita a amigos para ganar aún más.<br><br>
💰 <b>Cambio por GTR:</b> ¡convierte los RP acumulados en valiosos tokens GTR directamente en la pantalla principal!`
        },
        friends: {
            defaultName: 'Nombre',
            title: 'Lista de amigos',
            inviteBanner: 'Invita a amigos y gana tokens gratis',
            details: 'Detalles',
            modalDesc: 'Invita a amigos y obtén bonificaciones',
            btnInvite: 'Invitar a un amigo',
            btnClose: 'Cerrar',
            yourFriends: 'Tus amigos'
        }
    },
    zh: {
        langName: '中文',
        exchangeModal: {
            title: '货币兑换',
            balance: '您的余额：',
            currentAccount: '当前账户：',
            available: '可兑换：',
            rate: '汇率：1000 RP = 1 GTR',
            btnExchange: '兑换',
            btnNothing: '无可用兑换',
            btnCancel: '取消'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: '频率',
            inviteModaltitle: '断开钱包连接',
            inviteModalPrimaryButtonText: '取消',
            inviteModalSecondaryButtonText: '断开连接',
            inviteModaldescription: '您确定要断开 TON 钱包连接吗？',
        },
        tasks: {
            title: '额外奖励',
            titleSize: 'clamp(24px, 10vw, 128px)', // Иероглифы короткие, возвращаем крупный размер
            banner: '完成简单任务即可获得奖励',
            listHeader: '任务列表',
            modalBtnGo: '前往任务',
            modalBtnCheck: '验证',
            rewardSoon: '🎁 奖励：敬请期待',
            rewardAmount: '🎁 奖励：+',
            alerts: {
                connectWallet: '请先在主页连接您的钱包！',
                noAddress: '尚未设置用于验证的钱包地址。',
                txSent: '交易已发送至网络！请稍后点击“验证”。'
            },
            items: {
                verificationName: '钱包验证',
                verificationDesc: '为了确认账户活跃度，请向指定地址进行 1 USDT 的测试转账。',
                xName: '关注 X',
                xDesc: '关注我们的官方 X (Twitter) 账号，第一时间获取项目最新动态。',
                tgName: '加入 Telegram',
                tgDesc: '加入我们的官方 Telegram 社区，参与抽奖与交流。',
                waitName: '敬请期待',
                waitDesc: '这里很快会发布新任务'
            }
        },
        infoModal: {
            title: '玩法说明',
            btnOk: '明白！',
            btnClose: '关闭',
            text: `📡 <b>探索频率：</b> 点击雷达扫描空间并挖掘 Radar Points (RP)。<br><br>
⚡ <b>提升等级：</b> 填满进度条以解锁新频率。等级越高，每次点击获得的 RP 就越多。<br><br>
🎁 <b>额外奖励：</b> 完成简单任务并邀请好友即可赚取更多。<br><br>
💰 <b>兑换 GTR：</b> 直接在主屏幕上将积累的 RP 兑换成有价值的 GTR 代币！`
        },
        friends: {
            defaultName: '名字',
            title: '好友列表',
            inviteBanner: '邀请好友并赚取免费代币',
            details: '详情',
            modalDesc: '邀请好友获取奖励',
            btnInvite: '邀请好友',
            btnClose: '关闭',
            yourFriends: '您的好友'
        }
    },
    ja: {
        langName: '日本語',
        exchangeModal: {
            title: '通貨の交換',
            balance: '残高：',
            currentAccount: '現在のアカウント：',
            available: '交換可能：',
            rate: 'レート： 1000 RP = 1 GTR',
            btnExchange: '交換する',
            btnNothing: '交換できるものがありません',
            btnCancel: 'キャンセル'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: '周波数',
            inviteModaltitle: 'ウォレットの接続解除',
            inviteModalPrimaryButtonText: 'キャンセル',
            inviteModalSecondaryButtonText: '接続解除',
            inviteModaldescription: 'TONウォレットの接続を解除してもよろしいですか？',
        },
        tasks: {
            title: 'ボーナス報酬',
            titleSize: 'clamp(24px, 10vw, 128px)', // Оставляем крупным
            banner: '簡単なタスクを完了してボーナスを獲得しよう',
            listHeader: 'タスク',
            modalBtnGo: 'タスクへ進む',
            modalBtnCheck: '確認する',
            rewardSoon: '🎁 報酬： もうすぐ',
            rewardAmount: '🎁 報酬： +',
            alerts: {
                connectWallet: 'まずはメインページでウォレットを接続してください！',
                noAddress: '確認用のウォレットアドレスが設定されていません。',
                txSent: 'トランザクションがネットワークに送信されました！1分後に「確認する」をクリックしてください。'
            },
            items: {
                verificationName: 'ウォレットの確認',
                verificationDesc: 'アカウントの有効性を確認するため、指定されたアドレスに1 USDTのテスト送金を行ってください。',
                xName: 'Xをフォロー',
                xDesc: '公式X (Twitter) アカウントをフォローして、プロジェクトの最新情報をいち早くゲットしましょう。',
                tgName: 'Telegramに参加',
                tgDesc: '公式Telegramコミュニティに参加しましょう。ここではプレゼント企画やチャットを行っています。',
                waitName: 'テキスト待機中',
                waitDesc: 'ここにはまもなく新しいタスクが表示されます'
            }
        },
        infoModal: {
            title: '遊び方',
            btnOk: 'わかった！',
            btnClose: '閉じる',
            text: `📡 <b>周波数を探索：</b> レーダーをクリックして空間をスキャンし、Radar Points (RP) を発掘しましょう。<br><br>
⚡ <b>レベルアップ：</b> ゲージを埋めて新しい周波数を解放します。レベルが高いほど、1クリックで得られるRPが多くなります。<br><br>
🎁 <b>ボーナス：</b> 簡単なタスクをこなし、フレンドを招待してさらに多くのRPを稼ぎましょう。<br><br>
💰 <b>GTRと交換：</b> メイン画面から直接、貯めたRPを価値あるGTRトークンに交換できます！`
        },
        friends: {
            defaultName: '名前',
            title: 'フレンドリスト',
            inviteBanner: 'フレンドを招待して無料トークンを稼ごう',
            details: '詳細',
            modalDesc: 'フレンドを招待してボーナスをゲット',
            btnInvite: 'フレンドを招待する',
            btnClose: '閉じる',
            yourFriends: 'あなたのフレンド'
        }
    },
    fr: {
        langName: 'Français',
        exchangeModal: {
            title: 'Échange de devises',
            balance: 'Votre solde :',
            currentAccount: 'Compte actuel :',
            available: 'Disponible pour l\'échange :',
            rate: 'Taux : 1000 RP = 1 GTR',
            btnExchange: 'Échanger',
            btnNothing: 'Rien à échanger',
            btnCancel: 'Annuler'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: 'Fréquences',
            inviteModaltitle: 'Déconnecter le portefeuille',
            inviteModalPrimaryButtonText: 'Annuler',
            inviteModalSecondaryButtonText: 'Déconnecter',
            inviteModaldescription: 'Êtes-vous sûr de vouloir déconnecter votre portefeuille TON ?',
        },
        tasks: {
            title: 'Récompenses bonus',
            titleSize: 'clamp(20px, 7vw, 100px)', // Немного уменьшили для длинных французских слов
            banner: 'Accomplissez des tâches simples pour obtenir un bonus',
            listHeader: 'Tâches',
            modalBtnGo: 'Aller à la tâche',
            modalBtnCheck: 'Vérifier',
            rewardSoon: '🎁 Récompense : Bientôt',
            rewardAmount: '🎁 Récompense : +',
            alerts: {
                connectWallet: 'Veuillez d\'abord connecter votre portefeuille sur la page principale !',
                noAddress: 'L\'adresse du portefeuille pour la vérification n\'est pas configurée.',
                txSent: 'Transaction envoyée au réseau ! Cliquez sur "Vérifier" dans une minute.'
            },
            items: {
                verificationName: 'Vérification du portefeuille',
                verificationDesc: 'Pour confirmer l\'activité du compte, effectuez un transfert test de 1 USDT à l\'adresse indiquée.',
                xName: 'Suivre sur X',
                xDesc: 'Suivez notre compte officiel sur X (Twitter) pour être le premier informé des nouvelles du projet.',
                tgName: 'Rejoindre Telegram',
                tgDesc: 'Rejoignez notre communauté officielle sur Telegram. Nous y organisons des tirages au sort et discutons.',
                waitName: 'En attente de texte',
                waitDesc: 'Une nouvelle tâche apparaîtra bientôt ici'
            }
        },
        infoModal: {
            title: 'Comment ça marche ?',
            btnOk: 'D\'accord, j\'ai compris !',
            btnClose: 'Fermer',
            text: `📡 <b>Explorez les fréquences :</b> cliquez sur le radar pour scanner l'espace et extraire des Radar Points (RP).<br><br>
⚡ <b>Montez de niveau :</b> remplissez la barre pour débloquer de nouvelles fréquences. Plus le niveau est élevé, plus chaque clic rapporte de RP.<br><br>
🎁 <b>Bonus :</b> accomplissez des tâches simples et invitez des amis pour gagner encore plus.<br><br>
💰 <b>Échange contre des GTR :</b> convertissez vos RP accumulés en précieux jetons GTR directement sur l'écran principal !`
        },
        friends: {
            defaultName: 'Nom',
            title: 'Liste d\'amis',
            inviteBanner: 'Invitez des amis et gagnez des jetons gratuits',
            details: 'Détails',
            modalDesc: 'Invitez des amis et obtenez des bonus',
            btnInvite: 'Inviter un ami',
            btnClose: 'Fermer',
            yourFriends: 'Vos amis'
        }
    },
    he: {
        langName: 'עברית',
        exchangeModal: {
            title: 'המרת מטבע',
            balance: 'היתרה שלך:',
            currentAccount: 'חשבון נוכחי:',
            available: 'זמין להמרה:',
            rate: 'שער: 1000 RP = 1 GTR',
            btnExchange: 'המר',
            btnNothing: 'אין מה להמיר',
            btnCancel: 'ביטול'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: 'תדרים',
            inviteModaltitle: 'ניתוק ארנק',
            inviteModalPrimaryButtonText: 'ביטול',
            inviteModalSecondaryButtonText: 'ניתוק',
            inviteModaldescription: 'האם אתה בטוח שברצונך לנתק את ארנק ה-TON שלך?',
        },
        tasks: {
            title: 'תגמולי בונוס',
            titleSize: 'clamp(24px, 10vw, 128px)',
            banner: 'השלם משימות פשוטות כדי לקבל בונוס',
            listHeader: 'משימות',
            modalBtnGo: 'עבור למשימה',
            modalBtnCheck: 'בדוק',
            rewardSoon: '🎁 פרס: בקרוב',
            rewardAmount: '🎁 פרס: +',
            alerts: {
                connectWallet: 'אנא חבר את הארנק שלך בדף הראשי תחילה!',
                noAddress: 'כתובת הארנק לאימות לא מוגדרת.',
                txSent: 'העברה נשלחה לרשת! לחץ על "בדוק" בעוד דקה.'
            },
            items: {
                verificationName: 'אימות ארנק',
                verificationDesc: 'כדי לאשר את פעילות החשבון, בצע העברת ניסיון של 1 USDT לכתובת שצוינה.',
                xName: 'עקוב ב-X',
                xDesc: 'עקוב אחר החשבון הרשמי שלנו ב-X (Twitter) כדי להיות הראשון לדעת על כל חדשות הפרויקט.',
                tgName: 'הצטרף ל-Telegram',
                tgDesc: 'הצטרף לקהילה הרשמית שלנו ב-Telegram. שם אנחנו עורכים הגרלות ומדברים.',
                waitName: 'ממתין לטקסט',
                waitDesc: 'משימה חדשה תופיע כאן בקרוב'
            }
        },
        infoModal: {
            title: 'איך זה עובד?',
            btnOk: 'הבנתי!',
            btnClose: 'סגור',
            text: `📡 <b>חקור תדרים:</b> לחץ על הרדאר כדי לסרוק את החלל ולכרות Radar Points (RP).<br><br>
⚡ <b>עלה רמה:</b> מלא את המד כדי לפתוח תדרים חדשים. ככל שהרמה גבוהה יותר, כך כל לחיצה מביאה יותר RP.<br><br>
🎁 <b>בונוסים:</b> השלם משימות פשוטות והזמן חברים כדי להרוויח אפילו יותר.<br><br>
💰 <b>המרה ל-GTR:</b> המר את ה-RP שצברת לאסימוני GTR יקרי ערך ישירות במסך הראשי!`
        },
        friends: {
            defaultName: 'שם',
            title: 'רשימת חברים',
            inviteBanner: 'הזמן חברים והרווח אסימונים בחינם',
            details: 'פרטים',
            modalDesc: 'הזמן חברים וקבל בונוסים',
            btnInvite: 'הזמן חבר',
            btnClose: 'סגור',
            yourFriends: 'החברים שלך'
        }
    },
    tr: {
        langName: 'Türkçe',
        exchangeModal: {
            title: 'Döviz Değişimi',
            balance: 'Bakiyeniz:',
            currentAccount: 'Mevcut hesap:',
            available: 'Değişim için kullanılabilir:',
            rate: 'Kur: 1000 RP = 1 GTR',
            btnExchange: 'Değiştir',
            btnNothing: 'Değiştirilecek bir şey yok',
            btnCancel: 'İptal'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: 'Frekanslar',
            inviteModaltitle: 'Cüzdanın bağlantısını kes',
            inviteModalPrimaryButtonText: 'İptal',
            inviteModalSecondaryButtonText: 'Bağlantıyı kes',
            inviteModaldescription: 'TON cüzdanınızın bağlantısını kesmek istediğinizden emin misiniz?',
        },
        tasks: {
            title: 'Bonus ödüller',
            titleSize: 'clamp(24px, 10vw, 128px)',
            banner: 'Bonus almak için basit görevleri tamamlayın',
            listHeader: 'Görevler',
            modalBtnGo: 'Göreve git',
            modalBtnCheck: 'Kontrol et',
            rewardSoon: '🎁 Ödül: Yakında',
            rewardAmount: '🎁 Ödül: +',
            alerts: {
                connectWallet: 'Lütfen önce ana sayfada cüzdanınızı bağlayın!',
                noAddress: 'Doğrulama için cüzdan adresi ayarlanmamış.',
                txSent: 'İşlem ağa gönderildi! Bir dakika sonra "Kontrol et"e tıklayın.'
            },
            items: {
                verificationName: 'Cüzdan doğrulaması',
                verificationDesc: 'Hesap etkinliğini onaylamak için belirtilen adrese 1 USDT test transferi yapın.',
                xName: 'X\'te takip et',
                xDesc: 'Tüm proje haberlerini ilk öğrenen olmak için resmi X (Twitter) hesabımızı takip edin.',
                tgName: 'Telegram\'a katıl',
                tgDesc: 'Resmi Telegram topluluğumuza katılın. Orada çekilişler yapıyor ve sohbet ediyoruz.',
                waitName: 'Metin bekleniyor',
                waitDesc: 'Yakında burada yeni bir görev görünecek'
            }
        },
        infoModal: {
            title: 'Nasıl çalışır?',
            btnOk: 'Tamam, anladım!',
            btnClose: 'Kapat',
            text: `📡 <b>Frekansları keşfedin:</b> Uzayı taramak ve Radar Points (RP) çıkarmak için radara tıklayın.<br><br>
⚡ <b>Seviye atlayın:</b> Yeni frekansların kilidini açmak için çubuğu doldurun. Seviye ne kadar yüksek olursa, her tıklama o kadar çok RP getirir.<br><br>
🎁 <b>Bonuslar:</b> Daha fazla kazanmak için basit görevleri tamamlayın ve arkadaşlarınızı davet edin.<br><br>
💰 <b>GTR ile Değiştirin:</b> Biriktirdiğiniz RP'leri doğrudan ana ekranda değerli GTR token'larına dönüştürün!`
        },
        friends: {
            defaultName: 'İsim',
            title: 'Arkadaş listesi',
            inviteBanner: 'Arkadaşlarınızı davet edin ve ücretsiz token kazanın',
            details: 'Detaylar',
            modalDesc: 'Arkadaşlarınızı davet edin ve bonuslar alın',
            btnInvite: 'Arkadaş davet et',
            btnClose: 'Kapat',
            yourFriends: 'Arkadaşlarınız'
        }
    },
    it: {
        langName: 'Italiano',
        exchangeModal: {
            title: 'Cambio valuta',
            balance: 'Il tuo saldo:',
            currentAccount: 'Conto attuale:',
            available: 'Disponibile per lo scambio:',
            rate: 'Tasso: 1000 RP = 1 GTR',
            btnExchange: 'Scambia',
            btnNothing: 'Niente da scambiare',
            btnCancel: 'Annulla'
        },
        home: {
            title: 'Global Token Radar',
            leveltext: 'Frequenze',
            inviteModaltitle: 'Scollega wallet',
            inviteModalPrimaryButtonText: 'Annulla',
            inviteModalSecondaryButtonText: 'Scollega',
            inviteModaldescription: 'Sei sicuro di voler scollegare il tuo wallet TON?',
        },
        tasks: {
            title: 'Ricompense bonus',
            titleSize: 'clamp(20px, 7vw, 100px)', // Немного уменьшили для длинного слова "Ricompense"
            banner: 'Completa missioni semplici per ottenere un bonus',
            listHeader: 'Missioni',
            modalBtnGo: 'Vai alla missione',
            modalBtnCheck: 'Verifica',
            rewardSoon: '🎁 Ricompensa: Presto',
            rewardAmount: '🎁 Ricompensa: +',
            alerts: {
                connectWallet: 'Collega prima il wallet nella pagina principale!',
                noAddress: 'L\'indirizzo del wallet per la verifica non è configurato.',
                txSent: 'Transazione inviata alla rete! Fai clic su "Verifica" tra un minuto.'
            },
            items: {
                verificationName: 'Verifica del wallet',
                verificationDesc: 'Per confermare l\'attività dell\'account, effettua un trasferimento di prova di 1 USDT all\'indirizzo specificato.',
                xName: 'Segui su X',
                xDesc: 'Segui il nostro account ufficiale su X (Twitter) per essere il primo a conoscere tutte le novità del progetto.',
                tgName: 'Unisciti a Telegram',
                tgDesc: 'Unisciti alla nostra community ufficiale su Telegram. Lì organizziamo giveaway e chattiamo.',
                waitName: 'In attesa di testo',
                waitDesc: 'Una nuova missione apparirà qui a breve'
            }
        },
        infoModal: {
            title: 'Come funziona?',
            btnOk: 'Tutto chiaro!',
            btnClose: 'Chiudi',
            text: `📡 <b>Esplora le frequenze:</b> clicca sul radar per scansionare lo spazio ed estrarre Radar Points (RP).<br><br>
⚡ <b>Sali di livello:</b> riempi la barra per sbloccare nuove frequenze. Più alto è il livello, più RP ti dà ogni clic.<br><br>
🎁 <b>Bonus:</b> completa semplici missioni e invita gli amici per guadagnare ancora di più.<br><br>
💰 <b>Scambia in GTR:</b> converti i tuoi RP accumulati in preziosi token GTR direttamente nella schermata principale!`
        },
        friends: {
            defaultName: 'Nome',
            title: 'Lista amici',
            inviteBanner: 'Invita amici e guadagna token gratuiti',
            details: 'Dettagli',
            modalDesc: 'Invita gli amici e ottieni bonus',
            btnInvite: 'Invita un amico',
            btnClose: 'Chiudi',
            yourFriends: 'I tuoi amici'
        }
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