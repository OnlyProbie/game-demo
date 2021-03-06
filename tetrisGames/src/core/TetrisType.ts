import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";
// 可产生的方块形状种类
export const T_Shape: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}];
export const T_Mirror_Shape: Shape = [{x: 0, y: -1}, {x: 0, y: 0}, {x: -1, y: -1}, {x: 1, y: -1}];
export const L_Shape: Shape = [{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}];
export const L_Mirror_Shape: Shape = [{x: 0, y: -1}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];
export const S_Shape: Shape = [{x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}];
export const S_Mirror_Shape: Shape = [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}, {x: 1, y: 0}];
export const SQ_Shape: Shape = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}];
export const Line_Shape: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];

export const shapes = [
  T_Shape,
  T_Mirror_Shape,
  L_Shape,
  L_Mirror_Shape,
  S_Shape,
  S_Mirror_Shape,
  SQ_Shape,
  Line_Shape
]

// 方块颜色
export const colors = [
  'red', '#f40', 'blue', 'yellow', 'white'
]

/**
 * 随记产生一个俄罗斯方块（颜色随机，形状随机）
 * @param centerPoint
 */
export function createTetris (centerPoint: Point) {
  const shape = shapes[getRandom(0, shapes.length)]
  const color = colors[getRandom(0, colors.length)]
  return new SquareGroup(shape, centerPoint, color)
}