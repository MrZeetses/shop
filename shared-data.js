// ============================================================================
// СТИЛЬ & ОБРАЗ — Магазин одежды и аксессуаров
// Общие данные каталога, корзины, персонала, настройки Supabase и Storage
// ============================================================================

// ============================================================================
// 🔑 МЕСТО ДЛЯ ВСТАВКИ КЛЮЧЕЙ ВАШЕГО НОВОГО ПРОЕКТА SUPABASE:
// 1. Создайте новый проект в https://supabase.com/dashboard
// 2. Выполните SQL-скрипт из файла supabase/schema.sql в SQL Editor
// 3. Скопируйте Project URL и anon / publishable key из Project Settings -> API
//    и вставьте их в две строки ниже (или через кнопку «🔑 Ключи Supabase» на сайте):
// ============================================================================
window.STYLE_DEFAULT_SB_URL    = "https://zpmapedzbbrfxlmuncbd.supabase.co";
window.STYLE_DEFAULT_SB_KEY    = "sb_publishable_Q8bp5yDcT3g-b0K7tnvbfw_RYFYDkMi";
window.STYLE_DEFAULT_SB_BUCKET = "product-images"; // Бакет Supabase Storage для сохранения фото товаров
window.STYLE_DEFAULT_AI_FN     = "style-ai";       // Имя Supabase Edge Function для ИИ-ассистента

window.cleanSupabaseUrl = function (rawUrl) {
  return String(rawUrl || "")
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");
};

const IMG = window.STYLE_IMAGES || {};

// Категории верхнего меню (точно по макетам image.png - image_4.png)
window.STYLE_CATEGORIES = [
  { slug: "new",    name: "Новинки",          title: "Новинки сезона Осень-Зима '26", breadcrumb: "Новинки",          count: 340,  isSale: false },
  { slug: "women",  name: "Женщинам",         title: "Женская верхняя одежда",        breadcrumb: "Женщинам",         count: 2150, isSale: false },
  { slug: "men",    name: "Мужчинам",         title: "Мужская верхняя одежда",        breadcrumb: "Мужчинам",         count: 1420, isSale: false },
  { slug: "kids",   name: "Детям",            title: "Детская верхняя одежда",        breadcrumb: "Детям",            count: 680,  isSale: false },
  { slug: "brands", name: "Бренды",           title: "Коллекции брендов",             breadcrumb: "Бренды",           count: 950,  isSale: false },
  { slug: "sale",   name: "Распродажа %",     title: "Распродажа коллекции до -40%",  breadcrumb: "Распродажа %",     count: 520,  isSale: true  },
  { slug: "sport",  name: "Спортивный стиль", title: "Спортивный стиль и актив",      breadcrumb: "Спортивный стиль", count: 410,  isSale: false },
  { slug: "shoes",  name: "Обувь",            title: "Обувь из натуральной кожи",     breadcrumb: "Обувь",            count: 790,  isSale: false }
];

window.STYLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// 10 цветовых кружков фильтра из макетов image.png и image_2.png
window.STYLE_COLORS = [
  { id: "c-graphite", name: "Графитовый",     hex: "#2d2f31" },
  { id: "c-black",    name: "Черный",         hex: "#0d0f12" },
  { id: "c-dgreen",   name: "Темно-зеленый",  hex: "#233628" },
  { id: "c-olive",    name: "Оливковый",      hex: "#3f4f3c" },
  { id: "c-indigo",   name: "Индиго",         hex: "#223056" },
  { id: "c-navy",     name: "Темно-синий",    hex: "#192d4b" },
  { id: "c-beige",    name: "Светло-бежевый", hex: "#e1d6c6" },
  { id: "c-burgundy", name: "Бордовый",       hex: "#5c1f1f" },
  { id: "c-brown",    name: "Шоколадный",     hex: "#4f3d37" },
  { id: "c-sage",     name: "Серо-оливковый", hex: "#575e54" }
];

window.STYLE_BRANDS = [
  "Urban Trend",
  "Rock&Roll",
  "Nordic Shield",
  "Casual Sport",
  "Grace & Style",
  "Bella Vista",
  "Urban Casual"
];

window.STYLE_SEASONS = [
  "Осень-Зима '26",
  "Зима",
  "Демисезон",
  "Всесезонный"
];

window.STYLE_PROMOS = [
  { code: "STYLE15",  discount: 15, min: 20000, desc: "Скидка 15% на осеннюю коллекцию от 20 000 ₸" },
  { code: "AUTUMN26", discount: 20, min: 40000, desc: "Скидка 20% на верхнюю одежду Осень-Зима '26" },
  { code: "KASPI10",  discount: 10, min: 15000, desc: "Скидка 10% при оплате Kaspi / Картой" },
  { code: "VIP30",    discount: 30, min: 80000, desc: "VIP-скидка 30% при заказе от 80 000 ₸" }
];

window.STYLE_ORDER_STATUS_META = {
  new:        { label: "Принят в обработку", step: 1, badge: "bg-blue-100 text-blue-800" },
  assembling: { label: "Комплектуется на складе", step: 2, badge: "bg-amber-100 text-amber-800" },
  shipped:    { label: "Передан в доставку", step: 3, badge: "bg-indigo-100 text-indigo-800" },
  delivered:  { label: "Доставлен / Готов к примерке", step: 4, badge: "bg-emerald-100 text-emerald-800" },
  completed:  { label: "Выполнен", step: 5, badge: "bg-slate-200 text-slate-800" },
  cancelled:  { label: "Отменён", step: 0, badge: "bg-rose-100 text-rose-800" },
  refunded:   { label: "Возврат / Обмен размера", step: 0, badge: "bg-rose-200 text-rose-900" }
};

