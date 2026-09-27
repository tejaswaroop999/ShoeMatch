export const shoeColors = ["White", "Black", "Brown", "Grey", "Beige", "Blue", "Green", "Red", "Multicolor"] as const;
export type ShoeColor = (typeof shoeColors)[number];
export const outfitColors = ["Black", "White", "Grey", "Beige", "Brown", "Blue", "Green", "Red", "Other"] as const;
export type OutfitColor = (typeof outfitColors)[number];
export const shoeStyles = ["Sneakers", "Formal", "Loafers", "Boots", "Running", "Sandals", "Casual"] as const;
export type ShoeStyle = (typeof shoeStyles)[number];
export const occasions = ["Everyday", "Work", "Going Out"] as const;
export type Occasion = (typeof occasions)[number];

export type Shoe = {
    id: string;
    name: string;
    image: string;
    color: ShoeColor;
    style: ShoeStyle;
    occasions: Occasion[];
    createdAt: string;
};

export type MatchRequest = {
    outfitImage: string;
    outfitColor: OutfitColor;
    occasion: Occasion;
};

export type MatchResult = {
    bestMatch: Shoe;
    alternative?: Shoe;
    score: number;
    reason: string;
    matchedRules: string[];
};

export type MatchHistoryItem = {
    id: string;
    createdAt: string;
    outfitColor: OutfitColor;
    occasion: Occasion;
    bestShoeId: string;
    alternativeShoeId?: string;
    bestScore: number;
    feedback?: "good" | "not_for_me";
};

export type Feedback = {
    id: string;
    shoeId: string;
    rating: "good" | "not_for_me";
    occasion: Occasion;
    outfitColor: OutfitColor;
    timestamp: string;
};

export type UserFeedback = {
    id: string;
    message: string;
    createdAt: string;
};

export type RecommendationTrust = {
    id: string;
    matchId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    timestamp: string;
};

export type Product = {
    id: string;
    name: string;
    image: string;
    brand: string;
    color: string;
    style: string;
    price?: number;
    currency?: string;
    retailer: string;
    productUrl: string;
    affiliateUrl?: string;
};
