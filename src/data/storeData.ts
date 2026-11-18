import { Brand, Category, Faq, HeroSlide, Product, PromoBanner, SampleReview } from "@/types/store";

/**
 * FUTURE BACKEND PREPARATION (Firebase & Admin Dashboard Ready)
 * All business settings, categories, banners, products, sample reviews, and policies
 * are isolated in this single data layer so a future Admin Dashboard integration
 * can replace or sync these collections without modifying UI components.
 */

export const LOGO_SRC = "/assets/logo/BestPrices-logo.png";

export const BUSINESS_SETTINGS = {
  "name": "BestPrices.lk",
  "developer": "Harsh Apex Digital Solutions",
  "developerUrl": "https://harshapex.com.lk",
  "currency": "LKR",
  "currencySymbol": "Rs.",
  "hotline": "+94 11 234 5678",
  "whatsappNumber": "94770663154",
  "supportEmail": "support@bestprices.lk",
  "headOffice": "No. 412, Galle Road, Colombo 03, Sri Lanka",
  "freeShippingThreshold": 50000,
  "standardShippingColombo": 650,
  "standardShippingIslandwide": 1250,
  "demoPromoCode": "BEST10",
  "demoPromoDiscountPct": 10
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    "id": "slide-1",
    "badge": "MEGA TECH RUSH",
    "title": "Next-Gen Flagship Tech at Sri Lanka's Best Prices",
    "subtitle": "Save up to Rs. 60,000 on 5G Smartphones, Creator OLED Laptops, and ANC Audio with Islandwide Express Delivery.",
    "priceCallout": "Starting from Rs. 24,990",
    "ctaPrimary": "Shop Flagship Tech",
    "ctaCategory": "mobiles",
    "desktopImage": "/assets/banners/hero-tech.jpg",
    "mobileImage": "/assets/banners/promo-mobile.jpg",
    "theme": "dark"
  },
  {
    "id": "slide-2",
    "badge": "SMART HOME & KITCHEN UPGRADE",
    "title": "Energy-Saving Inverter Appliances for Every Home",
    "subtitle": "Upgrade your kitchen and laundry with smart inverter refrigerators, front-load washers, and digital air fryers.",
    "priceCallout": "Up to 41% OFF Flash Deals",
    "ctaPrimary": "Explore Appliances",
    "ctaCategory": "home-appliances",
    "desktopImage": "/assets/banners/hero-appliances.jpg",
    "mobileImage": "/assets/banners/promo-kitchen.jpg",
    "theme": "dark"
  },
  {
    "id": "slide-3",
    "badge": "CINEMA & GAMING FESTIVAL",
    "title": "55\" 4K QLED Google TVs & High-Power Party Audio",
    "subtitle": "Bring the stadium and cinema home with bezel-less 4K HDR10+ displays and 1800W Bluetooth party sound systems.",
    "priceCallout": "Save Rs. 55,000 Today",
    "ctaPrimary": "View TV & Audio",
    "ctaCategory": "tv-audio",
    "desktopImage": "/assets/banners/hero-tv-gaming.jpg",
    "mobileImage": "/assets/banners/hero-tv-gaming.jpg",
    "theme": "dark"
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": "mobiles",
    "name": "Mobiles & Tablets",
    "shortDesc": "5G Smartphones, Tablets & Fast Chargers",
    "icon": "smartphone",
    "image": "/assets/products/smartphone-5g.jpg",
    "subcategories": [
      "5G Smartphones",
      "Android Tablets",
      "Power Banks",
      "Fast Chargers"
    ]
  },
  {
    "id": "laptops",
    "name": "Laptops & Computing",
    "shortDesc": "Ultrabooks, Gaming Laptops & Monitors",
    "icon": "laptop",
    "image": "/assets/products/ultrabook-pro.jpg",
    "subcategories": [
      "Creator Ultrabooks",
      "Office Notebooks",
      "Gaming Laptops",
      "Printers & Monitors"
    ]
  },
  {
    "id": "tv-audio",
    "name": "TV & Home Audio",
    "shortDesc": "4K QLED Google TVs, Soundbars & Headphones",
    "icon": "tv",
    "image": "/assets/products/qled-tv-55.jpg",
    "subcategories": [
      "43\" - 65\" Smart TVs",
      "Party Speakers",
      "ANC Headphones",
      "Home Theater"
    ]
  },
  {
    "id": "home-appliances",
    "name": "Home Appliances",
    "shortDesc": "Inverter Fridges, Washing Machines & ACs",
    "icon": "refrigerator",
    "image": "/assets/products/inverter-fridge.jpg",
    "subcategories": [
      "Double Door Fridges",
      "Front Load Washers",
      "Inverter Air Conditioners",
      "Vacuum Cleaners"
    ]
  },
  {
    "id": "kitchen-appliances",
    "name": "Kitchen Appliances",
    "shortDesc": "Digital Air Fryers, Espresso & Microwaves",
    "icon": "utensils",
    "image": "/assets/products/air-fryer-xl.jpg",
    "subcategories": [
      "Air Fryers",
      "Espresso Machines",
      "Microwave Ovens",
      "Blenders & Rice Cookers"
    ]
  },
  {
    "id": "wearables",
    "name": "Smart Wearables",
    "shortDesc": "AMOLED Fitness Watches & Wireless Earbuds",
    "icon": "watch",
    "image": "/assets/products/smartwatch-ultra.jpg",
    "subcategories": [
      "GPS Smartwatches",
      "TWS Earbuds",
      "Fitness Trackers",
      "Watch Straps"
    ]
  }
];

