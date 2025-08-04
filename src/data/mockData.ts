import { Product, User, Conversation, Message, Category, Favorite, SoldProduct, Review } from '@/types/marketplace';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    rating: 4.8,
    reviewCount: 127,
    joinedDate: '2023-01-15',
    isVerified: true,
    location: 'Buenos Aires, CABA',
    badges: ['Vendedor Destacado', 'Respuesta Rápida', 'Envío Express'],
    description: 'Vendo artículos de tecnología y moda. Respondo consultas rápidamente.',
    specialization: 'Tecnología y Moda',
    responseRate: 98,
    salamePay: {
      balance: 75000,
      isVerified: true
    }
  },
  {
    id: '2',
    name: 'Juan Carlos López',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    rating: 4.6,
    reviewCount: 89,
    joinedDate: '2022-08-20',
    isVerified: true,
    location: 'Córdoba, Córdoba',
    badges: ['Vendedor Confiable', 'Envíos Puntuales'],
    description: 'Especialista en artículos deportivos y outdoor. Entusiasta del ciclismo y la montaña.',
    specialization: 'Deportes y Aventura',
    responseRate: 92,
    salamePay: {
      balance: 45000,
      isVerified: true
    }
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.9,
    reviewCount: 203,
    joinedDate: '2021-12-03',
    isVerified: true,
    location: 'Rosario, Santa Fe',
    badges: ['Vendedor Premium', 'Excelente Calidad', 'Productos Exclusivos'],
    description: 'Apasionada por la decoración y el diseño de interiores. Vendo productos artesanales y de diseño.',
    specialization: 'Hogar y Diseño',
    responseRate: 97,
    salamePay: {
      balance: 120000,
      isVerified: true
    }
  },
  {
    id: '4',
    name: 'Carlos Mendez',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 4.5,
    reviewCount: 45,
    joinedDate: '2023-05-10',
    isVerified: false,
    location: 'Mendoza, Mendoza',
    description: 'Amante de la tecnología y los gadgets. Siempre buscando las últimas novedades.',
    specialization: 'Tecnología y Electrónica',
    responseRate: 85
  },
  {
    id: '5',
    name: 'Lucía Fernández',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 4.7,
    reviewCount: 78,
    joinedDate: '2022-04-18',
    isVerified: true,
    location: 'La Plata, Buenos Aires',
    badges: ['Productos Originales', 'Envío Rápido'],
    description: 'Vendo ropa de marca importada. Todos los productos son 100% originales con garantía.',
    specialization: 'Moda y Accesorios',
    responseRate: 94,
    salamePay: {
      balance: 58000,
      isVerified: true
    }
  },
  {
    id: '6',
    name: 'Miguel Torres',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    rating: 4.4,
    reviewCount: 62,
    joinedDate: '2023-02-22',
    isVerified: true,
    location: 'Mar del Plata, Buenos Aires',
    badges: ['Envíos a Todo el País'],
    description: 'Especialista en equipos de audio profesional y DJ. Asesoramiento personalizado.',
    specialization: 'Audio y Música',
    responseRate: 89,
    salamePay: {
      balance: 37500,
      isVerified: false
    }
  },
  {
    id: '7',
    name: 'Valentina Pérez',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    rating: 5.0,
    reviewCount: 147,
    joinedDate: '2022-06-10',
    isVerified: true,
    location: 'Bariloche, Río Negro',
    badges: ['Vendedor Destacado', 'Productos Ecológicos', 'Sustentabilidad'],
    description: 'Emprendedora apasionada por la sustentabilidad. Productos hechos a mano y ecológicos.',
    specialization: 'Productos Sustentables y Artesanales',
    responseRate: 99,
    salamePay: {
      balance: 92000,
      isVerified: true
    }
  },
  {
    id: '8',
    name: 'Santiago Gómez',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 4.3,
    reviewCount: 51,
    joinedDate: '2023-08-05',
    isVerified: true,
    location: 'Salta, Salta',
    description: 'Coleccionista y vendedor de antigüedades. Piezas únicas con historia.',
    specialization: 'Antigüedades y Coleccionables',
    responseRate: 87
  }
];

