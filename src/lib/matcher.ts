import { getPersonalizationAdjustment } from "./personalization";
import type { Feedback, MatchRequest, MatchResult, Occasion, OutfitColor, Shoe } from "./types";

const neutralColors = new Set(["White", "Black", "Grey", "Beige", "Brown"]);
const strongPairs: Record<string, string[]> = {
    Black: ["White", "Grey", "Beige", "Brown", "Red"],
    White: ["Black", "Blue", "Brown", "Green", "Red"],
    Grey: ["White", "Black", "Blue", "Red"],
    Beige: ["Brown", "White", "Black", "Blue", "Green"],
    Brown: ["White", "Beige", "Blue", "Green"],
    Blue: ["White", "Brown", "Beige", "Grey"],
    Green: ["White", "Brown", "Beige", "Black"],
    Red: ["Black", "White", "Grey", "Brown"],
    Other: ["White", "Black", "Grey", "Beige", "Brown"],
};

function styleScore(style: Shoe["style"], occasion: Occasion): number {
    if (occasion === "Everyday" && ["Sneakers", "Casual", "Running"].includes(style)) return 2;
    if (occasion === "Work" && ["Formal", "Loafers", "Sneakers"].includes(style)) return 2;
    if (occasion === "Going Out" && ["Loafers", "Boots", "Formal", "Sneakers"].includes(style)) return 2;
    return 0;
}

function colorScore(shoeColor: Shoe["color"], outfitColor: OutfitColor): number {
    if (strongPairs[outfitColor]?.includes(shoeColor)) return 3;
    if (neutralColors.has(shoeColor)) return 1;
    return 0;
}

function scoreShoe(shoe: Shoe, request: MatchRequest): { score: number; rules: string[] } {
    const rules: string[] = [];
    let score = 0;
    if (shoe.occasions.includes(request.occasion)) { score += 5; rules.push(`works for ${request.occasion.toLowerCase()}`); }
    if (neutralColors.has(shoe.color)) { score += 2; rules.push(`${shoe.color.toLowerCase()} is easy to style`); }
    const colorPoints = colorScore(shoe.color, request.outfitColor);
    if (colorPoints === 3) { score += 3; rules.push(`${shoe.color.toLowerCase()} complements ${request.outfitColor.toLowerCase()}`); }
    else if (colorPoints === 1) { score += 1; rules.push(`${shoe.color.toLowerCase()} keeps the palette balanced`); }
    const occasionPoints = styleScore(shoe.style, request.occasion);
    if (occasionPoints) { score += occasionPoints; rules.push(`${shoe.style.toLowerCase()} suits the occasion`); }
    if (neutralColors.has(shoe.color) && ["Sneakers", "Loafers", "Formal", "Boots"].includes(shoe.style)) { score += 1; rules.push("versatile enough to rewear"); }
    return { score, rules };
}

export function matchShoes(shoes: Shoe[], request: MatchRequest, feedback: Feedback[] = []): MatchResult | null {
    if (!shoes.length) return null;
    const ranked = shoes.map((shoe) => {
        const base = scoreShoe(shoe, request);
        const personal = getPersonalizationAdjustment(shoe, feedback);
        return { shoe, score: base.score + personal.adjustment, rules: personal.note ? [...base.rules, personal.note] : base.rules };
    }).sort((a, b) => b.score - a.score || a.shoe.createdAt.localeCompare(b.shoe.createdAt));
    const winner = ranked[0];
    const reason = winner.rules.length > 1
        ? `${winner.shoe.name} is a strong match because it ${winner.rules.slice(0, -1).join(", ")} and ${winner.rules.at(-1)}.`
        : `${winner.shoe.name} is your best available match for this outfit.`;
    return { bestMatch: winner.shoe, alternative: ranked[1]?.shoe, score: winner.score, reason, matchedRules: winner.rules };
}
