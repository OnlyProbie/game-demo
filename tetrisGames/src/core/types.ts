/**
 * 逻辑坐标
 */
export interface Point {
  readonly x: number;
  readonly y: number;
}

/**
 * 展示和移除
 */
export interface IViewer {
  // 显示
  show (): void;
  // 移除
  remove (): void;
}

/**
 * 形状
 */
export type Shape = Point[]