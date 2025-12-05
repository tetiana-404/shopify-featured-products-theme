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

## Використання секції Featured Products
- Перейти до адмінки Shopify → Online Store → Themes → Customize
- Додати секцію **Featured Products** на головну сторінку
- Налаштувати:
  - Колекцію товарів
  - Кількість товарів
  - Кількість колонок для desktop і mobile

## Встановлення та dev environment

1. Клонувати репозиторій:
```bash
git clone https://github.com/tetiana-404/shopify-featured-products-theme.git
cd shopify-featured-products-theme

2. Встановити Shopify CLI (якщо ще не встановлено):
npm install -g @shopify/cli @shopify/theme

3. Логін у свій Shopify акаунт:
shopify login --store 28wszw-ry.myshopify.com

4. Запуск dev environment для локальної роботи з темою:
shopify theme dev


