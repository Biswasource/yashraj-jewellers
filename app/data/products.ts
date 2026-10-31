export interface Product {
  id: string;
  name: string;
  code: string;
  category:
    | "earrings"
    | "rings"
    | "necklaces"
    | "bangles"
    | "mangalsutra"
    | "pendants"
    | "bracelets"
    | "chains"
    | "coins";
  metal: "gold" | "diamond" | "silver";
  purity: "24KT (999 Pure)" | "22KT (916 BIS)" | "18KT Gold & Diamond" | "925 Sterling Silver";
  gender: "women" | "men" | "kids" | "unisex";
  occasion: "wedding" | "daily-wear" | "light-occasion" | "festive";
  price: number;
  originalPrice: number;
  grossWeight: number; // in grams
  netGoldWeight: number; // in grams
  stoneWeight?: string; // in carats
  makingCharges: number;
  gst: number;
  tag?: "Bestseller" | "Heritage Bridal" | "New Arrival" | "Trending" | "24K Pure Bullion";
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  description: string;
  images: string[];
  dimensions?: string;
  certification: string;
}

export const CATEGORIES = [
  { id: "all", label: "All Jewellery" },
  { id: "necklaces", label: "Necklaces & Harams" },
  { id: "earrings", label: "Earrings & Jhumkas" },
  { id: "rings", label: "Rings & Solitaires" },
  { id: "bangles", label: "Bangles & Kadas" },
  { id: "mangalsutra", label: "Mangalsutra" },
  { id: "pendants", label: "Pendants & Sets" },
  { id: "bracelets", label: "Bracelets" },
  { id: "chains", label: "Gold Chains" },
  { id: "coins", label: "Lakshmi 24K Coins" },
];

export const METALS = [
  { id: "all", label: "All Metals" },
  { id: "gold", label: "Gold (22KT / 24KT)" },
  { id: "diamond", label: "Certified Diamond" },
  { id: "silver", label: "Silver & Filigree (925)" },
];

export const OCCASIONS = [
  { id: "all", label: "All Occasions" },
  { id: "wedding", label: "Vivaha Bridal" },
  { id: "festive", label: "Festive & Puja" },
  { id: "daily-wear", label: "Everyday Elegance" },
  { id: "light-occasion", label: "Light Occasions" },
];

export const LIVE_RATES = {
  gold24k: 7980,
  gold22k: 7350,
  gold18k: 6030,
  silver999: 98.5,
  lastUpdated: "Today, 10:30 AM IST",
  trend: "+0.45%",
};

export const PRODUCTS: Product[] = [];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(
    (p) => p.id.toLowerCase() === id.toLowerCase() || p.code.toLowerCase() === id.toLowerCase()
  );
}

export function getRelatedProducts(product: Product, limit = 4, pool?: Product[]): Product[] {
  const source = pool && pool.length > 0 ? pool : PRODUCTS;
  return source
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.metal === product.metal || p.occasion === product.occasion)
    )
    .slice(0, limit);
}