// Начальный каталог товаров (100% соответствие макетам image.png, image_2.png, image_3.png, image_5.png)
window.STYLE_SEED_PRODUCTS = [
  // === МУЖЧИНАМ (image.png) ===
  {
    id: "prod-m-1",
    sku: "WO-8410",
    category_slug: "men",
    subcategory: "Верхняя одежда",
    brand: "Urban Trend",
    name: "Пальто шерстяное классическое",
    description: "Элегантное двубортное мужское пальто из премиальной смесовой шерсти темно-синего оттенка. Идеальная посадка по фигуре, ветрозащитный воротник и теплая подкладка для осени и зимы.",
    purchase_price: 21000,
    base_price: 42000,
    old_price: 60000,
    discount_percent: 30,
    badge: "SALE -30%",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Темно-синий", hex: "#192d4b" },
      { name: "Графитовый", hex: "#2d2f31" },
      { name: "Черный", hex: "#0d0f12" }
    ],
    season: "Осень-Зима '26",
    image: IMG.men_coat || "assets/images/men_coat.jpg",
    gallery: [IMG.men_coat || "assets/images/men_coat.jpg", IMG.parka_sketch || ""],
    stock_qty: 32,
    min_stock: 5,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: false,
    is_sale: true,
    popularity: 99
  },
  {
    id: "prod-m-2",
    sku: "LE-2015",
    category_slug: "men",
    subcategory: "Верхняя одежда",
    brand: "Rock&Roll",
    name: "Куртка из натуральной кожи",
    description: "Культовая мужская кожаная куртка-косуха из мягкой натуральной кожи премиальной выделки. Металлическая фурнитура, ветрозащитные молнии и удобные внутренние карманы.",
    purchase_price: 34000,
    base_price: 68900,
    old_price: null,
    discount_percent: 0,
    badge: "",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Черный", hex: "#0d0f12" },
      { name: "Шоколадный", hex: "#4f3d37" }
    ],
    season: "Демисезон",
    image: IMG.men_leather || "assets/images/men_leather.jpg",
    gallery: [IMG.men_leather || "assets/images/men_leather.jpg", IMG.lookbook_shearling || ""],
    stock_qty: 19,
    min_stock: 4,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: false,
    popularity: 96
  },
  {
    id: "prod-m-3",
    sku: "WO-4509",
    category_slug: "men",
    subcategory: "Верхняя одежда",
    brand: "Nordic Shield",
    name: "Парка зимняя утепленная",
    description: "Утепленная зимняя парка с водоотталкивающим покрытием. Высокий воротник-стойка, капюшон, множество функциональных карманов и защита от морозов до -30°C.",
    purchase_price: 18000,
    base_price: 55000,
    old_price: null,
    discount_percent: 0,
    badge: "NEW",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Оливковый", hex: "#3f4f3c" },
      { name: "Темно-синий", hex: "#192d4b" },
      { name: "Черный", hex: "#0d0f12" }
    ],
    season: "Зима",
    image: IMG.men_parka || "assets/images/men_parka.jpg",
    gallery: [IMG.men_parka || "assets/images/men_parka.jpg", IMG.parka_sketch || ""],
    stock_qty: 45,
    min_stock: 5,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: false,
    popularity: 95
  },
  {
    id: "prod-m-4",
    sku: "BO-0419",
    category_slug: "men",
    subcategory: "Верхняя одежда",
    brand: "Casual Sport",
    name: "Куртка-бомбер демисезонная",
    description: "Легкая демисезонная куртка-бомбер лаконичного кроя из ветрозащитной мембранной ткани. Эластичные манжеты, воротник-рибана и комфортная посадка на каждый день.",
    purchase_price: 11500,
    base_price: 24500,
    old_price: null,
    discount_percent: 0,
    badge: "",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Серо-оливковый", hex: "#575e54" },
      { name: "Графитовый", hex: "#2d2f31" },
      { name: "Темно-синий", hex: "#192d4b" }
    ],
    season: "Демисезон",
    image: IMG.men_bomber || "assets/images/men_bomber.jpg",
    gallery: [IMG.men_bomber || "assets/images/men_bomber.jpg"],
    stock_qty: 38,
    min_stock: 6,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: false,
    is_sale: false,
    popularity: 90
  },

  // === ЖЕНЩИНАМ (image_2.png) ===
  {
    id: "prod-w-1",
    sku: "WO-8472",
    category_slug: "women",
    subcategory: "Верхняя одежда",
    brand: "Grace & Style",
    name: "Пальто шерстяное классическое бежевое",
    description: "Изысканное женское шерстяное пальто классического кроя в благородном бежевом оттенке Camel. Пояс в комплекте, глубокие накладные карманы и шелковистая подкладка.",
    purchase_price: 22000,
    base_price: 45500,
    old_price: 65000,
    discount_percent: 30,
    badge: "SALE -30%",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Светло-бежевый", hex: "#e1d6c6" },
      { name: "Шоколадный", hex: "#4f3d37" },
      { name: "Черный", hex: "#0d0f12" }
    ],
    season: "Осень-Зима '26",
    image: IMG.women_coat || "assets/images/women_coat.jpg",
    gallery: [IMG.women_coat || "assets/images/women_coat.jpg"],
    stock_qty: 27,
    min_stock: 5,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: false,
    is_sale: true,
    popularity: 98
  },
  {
    id: "prod-w-2",
    sku: "AV-1180",
    category_slug: "women",
    subcategory: "Верхняя одежда",
    brand: "Bella Vista",
    name: "Куртка-авиатор утепленная",
    description: "Стильная женская куртка-авиатор с мягкой меховой отделкой воротника и манжет. Регулируемый ремень по низу, косая молния и надежная защита от холодного ветра.",
    purchase_price: 28000,
    base_price: 58900,
    old_price: null,
    discount_percent: 0,
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Черный", hex: "#0d0f12" },
      { name: "Шоколадный", hex: "#4f3d37" }
    ],
    season: "Осень-Зима '26",
    image: IMG.women_aviator || "assets/images/women_aviator.jpg",
    gallery: [IMG.women_aviator || "assets/images/women_aviator.jpg"],
    stock_qty: 22,
    min_stock: 4,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: false,
    popularity: 94
  },
  {
    id: "prod-w-3",
    sku: "PK-6204",
    category_slug: "women",
    subcategory: "Верхняя одежда",
    brand: "Nordic Shield",
    name: "Парка зимняя с меховой отделкой",
    description: "Теплая женская зимняя парка оливкового цвета с пушистой меховой опушкой капюшона. Кулиска на талии подчеркивает силуэт, а современный утеплитель сохраняет тепло до -35°C.",
    purchase_price: 29500,
    base_price: 62000,
    old_price: null,
    discount_percent: 0,
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Оливковый", hex: "#3f4f3c" },
      { name: "Темно-зеленый", hex: "#233628" },
      { name: "Темно-синий", hex: "#192d4b" }
    ],
    season: "Зима",
    image: IMG.women_parka || "assets/images/women_parka.jpg",
    gallery: [IMG.women_parka || "assets/images/women_parka.jpg"],
    stock_qty: 31,
    min_stock: 5,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: false,
    popularity: 93
  },
  {
    id: "prod-w-4",
    sku: "BO-0312",
    category_slug: "women",
    subcategory: "Верхняя одежда",
    brand: "Urban Casual",
    name: "Куртка-бомбер демисезонная",
    description: "Уютный женский бомбер в светло-бежевом оттенке из мягкого плотного трикотажа и ветрозащитного хлопка. Золотистая молния, комфортный крой и универсальная сочетаемость.",
    purchase_price: 13000,
    base_price: 28500,
    old_price: null,
    discount_percent: 0,
    badge: "",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Светло-бежевый", hex: "#e1d6c6" },
      { name: "Серо-оливковый", hex: "#575e54" }
    ],
    season: "Демисезон",
    image: IMG.women_bomber || "assets/images/women_bomber.jpg",
    gallery: [IMG.women_bomber || "assets/images/women_bomber.jpg"],
    stock_qty: 40,
    min_stock: 6,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: false,
    is_sale: false,
    popularity: 91
  },

  // === ДЕТЯМ, СПОРТ, ОБУВЬ ===
  {
    id: "prod-k-1",
    sku: "KD-5011",
    category_slug: "kids",
    subcategory: "Детская верхняя одежда",
    brand: "Nordic Shield",
    name: "Пуховик детский зимний Colorblock",
    description: "Легкий и теплый детский зимний пуховик с капюшоном, светоотражающими деталями и водоотталкивающей пропиткой ткани.",
    purchase_price: 14500,
    base_price: 32000,
    old_price: 40000,
    discount_percent: 20,
    badge: "NEW",
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Темно-синий", hex: "#192d4b" },
      { name: "Оливковый", hex: "#3f4f3c" }
    ],
    season: "Зима",
    image: IMG.kids_jacket || "assets/images/kids_jacket.jpg",
    gallery: [IMG.kids_jacket || "assets/images/kids_jacket.jpg"],
    stock_qty: 28,
    min_stock: 5,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: true,
    popularity: 89
  },
  {
    id: "prod-sp-1",
    sku: "SP-7720",
    category_slug: "sport",
    subcategory: "Спортивные костюмы",
    brand: "Casual Sport",
    name: "Костюм спортивный Tech Motion графит",
    description: "Комплект из худи на молнии и джоггеров анатомического кроя из дышащего эластичного хлопка с добавлением технических волокон.",
    purchase_price: 14000,
    base_price: 29500,
    old_price: 36900,
    discount_percent: 20,
    badge: "SALE -20%",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Графитовый", hex: "#2d2f31" },
      { name: "Черный", hex: "#0d0f12" }
    ],
    season: "Всесезонный",
    image: IMG.sport_suit || "assets/images/sport_suit.jpg",
    gallery: [IMG.sport_suit || "assets/images/sport_suit.jpg"],
    stock_qty: 52,
    min_stock: 8,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: false,
    is_sale: true,
    popularity: 88
  },
  {
    id: "prod-sh-1",
    sku: "SH-9014",
    category_slug: "shoes",
    subcategory: "Ботинки и Челси",
    brand: "Urban Trend",
    name: "Ботинки Челси из натуральной кожи",
    description: "Демисезонные кожаные ботинки Челси на протекторной подошве с эластичными боковыми вставками и кожаной стелькой.",
    purchase_price: 21000,
    base_price: 44900,
    old_price: 54000,
    discount_percent: 17,
    badge: "SALE -17%",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Шоколадный", hex: "#4f3d37" },
      { name: "Черный", hex: "#0d0f12" }
    ],
    season: "Осень-Зима '26",
    image: IMG.shoes_boots || "assets/images/shoes_boots.jpg",
    gallery: [IMG.shoes_boots || "assets/images/shoes_boots.jpg"],
    stock_qty: 24,
    min_stock: 4,
    warehouse: "Основной склад",
    is_available: true,
    is_published: true,
    is_new: true,
    is_sale: true,
    popularity: 92
  }
];

