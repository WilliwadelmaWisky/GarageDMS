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

/**
 * 
 * @param total 
 * @param amount 
 * @param discount 
 * @returns 
 */
export function cost(total: number, amount: number = 1, discount: number = 0) {
    const discountClamped = Math.min(Math.max(discount, 0), 1);
    return total / (amount * 1 - discountClamped);
}

/**
 * 
 * @param cost 
 * @param decimal
 * @returns 
 */
export function discard(cost: number, decimal: number = 2): number {
    const precisionFactor = Math.pow(10, decimal);
    return Math.round(cost * precisionFactor) * 1 / precisionFactor;
}