// Add proximity information to the products for filtering
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max 128GB',
    price: 850000,
    originalPrice: 950000,
    description: 'iPhone 13 Pro Max en excelente estado, color azul sierra. Incluye cargador original y caja. Sin rayones, siempre con funda y vidrio templado.',
    images: [
      'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=2564&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=2580&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Apple',
    condition: 'Como nuevo',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-10',
    views: 234,
    favorites: 18,
    isAvailable: true
  },
  {
    id: '2',
    title: 'Campera Nike Original Talle M',
    price: 45000,
    description: 'Campera Nike original, talle M, color negro. Muy poco uso, en perfecto estado. Ideal para el invierno.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Nike',
    condition: 'Muy bueno',
    size: 'M',
    seller: mockUsers[1],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-08',
    views: 156,
    favorites: 12,
    isAvailable: true
  },
  {
    id: '3',
    title: 'Bicicleta Mountain Bike Rodado 26',
    price: 120000,
    originalPrice: 180000,
    description: 'Bicicleta mountain bike rodado 26, marca Trek. 21 velocidades, frenos a disco. Recién ajustada y con mantenimiento al día.',
    images: [
      'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=2564&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=2580&auto=format&fit=crop'
    ],
    category: 'Deportes',
    brand: 'Trek',
    condition: 'Bueno',
    seller: mockUsers[2],
    location: 'Rosario, Santa Fe',
    createdAt: '2024-01-05',
    views: 89,
    favorites: 7,
    isAvailable: true
  },
  {
    id: '4',
    title: 'PlayStation 5 + 2 Joysticks',
    price: 650000,
    description: 'PlayStation 5 en perfecto estado con 2 joysticks DualSense. Incluye todos los cables originales y la caja.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Sony',
    condition: 'Como nuevo',
    seller: mockUsers[3],
    location: 'Mendoza, Mendoza',
    createdAt: '2024-01-12',
    views: 567,
    favorites: 45,
    isAvailable: true
  },
  {
    id: '5',
    title: 'Zapatillas Adidas Ultraboost 22',
    price: 95000,
    originalPrice: 140000,
    description: 'Zapatillas Adidas Ultraboost 22, talle 42, color blanco/negro. Muy poco uso, prácticamente nuevas.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Adidas',
    condition: 'Como nuevo',
    size: '42',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-07',
    views: 203,
    favorites: 15,
    isAvailable: true
  },
  {
    id: '6',
    title: 'MacBook Air M1 2020',
    price: 780000,
    description: 'MacBook Air M1 2020, 8GB RAM, 256GB SSD. Excelente estado, siempre con funda protectora.',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Apple',
    condition: 'Muy bueno',
    seller: mockUsers[1],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-06',
    views: 345,
    favorites: 28,
    isAvailable: true,
    proximityKm: 3.2
  },
  {
    id: '7',
    title: 'Smart TV Samsung 55" 4K',
    price: 320000,
    description: 'Smart TV Samsung 55 pulgadas, resolución 4K, modelo 2023. Perfecto estado, con 6 meses de uso.',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=2567&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Samsung',
    condition: 'Como nuevo',
    seller: mockUsers[2],
    location: 'Rosario, Santa Fe',
    createdAt: '2024-01-14',
    views: 189,
    favorites: 24,
    isAvailable: true,
    proximityKm: 12.6,
    specialOffer: true
  },
  {
    id: '8',
    title: 'Mesa de Comedor Estilo Nórdico',
    price: 85000,
    description: 'Mesa de comedor estilo nórdico, madera maciza de pino. 150cm x 80cm. Ideal para 6 personas.',
    images: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=2669&auto=format&fit=crop'
    ],
    category: 'Hogar',
    condition: 'Bueno',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-09',
    views: 143,
    favorites: 11,
    isAvailable: true,
    proximityKm: 1.8
  },
  {
    id: '9',
    title: 'Guitarra Eléctrica Fender Stratocaster',
    price: 420000,
    originalPrice: 550000,
    description: 'Fender Stratocaster Player Series, color sunburst, fabricada en México. Incluye estuche rígido.',
    images: [
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=2670&auto=format&fit=crop'
    ],
    category: 'Instrumentos Musicales',
    brand: 'Fender',
    condition: 'Muy bueno',
    seller: mockUsers[3],
    location: 'Mendoza, Mendoza',
    createdAt: '2024-01-12',
    views: 201,
    favorites: 31,
    isAvailable: true,
    proximityKm: 25.3,
    specialOffer: true
  },
  {
    id: '10',
    title: 'Bicicleta Plegable Urbana',
    price: 95000,
    description: 'Bicicleta plegable urbana, rodado 20, 6 velocidades. Ideal para combinar con transporte público.',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2688&auto=format&fit=crop'
    ],
    category: 'Deportes',
    brand: 'Dahon',
    condition: 'Bueno',
    seller: mockUsers[1],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-08',
    views: 176,
    favorites: 19,
    isAvailable: true,
    proximityKm: 3.7
  },
  {
    id: '11',
    title: 'Cafetera Nespresso Essenza Mini',
    price: 65000,
    description: 'Cafetera Nespresso Essenza Mini, color negra. Casi sin uso, en su caja original con todos los accesorios.',
    images: [
      'https://images.unsplash.com/photo-1585828922344-85c9daa264b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1520231215176-6b13a9eb3c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Hogar',
    brand: 'Nespresso',
    condition: 'Como nuevo',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-18',
    views: 145,
    favorites: 22,
    isAvailable: true,
    proximityKm: 1.2,
    specialOffer: true
  },
  {
    id: '12',
    title: 'Monitor Gaming LG 27" UltraGear',
    price: 185000,
    originalPrice: 220000,
    description: 'Monitor gaming LG 27" UltraGear, 144Hz, 1ms, HDR, Compatible con G-Sync. Perfecto estado.',
    images: [
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=2670&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'LG',
    condition: 'Muy bueno',
    seller: mockUsers[2],
    location: 'Rosario, Santa Fe',
    createdAt: '2024-01-15',
    views: 202,
    favorites: 17,
    isAvailable: true,
    proximityKm: 8.5
  },
  {
    id: '13',
    title: 'Set de Ollas Tramontina (6 piezas)',
    price: 45000,
    description: 'Set de ollas Tramontina de acero inoxidable, 6 piezas. Incluye 3 ollas con tapa.',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2671&auto=format&fit=crop'
    ],
    category: 'Hogar',
    brand: 'Tramontina',
    condition: 'Bueno',
    seller: mockUsers[3],
    location: 'Mendoza, Mendoza',
    createdAt: '2024-01-19',
    views: 88,
    favorites: 7,
    isAvailable: true,
    proximityKm: 4.1
  },
  {
    id: '14',
    title: 'Botines Adidas Predator Edge',
    price: 48000,
    originalPrice: 60000,
    description: 'Botines Adidas Predator Edge, talle 42. Usados solo 3 veces, están impecables.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2674&auto=format&fit=crop'
    ],
    category: 'Deportes',
    brand: 'Adidas',
    condition: 'Como nuevo',
    size: '42',
    seller: mockUsers[1],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-17',
    views: 112,
    favorites: 14,
    isAvailable: true,
    proximityKm: 2.8,
    specialOffer: true
  },
  {
    id: '15',
    title: 'iPad Pro 11" (2021) 128GB WiFi',
    price: 420000,
    description: 'iPad Pro 11 pulgadas, modelo 2021, 128GB WiFi. Incluye Apple Pencil 2da generación y Smart Keyboard.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589739900243-4b02addbe56e?q=80&w=2574&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Apple',
    condition: 'Muy bueno',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-14',
    views: 231,
    favorites: 35,
    isAvailable: true,
    proximityKm: 2.1
  },
  {
    id: '16',
    title: 'Sillón Esquinero 3 Cuerpos',
    price: 180000,
    description: 'Sillón esquinero 3 cuerpos, tapizado en pana gris. Muy cómodo y en excelente estado.',
    images: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670&auto=format&fit=crop'
    ],
    category: 'Hogar',
    brand: 'Arredo',
    condition: 'Bueno',
    seller: mockUsers[2],
    location: 'Rosario, Santa Fe',
    createdAt: '2024-01-16',
    views: 157,
    favorites: 18,
    isAvailable: true,
    proximityKm: 7.3,
    specialOffer: true
  },
  {
    id: '17',
    title: 'Drone DJI Mini 2',
    price: 210000,
    description: 'Drone DJI Mini 2 con cámara 4K. Incluye 3 baterías, control remoto y estuche de transporte.',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'DJI',
    condition: 'Muy bueno',
    seller: mockUsers[3],
    location: 'Mendoza, Mendoza',
    createdAt: '2024-01-12',
    views: 198,
    favorites: 26,
    isAvailable: true,
    proximityKm: 9.5
  },
  {
    id: '18',
    title: 'Campera Columbia Impermeable',
    price: 70000,
    description: 'Campera Columbia impermeable, talle L, color azul oscuro. Ideal para trekking y montaña.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2636&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2672&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Columbia',
    condition: 'Bueno',
    size: 'L',
    seller: mockUsers[1],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-13',
    views: 134,
    favorites: 11,
    isAvailable: true,
    proximityKm: 5.6
  },
  {
    id: '19',
    title: 'Nintendo Switch + 3 Juegos',
    price: 240000,
    originalPrice: 280000,
    description: 'Nintendo Switch modelo 2021 (batería extendida) + 3 juegos físicos: Mario Kart 8, Zelda BOTW y Animal Crossing.',
    images: [
      'https://images.unsplash.com/photo-1612036781124-847f8939b154?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=2627&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Nintendo',
    condition: 'Como nuevo',
    seller: mockUsers[0],
    location: 'Buenos Aires, CABA',
    createdAt: '2024-01-20',
    views: 287,
    favorites: 45,
    isAvailable: true,
    proximityKm: 1.8,
    specialOffer: true
  },
  {
    id: '20',
    title: 'Zapatillas Nike Air Max 270',
    price: 65000,
    description: 'Zapatillas Nike Air Max 270, talle 41, color negro y blanco. Sin uso, con etiquetas.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Nike',
    condition: 'Nuevo',
    size: '41',
    seller: mockUsers[2],
    location: 'Rosario, Santa Fe',
    createdAt: '2024-01-18',
    views: 175,
    favorites: 23,
    isAvailable: true,
    proximityKm: 6.4
  },
  {
    id: '21',
    title: 'Camiseta Selección Argentina 2022',
    price: 38000,
    originalPrice: 45000,
    description: 'Camiseta oficial de la Selección Argentina campeona del mundo 2022, talle M, con parche de campeón.',
    images: [
      'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1587&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1606&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Adidas',
    condition: 'Como nuevo',
    size: 'M',
    seller: mockUsers[5],
    location: 'La Plata, Buenos Aires',
    createdAt: '2024-01-10',
    views: 310,
    favorites: 52,
    isAvailable: true,
    proximityKm: 8.2
  },
  {
    id: '22',
    title: 'Carpa Coleman 4 Personas',
    price: 85000,
    description: 'Carpa Coleman para 4 personas, impermeable, con piso, mosquitero y bolso de transporte. Usada solo 2 veces.',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Deportes',
    brand: 'Coleman',
    condition: 'Muy bueno',
    seller: mockUsers[2],
    location: 'Córdoba, Córdoba',
    createdAt: '2024-01-15',
    views: 128,
    favorites: 19,
    isAvailable: true,
    proximityKm: 12.5
  },
  {
    id: '23',
    title: 'Smart TV Samsung 50" 4K',
    price: 320000,
    originalPrice: 380000,
    description: 'Smart TV Samsung 50 pulgadas, 4K UHD, HDR, con control remoto. Modelo 2023 con menos de 6 meses de uso.',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Samsung',
    condition: 'Como nuevo',
    seller: mockUsers[4],
    location: 'Mendoza, Mendoza',
    createdAt: '2024-01-20',
    views: 245,
    favorites: 41,
    isAvailable: true,
    proximityKm: 5.8,
    specialOffer: true
  },
  {
    id: '24',
    title: 'Auriculares Sony WH-1000XM4',
    price: 180000,
    description: 'Auriculares Sony WH-1000XM4 con cancelación de ruido. Incluye estuche, cable y adaptadores.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1288&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1372&auto=format&fit=crop'
    ],
    category: 'Tecnología',
    brand: 'Sony',
    condition: 'Muy bueno',
    seller: mockUsers[6],
    location: 'Mar del Plata, Buenos Aires',
    createdAt: '2024-01-14',
    views: 198,
    favorites: 27,
    isAvailable: true,
    proximityKm: 15.3
  },
  {
    id: '25',
    title: 'Zapatillas Adidas Ultraboost',
    price: 78000,
    originalPrice: 95000,
    description: 'Zapatillas Adidas Ultraboost, talle 39, color blanco. Usadas solo 3 veces, en excelente estado.',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop'
    ],
    category: 'Ropa',
    brand: 'Adidas',
    condition: 'Como nuevo',
    size: '39',
    seller: mockUsers[5],
    location: 'La Plata, Buenos Aires',
    createdAt: '2024-01-22',
    views: 167,
    favorites: 31,
    isAvailable: true,
    proximityKm: 7.1
  }
];

