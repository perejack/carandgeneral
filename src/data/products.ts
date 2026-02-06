export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
}

export const PHONE_NUMBER = "+254780951610";
export const WHATSAPP_URL = `https://wa.me/254780951610`;

export const categories: Category[] = [
  { name: "Air Compressors", slug: "air-compressors", icon: "Wind", description: "Industrial & portable air compressors for every need", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop" },
  { name: "Commercial Laundry Equipment", slug: "commercial-laundry", icon: "WashingMachine", description: "Professional laundry solutions for businesses", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop" },
  { name: "Construction Equipment", slug: "construction-equipment", icon: "HardHat", description: "Heavy-duty construction machinery & tools", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
  { name: "Material Handling Equipment", slug: "material-handling", icon: "Package", description: "Forklifts, pallet jacks & warehouse solutions", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
  { name: "Motorcycles", slug: "motorcycles", icon: "Bike", description: "Reliable motorcycles for personal & commercial use", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop" },
  { name: "Outboard & Inboard Engines", slug: "engines", icon: "Anchor", description: "Marine engines for boats & watercraft", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
  { name: "Generators", slug: "generators", icon: "Zap", description: "Power generators for home, office & industrial use", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop" },
  { name: "Lawn & Yard", slug: "lawn-yard", icon: "TreePine", description: "Lawn mowers, trimmers & garden equipment", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop" },
  { name: "Water Pumps", slug: "water-pumps", icon: "Droplets", description: "Submersible, centrifugal & irrigation pumps", image: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop" },
  { name: "Three Wheelers", slug: "three-wheelers", icon: "Car", description: "Commercial three-wheelers for transport & delivery", image: "https://images.unsplash.com/photo-1609693181089-75f380aa80f9?w=400&h=300&fit=crop" },
  { name: "Tractors & Implements", slug: "tractors", icon: "Tractor", description: "Agricultural tractors & farming implements", image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=400&h=300&fit=crop" },
  { name: "Fitness Watches & GPS Devices", slug: "fitness-gps", icon: "Watch", description: "Smart fitness trackers & GPS navigation", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
  { name: "Tyres", slug: "tyres", icon: "Circle", description: "Quality tyres for all vehicle types", image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&h=300&fit=crop" },
  { name: "Industrial Motors", slug: "industrial-motors", icon: "Cog", description: "Electric motors for industrial applications", image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop" },
  { name: "Automobile Oil", slug: "automobile-oil", icon: "Fuel", description: "Premium engine oils & lubricants", image: "https://images.unsplash.com/photo-1635784440937-3a84f6d9ed73?w=400&h=300&fit=crop" },
];

export const products: Product[] = [
  // Motorcycles
  { id: "moto-1", name: "CG Sport 150cc", category: "Motorcycles", categorySlug: "motorcycles", price: "KES 185,000", description: "A powerful and fuel-efficient 150cc motorcycle built for both city commuting and highway cruising. Features a 4-stroke engine, electric start, and disc brakes for reliable performance.", features: ["150cc 4-stroke engine", "Electric & kick start", "Front disc brake", "14L fuel tank", "Tubeless tyres", "LED headlamp"], image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop", badge: "Best Seller" },
  { id: "moto-2", name: "CG Cruiser 200cc", category: "Motorcycles", categorySlug: "motorcycles", price: "KES 265,000", description: "A heavy-duty 200cc cruiser motorcycle with premium suspension, powerful braking, and a comfortable riding position for long-distance travel.", features: ["200cc engine", "Dual disc brakes", "Digital dashboard", "USB charging port", "Alloy wheels", "5-speed transmission"], image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop" },
  { id: "moto-3", name: "CG Commuter 125cc", category: "Motorcycles", categorySlug: "motorcycles", price: "KES 135,000", description: "The perfect economical commuter bike with excellent fuel efficiency and low maintenance costs. Ideal for daily urban riding.", features: ["125cc engine", "Kick & electric start", "Drum brakes", "12L fuel tank", "Spoke wheels", "4-speed gear"], image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop" },

  // Generators
  { id: "gen-1", name: "PowerMax 5000W Generator", category: "Generators", categorySlug: "generators", price: "KES 78,000", description: "A reliable 5000W petrol generator with automatic voltage regulation and low-noise operation, perfect for home backup power.", features: ["5000W rated output", "AVR technology", "Low noise 68dB", "Electric start", "12-hour runtime", "Fuel gauge"], image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop", badge: "New" },
  { id: "gen-2", name: "IndustryPro 10KVA Generator", category: "Generators", categorySlug: "generators", price: "KES 245,000", description: "Heavy-duty 10KVA diesel generator for commercial and industrial applications. Features soundproof canopy and automatic transfer switch.", features: ["10KVA output", "Diesel engine", "Soundproof canopy", "Auto transfer switch", "Digital panel", "Wheel kit included"], image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop" },

  // Construction Equipment
  { id: "con-1", name: "MixMaster Concrete Mixer", category: "Construction Equipment", categorySlug: "construction-equipment", price: "KES 165,000", description: "A heavy-duty concrete mixer with 400L drum capacity, powered by a reliable diesel engine. Perfect for medium to large construction projects.", features: ["400L drum capacity", "Diesel powered", "Tilting drum design", "Heavy-duty frame", "Portable on wheels", "Cast iron ring gear"], image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop" },
  { id: "con-2", name: "VibraCompact Plate Compactor", category: "Construction Equipment", categorySlug: "construction-equipment", price: "KES 89,000", description: "A powerful plate compactor for soil and gravel compaction. Features vibration-dampened handle and forward/reverse travel.", features: ["5.5HP engine", "Forward & reverse", "Anti-vibration handle", "Compaction force 15kN", "Water tank option", "Transport wheels"], image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop", badge: "Popular" },

  // Tractors
  { id: "trac-1", name: "FarmKing 45HP Tractor", category: "Tractors & Implements", categorySlug: "tractors", price: "KES 2,850,000", description: "A versatile 45HP agricultural tractor with 4WD capability, power steering, and 3-point hitch for various farming implements.", features: ["45HP diesel engine", "4WD system", "Power steering", "8+2 transmission", "3-point hitch", "540 RPM PTO"], image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600&h=400&fit=crop" },

  // Water Pumps
  { id: "pump-1", name: "AquaFlow 3\" Water Pump", category: "Water Pumps", categorySlug: "water-pumps", price: "KES 42,000", description: "A high-capacity 3-inch water pump ideal for irrigation, construction dewatering, and water transfer applications.", features: ["3\" inlet/outlet", "6.5HP engine", "1000L/min flow", "28m max head", "Self-priming", "Recoil start"], image: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=400&fit=crop" },

  // Three Wheelers
  { id: "tw-1", name: "CargoMax Three Wheeler", category: "Three Wheelers", categorySlug: "three-wheelers", price: "KES 420,000", description: "A durable cargo three-wheeler designed for commercial transport and delivery in urban and semi-urban areas. Features a spacious cargo bed.", features: ["200cc engine", "800kg payload", "Hydraulic brakes", "Full cabin", "Cargo bed 1.8m", "LED lights"], image: "https://images.unsplash.com/photo-1609693181089-75f380aa80f9?w=600&h=400&fit=crop", badge: "New" },

  // Air Compressors
  { id: "comp-1", name: "AirPro 50L Compressor", category: "Air Compressors", categorySlug: "air-compressors", price: "KES 35,000", description: "A reliable 50-litre belt-driven air compressor perfect for automotive workshops, spray painting, and pneumatic tools.", features: ["50L tank", "2.5HP motor", "8 bar pressure", "Belt driven", "Oil lubricated", "Quick coupler"], image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop" },

  // Tyres
  { id: "tyre-1", name: "AllTerrain SUV Tyre 265/70R16", category: "Tyres", categorySlug: "tyres", price: "KES 18,500", description: "A premium all-terrain tyre designed for SUVs and pickup trucks. Provides excellent grip on both paved roads and off-road conditions.", features: ["265/70R16 size", "All-terrain pattern", "Reinforced sidewall", "Mud & snow rated", "80,000km warranty", "Tubeless design"], image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop" },

  // Automobile Oil
  { id: "oil-1", name: "ProLube Synthetic 5W-30", category: "Automobile Oil", categorySlug: "automobile-oil", price: "KES 4,500", description: "A fully synthetic engine oil formulated for modern petrol and diesel engines. Provides superior protection and fuel economy.", features: ["5W-30 grade", "Fully synthetic", "API SN Plus", "4L pack", "Extended drain", "Low SAPS"], image: "https://images.unsplash.com/photo-1635784440937-3a84f6d9ed73?w=600&h=400&fit=crop" },

  // Lawn & Yard
  { id: "lawn-1", name: "GreenCut Lawn Mower 18\"", category: "Lawn & Yard", categorySlug: "lawn-yard", price: "KES 52,000", description: "An 18-inch self-propelled petrol lawn mower with mulching capability and adjustable cutting height for pristine lawn maintenance.", features: ["18\" cutting deck", "5.5HP engine", "Self-propelled", "7 height settings", "Mulch & collect", "Foldable handle"], image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&h=400&fit=crop" },

  // Fitness Watches
  { id: "fit-1", name: "TrackPro GPS Sports Watch", category: "Fitness Watches & GPS Devices", categorySlug: "fitness-gps", price: "KES 12,800", description: "An advanced GPS sports watch with heart rate monitoring, multi-sport tracking, and a durable waterproof design for outdoor enthusiasts.", features: ["GPS tracking", "Heart rate monitor", "50m waterproof", "14-day battery", "Multi-sport modes", "Bluetooth sync"], image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop", badge: "New" },

  // Industrial Motors
  { id: "motor-1", name: "PowerDrive 5HP Electric Motor", category: "Industrial Motors", categorySlug: "industrial-motors", price: "KES 28,000", description: "A high-efficiency 5HP three-phase electric motor suitable for pumps, compressors, conveyor systems, and various industrial machinery.", features: ["5HP / 3.7kW", "Three phase", "IE3 efficiency", "IP55 protection", "B3 foot mount", "Cast iron frame"], image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop" },

  // Outboard Engines
  { id: "eng-1", name: "MarineForce 40HP Outboard", category: "Outboard & Inboard Engines", categorySlug: "engines", price: "KES 485,000", description: "A powerful 40HP 4-stroke outboard engine with electronic fuel injection for smooth, fuel-efficient marine propulsion.", features: ["40HP output", "4-stroke EFI", "Electric start", "Power trim & tilt", "Stainless prop", "Freshwater flush"], image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop" },

  // Material Handling
  { id: "mh-1", name: "LiftPro 2.5T Forklift", category: "Material Handling Equipment", categorySlug: "material-handling", price: "KES 1,950,000", description: "A robust 2.5-tonne diesel forklift with excellent visibility, ergonomic controls, and a powerful engine for demanding warehouse operations.", features: ["2.5T capacity", "Diesel engine", "3m mast height", "Side shift", "Solid tyres", "Full cabin"], image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop" },

  // Commercial Laundry
  { id: "laun-1", name: "WashPro 15kg Commercial Washer", category: "Commercial Laundry Equipment", categorySlug: "commercial-laundry", price: "KES 320,000", description: "A high-capacity 15kg commercial washing machine designed for laundromats, hotels, and hospitals with programmable wash cycles.", features: ["15kg capacity", "Programmable cycles", "Spin extraction", "Stainless drum", "Water recycling", "Energy efficient"], image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop" },
];

export const getProductsByCategory = (slug: string): Product[] => {
  return products.filter((p) => p.categorySlug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((c) => c.slug === slug);
};
