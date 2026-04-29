export const products = [
  { id: 1,  name: 'Ноутбук Dell XPS 15',           category: 'Электроника',   stock: 45,  maxStock: 100, price: 89990,  status: 'В наличии',      sku: 'DELL-XPS15-001' },
  { id: 2,  name: 'Мышь Logitech MX Master 3',      category: 'Периферия',     stock: 120, maxStock: 200, price: 5990,   status: 'В наличии',      sku: 'LOG-MXM3-002'   },
  { id: 3,  name: 'Монитор Samsung 27"',             category: 'Электроника',   stock: 18,  maxStock: 50,  price: 32990,  status: 'Мало',           sku: 'SAM-MON27-003'  },
  { id: 4,  name: 'Клавиатура Keychron K2',          category: 'Периферия',     stock: 0,   maxStock: 80,  price: 8490,   status: 'Нет в наличии',  sku: 'KEY-K2-004'     },
  { id: 5,  name: 'Microsoft Office 2024',           category: 'ПО',            stock: 200, maxStock: 200, price: 12990,  status: 'В наличии',      sku: 'MS-OFF24-005'   },
  { id: 6,  name: 'Принтер HP LaserJet Pro',         category: 'Оргтехника',    stock: 8,   maxStock: 30,  price: 24990,  status: 'Мало',           sku: 'HP-LJP-006'     },
  { id: 7,  name: 'SSD Samsung 970 EVO 1TB',         category: 'Комплектующие', stock: 75,  maxStock: 150, price: 7990,   status: 'В наличии',      sku: 'SAM-SSD1T-007'  },
  { id: 8,  name: 'Веб-камера Logitech C920',        category: 'Периферия',     stock: 33,  maxStock: 60,  price: 6490,   status: 'В наличии',      sku: 'LOG-C920-008'   },
  { id: 9,  name: 'Наушники Sony WH-1000XM5',        category: 'Электроника',   stock: 12,  maxStock: 40,  price: 29990,  status: 'Мало',           sku: 'SNY-WH5-009'    },
  { id: 10, name: 'USB-хаб Anker 7-в-1',             category: 'Периферия',     stock: 95,  maxStock: 120, price: 3290,   status: 'В наличии',      sku: 'ANK-HUB7-010'   },
  { id: 11, name: 'Антивирус Kaspersky Total',       category: 'ПО',            stock: 150, maxStock: 200, price: 2490,   status: 'В наличии',      sku: 'KAS-AV-011'     },
  { id: 12, name: 'МФУ Canon PIXMA G3420',           category: 'Оргтехника',    stock: 5,   maxStock: 20,  price: 18990,  status: 'Мало',           sku: 'CAN-PIX-012'    },
]

export const sales = [
  { id: 'ПРД-2025-001', date: '2025-04-28', customer: 'ООО «ТехноПро»',        product: 'Ноутбук Dell XPS 15',      qty: 5,  total: 449950, status: 'Выполнен'    },
  { id: 'ПРД-2025-002', date: '2025-04-27', customer: 'ИП Смирнов А.В.',       product: 'Мышь Logitech MX Master 3', qty: 10, total: 59900,  status: 'Выполнен'    },
  { id: 'ПРД-2025-003', date: '2025-04-27', customer: 'АО «Систематика»',      product: 'Microsoft Office 2024',    qty: 25, total: 324750, status: 'В обработке' },
  { id: 'ПРД-2025-004', date: '2025-04-26', customer: 'ООО «Медиасфера»',      product: 'Монитор Samsung 27"',      qty: 8,  total: 263920, status: 'Выполнен'    },
  { id: 'ПРД-2025-005', date: '2025-04-25', customer: 'ФГБУ «НИИ Прогресс»',  product: 'SSD Samsung 970 EVO 1TB',  qty: 20, total: 159800, status: 'В обработке' },
  { id: 'ПРД-2025-006', date: '2025-04-24', customer: 'ООО «РосСтрой»',        product: 'Принтер HP LaserJet Pro',  qty: 3,  total: 74970,  status: 'Отменён'     },
  { id: 'ПРД-2025-007', date: '2025-04-24', customer: 'ИП Козлова Н.П.',       product: 'Наушники Sony WH-1000XM5', qty: 4,  total: 119960, status: 'Выполнен'    },
  { id: 'ПРД-2025-008', date: '2025-04-23', customer: 'ЗАО «ИнфоТех»',         product: 'Клавиатура Keychron K2',   qty: 15, total: 127350, status: 'Выполнен'    },
  { id: 'ПРД-2025-009', date: '2025-04-22', customer: 'ООО «ТехноПро»',        product: 'USB-хаб Anker 7-в-1',      qty: 30, total: 98700,  status: 'В обработке' },
  { id: 'ПРД-2025-010', date: '2025-04-21', customer: 'АО «Систематика»',      product: 'Антивирус Kaspersky Total',qty: 50, total: 124500, status: 'Выполнен'    },
  { id: 'ПРД-2025-011', date: '2025-04-20', customer: 'МУП «ГорТранс»',        product: 'МФУ Canon PIXMA G3420',    qty: 2,  total: 37980,  status: 'Выполнен'    },
  { id: 'ПРД-2025-012', date: '2025-04-19', customer: 'ООО «Медиасфера»',      product: 'Веб-камера Logitech C920', qty: 8,  total: 51920,  status: 'Выполнен'    },
  { id: 'ПРД-2025-013', date: '2025-04-18', customer: 'ФГБУ «НИИ Прогресс»',  product: 'Ноутбук Dell XPS 15',      qty: 2,  total: 179980, status: 'Отменён'     },
  { id: 'ПРД-2025-014', date: '2025-04-17', customer: 'ИП Смирнов А.В.',       product: 'SSD Samsung 970 EVO 1TB',  qty: 12, total: 95880,  status: 'Выполнен'    },
  { id: 'ПРД-2025-015', date: '2025-04-16', customer: 'ЗАО «ИнфоТех»',         product: 'Microsoft Office 2024',    qty: 10, total: 129900, status: 'Выполнен'    },
]