// Mock favorites with 'userId' referencing mockUsers and 'productId' referencing mockProducts
export const mockFavorites: Favorite[] = [
  {
    id: '1',
    userId: '1', // User 1 (current user)
    productId: '2',
    createdAt: '2024-02-15T10:30:00'
  },
  {
    id: '2',
    userId: '1',
    productId: '5',
    createdAt: '2024-02-16T14:22:00'
  },
  {
    id: '3',
    userId: '1',
    productId: '7',
    createdAt: '2024-02-18T09:15:00'
  },
  {
    id: '4',
    userId: '1',
    productId: '9',
    createdAt: '2024-02-20T16:45:00'
  },
  {
    id: '5',
    userId: '2',
    productId: '1',
    createdAt: '2024-02-14T11:20:00'
  },
  {
    id: '6',
    userId: '2',
    productId: '4',
    createdAt: '2024-02-17T08:45:00'
  },
  {
    id: '7',
    userId: '3',
    productId: '3',
    createdAt: '2024-02-15T19:30:00'
  },
  {
    id: '8',
    userId: '3',
    productId: '6',
    createdAt: '2024-02-19T13:10:00'
  },
  {
    id: '9',
    userId: '4',
    productId: '8',
    createdAt: '2024-02-16T10:05:00'
  },
  {
    id: '10',
    userId: '4',
    productId: '10',
    createdAt: '2024-02-18T15:40:00'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Ropa',
    icon: 'shirt',
    subcategories: ['Remeras', 'Pantalones', 'Vestidos', 'Zapatillas', 'Accesorios']
  },
  {
    id: '2',
    name: 'Tecnología',
    icon: 'laptop',
    subcategories: ['Celulares', 'Computadoras', 'Audio', 'Accesorios', 'Consolas']
  },
  {
    id: '3',
    name: 'Hogar',
    icon: 'home',
    subcategories: ['Muebles', 'Decoración', 'Electro', 'Jardín', 'Cocina']
  },
  {
    id: '4',
    name: 'Deportes',
    icon: 'activity',
    subcategories: ['Fútbol', 'Running', 'Ciclismo', 'Natación', 'Fitness']
  },
  {
    id: '5',
    name: 'Libros',
    icon: 'book',
    subcategories: ['Ficción', 'No ficción', 'Educativos', 'Comics', 'Revistas']
  },
  {
    id: '6',
    name: 'Automóviles',
    icon: 'car',
    subcategories: ['Autos', 'Motos', 'Repuestos', 'Accesorios', 'Herramientas']
  },
  {
    id: '7',
    name: 'Electro',
    icon: 'tv',
    subcategories: ['Cocina', 'Lavado', 'Refrigeración', 'Pequeños electrodomésticos', 'Climatización']
  },
  {
    id: '8',
    name: 'Juguetes',
    icon: 'gamepad-2',
    subcategories: ['Juguetes para bebés', 'Juegos de mesa', 'Figuras de acción', 'Juguetes educativos', 'Peluches']
  },
  {
    id: '9',
    name: 'Instrumentos Musicales',
    icon: 'music',
    subcategories: ['Guitarras', 'Pianos', 'Percusión', 'Equipos de DJ', 'Accesorios']
  },
  {
    id: '10',
    name: 'Jardinería',
    icon: 'flower-2',
    subcategories: ['Herramientas', 'Plantas', 'Macetas', 'Muebles de exterior', 'Riego']
  },
  {
    id: '11',
    name: 'Mascotas',
    icon: 'paw-print',
    subcategories: ['Alimentos', 'Accesorios', 'Juguetes', 'Camas', 'Higiene']
  },
  {
    id: '12',
    name: 'Salud y Belleza',
    icon: 'heart-pulse',
    subcategories: ['Maquillaje', 'Cuidado personal', 'Perfumes', 'Suplementos', 'Equipamiento']
  }
];