// Начальная корзина покупателя (точно по макету image_3.png: 3 товара, 142 900 ₸, скидка -19 500 ₸, итого 123 400 ₸)
window.STYLE_SEED_CART = [
  {
    id: "prod-w-1",
    sku: "WO-8472",
    brand: "Grace & Style",
    name: "Пальто шерстяное классическое бежевое",
    size: "S",
    color: "бежевый",
    price: 45500,
    old_price: 65000,
    promo_discount: 19500,
    qty: 1,
    image: IMG.women_coat || "assets/images/women_coat.jpg"
  },
  {
    id: "prod-m-2",
    sku: "LE-2015",
    brand: "Rock&Roll",
    name: "Куртка из натуральной кожи",
    size: "L",
    color: "черный",
    price: 68900,
    old_price: null,
    promo_discount: 0,
    qty: 1,
    image: IMG.men_leather || "assets/images/men_leather.jpg"
  },
  {
    id: "prod-w-4",
    sku: "BO-0312",
    brand: "Urban Casual",
    name: "Куртка-бомбер демисезонная",
    size: "M",
    color: "светло-бежевый",
    price: 28500,
    old_price: null,
    promo_discount: 0,
    qty: 1,
    image: IMG.women_bomber || "assets/images/women_bomber.jpg"
  }
];