export const distribution = [
  { id: 'РСП-2025-001', date: '2025-04-28', destination: 'Москва, ул. Ленина, 42',              items: 15, weight: '68 кг',  carrier: 'СДЭК',            status: 'В пути',            eta: '2025-04-30' },
  { id: 'РСП-2025-002', date: '2025-04-27', destination: 'Санкт-Петербург, пр. Невский, 18',    items: 8,  weight: '32 кг',  carrier: 'DPD',              status: 'Доставлен',         eta: '2025-04-28' },
  { id: 'РСП-2025-003', date: '2025-04-27', destination: 'Новосибирск, ул. Кирова, 5',          items: 25, weight: '115 кг', carrier: 'Деловые Линии',    status: 'В пути',            eta: '2025-05-02' },
  { id: 'РСП-2025-004', date: '2025-04-26', destination: 'Екатеринбург, пр. Ленина, 74',        items: 12, weight: '54 кг',  carrier: 'СДЭК',             status: 'Доставлен',         eta: '2025-04-27' },
  { id: 'РСП-2025-005', date: '2025-04-25', destination: 'Казань, ул. Баумана, 30',             items: 6,  weight: '22 кг',  carrier: 'Почта России',     status: 'В пути',            eta: '2025-05-05' },
  { id: 'РСП-2025-006', date: '2025-04-25', destination: 'Нижний Новгород, пл. Минина, 8',      items: 20, weight: '88 кг',  carrier: 'DPD',              status: 'Ожидает отправки',  eta: '2025-05-01' },
  { id: 'РСП-2025-007', date: '2025-04-24', destination: 'Ростов-на-Дону, пр. Буденновский, 53',items: 10, weight: '45 кг',  carrier: 'СДЭК',             status: 'Доставлен',         eta: '2025-04-26' },
  { id: 'РСП-2025-008', date: '2025-04-23', destination: 'Краснодар, ул. Красная, 139',         items: 18, weight: '76 кг',  carrier: 'Деловые Линии',    status: 'Доставлен',         eta: '2025-04-25' },
  { id: 'РСП-2025-009', date: '2025-04-22', destination: 'Самара, ул. Куйбышева, 128',          items: 7,  weight: '30 кг',  carrier: 'Почта России',     status: 'В пути',            eta: '2025-05-03' },
  { id: 'РСП-2025-010', date: '2025-04-21', destination: 'Воронеж, пр. Революции, 22',          items: 14, weight: '62 кг',  carrier: 'СДЭК',             status: 'Доставлен',         eta: '2025-04-23' },
  { id: 'РСП-2025-011', date: '2025-04-20', destination: 'Уфа, ул. Ленина, 10',                 items: 9,  weight: '38 кг',  carrier: 'DPD',              status: 'Ожидает отправки',  eta: '2025-04-29' },
  { id: 'РСП-2025-012', date: '2025-04-19', destination: 'Челябинск, ул. Кирова, 94',           items: 22, weight: '98 кг',  carrier: 'Деловые Линии',    status: 'Доставлен',         eta: '2025-04-22' },
]

export const monthlySales = [
  { month: 'Май',  revenue: 1240000, orders: 45 },
  { month: 'Июн',  revenue: 980000,  orders: 38 },
  { month: 'Июл',  revenue: 1150000, orders: 42 },
  { month: 'Авг',  revenue: 1380000, orders: 51 },
  { month: 'Сен',  revenue: 1620000, orders: 58 },
  { month: 'Окт',  revenue: 1890000, orders: 67 },
  { month: 'Ноя',  revenue: 2100000, orders: 74 },
  { month: 'Дек',  revenue: 2450000, orders: 89 },
  { month: 'Янв',  revenue: 1680000, orders: 62 },
  { month: 'Фев',  revenue: 1950000, orders: 71 },
  { month: 'Мар',  revenue: 2280000, orders: 82 },
  { month: 'Апр',  revenue: 2640000, orders: 94 },
]

export const categoryData = [
  { name: 'Электроника',   value: 42, color: '#3b82f6' },
  { name: 'Периферия',     value: 28, color: '#8b5cf6' },
  { name: 'ПО',            value: 15, color: '#10b981' },
  { name: 'Оргтехника',    value: 10, color: '#f59e0b' },
  { name: 'Комплектующие', value: 5,  color: '#ef4444' },
]