export const mockMessages: Message[] = [
  // Conversation 1 - iPhone (Pending Offer)
  {
    id: '1-1',
    senderId: '2',
    content: '¡Hola! Me interesa tu iPhone. ¿Está en buen estado la batería?',
    timestamp: '2024-01-10T10:30:00Z',
    type: 'text'
  },
  {
    id: '1-2',
    senderId: '1',
    content: 'Hola! Sí, la batería está al 95% de salud. El teléfono funciona perfecto.',
    timestamp: '2024-01-10T10:45:00Z',
    type: 'text'
  },
  {
    id: '1-3',
    senderId: '2',
    content: 'Perfecto. ¿Aceptarías $800.000?',
    timestamp: '2024-01-10T11:00:00Z',
    type: 'offer',
    offer: {
      id: 'offer1',
      amount: 800000,
      status: 'pending',
      expiresAt: '2024-01-12T11:00:00Z'
    }
  },
  // Conversation 2 - PlayStation (Accepted Offer)
  {
    id: '2-1',
    senderId: '1',
    content: 'Hola! Vi tu PlayStation 5. ¿Lo seguís teniendo disponible?',
    timestamp: '2024-01-08T14:22:00Z',
    type: 'text'
  },
  {
    id: '2-2',
    senderId: '3',
    content: 'Sí, sigue disponible! Está como nuevo, muy poco uso.',
    timestamp: '2024-01-08T14:45:00Z',
    type: 'text'
  },
  {
    id: '2-3',
    senderId: '1',
    content: 'Genial! ¿Aceptarías $600.000?',
    timestamp: '2024-01-08T15:10:00Z',
    type: 'offer',
    offer: {
      id: 'offer2',
      amount: 600000,
      status: 'rejected',
      expiresAt: '2024-01-10T15:10:00Z'
    }
  },
  {
    id: '2-4',
    senderId: '3',
    content: 'Es muy bajo, lo siento. No puedo aceptar menos de $630.000',
    timestamp: '2024-01-08T15:25:00Z',
    type: 'text'
  },
  {
    id: '2-5',
    senderId: '1',
    content: 'Entiendo. Te ofrezco $630.000 entonces.',
    timestamp: '2024-01-08T15:40:00Z',
    type: 'offer',
    offer: {
      id: 'offer3',
      amount: 630000,
      status: 'accepted',
      expiresAt: '2024-01-10T15:40:00Z'
    }
  },
  {
    id: '2-6',
    senderId: '3',
    content: '¡Perfecto! Acepto la oferta. Podemos coordinar la entrega por este chat.',
    timestamp: '2024-01-08T15:45:00Z',
    type: 'text'
  },
  {
    id: '2-7',
    senderId: '1',
    content: 'Genial! ¿Te parece bien encontrarnos mañana en el Alto Palermo? Trabajo cerca.',
    timestamp: '2024-01-08T15:50:00Z',
    type: 'text'
  },
  // Conversation 3 - Zapatillas (Rejected Offer)
  {
    id: '3-1',
    senderId: '3',
    content: 'Hola! ¿Todavía tenés las zapatillas Adidas?',
    timestamp: '2024-01-11T09:15:00Z',
    type: 'text'
  },
  {
    id: '3-2',
    senderId: '4',
    content: 'Sí! Están disponibles, casi sin uso.',
    timestamp: '2024-01-11T09:30:00Z',
    type: 'text'
  },
  {
    id: '3-3',
    senderId: '3',
    content: 'Las quiero! Te ofrezco $70.000',
    timestamp: '2024-01-11T09:45:00Z',
    type: 'offer',
    offer: {
      id: 'offer4',
      amount: 70000,
      status: 'rejected',
      expiresAt: '2024-01-13T09:45:00Z'
    }
  },
  {
    id: '3-4',
    senderId: '4',
    content: 'Lo siento, es muy bajo. El precio es fijo.',
    timestamp: '2024-01-11T10:00:00Z',
    type: 'text'
  },
  {
    id: '3-5',
    senderId: '3',
    content: 'Entiendo, gracias igual!',
    timestamp: '2024-01-11T10:15:00Z',
    type: 'text'
  },
];

