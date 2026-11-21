export interface Product {
  id: string;
  name: string;
  code: string;
  category: "bracelets" | "rings" | "earrings" | "chains";
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
  descriptionImage?: string;
  dimensions?: string;
  certification: string;
}

export const CATEGORIES = [
  { id: "all", label: "All Jewellery" },
  { id: "bracelets", label: "Bracelets" },
  { id: "rings", label: "Rings" },
  { id: "earrings", label: "Earrings" },
  { id: "chains", label: "Gold Chains" },
];

export const METALS = [
  { id: "all", label: "All Metals" },
  { id: "gold", label: "Gold (22KT / 24KT)" },
  { id: "diamond", label: "Certified Diamond" },
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

export const PRODUCTS: Product[] = [
  {
    id: "yj-1794720732241",
    name: "Handcrafted 22K Gold Royal Jhumka Earrings",
    code: "LJMG2514383",
    category: "earrings",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "women",
    occasion: "festive",
    price: 64345.73,
    originalPrice: 71500,
    grossWeight: 4.68,
    netGoldWeight: 4.68,
    makingCharges: 4800,
    gst: 1874,
    tag: "Trending",
    rating: 4.9,
    reviewsCount: 18,
    inStock: true,
    description:
      "Elegantly sculpted 22K 916 gold traditional Indian jhumka earrings featuring delicate floral stud tops, sculpted filigree bell domes, and dangling gold micro-beads. Certified with BIS 916 Hallmark.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    ],
    descriptionImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
    dimensions: "Length: 38mm • Width: 18mm",
    certification: "100% BIS 916 Hallmarked with Laser HUID",
  },
  {
    id: "yj-mayura-temple-jhumkas",
    name: "Mayura Temple Craft 22K Gold Jhumkas",
    code: "YJ-JHM-4402",
    category: "earrings",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "women",
    occasion: "festive",
    price: 94500,
    originalPrice: 102000,
    grossWeight: 12.4,
    netGoldWeight: 12.4,
    makingCharges: 8600,
    gst: 2750,
    tag: "Trending",
    rating: 4.8,
    reviewsCount: 51,
    inStock: true,
    description:
      "Graceful peacock motif crafted in traditional matte antique 22K gold, accented with delicate golden ghungroos and floral stud tops.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "BIS Hallmarked with Laser HUID",
  },
  {
    id: "yj-eternity-solitaire",
    name: "Eternity Solitaire Diamond Ring 1.25 Carat",
    code: "YJ-DIA-1094",
    category: "rings",
    metal: "diamond",
    purity: "18KT Gold & Diamond",
    gender: "women",
    occasion: "wedding",
    price: 198000,
    originalPrice: 225000,
    grossWeight: 4.8,
    netGoldWeight: 4.55,
    stoneWeight: "1.25 ct VVS-EF Solitaire + 0.35 ct accents",
    makingCharges: 14500,
    gst: 5770,
    tag: "Bestseller",
    rating: 5.0,
    reviewsCount: 68,
    inStock: true,
    description:
      "Exquisite central brilliant-cut solitaire encased in an 18K yellow gold band with micro-pavé diamonds along the shank. Accompanied by official IGI certificate.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "IGI & SGL Certified Diamond (Color E-F, Clarity VVS1)",
  },
  {
    id: "yj-aurora-diamond-ring",
    name: "Princess Cut 18K Diamond Solitaire Ring",
    code: "YJ-RNG-7740",
    category: "rings",
    metal: "diamond",
    purity: "18KT Gold & Diamond",
    gender: "women",
    occasion: "daily-wear",
    price: 135000,
    originalPrice: 152000,
    grossWeight: 3.9,
    netGoldWeight: 3.7,
    stoneWeight: "0.85 ct Princess Cut Diamond (VVS2)",
    makingCharges: 9800,
    gst: 3940,
    tag: "Trending",
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
    description:
      "Captivating princess cut solitaire diamond set on an ergonomic 18K solid yellow gold shank. Perfect for engagements and daily fine luxury.",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "100% IGI Certified Natural Diamond",
  },
  {
    id: "yj-royal-tennis-bracelet",
    name: "Royal Tennis Bracelet with 3.5 Ct Round Diamonds",
    code: "YJ-BRC-2810",
    category: "bracelets",
    metal: "diamond",
    purity: "18KT Gold & Diamond",
    gender: "women",
    occasion: "wedding",
    price: 285000,
    originalPrice: 320000,
    grossWeight: 14.2,
    netGoldWeight: 13.5,
    stoneWeight: "3.50 ct Total Diamond Weight (IGI Certified)",
    makingCharges: 18500,
    gst: 8300,
    tag: "Heritage Bridal",
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    description:
      "A seamless continuous circle of 52 scintillating round brilliant diamonds, securely prong-set in 18K yellow or white gold with a double safety clasp.",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "IGI Worldwide Diamond Grading Report",
  },
  {
    id: "yj-sankha-pola-kadas",
    name: "Classic Sankha Pola Style 22K Gold Kada Bracelet (Pair)",
    code: "YJ-BNG-3190",
    category: "bracelets",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "women",
    occasion: "daily-wear",
    price: 148000,
    originalPrice: 162000,
    grossWeight: 19.8,
    netGoldWeight: 19.8,
    makingCharges: 11500,
    gst: 4310,
    tag: "Trending",
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    description:
      "Timeless gold kada bracelets engineered with ergonomic inner curves for comfortable daily wear. Finished in lustrous dual-tone polish with screw hinge lock.",
    images: [
      "https://images.unsplash.com/photo-1611591475879-11536b135154?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "BIS 916 Hallmark Laser Engraved",
  },
  {
    id: "yj-mens-curb-chain",
    name: "Men's Imperial Solid Curb Chain 22K Gold 30g",
    code: "YJ-CHN-5509",
    category: "chains",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "men",
    occasion: "daily-wear",
    price: 228000,
    originalPrice: 245000,
    grossWeight: 30.0,
    netGoldWeight: 30.0,
    makingCharges: 14200,
    gst: 6640,
    tag: "Trending",
    rating: 4.8,
    reviewsCount: 47,
    inStock: true,
    description:
      "Substantial and masculine Cuban curb chain engineered from solid 22K yellow gold with precision bevelled links and lobster lock.",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "BIS 916 Hallmark Laser Engraved",
  },
  {
    id: "yj-classic-rope-gold-chain",
    name: "22K Solid Italian Rope Gold Chain 16g",
    code: "YJ-CHN-3321",
    category: "chains",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "unisex",
    occasion: "daily-wear",
    price: 122000,
    originalPrice: 132000,
    grossWeight: 16.0,
    netGoldWeight: 16.0,
    makingCharges: 7800,
    gst: 3560,
    tag: "Bestseller",
    rating: 4.9,
    reviewsCount: 63,
    inStock: true,
    description:
      "Timeless hand-woven Italian rope chain crafted in pure 22KT yellow gold. Smooth, flexible, and radiant for daily wear or pairing with pendants.",
    images: [
      "https://images.unsplash.com/photo-1611591475879-11536b135154?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "BIS 916 Hallmark Laser Engraved",
  },
  {
    id: "yj-pure-gold-lotus-pendant",
    name: "Pure 22K Gold Floral Pendant & Rope Chain",
    code: "YJ-PND-2041",
    category: "chains",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "women",
    occasion: "daily-wear",
    price: 49800,
    originalPrice: 54000,
    grossWeight: 6.4,
    netGoldWeight: 6.4,
    makingCharges: 4200,
    gst: 1450,
    tag: "New Arrival",
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    description:
      "Delicate blooming lotus blossom pendant in high-polish 22K gold suspended from an Italian rope chain. Perfect for everyday elegance.",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    ],
    certification: "BIS 916 Hallmarked with HUID",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(
    (p) => p.id.toLowerCase() === id.toLowerCase() || p.code.toLowerCase() === id.toLowerCase()
  );
}

export function matchesProductSearch(product: Product, query: string): boolean {
  if (!query || !query.trim()) return true;
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  return tokens.every((token) => {
    const inName = product.name?.toLowerCase().includes(token);
    const inCategory = product.category?.toLowerCase().includes(token);
    const inMetal = product.metal?.toLowerCase().includes(token);
    const inCode = product.code?.toLowerCase().includes(token);
    const inDesc = product.description?.toLowerCase().includes(token);
    const inTag = product.tag ? product.tag.toLowerCase().includes(token) : false;
    const inPurity = product.purity?.toLowerCase().includes(token);
    const inOccasion = product.occasion?.toLowerCase().includes(token);
    const inGender = product.gender?.toLowerCase().includes(token);

    // Common jewellery synonyms & plurals for Bracelets, Rings, Earrings & Chains
    const isBracelet =
      (token.includes("bracelet") || token.includes("kada") || token.includes("wrist") || token.includes("bangle")) &&
      (product.category === "bracelets" || inName);
    const isRing =
      (token.includes("ring") || token.includes("solitaire") || token.includes("band") || token.includes("anguthi")) &&
      (product.category === "rings" || inName);
    const isEarring =
      (token.includes("earring") || token.includes("jhumk") || token.includes("bali") || token.includes("stud")) &&
      (product.category === "earrings" || inName);
    const isChain =
      (token.includes("chain") || token.includes("sikri") || token.includes("curb") || token.includes("rope")) &&
      (product.category === "chains" || inName);
    const isGold =
      (token === "gold" || token === "22k" || token === "24k" || token === "916") &&
      (product.metal === "gold" || inPurity || inName || inDesc);
    const isDiamond =
      (token === "diamond" || token === "solitaire" || token === "18k" || token === "750") &&
      (product.metal === "diamond" || inName || inDesc);

    return (
      inName ||
      inCategory ||
      inMetal ||
      inCode ||
      inDesc ||
      inTag ||
      inPurity ||
      inOccasion ||
      inGender ||
      isBracelet ||
      isRing ||
      isEarring ||
      isChain ||
      isGold ||
      isDiamond
    );
  });
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
