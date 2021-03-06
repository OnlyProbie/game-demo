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
 * 通过逻辑坐标数组表示
 */
export type Shape = Point[]

/**
 * 移动方向
 */
export enum MoveDirection {
  left,
  right,
  down
}