// Group messages by conversation
const conv1Messages = mockMessages.filter(msg => msg.id.startsWith('1-'));
const conv2Messages = mockMessages.filter(msg => msg.id.startsWith('2-'));
const conv3Messages = mockMessages.filter(msg => msg.id.startsWith('3-'));

export const mockSoldProducts: SoldProduct[] = [
  {
    id: '1',
    productId: mockProducts[0].id,
    sellerId: mockUsers[0].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 15).toLocaleString('es'),
    salePrice: 45000,
    review: {
      id: 'rev1',
      rating: 5,
      comment: 'Todo perfecto, el producto llegó en excelentes condiciones. Muy recomendable!',
      reviewDate: new Date(2023, 11, 17).toLocaleString('es')
    }
  },
  {
    id: '2',
    productId: mockProducts[5].id,
    sellerId: mockUsers[0].id,
    buyerId: mockUsers[3].id,
    saleDate: new Date(2023, 10, 28).toLocaleString('es'),
    salePrice: 68000,
    review: {
      id: 'rev2',
      rating: 4,
      comment: 'El producto está en buen estado, aunque tiene algunos detalles que no se mencionaban. En general satisfecho.',
      reviewDate: new Date(2023, 11, 1).toLocaleString('es')
    }
  },
  {
    id: '3',
    productId: mockProducts[10].id,
    sellerId: mockUsers[0].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 5).toLocaleString('es'),
    salePrice: 13500,
    review: {
      id: 'rev3',
      rating: 5,
      comment: 'Excelente producto y servicio. El vendedor fue muy amable y respondió rápido a mis consultas.',
      reviewDate: new Date(2023, 11, 7).toLocaleString('es')
    }
  },
  {
    id: '4',
    productId: mockProducts[15].id,
    sellerId: mockUsers[2].id,
    buyerId: mockUsers[4].id,
    saleDate: new Date(2024, 0, 5).toLocaleString('es'),
    salePrice: 125000,
    review: {
      id: 'rev4',
      rating: 5,
      comment: 'La bicicleta está en perfecto estado, mejor de lo que esperaba. El vendedor me explicó todo sobre ella y hasta me dio consejos de mantenimiento. ¡Súper recomendado!',
      reviewDate: new Date(2024, 0, 8).toLocaleString('es')
    }
  },
  {
    id: '5',
    productId: mockProducts[8].id,
    sellerId: mockUsers[3].id,
    buyerId: mockUsers[6].id,
    saleDate: new Date(2024, 0, 12).toLocaleString('es'),
    salePrice: 29500,
    review: {
      id: 'rev5',
      rating: 3,
      comment: 'El producto funciona bien pero llegó con la caja bastante golpeada. El vendedor tardó en responder a mis mensajes. Pero cumplió con lo acordado.',
      reviewDate: new Date(2024, 0, 15).toLocaleString('es')
    }
  },
  {
    id: '6',
    productId: mockProducts[12].id,
    sellerId: mockUsers[1].id,
    buyerId: mockUsers[5].id,
    saleDate: new Date(2024, 0, 18).toLocaleString('es'),
    salePrice: 82000,
    review: {
      id: 'rev6',
      rating: 5,
      comment: 'Excelente vendedor. La consola está impecable y venía con todos los accesorios mencionados. Muy buena comunicación y puntualidad para la entrega.',
      reviewDate: new Date(2024, 0, 20).toLocaleString('es')
    }
  },
  {
    id: '7',
    productId: mockProducts[18].id,
    sellerId: mockUsers[4].id,
    buyerId: mockUsers[7].id,
    saleDate: new Date(2024, 0, 24).toLocaleString('es'),
    salePrice: 18500,
    review: {
      id: 'rev7',
      rating: 4,
      comment: 'Buen producto, corresponde a la descripción. La entrega fue rápida. Le quito una estrella porque el libro tenía algunas páginas marcadas que no se mencionaban en la publicación.',
      reviewDate: new Date(2024, 0, 26).toLocaleString('es')
    }
  },
  {
    id: '8',
    productId: mockProducts[22].id,
    sellerId: mockUsers[2].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2024, 0, 28).toLocaleString('es'),
    salePrice: 80000,
    review: {
      id: 'rev8',
      rating: 5,
      comment: 'La carpa es exactamente como se describe. Muy buen estado y fácil de armar. El vendedor fue muy atento y me explicó todo el funcionamiento. Gracias!',
      reviewDate: new Date(2024, 0, 30).toLocaleString('es')
    }
  },
  {
    id: '9',
    productId: mockProducts[10].id,
    sellerId: mockUsers[0].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 28).toLocaleString('es'),
    salePrice: 22800,
    review: {
      id: 'rev9',
      rating: 5,
      comment: 'Muy buen vendedor. El producto llegó en excelente estado y antes de lo esperado. Totalmente recomendado.',
      reviewDate: new Date(2023, 11, 30).toLocaleString('es')
    }
  },
  {
    id: '10',
    productId: mockProducts[6].id,
    sellerId: mockUsers[2].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 22).toLocaleString('es'),
    salePrice: 32000,
    review: {
      id: 'rev10',
      rating: 4,
      comment: 'El iPad está en muy buen estado. La transacción fue rápida y el vendedor muy profesional.',
      reviewDate: '2024-01-28'
    }
  },
  {
    id: '11',
    productId: mockProducts[6].id,
    sellerId: mockUsers[2].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 22).toLocaleString('es'),
    salePrice: 32000,
    review: {
      id: 'rev11',
      rating: 5,
      comment: 'Excelente vendedor, muy atento y el producto llegó en perfectas condiciones.',
      reviewDate: new Date(2023, 11, 25).toLocaleString('es')
    }
  },
  {
    id: '12',
    productId: mockProducts[2].id,
    sellerId: mockUsers[3].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2023, 11, 5).toLocaleString('es'),
    salePrice: 150000,
    review: {
      id: 'rev12',
      rating: 4,
      comment: 'Buena compra. La cámara funciona perfectamente y el precio fue justo.',
      reviewDate: new Date(2023, 11, 10).toLocaleString('es')
    }
  },
  {
    id: '13',
    productId: mockProducts[21].id,
    sellerId: mockUsers[5].id,
    buyerId: mockUsers[2].id,
    saleDate: new Date(2023, 11, 12).toLocaleString('es'),
    salePrice: 64000,
    review: {
      id: 'rev13',
      rating: 5,
      comment: 'Excelente calidad, la ropa es tal cual se muestra en las fotos. Muy buen servicio.',
      reviewDate: new Date(2023, 11, 15).toLocaleString('es')
    }
  },
  {
    id: '14',
    productId: mockProducts[24].id,
    sellerId: mockUsers[6].id,
    buyerId: mockUsers[3].id,
    saleDate: new Date(2023, 11, 18).toLocaleString('es'),
    salePrice: 85000,
    review: {
      id: 'rev14',
      rating: 5,
      comment: 'Los auriculares son excelentes, el sonido es increíble. El vendedor me dio todas las especificaciones y consejos.',
      reviewDate: new Date(2023, 11, 20).toLocaleString('es')
    }
  },
  {
    id: '15',
    productId: mockProducts[8].id,
    sellerId: mockUsers[7].id,
    buyerId: mockUsers[1].id,
    saleDate: new Date(2024, 0, 2).toLocaleString('es'),
    salePrice: 12500,
    review: {
      id: 'rev15',
      rating: 5,
      comment: 'Los productos son realmente sustentables y de muy buena calidad. El empaque también eco-friendly.',
      reviewDate: new Date(2024, 0, 5).toLocaleString('es')
    }
  },
  {
    id: '16',
    productId: mockProducts[0].id,
    sellerId: mockUsers[3].id,
    buyerId: mockUsers[5].id,
    saleDate: new Date(2024, 0, 8).toLocaleString('es'),
    salePrice: 215000,
    review: {
      id: 'rev16',
      rating: 4,
      comment: 'El mueble es hermoso, muy bien terminado. La entrega tardó un poco más de lo acordado.',
      reviewDate: new Date(2024, 0, 12).toLocaleString('es')
    }
  },
  {
    id: '17',
    productId: mockProducts[4].id,
    sellerId: mockUsers[4].id,
    buyerId: mockUsers[6].id,
    saleDate: new Date(2024, 0, 14).toLocaleString('es'),
    salePrice: 42000,
    review: {
      id: 'rev17',
      rating: 3,
      comment: 'El producto está bien pero tenía algunos detalles que no se mencionaban en la descripción.',
      reviewDate: new Date(2024, 0, 16).toLocaleString('es')
    }
  },
  {
    id: '18',
    productId: mockProducts[7].id,
    sellerId: mockUsers[5].id,
    buyerId: mockUsers[7].id,
    saleDate: new Date(2024, 0, 20).toLocaleString('es'),
    salePrice: 75000,
    review: {
      id: 'rev18',
      rating: 5,
      comment: 'Pieza de colección exquisita, con certificado de autenticidad. Muy satisfecha con la compra.',
      reviewDate: new Date(2024, 0, 23).toLocaleString('es')
    }
  },
  {
    id: '19',
    productId: mockProducts[17].id,
    sellerId: mockUsers[5].id,
    buyerId: mockUsers[4].id,
    saleDate: new Date(2024, 0, 26).toLocaleString('es'),
    salePrice: 35000,
    review: {
      id: 'rev19',
      rating: 5,
      comment: 'Las zapatillas están impecables, justo como se describían. Envío súper rápido.',
      reviewDate: new Date(2024, 0, 28).toLocaleString('es')
    }
  },
  {
    id: '20',
    productId: mockProducts[22].id,
    sellerId: mockUsers[2].id,
    buyerId: mockUsers[6].id,
    saleDate: new Date(2024, 1, 1).toLocaleString('es'),
    salePrice: 120000,
    review: {
      id: 'rev20',
      rating: 4,
      comment: 'El equipo de camping es de muy buena calidad. Pequeño detalle con la carpa pero el vendedor lo solucionó rápidamente.',
      reviewDate: new Date(2024, 1, 5).toLocaleString('es')
    }
  }
];