export const BRANDS: Brand[] = [
  {
    "id": "ApexTech",
    "name": "ApexTech",
    "category": "Mobiles & Wearables",
    "tag": "Sample Brand"
  },
  {
    "id": "VisionQ",
    "name": "VisionQ",
    "category": "4K Smart TVs",
    "tag": "Sample Brand"
  },
  {
    "id": "CoolTech",
    "name": "CoolTech",
    "category": "Refrigerators & ACs",
    "tag": "Sample Brand"
  },
  {
    "id": "ChefMaster",
    "name": "ChefMaster",
    "category": "Kitchen Appliances",
    "tag": "Sample Brand"
  },
  {
    "id": "SonicPulse",
    "name": "SonicPulse",
    "category": "Audio & Speakers",
    "tag": "Sample Brand"
  },
  {
    "id": "NovaBook",
    "name": "NovaBook",
    "category": "Laptops & Computing",
    "tag": "Sample Brand"
  },
  {
    "id": "WashPro",
    "name": "WashPro",
    "category": "Laundry Systems",
    "tag": "Sample Brand"
  },
  {
    "id": "BrewCraft",
    "name": "BrewCraft",
    "category": "Coffee & Barista",
    "tag": "Sample Brand"
  }
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    "id": "promo-kitchen",
    "badge": "KITCHEN BUNDLE SAVE 35%",
    "title": "Smart Oil-Free Air Fryers & Barista Coffee Gear",
    "subtitle": "Upgrade your daily cooking with rapid-air touch appliances.",
    "ctaText": "Shop Kitchen Deals",
    "category": "kitchen-appliances",
    "image": "/assets/banners/promo-kitchen.jpg"
  },
  {
    "id": "promo-mobile",
    "badge": "MOBILE & WEARABLE FEST",
    "title": "5G Titanium Flagships & AMOLED Smartwatches",
    "subtitle": "Trade up to pro photography and 60-hour battery endurance.",
    "ctaText": "Explore Mobile & Tech",
    "category": "mobiles",
    "image": "/assets/banners/promo-mobile.jpg"
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": "bp-prod-01",
    "sku": "BP-MOB-5G-256",
    "name": "Titanium Pro Max 5G Smartphone (256GB / 12GB RAM)",
    "category": "mobiles",
    "categoryLabel": "Mobiles & Tablets",
    "brand": "ApexTech",
    "originalPrice": 449990,
    "discountPrice": 389990,
    "discountPct": 13,
    "stockCount": 18,
    "soldCount": 42,
    "rating": 4.9,
    "reviewCount": 28,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": true,
    "isTrending": true,
    "isRecommended": true,
    "image": "/assets/products/smartphone-5g.jpg",
    "gallery": [
      "/assets/products/smartphone-5g.jpg",
      "/assets/banners/promo-mobile.jpg",
      "/assets/banners/hero-tech.jpg"
    ],
    "shortDesc": "Aerospace-grade titanium frame, 6.8\" 120Hz LTPO AMOLED display, 200MP periscope pro camera array, and 5000mAh all-day battery.",
    "variations": {
      "Storage": [
        "256GB / 12GB RAM",
        "512GB / 16GB RAM"
      ],
      "Color": [
        "Obsidian Titanium",
        "Natural Titanium"
      ]
    },
    "specs": {
      "Display": "6.8-inch QHD+ 120Hz Dynamic AMOLED 2X",
      "Processor": "Octa-Core 3nm Flagship SoC",
      "Camera": "200MP Main OIS + 50MP 5x Periscope + 12MP Ultra-Wide",
      "Battery & Charging": "5000mAh with 45W Fast Wired & 15W Wireless",
      "Connectivity": "Dual 5G, Wi-Fi 7, Bluetooth 5.4, NFC",
      "Warranty Notice": "1-Year Warranty (confirm terms with our team)"
    }
  },
  {
    "id": "bp-prod-02",
    "sku": "BP-LAP-PRO15",
    "name": "UltraBook Pro 15 OLED Creator Laptop (Core Ultra 7 / 16GB / 1TB SSD)",
    "category": "laptops",
    "categoryLabel": "Laptops & Computing",
    "brand": "NovaBook",
    "originalPrice": 389999,
    "discountPrice": 334999,
    "discountPct": 14,
    "stockCount": 12,
    "soldCount": 31,
    "rating": 4.8,
    "reviewCount": 19,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": true,
    "isTrending": false,
    "isRecommended": true,
    "image": "/assets/products/ultrabook-pro.jpg",
    "gallery": [
      "/assets/products/ultrabook-pro.jpg",
      "/assets/banners/hero-tech.jpg"
    ],
    "shortDesc": "Precision-milled aluminum chassis with 15.6\" 2.8K 120Hz OLED display, AI NPU acceleration, and ultra-fast 1TB PCIe 4.0 SSD.",
    "variations": {
      "Memory": [
        "16GB LPDDR5X / 1TB SSD",
        "32GB LPDDR5X / 1TB SSD"
      ],
      "Finish": [
        "Lunar Silver",
        "Space Carbon"
      ]
    },
    "specs": {
      "Display": "15.6\" 2.8K (2880 x 1620) OLED 120Hz, 100% DCI-P3",
      "Processor": "Intel Core Ultra 7 Processor (16 Cores, up to 4.8GHz)",
      "Memory & Storage": "16GB LPDDR5X RAM + 1TB M.2 NVMe PCIe 4.0 SSD",
      "Ports": "2x Thunderbolt 4, HDMI 2.1, USB-A 3.2, SD Express Reader",
      "Weight": "1.45 kg Ultra-Portable Aluminum Chassis"
    }
  },
  {
    "id": "bp-prod-03",
    "sku": "BP-TV-55QLED",
    "name": "55\" 4K QLED Smart Google TV (Dolby Vision, HDR10+ & 120Hz Game Mode)",
    "category": "tv-audio",
    "categoryLabel": "TV & Home Audio",
    "brand": "VisionQ",
    "originalPrice": 214999,
    "discountPrice": 159999,
    "discountPct": 26,
    "stockCount": 9,
    "soldCount": 54,
    "rating": 4.9,
    "reviewCount": 37,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": false,
    "isTrending": true,
    "isRecommended": true,
    "image": "/assets/products/qled-tv-55.jpg",
    "gallery": [
      "/assets/products/qled-tv-55.jpg",
      "/assets/banners/hero-tv-gaming.jpg"
    ],
    "shortDesc": "Quantum Dot 4K UHD panel with bezel-less metallic frame, Dolby Atmos 30W speakers, built-in Google TV & voice remote.",
    "variations": {
      "Screen Size": [
        "43 Inch FHD",
        "55 Inch 4K QLED",
        "65 Inch 4K QLED"
      ]
    },
    "specs": {
      "Resolution": "4K Ultra HD (3840 x 2160) Quantum Dot QLED",
      "HDR Support": "Dolby Vision, HDR10+, HLG",
      "Audio": "30W Down-Firing Stereo with Dolby Atmos",
      "Smart OS": "Google TV with Built-in Chromecast & Voice Assistant",
      "Connectivity": "3x HDMI 2.1 (eARC), 2x USB, Optical, Wi-Fi 5, Bluetooth 5.1"
    }
  },
  {
    "id": "bp-prod-04",
    "sku": "BP-REF-532INV",
    "name": "532L Smart Inverter Double-Door Refrigerator (Brushed Dark Steel)",
    "category": "home-appliances",
    "categoryLabel": "Home Appliances",
    "brand": "CoolTech",
    "originalPrice": 309990,
    "discountPrice": 249990,
    "discountPct": 19,
    "stockCount": 7,
    "soldCount": 23,
    "rating": 4.8,
    "reviewCount": 16,
    "isFlashDeal": false,
    "isBestSeller": true,
    "isNewArrival": true,
    "isTrending": true,
    "isRecommended": false,
    "image": "/assets/products/inverter-fridge.jpg",
    "gallery": [
      "/assets/products/inverter-fridge.jpg",
      "/assets/banners/hero-appliances.jpg"
    ],
    "shortDesc": "Multi-air flow No-Frost cooling with external LED touch temperature control, R600a eco refrigerant, and tempered glass shelves.",
    "variations": {
      "Capacity": [
        "260L Double Door",
        "532L Large Family"
      ],
      "Finish": [
        "Brushed Dark Steel",
        "Silver Hairline"
      ]
    },
    "specs": {
      "Capacity": "532 Liters Net Capacity",
      "Compressor": "Digital Smart Inverter (Low Voltage Startup)",
      "Cooling System": "Dual Fan No-Frost Multi Air Flow",
      "Shelves": "Heavy-Duty Spill-Proof Tempered Glass",
      "Energy Rating": "Eco-Inverter R600a Refrigerant"
    }
  },
  {
    "id": "bp-prod-05",
    "sku": "BP-WM-9KGINV",
    "name": "9kg AI Direct Drive Front-Load Inverter Washing Machine (Gunmetal)",
    "category": "home-appliances",
    "categoryLabel": "Home Appliances",
    "brand": "WashPro",
    "originalPrice": 184990,
    "discountPrice": 149990,
    "discountPct": 19,
    "stockCount": 14,
    "soldCount": 39,
    "rating": 4.7,
    "reviewCount": 22,
    "isFlashDeal": true,
    "isBestSeller": false,
    "isNewArrival": true,
    "isTrending": true,
    "isRecommended": true,
    "image": "/assets/products/washing-machine.jpg",
    "gallery": [
      "/assets/products/washing-machine.jpg",
      "/assets/banners/hero-appliances.jpg"
    ],
    "shortDesc": "Hygienic 60°C steam wash, 1400 RPM silent direct-drive inverter motor, 15-minute quick wash, and stainless steel pearl drum.",
    "variations": {
      "Drum Capacity": [
        "7.5kg Front Load",
        "9kg Front Load",
        "10.5kg Washer & Dryer"
      ]
    },
    "specs": {
      "Wash Capacity": "9.0 kg Dry Load",
      "Motor Type": "Brushless Direct Drive Inverter Motor",
      "Spin Speed": "Up to 1400 RPM Variable Spin",
      "Programs": "14 Programs including Baby Steam Care & 15-Min Quick Wash",
      "Body Finish": "Anti-Corrosion Gunmetal Inox Cabinet"
    }
  },
  {
    "id": "bp-prod-06",
    "sku": "BP-KIT-AF55",
    "name": "5.5L Digital Touch Smart Air Fryer XL (1700W Rapid Air Circulation)",
    "category": "kitchen-appliances",
    "categoryLabel": "Kitchen Appliances",
    "brand": "ChefMaster",
    "originalPrice": 36990,
    "discountPrice": 21990,
    "discountPct": 41,
    "stockCount": 34,
    "soldCount": 118,
    "rating": 4.9,
    "reviewCount": 64,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": false,
    "isTrending": true,
    "isRecommended": true,
    "image": "/assets/products/air-fryer-xl.jpg",
    "gallery": [
      "/assets/products/air-fryer-xl.jpg",
      "/assets/banners/promo-kitchen.jpg"
    ],
    "shortDesc": "Cook crispy meals with up to 90% less oil using 8 one-touch LED presets, non-stick PFOA-free basket, and auto shut-off safety.",
    "variations": {
      "Capacity": [
        "4.2L Standard",
        "5.5L XL Family",
        "7.0L Dual Basket"
      ]
    },
    "specs": {
      "Capacity": "5.5 Liters Non-Stick Detachable Basket",
      "Power Output": "1700W 360° Rapid Air Heating",
      "Temperature Range": "80°C – 200°C Digital Thermostat",
      "Timer": "1 – 60 Minutes with Auto Ready Bell",
      "Presets": "8 Touch Presets (Fries, Chicken, Fish, Bake, Dehydrate)"
    }
  },
  {
    "id": "bp-prod-07",
    "sku": "BP-AUD-ANC60",
    "name": "Studio ANC Pro Wireless Over-Ear Headphones (60H Battery & Hi-Res Audio)",
    "category": "tv-audio",
    "categoryLabel": "TV & Home Audio",
    "brand": "SonicPulse",
    "originalPrice": 49990,
    "discountPrice": 34990,
    "discountPct": 30,
    "stockCount": 25,
    "soldCount": 48,
    "rating": 4.8,
    "reviewCount": 31,
    "isFlashDeal": false,
    "isBestSeller": true,
    "isNewArrival": true,
    "isTrending": false,
    "isRecommended": true,
    "image": "/assets/products/anc-headphones.jpg",
    "gallery": [
      "/assets/products/anc-headphones.jpg",
      "/assets/banners/hero-tech.jpg"
    ],
    "shortDesc": "Hybrid 45dB Active Noise Cancellation, 40mm titanium-coated drivers, plush memory-foam earcups, and dual-device multipoint.",
    "variations": {
      "Color": [
        "Crimson Ring Matte Black",
        "Studio Silver"
      ]
    },
    "specs": {
      "Drivers": "40mm Custom Dynamic Titanium Diaphragm",
      "Noise Control": "Hybrid ANC (-45dB) + Transparency Mode",
      "Battery Life": "Up to 60 Hours (ANC Off) / 45 Hours (ANC On)",
      "Fast Charge": "5 Mins USB-C Charge = 4 Hours Playback",
      "Bluetooth": "Bluetooth 5.4 with Multipoint Connection"
    }
  },
  {
    "id": "bp-prod-08",
    "sku": "BP-AC-12KINV",
    "name": "12,000 BTU Smart Wi-Fi R32 Eco Inverter Air Conditioner",
    "category": "home-appliances",
    "categoryLabel": "Home Appliances",
    "brand": "CoolTech",
    "originalPrice": 229999,
    "discountPrice": 179999,
    "discountPct": 22,
    "stockCount": 11,
    "soldCount": 44,
    "rating": 4.9,
    "reviewCount": 27,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": false,
    "isTrending": true,
    "isRecommended": false,
    "image": "/assets/products/inverter-ac.jpg",
    "gallery": [
      "/assets/products/inverter-ac.jpg"
    ],
    "shortDesc": "Up to 60% energy savings with 100% copper condenser, Golden Fin anti-corrosion coating for coastal Sri Lankan homes, and smartphone app control.",
    "variations": {
      "Cooling Capacity": [
        "9,000 BTU",
        "12,000 BTU",
        "18,000 BTU"
      ]
    },
    "specs": {
      "Capacity": "12,000 BTU/h Full DC Inverter",
      "Refrigerant": "Eco-Friendly R32 Gas",
      "Condenser": "100% Inner-Grooved Copper with Golden Fin Protection",
      "Smart Control": "Built-in Wi-Fi App Control + Hidden LED Temperature Readout",
      "Filtration": "High-Density Anti-Dust & Cold Catalyst Filter"
    }
  },
  {
    "id": "bp-prod-09",
    "sku": "BP-KIT-ESP15",
    "name": "Barista Pro 15-Bar Stainless Espresso & Cappuccino Maker",
    "category": "kitchen-appliances",
    "categoryLabel": "Kitchen Appliances",
    "brand": "BrewCraft",
    "originalPrice": 64990,
    "discountPrice": 48990,
    "discountPct": 25,
    "stockCount": 16,
    "soldCount": 29,
    "rating": 4.8,
    "reviewCount": 18,
    "isFlashDeal": false,
    "isBestSeller": false,
    "isNewArrival": true,
    "isTrending": false,
    "isRecommended": true,
    "image": "/assets/products/espresso-maker.jpg",
    "gallery": [
      "/assets/products/espresso-maker.jpg",
      "/assets/banners/hero-appliances.jpg"
    ],
    "shortDesc": "Italian 15-bar high-pressure pump, commercial-grade steam wand for silky microfoam latte art, and analog pressure gauge.",
    "variations": {
      "Package": [
        "Espresso Machine + Portafilter",
        "Barista Bundle (+ Tamper & Pitcher)"
      ]
    },
    "specs": {
      "Pump Pressure": "15-Bar High-Pressure Extraction",
      "Boiler": "1350W Thermoblock Fast Heating System",
      "Water Tank": "1.8L Detachable BPA-Free Reservoir",
      "Construction": "Brushed Stainless Steel Front Panel & Cup Warmer Tray"
    }
  },
  {
    "id": "bp-prod-10",
    "sku": "BP-WR-ULTRA",
    "name": "ApexWatch Ultra GPS AMOLED Fitness Smartwatch (Titanium Bezel)",
    "category": "wearables",
    "categoryLabel": "Smart Wearables",
    "brand": "ApexTech",
    "originalPrice": 34990,
    "discountPrice": 24990,
    "discountPct": 29,
    "stockCount": 42,
    "soldCount": 87,
    "rating": 4.9,
    "reviewCount": 45,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": true,
    "isTrending": true,
    "isRecommended": true,
    "image": "/assets/products/smartwatch-ultra.jpg",
    "gallery": [
      "/assets/products/smartwatch-ultra.jpg",
      "/assets/banners/promo-mobile.jpg"
    ],
    "shortDesc": "1.43\" Always-On Sapphire AMOLED display, dual-band GPS, Bluetooth calling, 5ATM swim-proof rating, and 14-day battery life.",
    "variations": {
      "Strap Style": [
        "Crimson Sport Silicone",
        "Obsidian Tactical Nylon"
      ]
    },
    "specs": {
      "Display": "1.43\" 466x466 AMOLED (1000 Nits Peak Brightness)",
      "Sensors": "24/7 Heart Rate, SpO2 Blood Oxygen, Stress & Sleep Monitor",
      "Water Resistance": "5ATM Swim-Proof + IP68",
      "Battery Life": "14 Days Typical Use / 30 Days Standby",
      "Compatibility": "Android 8.0+ & iOS 13.0+ with Bluetooth Calling"
    }
  },
  {
    "id": "bp-prod-11",
    "sku": "BP-AUD-PARTY18",
    "name": "1800W PMPO Portable Bluetooth Party Speaker + Wireless Microphone",
    "category": "tv-audio",
    "categoryLabel": "TV & Home Audio",
    "brand": "SonicPulse",
    "originalPrice": 79999,
    "discountPrice": 44999,
    "discountPct": 44,
    "stockCount": 19,
    "soldCount": 76,
    "rating": 4.8,
    "reviewCount": 33,
    "isFlashDeal": true,
    "isBestSeller": true,
    "isNewArrival": false,
    "isTrending": true,
    "isRecommended": false,
    "image": "/assets/products/party-speaker.jpg",
    "gallery": [
      "/assets/products/party-speaker.jpg"
    ],
    "shortDesc": "Deep bass woofer with beat-synced crimson LED ring lighting, UHF wireless karaoke microphone included, and 10-hour rechargeable battery.",
    "variations": {
      "Configuration": [
        "Speaker + 1 Wireless Mic",
        "Dual Speaker TWS Party Pack"
      ]
    },
    "specs": {
      "Output": "1800W PMPO / 120W RMS High-Excursion Bass",
      "Inputs": "Bluetooth 5.3, USB MP3, AUX, Guitar & Mic Input",
      "Battery": "Rechargeable 12V 7.5Ah Battery (Up to 10 Hours)",
      "Included": "1x UHF Wireless Metallic Microphone + Remote Control"
    }
  },
  {
    "id": "bp-prod-12",
    "sku": "BP-KIT-MW23",
    "name": "23L Digital Touch Grill & Convection Microwave Oven (Mirror Black)",
    "category": "kitchen-appliances",
    "categoryLabel": "Kitchen Appliances",
    "brand": "ChefMaster",
    "originalPrice": 64999,
    "discountPrice": 51999,
    "discountPct": 20,
    "stockCount": 22,
    "soldCount": 34,
    "rating": 4.7,
    "reviewCount": 21,
    "isFlashDeal": false,
    "isBestSeller": false,
    "isNewArrival": true,
    "isTrending": false,
    "isRecommended": true,
    "image": "/assets/products/microwave-oven.jpg",
    "gallery": [
      "/assets/products/microwave-oven.jpg"
    ],
    "shortDesc": "Sleek tempered mirror glass door, stainless steel pull handle, 800W microwave + 1000W quartz grill, and quick defrost presets.",
    "variations": {
      "Oven Type": [
        "20L Solo",
        "23L Digital Grill",
        "28L Convection"
      ]
    },
    "specs": {
      "Capacity": "23 Liters Turntable Cavity",
      "Power": "800W Microwave / 1000W Quartz Grill",
      "Control Panel": "LED Digital Touch + Child Safety Lock",
      "Interior": "Easy-Clean Ceramic Enamel Cavity"
    }
  }
];

