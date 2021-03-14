

/**
 * 产生随机数（不包含最大值）
 * @param min
 * @param max
 * @returns { number }
 */
export function getRandom (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}