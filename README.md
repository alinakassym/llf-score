# LLF Score  

Мобильное приложение, созданное специально для футбольных сообществ Казахстана. Его цель — упростить организацию и участие в любительских турнирах.  

### Возможности  
- Просмотр расписания матчей и турниров  
- Ведение счёта и статистики в реальном времени  
- Рейтинг игроков и команд  
- Управление командами и их составами  
- Поддержка двух языков (казахский и русский)  

**Стек технологий:**  
- [Expo](https://expo.dev/) (React Native)  
- [TypeScript](https://www.typescriptlang.org/)  
- [expo-router](https://expo.github.io/router/docs)  
- [Gluestack UI](https://gluestack.io/)  
- [NativeWind](https://www.nativewind.dev/)  

---



## Требования  
- Node.js LTS (рекомендуется 20.x)  
- npm / pnpm / yarn  
- Аккаунт на [expo.dev](https://expo.dev) (для OTA-обновлений через EAS Update)  
- Установленный [EAS CLI](https://docs.expo.dev/eas-cli/):  
  ```bash
  npm i -g eas-cli
  ```

---

## Установка и запуск  

```bash
# 1. Клонирование репозитория
git clone git@github.com:alinakassym/llf-score.git
cd llf-score

# 2. Установка зависимостей
npm install

# 3. Запуск dev
npm start
# или
npx expo start
# c очисткой кэша 
npx expo start -c
```

📱 **Expo Go**: отсканируй QR-код из терминала камерой телефона (с установленным Expo Go).  

---

## OTA-обновления через EAS Update  

1. Авторизация и инициализация проекта:  
   ```bash
   eas login
   eas init
   ```

2. Отправка обновления:  
   ```bash
   eas update --branch main --message "feat: first OTA update"
   ```

После успешного апдейта появятся ссылки на **Project page** и **Update page** на expo.dev. Их можно открыть в **Expo Go**.  

> ⚠️ EAS Update — это обновления «по воздуху» для JS/ассетов. Для сборки apk/ipa используй `eas build`.  

---

## Скрипты  

```jsonc
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "lint": "eslint ."
  }
}
```

---

## Коммит-стиль  

Мы придерживаемся [Conventional Commits](https://www.conventionalcommits.org/):  
- `feat: ...` — новая функциональность  
- `fix: ...` — исправление ошибок  
- `chore: ...` — изменения в инфраструктуре/конфиге  
- `docs: ...` — документация  
- `refactor: ...` — рефакторинг без изменения логики  