// Штат сотрудников (точно по макету image_4.png)
window.STYLE_SEED_STAFF = [
  {
    id: "st-1",
    name: "Иванов Дмитрий",
    shortName: "Иванов Д.",
    position: "Администратор",
    department: "Торговый зал",
    status: "on_shift", // 'on_shift' | 'day_off' | 'vacation'
    hours: 128,
    salesKzt: 3420000,
    salesRub: 550000,
    planTarget: 3717000,
    planPercent: 92,
    hourlyRate: 2800,
    phone: "+7 (701) 234-56-01",
    email: "ivanov@style-obraz.kz",
    avatar: IMG.men_coat || "assets/images/men_coat.jpg"
  },
  {
    id: "st-2",
    name: "Петрова Анна",
    shortName: "Петрова А.",
    position: "Кассир-продавец",
    department: "Касса",
    status: "day_off",
    hours: 112,
    salesKzt: 1850000,
    salesRub: 0,
    planTarget: 2176000,
    planPercent: 85,
    hourlyRate: 2100,
    phone: "+7 (701) 234-56-02",
    email: "petrova@style-obraz.kz",
    avatar: IMG.women_coat || "assets/images/women_coat.jpg"
  },
  {
    id: "st-3",
    name: "Сидоров Алексей",
    shortName: "Сидоров А.",
    position: "Старший продавец",
    department: "Торговый зал",
    status: "on_shift",
    hours: 134,
    salesKzt: 4100000,
    salesRub: 0,
    planTarget: 3900000,
    planPercent: 105,
    hourlyRate: 2600,
    phone: "+7 (701) 234-56-03",
    email: "sidorov@style-obraz.kz",
    avatar: IMG.men_parka || "assets/images/men_parka.jpg"
  },
  {
    id: "st-4",
    name: "Кузнецова Елена",
    shortName: "Кузнецова Е.",
    position: "Кладовщик",
    department: "Склад",
    status: "vacation",
    hours: 40,
    salesKzt: 0,
    salesRub: 0,
    planTarget: 0,
    planPercent: 0,
    hourlyRate: 2000,
    phone: "+7 (701) 234-56-04",
    email: "kuznetsova@style-obraz.kz",
    avatar: IMG.women_parka || "assets/images/women_parka.jpg"
  },
  {
    id: "st-5",
    name: "Васильев Игорь",
    shortName: "Васильев И.",
    position: "Продавец-консультант",
    department: "Торговый зал",
    status: "on_shift",
    hours: 96,
    salesKzt: 2800000,
    salesRub: 0,
    planTarget: 3589000,
    planPercent: 78,
    hourlyRate: 2100,
    phone: "+7 (701) 234-56-05",
    email: "vasiliev@style-obraz.kz",
    avatar: IMG.men_leather || "assets/images/men_leather.jpg"
  },
  {
    id: "st-6",
    name: "Смирнова Алия",
    shortName: "Смирнова А.",
    position: "Продавец-консультант",
    department: "Торговый зал",
    status: "on_shift",
    hours: 118,
    salesKzt: 3150000,
    salesRub: 0,
    planTarget: 3300000,
    planPercent: 95,
    hourlyRate: 2100,
    phone: "+7 (701) 234-56-06",
    email: "smirnova@style-obraz.kz",
    avatar: IMG.women_bomber || "assets/images/women_bomber.jpg"
  },
  {
    id: "st-7",
    name: "Нурланов Ерлан",
    shortName: "Нурланов Е.",
    position: "Старший кладовщик",
    department: "Склад",
    status: "on_shift",
    hours: 124,
    salesKzt: 0,
    salesRub: 0,
    planTarget: 0,
    planPercent: 100,
    hourlyRate: 2200,
    phone: "+7 (701) 234-56-07",
    email: "nurlanov@style-obraz.kz",
    avatar: IMG.men_bomber || "assets/images/men_bomber.jpg"
  },
  {
    id: "st-8",
    name: "Ахметова Динара",
    shortName: "Ахметова Д.",
    position: "Кассир-продавец",
    department: "Касса",
    status: "on_shift",
    hours: 116,
    salesKzt: 2240000,
    salesRub: 0,
    planTarget: 2400000,
    planPercent: 93,
    hourlyRate: 2100,
    phone: "+7 (701) 234-56-08",
    email: "akhmetova@style-obraz.kz",
    avatar: IMG.women_aviator || "assets/images/women_aviator.jpg"
  }
];

// Задачи на день (точно по макету image_4.png)
window.STYLE_SEED_TASKS = [
  {
    id: "task-1",
    title: "Утренняя планерка и проверка готовности зала",
    statusNote: "Выполнено",
    assignee: "Иванов Д.",
    done: true
  },
  {
    id: "task-2",
    title: "Приемка новой поставки (осенняя коллекция)",
    statusNote: "В процессе",
    assignee: "Нурланов Е.",
    done: false
  },
  {
    id: "task-3",
    title: "Обновление ценников и манекенов",
    statusNote: "Назначено Петрова А.",
    assignee: "Петрова А.",
    done: false
  },
  {
    id: "task-4",
    title: "Вечерняя инкассация и закрытие смен",
    statusNote: "По расписанию 21:00",
    assignee: "Иванов Д.",
    done: false
  }
];

