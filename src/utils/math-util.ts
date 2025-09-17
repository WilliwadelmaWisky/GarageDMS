
/**
 * 
 * @param value 
 * @param min 
 * @param max 
 * @returns 
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * 
 * @param a 
 * @param b 
 * @param atol 
 * @returns 
 */
export function isclose(a: number, b: number, atol: number = 1e-6): boolean {
   return Math.abs(a - b) <= atol;
}