// Define additional message groups
const conv4Messages: Message[] = [
  {
    id: '4-1',
    senderId: '5',
    content: 'Hola! Me encanta esta camiseta. ¿Todavía la tienes disponible?',
    timestamp: '2024-01-21T14:20:00Z',
    type: 'text'
  },
  {
    id: '4-2',
    senderId: '1',
    content: '¡Hola! Sí, está disponible. Es original con todas las etiquetas.',
    timestamp: '2024-01-21T14:35:00Z',
    type: 'text'
  },
  {
    id: '4-3',
    senderId: '5',
    content: 'Genial! Te ofrezco $35.000',
    timestamp: '2024-01-21T14:40:00Z',
    type: 'offer',
    offer: {
      id: 'offer5',
      amount: 35000,
      status: 'pending',
      expiresAt: '2024-01-23T14:40:00Z'
    }
  }
];

const conv5Messages: Message[] = [
  {
    id: '5-1',
    senderId: '7',
    content: 'Hola! Me interesa tu Smart TV Samsung. ¿Cuánto tiempo de uso tiene?',
    timestamp: '2024-01-22T10:15:00Z',
    type: 'text'
  },
  {
    id: '5-2',
    senderId: '4',
    content: 'Hola! Tiene apenas 5 meses de uso. Está en perfectas condiciones, con caja y todos los accesorios.',
    timestamp: '2024-01-22T10:25:00Z',
    type: 'text'
  },
  {
    id: '5-3',
    senderId: '7',
    content: 'Excelente! Te ofrezco $300.000',
    timestamp: '2024-01-22T10:30:00Z',
    type: 'offer',
    offer: {
      id: 'offer6',
      amount: 300000,
      status: 'accepted',
      expiresAt: '2024-01-24T10:30:00Z'
    }
  },
  {
    id: '5-4',
    senderId: '4',
    content: '¡Trato hecho! ¿Cuándo podrías retirarla?',
    timestamp: '2024-01-22T10:45:00Z',
    type: 'text'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    product: mockProducts[0],
    messages: conv1Messages,
    lastMessage: conv1Messages[conv1Messages.length - 1],
    createdAt: '2024-01-10T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[3]],
    product: mockProducts[3],
    messages: conv2Messages,
    lastMessage: conv2Messages[conv2Messages.length - 1],
    createdAt: '2024-01-08T14:22:00Z',
    isRead: true
  },
  {
    id: '3',
    participants: [mockUsers[2], mockUsers[0]],
    product: mockProducts[4],
    messages: conv3Messages,
    lastMessage: conv3Messages[conv3Messages.length - 1],
    createdAt: '2024-01-11T09:15:00Z',
    isRead: false
  },
  {
    id: '4',
    participants: [mockUsers[0], mockUsers[5]],
    product: mockProducts[21],
    messages: conv4Messages,
    lastMessage: conv4Messages[conv4Messages.length - 1],
    createdAt: '2024-01-21T14:20:00Z',
    isRead: true
  },
  {
    id: '5',
    participants: [mockUsers[4], mockUsers[7]],
    product: mockProducts[23],
    messages: conv5Messages,
    lastMessage: conv5Messages[conv5Messages.length - 1],
    createdAt: '2024-01-22T10:15:00Z',
    isRead: false
  }
];
