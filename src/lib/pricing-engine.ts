export interface UserProfile {
  id: string;
  label: string;
  emoji: string;
  description: string;
  device: string;
  userAgent: string;
  behavior: string;
  price: number;
}

export interface PriceAnalysis {
  url: string;
  productName: string;
  category: string;
  userPrice: number;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  priceDifference: number;
  percentageOverpay: number;
  isFair: boolean;
  profiles: UserProfile[];
  reasons: string[];
  timestamp: Date;
}

const SHARED_PROFILES = {
  firstTime: {
    label: "First-Time Visitor",
    emoji: "👋",
    description: "Brand new visitor with no browsing history",
    device: "Desktop - Chrome",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    behavior: "First visit, no cookies",
  },
  iphone: {
    label: "iPhone User",
    emoji: "📱",
    description: "Browsing from latest iPhone on Safari",
    device: "iPhone 15 Pro - Safari",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    behavior: "Premium device, mobile browsing",
  },
  desktop: {
    label: "Desktop User",
    emoji: "🖥️",
    description: "Standard desktop browsing on Chrome",
    device: "Desktop - Chrome",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    behavior: "Regular desktop session",
  },
  urgentBuyer: {
    label: "Urgent Buyer",
    emoji: "⏰",
    description: "Needs to purchase immediately, showing urgency signals",
    device: "Desktop - Chrome",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    behavior: "Rapid clicks, short time-to-purchase",
  },
  frequentBuyer: {
    label: "Frequent Buyer",
    emoji: "🔄",
    description: "Returning customer with extensive purchase history",
    device: "Desktop - Chrome",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    behavior: "Logged in, 15+ past purchases",
  },
};

export interface ProductListing {
  id: string;
  name: string;
  category: string;
  url: string;
  image: string;
  basePrice: number;
  tag: string;
}

export const PRODUCT_LISTINGS: ProductListing[] = [
  // Flights
  { id: "f1", name: "Delhi → Mumbai", category: "Flights", url: "https://www.skyscanner.com/flights/del/bom/2025-03-15", image: "✈️", basePrice: 4500, tag: "Domestic" },
  { id: "f2", name: "Delhi → London", category: "Flights", url: "https://www.kayak.com/flights/del/lon/2025-04-10", image: "🌍", basePrice: 42000, tag: "International" },
  { id: "f3", name: "Bangalore → Dubai", category: "Flights", url: "https://www.skyscanner.com/flights/blr/dxb/2025-05-01", image: "🏜️", basePrice: 18500, tag: "International" },
  // Hotels
  { id: "h1", name: "Taj Palace — 2 Nights", category: "Hotels", url: "https://www.marriott.com/hotels/taj-palace-delhi", image: "🏨", basePrice: 12000, tag: "Luxury" },
  { id: "h2", name: "Goa Beach Resort — 3 Nights", category: "Hotels", url: "https://www.booking.com/hotel/goa-beach-resort", image: "🏖️", basePrice: 8500, tag: "Resort" },
  { id: "h3", name: "Ooty Hillside Inn — 2 Nights", category: "Hotels", url: "https://www.airbnb.com/rooms/ooty-hillside", image: "⛰️", basePrice: 4200, tag: "Budget" },
  // Electronics
  { id: "e1", name: "Sony WH-1000XM5", category: "Electronics", url: "https://www.amazon.in/dp/B0C8PSRWFM", image: "🎧", basePrice: 28990, tag: "Audio" },
  { id: "e2", name: "iPhone 15 Pro Max", category: "Electronics", url: "https://www.amazon.in/dp/B0CHXQH5NT", image: "📱", basePrice: 159900, tag: "Mobile" },
  { id: "e3", name: "MacBook Air M3", category: "Electronics", url: "https://www.amazon.in/dp/B0CX23V2ZK", image: "💻", basePrice: 114900, tag: "Laptop" },
  // Fashion
  { id: "fa1", name: "Nike Air Max 90", category: "Fashion", url: "https://www.nike.com/in/air-max-90", image: "👟", basePrice: 12995, tag: "Shoes" },
  { id: "fa2", name: "Levi's 501 Original", category: "Fashion", url: "https://www.levi.in/501-original", image: "👖", basePrice: 4599, tag: "Denim" },
  { id: "fa3", name: "Ray-Ban Aviator", category: "Fashion", url: "https://www.amazon.in/ray-ban-aviator", image: "🕶️", basePrice: 7490, tag: "Accessories" },
];

