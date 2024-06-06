export const DECIMAL_MULTIPLIER = 10000;

export function pad(num){
    return num*DECIMAL_MULTIPLIER
}
export function unpad(num){
    return Math.floor(num/DECIMAL_MULTIPLIER)
}