export const SHOWROOMS = [
  {
    city: "Bhubaneswar",
    name: "Master Canteen Flagship",
    address: "Station Square, Unit-3, Master Canteen, Bhubaneswar, Odisha 751001",
    phone: "0674-2534016 / 17 / 18",
    timing: "10:30 AM - 8:30 PM (Open 7 Days)",
    floors: "4 Floors: Gold Floor • Diamond Lounge • Silver Palace • Bridal Suite",
    mapUrl: "https://maps.google.com/?q=Master+Canteen+Bhubaneswar",
  },
  {
    city: "Bhubaneswar",
    name: "Raghunathpur Grand Showroom",
    address: "Nandankanan Road, Raghunathpur, Bhubaneswar, Odisha 751024",
    phone: "0674-2978900",
    timing: "11:00 AM - 9:00 PM (Open 7 Days)",
    floors: "Exclusive Luxury Vivaha Bridal Gallery & Valet Parking",
    mapUrl: "https://maps.google.com/?q=Raghunathpur+Bhubaneswar",
  },
  {
    city: "Cuttack",
    name: "CDA Sector-9 Heritage Showroom",
    address: "Sector 9, CDA Market Complex, Cuttack, Odisha 753014",
    phone: "0671-2365400",
    timing: "10:30 AM - 8:30 PM",
    floors: "Home of Famous Odisha Silver Tarakasi Filigree Artisans",
    mapUrl: "https://maps.google.com/?q=CDA+Cuttack",
  },
  {
    city: "Cuttack",
    name: "Cantonment Road Boutique",
    address: "Near Barabati Stadium, Cantonment Road, Cuttack, Odisha 753001",
    phone: "0671-2309811",
    timing: "10:30 AM - 8:30 PM",
    floors: "High-Value Diamond Solitaire Lounge & Bullion Desk",
    mapUrl: "https://maps.google.com/?q=Cantonment+Road+Cuttack",
  },
  {
    city: "Brahmapur",
    name: "Brahmapur Royal Showroom",
    address: "Urban Bank Road, Giri Market, Brahmapur, Odisha 760001",
    phone: "0680-2223450",
    timing: "10:30 AM - 8:30 PM",
    floors: "Southern Odisha's Largest 3-Storey Jewellery Destination",
    mapUrl: "https://maps.google.com/?q=Brahmapur+Odisha",
  },
  {
    city: "New Delhi",
    name: "Delhi South Ext / Lajpat Boutique",
    address: "Central Market, Lajpat Nagar-II, New Delhi 110024",
    phone: "011-41009822",
    timing: "11:00 AM - 8:30 PM",
    floors: "Exclusive Odisha Royal Heritage & Vivaha Collection in NCR",
    mapUrl: "https://maps.google.com/?q=Lajpat+Nagar+Delhi",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sanjeev Khatoi",
    location: "Bhubaneswar",
    verified: true,
    rating: 5,
    title: "Perfect Panchmukhi Hanuman Ji silver idol & unmatched purity",
    text: "I searched across Delhi and Odisha for a genuine 999 solid silver Panchmukhi Hanuman Ji for my car dashboard. Most places sell cheap silver-coated pieces with rough detailing. At Yashraj Jewellers Master Canteen showroom, I found an absolute masterpiece! The craftsmanship is divine.",
  },
  {
    name: "Aparna Rout",
    location: "Cuttack",
    verified: true,
    rating: 5,
    title: "Transparent billing & polite staff made bridal shopping effortless",
    text: "We bought my complete bridal wedding set from Yashraj Jewellers. What impressed my father most was their 100% transparent billing — every gram of gold, stone carat, and making charge was clearly itemized without any hidden percentages. Truly Odisha's most trusted jeweller!",
  },
  {
    name: "Aarthi Moorthy",
    location: "Bengaluru (Visited Odisha)",
    verified: true,
    rating: 5,
    title: "Heaven for genuine Cuttack Tarakasi silver filigree work",
    text: "If you want authentic Odisha silver filigree work as a precious memorabilia or bridal gift, Yashraj is the place. The karigars' intricate wire detailing is breathtaking. Their staff patiently showed us dozen designs without tiring.",
  },
  {
    name: "David Ngo",
    location: "International Buyer (Singapore)",
    verified: true,
    rating: 5,
    title: "World class solitaire diamond finish & swift certified shipping",
    text: "Purchased the 1.25 ct diamond solitaire ring via their live video consultation. The certificate arrived with IGI verification, securely packaged in tamper-proof seal. The brilliance is spectacular.",
  },
  {
    name: "Priyanka Mohapatra",
    location: "Bhubaneswar (Master Canteen)",
    verified: true,
    rating: 5,
    title: "Generational trust since my grandmother's wedding in 1974",
    text: "My grandmother bought her wedding jewellery from Yashraj, my mother did, and last month I selected my Vivaha bridal choker set here. The consistency of 22K 916 gold purity and the warmth of their Master Canteen staff is unmatched across Odisha.",
  },
  {
    name: "Rajesh & Sunita Agrawal",
    location: "Cuttack (CDA Sector 9)",
    verified: true,
    rating: 5,
    title: "Sone Pe Suhaga monthly scheme helped plan daughter's wedding",
    text: "We enrolled in the 11-month Sone Pe Suhaga gold savings scheme for our daughter's wedding trousseau. The 12th month bonus was completely credited by Yashraj, and we got 100% discount on making charges! Unbelievable savings and total peace of mind.",
  },
  {
    name: "Dr. Debabrata Mishra",
    location: "Rourkela (AIIMS Specialist)",
    verified: true,
    rating: 5,
    title: "Real-time bullion transparency and zero deduction on old gold exchange",
    text: "I brought in my family's 30-year-old gold bangles for exchange. They assayed each piece in front of me using digital karat spectrometers without melting or cutting. The valuation was 100% transparent with zero unfair deductions.",
  },
  {
    name: "Ananya Sen",
    location: "Kolkata (Park Street)",
    verified: true,
    rating: 5,
    title: "Exquisite diamond cocktail ring & IGI laser certification",
    text: "I ordered an 18KT diamond cocktail ring after an evening video-call with their gemologist. The diamond came with sealed IGI certificates and laser inscriptions visible under the loupe. The fire and clarity exceed top Mumbai high-street brands!",
  },
  {
    name: "Subrat & Meera Nayak",
    location: "Brahmapur (Giri Market)",
    verified: true,
    rating: 5,
    title: "Handcrafted Temple Jewellery set that stole the spotlight",
    text: "The master karigari on my Lakshmi Kasu Haram necklace was breathtaking. Every divine motif was sculpted with devotion and precision. Guests at our reception couldn't stop admiring the antique matte finish.",
  },
  {
    name: "Capt. Vikramjit Singh",
    location: "New Delhi (Lajpat Nagar)",
    verified: true,
    rating: 5,
    title: "Flawless insured delivery & luxury presentation packaging",
    text: "Ordered the 24K pure Lakshmi-Ganesh gold coin and silver puja set for Diwali. It arrived in Delhi in a tamper-proof armored courier box with silk-lined velvet cases. Exceptional pan-India service and utmost security.",
  },
];
