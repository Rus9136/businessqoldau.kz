export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    ru: {
      nav: {
        home: 'Главная',
        howToApply: 'Как подать заявку',
        terms: 'Правила',
        contacts: 'Контакты',
        privacy: 'Политика конфиденциальности',
        login: 'Войти',
        register: 'Регистрация',
        cabinet: 'Личный кабинет',
        logout: 'Выйти'
      },
      home: {
        title: 'Бизнес Camp 2025',
        subtitle: 'Конкурс для предпринимателей Казахстана',
        applyButton: 'Подать заявку',
        learnMore: 'Подробнее'
      },
      footer: {
        copyright: '© 2025 Бизнес Camp. Все права защищены.'
      },
      forms: {
        name: 'Имя',
        email: 'Email',
        phone: 'Телефон',
        city: 'Город',
        message: 'Сообщение',
        submit: 'Отправить',
        save: 'Сохранить',
        cancel: 'Отмена'
      }
    },
    kk: {
      nav: {
        home: 'Басты бет',
        howToApply: 'Өтінім беру',
        terms: 'Ережелер',
        contacts: 'Байланыс',
        privacy: 'Құпиялылық саясаты',
        login: 'Кіру',
        register: 'Тіркелу',
        cabinet: 'Жеке кабинет',
        logout: 'Шығу'
      },
      home: {
        title: 'Бизнес Camp 2025',
        subtitle: 'Қазақстан кәсіпкерлеріне арналған конкурс',
        applyButton: 'Өтінім беру',
        learnMore: 'Толығырақ'
      },
      footer: {
        copyright: '© 2025 Бизнес Camp. Барлық құқықтар қорғалған.'
      },
      forms: {
        name: 'Аты',
        email: 'Email',
        phone: 'Телефон',
        city: 'Қала',
        message: 'Хабарлама',
        submit: 'Жіберу',
        save: 'Сақтау',
        cancel: 'Болдырмау'
      }
    }
  }
}))