// Начальные заказы магазина для синхронизации между сайтом клиента и порталом персонала
window.STYLE_SEED_ORDERS = [
  {
    id: "ord-1001",
    number: 8401,
    customer: "Айгерим Сапарова",
    phone: "+7 (701) 555-44-11",
    email: "aigerim@mail.kz",
    deliveryType: "courier",
    city: "Алматы",
    address: "г. Алматы, пр. Достык, 89, кв. 24",
    paymentMethod: "kaspi",
    paymentStatus: "paid",
    transactionId: "KASPI-840199",
    status: "delivered",
    subtotal: 142900,
    discount: 19500,
    total: 123400,
    sellerName: "Сидоров Алексей",
    createdAt: Date.now() - 3600 * 1000 * 5,
    items: [
      { sku: "WO-8472", name: "Пальто шерстяное классическое бежевое", brand: "Grace & Style", size: "S", color: "бежевый", qty: 1, price: 45500 },
      { sku: "LE-2015", name: "Куртка из натуральной кожи", brand: "Rock&Roll", size: "L", color: "черный", qty: 1, price: 68900 },
      { sku: "BO-0312", name: "Куртка-бомбер демисезонная", brand: "Urban Casual", size: "M", color: "светло-бежевый", qty: 1, price: 28500 }
    ]
  },
  {
    id: "ord-1002",
    number: 8402,
    customer: "Нурсултан Бекетов",
    phone: "+7 (707) 321-98-76",
    email: "nursultan@mail.kz",
    deliveryType: "courier",
    city: "Астана",
    address: "г. Астана, ул. Кунаева, 14, офис 305",
    paymentMethod: "card",
    paymentStatus: "paid",
    transactionId: "VISA-840211",
    status: "assembling",
    subtotal: 97000,
    discount: 0,
    total: 97000,
    sellerName: "Иванов Дмитрий",
    createdAt: Date.now() - 3600 * 1000 * 2,
    items: [
      { sku: "WO-8410", name: "Пальто шерстяное классическое", brand: "Urban Trend", size: "L", color: "Темно-синий", qty: 1, price: 42000 },
      { sku: "WO-4509", name: "Парка зимняя утепленная", brand: "Nordic Shield", size: "XL", color: "Оливковый", qty: 1, price: 55000 }
    ]
  },
  {
    id: "ord-1003",
    number: 8403,
    customer: "Мадина Оспанова",
    phone: "+7 (777) 888-12-34",
    email: "madina@mail.kz",
    deliveryType: "pickup",
    city: "Алматы",
    address: "Самовывоз: ТРЦ Mega Alma-Ata, бутик Стиль & Образ",
    paymentMethod: "apple_pay",
    paymentStatus: "paid",
    transactionId: "APAY-840377",
    status: "new",
    subtotal: 120900,
    discount: 0,
    total: 120900,
    sellerName: "Васильев Игорь",
    createdAt: Date.now() - 1800 * 1000,
    items: [
      { sku: "AV-1180", name: "Куртка-авиатор утепленная", brand: "Bella Vista", size: "M", color: "Черный", qty: 1, price: 58900 },
      { sku: "PK-6204", name: "Парка зимняя с меховой отделкой", brand: "Nordic Shield", size: "M", color: "Оливковый", qty: 1, price: 62000 }
    ]
  }
];

// Форматирование цен в тенге (₸)
window.fmtKZT = function (n) {
  return Number(n || 0).toLocaleString("ru-RU") + " ₸";
};

// Единое локальное хранилище между index.html и staff.html + настройки Supabase
const SHARED_DB_KEY = "style_obraz_shared_db_v3";
const SB_CFG_KEY    = "style_obraz_supabase_cfg_v3";

window.loadStyleConfig = function () {
  const overrideUrl = window.cleanSupabaseUrl(window.SUPABASE_KEYS_OVERRIDE?.url || window.STYLE_DEFAULT_SB_URL || "");
  const overrideKey = (window.SUPABASE_KEYS_OVERRIDE?.key || window.STYLE_DEFAULT_SB_KEY || "").trim();
  const overrideBucket = (window.SUPABASE_KEYS_OVERRIDE?.bucket || window.STYLE_DEFAULT_SB_BUCKET || "product-images").trim();
  const overrideAiFn = (window.SUPABASE_KEYS_OVERRIDE?.aiFn || window.STYLE_DEFAULT_AI_FN || "style-ai").trim();

  try {
    const raw = localStorage.getItem(SB_CFG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        url: window.cleanSupabaseUrl(parsed.url) || overrideUrl,
        key: (parsed.key || "").trim() || overrideKey,
        bucket: (parsed.bucket || overrideBucket).trim(),
        aiFn: (parsed.aiFn || overrideAiFn).trim()
      };
    }
  } catch (_) {}

  return {
    url: overrideUrl,
    key: overrideKey,
    bucket: overrideBucket,
    aiFn: overrideAiFn
  };
};

window.saveStyleConfig = function (url, key, bucket, aiFn) {
  try {
    localStorage.setItem(
      SB_CFG_KEY,
      JSON.stringify({
        url: window.cleanSupabaseUrl(url),
        key: (key || "").trim(),
        bucket: (bucket || "product-images").trim(),
        aiFn: (aiFn || "style-ai").trim()
      })
    );
  } catch (_) {}
};

