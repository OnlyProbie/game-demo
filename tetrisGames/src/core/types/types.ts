import { SquareGroup } from "../square/SquareGroup";

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

/**
 * 游戏状态
 */
export enum GameStatus {
  init, // 未开始
  playing, // 进行中
  pause, // 暂停
  over // 游戏结束
}

/**
 * 游戏显示
 */
export interface GameViewer {
  /**
   * @param  {SquareGroup} tetris 下一个方块对象
   * @returns void
   */
  showNextTetris (tetris: SquareGroup): void;
  switch (tetris: SquareGroup): void;
}