/**
 * 
 * @param amount 
 * @param cost 
 * @param discount 
 * @returns 
 */
export function total(cost: number, amount: number = 1, discount: number = 0): number {
    const discountClamped = Math.min(Math.max(discount, 0), 1);
    return amount * cost * (1 - discountClamped);
}

/**
 * 
 * @param cost 
 * @param total 
 * @param amount 
 * @returns 
 */
export function discount(cost: number, total: number, amount: number = 1): number {
    return 1 - total / (amount * cost);
}