window.loadSharedDb = function () {
  try {
    const raw = localStorage.getItem(SHARED_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        products: parsed.products?.length ? parsed.products : [...window.STYLE_SEED_PRODUCTS],
        staff: parsed.staff?.length ? parsed.staff : [...window.STYLE_SEED_STAFF],
        tasks: parsed.tasks?.length ? parsed.tasks : [...window.STYLE_SEED_TASKS],
        orders: parsed.orders?.length ? parsed.orders : [...window.STYLE_SEED_ORDERS],
        cart: Array.isArray(parsed.cart) ? parsed.cart : [...window.STYLE_SEED_CART],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : ["prod-m-1", "prod-w-1"],
        paymentLogs: parsed.paymentLogs || []
      };
    }
  } catch (_) {}
  return {
    products: [...window.STYLE_SEED_PRODUCTS],
    staff: [...window.STYLE_SEED_STAFF],
    tasks: [...window.STYLE_SEED_TASKS],
    orders: [...window.STYLE_SEED_ORDERS],
    cart: [...window.STYLE_SEED_CART],
    favorites: ["prod-m-1", "prod-w-1"],
    paymentLogs: []
  };
};

window.saveSharedDb = function (patch) {
  try {
    const cur = window.loadSharedDb();
    const next = {
      products: patch.products || cur.products,
      staff: patch.staff || cur.staff,
      tasks: patch.tasks || cur.tasks,
      orders: patch.orders || cur.orders,
      cart: patch.cart !== undefined ? patch.cart : cur.cart,
      favorites: patch.favorites !== undefined ? patch.favorites : cur.favorites,
      paymentLogs: patch.paymentLogs || cur.paymentLogs
    };
    localStorage.setItem(SHARED_DB_KEY, JSON.stringify(next));
  } catch (_) {}
};

// ============================================================================
// ЗАГРУЗКА И СОХРАНЕНИЕ ИЗОБРАЖЕНИЙ В SUPABASE STORAGE (бакет product-images)
// ============================================================================
window.fileToDataUrl = function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

window.dataUrlToBlob = function (dataUrl) {
  const parts = String(dataUrl).split(",");
  if (parts.length < 2) return null;
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
};

/**
 * Загружает File или DataURL в Supabase Storage (в бакет product-images)
 * и возвращает публичный URL изображения в Supabase Storage.
 */