export const SAMPLE_REVIEWS: SampleReview[] = [
  {
    "id": "rev-1",
    "tag": "SAMPLE REVIEW",
    "customer": "Sample Customer (Colombo)",
    "product": "5.5L Digital Touch Smart Air Fryer XL",
    "rating": 5,
    "comment": "Placeholder review. Verified customer reviews will appear here once orders start coming in.",
    "date": "Sample review"
  },
  {
    "id": "rev-2",
    "tag": "SAMPLE REVIEW",
    "customer": "Sample Customer (Galle)",
    "product": "55\" 4K QLED Smart Google TV",
    "rating": 5,
    "comment": "Placeholder review. Verified customer reviews will appear here once orders start coming in.",
    "date": "Sample review"
  },
  {
    "id": "rev-3",
    "tag": "SAMPLE REVIEW",
    "customer": "Sample Customer (Kandy)",
    "product": "Titanium Pro Max 5G Smartphone",
    "rating": 5,
    "comment": "Placeholder review. Verified customer reviews will appear here once orders start coming in.",
    "date": "Sample review"
  }
];

export const FAQS: Faq[] = [
  {
    "q": "Do I have to pay online?",
    "a": "No. You can choose Cash on Delivery at checkout and pay in LKR when your order arrives. Our team calls to confirm every order before dispatch."
  },
  {
    "q": "How does islandwide delivery work across Sri Lanka?",
    "a": "In our standard operational model, orders within Colombo and suburbs are scheduled for 1–2 working days, while outstation districts (Kandy, Galle, Gampaha, Kurunegala, Jaffna, etc.) take 2–4 working days."
  },
  {
    "q": "What payment methods are supported on the checkout screen?",
    "a": "Cash on Delivery (LKR) and Direct Bank Transfer are available today. Online card and KOKO / MintPay installment payments are coming soon."
  },
  {
    "q": "How do I check stock or ask about a product?",
    "a": "Tap the WhatsApp button on any product page or call our hotline. We confirm stock, delivery dates and warranty details before you order."
  }
];

export const SRI_LANKA_DISTRICTS: string[] = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Galle",
  "Matara",
  "Hambantota",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
  "Jaffna",
  "Batticaloa",
  "Trincomalee",
  "Ampara",
  "Vavuniya"
];

export function formatLKR(amount: number): string {
  const n = Number(amount) || 0;
  return "Rs. " + n.toLocaleString("en-LK");
}

export function getProductById(id: string): Product {
  return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
}
