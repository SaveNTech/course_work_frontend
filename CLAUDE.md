# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Курсовая работа: ИС учёта продаж и распределения товара. Стек — React 18 + Vite, без бэкенда (mock-данные).

## Commands

```bash
cd frontend
npm install      # первый раз
npm run dev      # dev-сервер → http://localhost:5173
npm run build    # production-сборка
```

## Architecture

```
frontend/src/
  data/mockData.js          # все данные: products, sales, distribution, monthlySales, categoryData
  components/Layout/        # Layout.jsx (Outlet), Sidebar.jsx, Header.jsx
  pages/
    Dashboard.jsx           # KPI-карточки, LineChart выручки, PieChart по категориям, таблица последних продаж
    Products.jsx            # таблица товаров, поиск + фильтр по категории, модалка добавления
    Sales.jsx               # таблица продаж, поиск + фильтр по статусу, итоговая сумма
    Distribution.jsx        # таблица поставок, фильтры по статусу и перевозчику
    Reports.jsx             # BarChart/AreaChart по месяцам, таблица категорий, топ клиентов
```

**Роутинг:** react-router-dom v6, вложенный `<Route element={<Layout/>}>`, Layout рендерит `<Outlet/>`.

**Стили:** один файл `src/index.css` с CSS-переменными (`--color-primary`, `--sidebar-width` и др.). Компонентных CSS-файлов нет.

**Зависимости:** recharts (графики), lucide-react (иконки).

**Данные:** все mock-данные только в `src/data/mockData.js`. Состояние страниц локальное (`useState`), Products допускает добавление новых записей в runtime.