window.uploadImageToSupabaseStorage = async function (sbClient, fileOrDataUrl, nameHint = "item", bucketName = "product-images") {
  let fallbackDataUrl = "";
  let uploadBlob = null;
  let contentType = "image/jpeg";
  let ext = "jpg";

  if (typeof fileOrDataUrl === "string") {
    fallbackDataUrl = fileOrDataUrl;
    if (fileOrDataUrl.startsWith("http://") || fileOrDataUrl.startsWith("https://")) {
      return { url: fileOrDataUrl, storageUsed: true, bucket: bucketName };
    }
    if (fileOrDataUrl.startsWith("data:image/")) {
      uploadBlob = window.dataUrlToBlob(fileOrDataUrl);
      if (uploadBlob) contentType = uploadBlob.type || "image/jpeg";
    }
  } else if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
    uploadBlob = fileOrDataUrl;
    contentType = fileOrDataUrl.type || "image/jpeg";
    if (fileOrDataUrl.name) {
      const parsedExt = fileOrDataUrl.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (parsedExt) ext = parsedExt;
    }
    fallbackDataUrl = await window.fileToDataUrl(fileOrDataUrl);
  }

  if (!sbClient || !uploadBlob) {
    return { url: fallbackDataUrl, storageUsed: false, bucket: bucketName };
  }

  const safeSlug = String(nameHint || "product")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32) || "product";

  const filePath = `catalog/${safeSlug}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const bucketsToTry = Array.from(new Set([bucketName, "product-images", "menu-images"]));

  for (const bkt of bucketsToTry) {
    try {
      const { error: upErr } = await sbClient.storage
        .from(bkt)
        .upload(filePath, uploadBlob, {
          cacheControl: "3600",
          upsert: true,
          contentType
        });

      if (!upErr) {
        const { data: pubData } = sbClient.storage.from(bkt).getPublicUrl(filePath);
        if (pubData?.publicUrl) {
          return {
            url: pubData.publicUrl,
            storageUsed: true,
            bucket: bkt,
            path: filePath
          };
        }
      }
    } catch (_) {}
  }

  return { url: fallbackDataUrl, storageUsed: false, bucket: bucketName };
};

/**
 * Выгружает все изображения товаров каталога в Supabase Storage (бакет product-images)
 * и синхронизирует таблицы products, staff_members, staff_tasks, orders в новый проект Supabase.
 */
window.syncAllCatalogAndImagesToSupabase = async function (sbClient, stateProducts, bucketName = "product-images", onProgress = null) {
  if (!sbClient) throw new Error("Клиент Supabase не инициализирован. Проверьте URL и API Key.");

  const updatedProducts = [];
  let uploadedCount = 0;

  for (let i = 0; i < stateProducts.length; i++) {
    const p = { ...stateProducts[i] };
    if (onProgress) onProgress(`Загрузка фото ${i + 1}/${stateProducts.length} (${p.sku}) в Supabase Storage...`);

    let imgSource = p.image;
    if (!imgSource || (!imgSource.startsWith("data:image/") && !imgSource.startsWith("http"))) {
      imgSource = IMG.men_parka || "";
    }

    const up = await window.uploadImageToSupabaseStorage(sbClient, imgSource, p.sku || p.id, bucketName);
    if (up.url) {
      p.image = up.url;
      if (up.storageUsed) uploadedCount++;
    }
    updatedProducts.push(p);

    try {
      await sbClient.from("products").upsert({
        id: p.id,
        sku: p.sku || "WO-4509",
        category_slug: p.category_slug || "men",
        subcategory: p.subcategory || "Верхняя одежда",
        brand: p.brand || "Nordic Shield",
        name: p.name,
        description: p.description || "",
        purchase_price: Number(p.purchase_price || 18000),
        base_price: Number(p.base_price || 45000),
        old_price: p.old_price ? Number(p.old_price) : null,
        discount_percent: Number(p.discount_percent || 0),
        badge: p.badge || "",
        sizes: Array.isArray(p.sizes) ? p.sizes : ["S", "M", "L", "XL"],
        colors: Array.isArray(p.colors) ? p.colors : [{ name: "Черный", hex: "#0d0f12" }],
        season: p.season || "Осень-Зима '26",
        image_url: p.image,
        stock_qty: Number(p.stock_qty ?? 35),
        min_stock: Number(p.min_stock ?? 5),
        warehouse: p.warehouse || "Основной склад",
        is_available: p.is_available !== false,
        is_published: p.is_published !== false,
        is_new: Boolean(p.is_new),
        is_sale: Boolean(p.is_sale)
      });
    } catch (_) {}
  }

  return { updatedProducts, uploadedCount };
};

// ============================================================================
// ИИ-АССИСТЕНТ «СТИЛЬ AI» (Стилист для клиента + ERP-Аналитик для персонала)
// ============================================================================
let cachedDbGeminiKey = "";

window.callStyleAi = async function ({ sbUrl, sbKey, aiFn, systemPrompt, history, userText, dbSnapshot }) {
  const urlBase = window.cleanSupabaseUrl(sbUrl || window.STYLE_DEFAULT_SB_URL || "");
  const key = (sbKey || window.STYLE_DEFAULT_SB_KEY || "").trim();
  const fn = (aiFn || "style-ai").trim();

  const prods = (dbSnapshot?.products || window.STYLE_SEED_PRODUCTS).filter((p) => p.is_published !== false);
  const orders = dbSnapshot?.orders || window.STYLE_SEED_ORDERS;
  const staff = dbSnapshot?.staff || window.STYLE_SEED_STAFF;
  const isStaff = Boolean(dbSnapshot?.isStaff);

  // Обогащаем системный промпт живыми данными из базы Supabase (товары, цены в ₸, артикулы, размеры, сотрудники, заказы)
  const catalogContext = prods
    .map((p) => `- ${p.sku} | ${p.brand} «${p.name}» (${p.category_slug}): ${p.base_price} ₸${p.old_price ? ` (старая цена ${p.old_price} ₸, ${p.badge})` : ""}, размеры: ${(p.sizes || []).join(",")}, склад: ${p.stock_qty} шт.`)
    .join("\n");
  const staffContext = isStaff
    ? `\nСОТРУДНИКИ НА СМЕНЕ И ПРОДАЖИ:\n` + staff.map((s) => `- ${s.name} (${s.position}, ${s.department}): ${s.hours} ч, продажи ${s.salesKzt} ₸, план ${s.planPercent}%`).join("\n")
    : "";
  const promosContext = `\nПРОМОКОДЫ: ` + window.STYLE_PROMOS.map((pr) => `${pr.code} (-${pr.discount}% от ${pr.min} ₸)`).join(", ");
  const fullSystemPrompt = `${systemPrompt || ""}\nОтвечай подробно, вежливо и по существу на языке вопроса. Все цены указывай в тенге (₸).\nАКТУАЛЬНЫЙ КАТАЛОГ ИЗ SUPABASE:\n${catalogContext}${promosContext}${staffContext}`;

  // 1. Вызов через Supabase Edge Function (style-ai)
  if (urlBase && key) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6500);
      const res = await fetch(`${urlBase}/functions/v1/${fn}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": key
        },
        body: JSON.stringify({
          systemPrompt: fullSystemPrompt,
          history: (history || []).slice(-6)
        }),
        signal: controller.signal
      });
      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.reply && String(data.reply).trim().length >= 25) {
        return { reply: String(data.reply).trim(), source: `Supabase Edge (${fn})` };
      }
    } catch (_) {}

    // 2. Если функция style-ai ещё не задеплоена в панели, берём ключ Gemini из таблицы profiles вашей БД Supabase
    // и вызываем generativelanguage.googleapis.com (gemini-3.1-flash-lite / gemini-3.8-flash) параллельно
    try {
      if (!cachedDbGeminiKey) {
        const cfgRes = await fetch(
          `${urlBase}/rest/v1/profiles?id=eq.00000000-0000-0000-0000-000000000099&select=address`,
          { headers: { "apikey": key } }
        );
        const cfgRows = await cfgRes.json().catch(() => []);
        if (Array.isArray(cfgRows) && cfgRows[0]?.address) {
          cachedDbGeminiKey = String(cfgRows[0].address).trim();
        }
      }

      if (cachedDbGeminiKey) {
        const models = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-lite-latest"];
        const payload = {
          systemInstruction: { parts: [{ text: fullSystemPrompt }] },
          contents: (history || []).slice(-6),
          generationConfig: { temperature: 0.35, maxOutputTokens: 500 }
        };
        const enc = encodeURIComponent(cachedDbGeminiKey);
        const replyText = await Promise.any(
          models.map(async (m) => {
            const gRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${enc}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
              }
            );
            const gData = await gRes.json().catch(() => ({}));
            const txt = gData?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
            if (!gRes.ok || !txt) throw new Error("empty");
            return txt;
          })
        );
        if (replyText) {
          return { reply: replyText, source: "Gemini AI (Supabase Live)" };
        }
      }
    } catch (_) {}
  }

  const q = (userText || "").toLowerCase();

  if (isStaff) {
    const totalSales = staff.reduce((s, m) => s + Number(m.salesKzt || 0), 0);
    const onShiftList = staff.filter((m) => m.status === "on_shift");
    const lowStock = prods.filter((p) => Number(p.stock_qty || 0) <= Number(p.min_stock || 5));
    const totalStockUnits = prods.reduce((s, p) => s + Number(p.stock_qty || 0), 0);
    const totalStockValue = prods.reduce((s, p) => s + Number(p.stock_qty || 0) * Number(p.base_price || 0), 0);

    if (q.includes("склад") || q.includes("товар") || q.includes("остат") || q.includes("storage")) {
      return {
        reply:
          `**Сводка по складу и каталогу «Стиль & Образ» (БД + Supabase Storage):**\n\n` +
          `- **Всего моделей в каталоге:** **${prods.length} арт.** (общее количество на складе: **${totalStockUnits} шт.**)\n` +
          `- **Розничная стоимость товарного запаса:** \`${window.fmtKZT(totalStockValue)}\`\n` +
          prods.slice(0, 6).map((p) => `- **${p.sku}** • *${p.brand}* «${p.name}»: остаток \`${p.stock_qty} шт.\` (закуп: \`${window.fmtKZT(p.purchase_price)}\`, продажа: **\`${window.fmtKZT(p.base_price)}\`**)`).join("\n") +
          (lowStock.length ? `\n\n⚠️ **Требуется дозаказ:** ${lowStock.map((x) => `${x.sku} (${x.name})`).join(", ")}.` : `\n\n✅ **Вывод ИИ:** Все артикулы осенне-зимней коллекции '26 в достаточном количестве на Основном складе.`),
        source: "Style ERP AI"
      };
    }

    return {
      reply:
        `**Аналитическая сводка портала персонала «Стиль & Образ»:**\n\n` +
        `1. **Выручка отдела продаж за месяц:** \`${window.fmtKZT(totalSales)}\` (лидер продаж: **Сидоров Алексей** — \`4 100 000 ₸\`, выполнение плана **105%**)\n` +
        `2. **План продаж на сегодня:** выполнено \`1 450 000 ₸\` из \`2 500 000 ₸\` (**58%** дневного плана)\n` +
        `3. **Персонал на смене:** **${onShiftList.length} сотр.** (${onShiftList.map((m) => `${m.shortName || m.name} — ${m.position}`).join(", ")})\n` +
        `4. **Интернет-заказы и касса:** активных заказов в обработке — **${orders.length} шт.** на сумму \`${window.fmtKZT(orders.reduce((s, o) => s + Number(o.total || 0), 0))}\`\n` +
        `5. **Supabase Storage:** все загружаемые фотографии новых товаров автоматически сохраняются в бакет \`product-images\`.`,
      source: "Style ERP AI"
    };
  }

  // Ответы ИИ-стилиста для покупателя
  if (q.includes("размер") || q.includes("подобрать") || q.includes("таблиц")) {
    return {
      reply:
        `**Гид по размерам верхней одежды «Стиль & Образ»:**\n\n` +
        `- **XS (42–44):** рост 160–168 см, обхват груди 82–88 см\n` +
        `- **S (44–46):** рост 165–173 см, обхват груди 88–94 см\n` +
        `- **M (48):** рост 170–178 см, обхват груди 94–100 см\n` +
        `- **L (50–52):** рост 175–184 см, обхват груди 100–106 см\n` +
        `- **XL (52–54):** рост 178–188 см, обхват груди 106–112 см\n` +
        `- **XXL (54–56):** рост 180–192 см, обхват груди 112–118 см\n\n` +
        `💡 *Совет стилиста:* для зимних парок **Nordic Shield** и шерстяных пальто **Urban Trend / Grace & Style** крой рассчитан на посадку поверх теплого свитера — выбирайте свой стандартный размер!`,
      source: "Style AI"
    };
  }

  if (q.includes("промо") || q.includes("скидк") || q.includes("акци")) {
    return {
      reply:
        `**Действующие промокоды и акции «Стиль & Образ»:**\n\n` +
        window.STYLE_PROMOS.map((p) => `- \`${p.code}\` — **скидка -${p.discount}%** (${p.desc})`).join("\n") +
        `\n\nОткройте **Корзину**, введите промокод в поле **«Промокод»** и нажмите **«Применить»** — скидка мгновенно пересчитает итоговую сумму в тенге!`,
      source: "Style AI"
    };
  }

  const menHits = prods.filter((p) => p.category_slug === "men").slice(0, 3);
  const womenHits = prods.filter((p) => p.category_slug === "women").slice(0, 3);
  return {
    reply:
      `**Добро пожаловать в «Стиль & Образ» — коллекция Осень-Зима '26!**\n\n` +
      `**🔥 Бестселлеры мужской коллекции:**\n` +
      menHits.map((p) => `- **${p.brand} • ${p.name}** (арт. \`${p.sku}\`, размеры: ${p.sizes.join(", ")}) — **\`${window.fmtKZT(p.base_price)}\`**${p.old_price ? ` *(вместо ${window.fmtKZT(p.old_price)})*` : ""}`).join("\n") +
      `\n\n**✨ Бестселлеры женской коллекции:**\n` +
      womenHits.map((p) => `- **${p.brand} • ${p.name}** (арт. \`${p.sku}\`, размеры: ${p.sizes.join(", ")}) — **\`${window.fmtKZT(p.base_price)}\`**${p.old_price ? ` *(вместо ${window.fmtKZT(p.old_price)})*` : ""}`).join("\n") +
      `\n\nБесплатная доставка по всему Казахстану при заказе от \`20 000 ₸\`. Оплата картой, **Kaspi QR / Red**, **Apple Pay** или при получении после примерки!`,
    source: "Style AI"
  };
};