export const PRICE_SCENARIOS: Record<string, {
  productName: string;
  category: string;
  profiles: Omit<UserProfile, 'id'>[];
  reasons: string[];
}> = {
  flight: {
    productName: "Delhi → Mumbai One Way",
    category: "Flights",
    profiles: [
      { ...SHARED_PROFILES.firstTime, price: 4500 },
      { ...SHARED_PROFILES.iphone, price: 5200 },
      { ...SHARED_PROFILES.desktop, price: 4650 },
      { ...SHARED_PROFILES.urgentBuyer, price: 6400 },
      { ...SHARED_PROFILES.frequentBuyer, price: 5100 },
    ],
    reasons: [
      "Urgent buyers pay up to 64% more — the algorithm detects rapid browsing and short decision windows",
      "iPhone/Safari users are shown premium pricing based on device-income profiling",
      "Frequent buyers face a loyalty penalty — the system knows they'll likely purchase anyway",
    ],
  },
  hotel: {
    productName: "Taj Palace Suite — 2 Nights",
    category: "Hotels",
    profiles: [
      { ...SHARED_PROFILES.firstTime, price: 12000 },
      { ...SHARED_PROFILES.iphone, price: 14500 },
      { ...SHARED_PROFILES.desktop, price: 12400 },
      { ...SHARED_PROFILES.urgentBuyer, price: 17900 },
      { ...SHARED_PROFILES.frequentBuyer, price: 13800 },
    ],
    reasons: [
      "Urgent buyers are charged a 70% premium — last-minute booking signals trigger surge pricing",
      "iPhone users pay 38% more than desktop users due to device profiling",
      "Frequent buyers see elevated prices — repeat visits signal high purchase intent",
    ],
  },
  product: {
    productName: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    profiles: [
      { ...SHARED_PROFILES.firstTime, price: 28990 },
      { ...SHARED_PROFILES.iphone, price: 30500 },
      { ...SHARED_PROFILES.desktop, price: 28990 },
      { ...SHARED_PROFILES.urgentBuyer, price: 31500 },
      { ...SHARED_PROFILES.frequentBuyer, price: 28490 },
    ],
    reasons: [
      "Urgent buyers see 15% higher prices — rapid cart additions signal willingness to pay more",
      "iPhone app users face premium pricing due to reduced comparison shopping on mobile",
      "Frequent buyers get slight discounts as a retention strategy, but not the best price",
    ],
  },
  fashion: {
    productName: "Nike Air Max 90",
    category: "Fashion",
    profiles: [
      { ...SHARED_PROFILES.firstTime, price: 12995 },
      { ...SHARED_PROFILES.iphone, price: 13495 },
      { ...SHARED_PROFILES.desktop, price: 12995 },
      { ...SHARED_PROFILES.urgentBuyer, price: 14495 },
      { ...SHARED_PROFILES.frequentBuyer, price: 12495 },
    ],
    reasons: [
      "Urgent buyers pay up to 21% more due to rapid browsing and add-to-cart behavior",
      "iPhone users see slightly higher prices through premium device profiling",
      "Frequent buyers may get loyalty discounts, but not always the best available price",
    ],
  },
};

export function detectCategory(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes("flight") || lower.includes("airline") || lower.includes("skyscanner") || lower.includes("kayak")) {
    return "flight";
  }
  if (lower.includes("hotel") || lower.includes("marriott") || lower.includes("hilton") || lower.includes("airbnb") || lower.includes("booking")) {
    return "hotel";
  }
  if (lower.includes("nike") || lower.includes("levi") || lower.includes("fashion") || lower.includes("ray-ban")) {
    return "fashion";
  }
  return "product";
}

export function generateAnalysis(url: string, userProfileIndex: number = 0): PriceAnalysis {
  const category = detectCategory(url);
  const scenario = PRICE_SCENARIOS[category];
  
  const profiles: UserProfile[] = scenario.profiles.map((p, i) => ({
    ...p,
    id: `profile-${i}`,
  }));

  const prices = profiles.map(p => p.price);
  const userPrice = profiles[userProfileIndex]?.price ?? profiles[1].price;
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const priceDifference = userPrice - lowestPrice;
  const percentageOverpay = Math.round((priceDifference / lowestPrice) * 100);
  const isFair = percentageOverpay <= 5;

  return {
    url,
    productName: scenario.productName,
    category: scenario.category,
    userPrice,
    lowestPrice,
    highestPrice,
    averagePrice,
    priceDifference,
    percentageOverpay,
    isFair,
    profiles,
    reasons: scenario.reasons,
    timestamp: new Date(),
  };
}
