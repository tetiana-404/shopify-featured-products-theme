# Shopify Featured Products Theme

## Опис проекту
Це кастомна тема Shopify з секцією **Featured Products**, яка:
- Відображає обрані товари на головній сторінці.
- Дозволяє додавати товари до кошика без перезавантаження сторінки.
- Підтримує налаштування кількості товарів, колонок та швидкого додавання (Quick Add).

## Структура проекту
├─ sections/ # кастомні секції теми
├─ assets/ # CSS, JS, шрифти, зображення
├─ snippets/ # маленькі компоненти для вставки
├─ templates/ # шаблони сторінок
├─ config/ # конфігурація теми
└─ README.md


## Встановлення та dev environment

1. Клонувати репозиторій:
```bash
git clone https://github.com/username/shopify-featured-products-theme.git
cd shopify-featured-products-theme

2. Встановити Shopify CLI (якщо ще не встановлено):
npm install -g @shopify/cli @shopify/theme

3. Логін у свій Shopify акаунт:
shopify login --store your-store-name.myshopify.com

4. Запуск dev environment для локальної роботи з темою:
shopify theme dev
