import type { Feedback, Shoe } from "./types";

export function getPersonalizationAdjustment(shoe: Shoe, feedback: Feedback[]): { adjustment: number; note?: string } {
    const relevant = feedback.filter((item) => item.shoeId === shoe.id).slice(-8);
    const rejections = relevant.filter((item) => item.rating === "not_for_me").length;
    const approvals = relevant.filter((item) => item.rating === "good").length;
    const adjustment = Math.max(-3, Math.min(1.5, approvals * 0.5 - rejections));
    if (adjustment < 0) return { adjustment, note: "adjusted down from recent feedback" };
    if (adjustment > 0) return { adjustment, note: "supported by recent feedback" };
    return { adjustment: 0 };
}