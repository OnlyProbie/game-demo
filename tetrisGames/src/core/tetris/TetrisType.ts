import { SquareGroup } from "../square/SquareGroup";
import { Point, Shape } from "../types/types";
import { getRandom } from "../util/util";

// T 方块
export class T_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(T_Shape_Arr, _centerPoint, _color)
  }
}
// 反向 T 方块
export class T_Mirror_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(T_Mirror_Shape_Arr, _centerPoint, _color)
  }
}
// L 方块
export class L_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(L_Shape_Arr, _centerPoint, _color)
  }
}
// 反向 L 方块
export class L_Mirror_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(L_Mirror_Shape_Arr, _centerPoint, _color)
  }
}
// S 方块
export class S_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(S_Shape_Arr, _centerPoint, _color)
  }

  rotate () {
    super.rotate();
    this._isClockwise = !this._isClockwise
  }
}
// 反向 S 方块
export class S_Mirror_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(S_Mirror_Shape_Arr, _centerPoint, _color)
  }

  rotate () {
    super.rotate();
    this._isClockwise = !this._isClockwise
  }
}
// 田 方块
export class SQ_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(SQ_Shape_Arr, _centerPoint, _color)
  }

  rotateShape () {
    return this.shape
  }
}
// 直线 方块
export class Line_Shape extends SquareGroup {
  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(Line_Shape_Arr, _centerPoint, _color)
  }

  rotate () {
    super.rotate();
    this._isClockwise = !this._isClockwise
  }
}
// 可产生的方块形状种类坐标
const T_Shape_Arr: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}];
const T_Mirror_Shape_Arr: Shape = [{x: 0, y: -1}, {x: 0, y: 0}, {x: -1, y: -1}, {x: 1, y: -1}];
const L_Shape_Arr: Shape = [{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}];
const L_Mirror_Shape_Arr: Shape = [{x: 0, y: -1}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];
const S_Shape_Arr: Shape = [{x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}];
const S_Mirror_Shape_Arr: Shape = [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}, {x: 1, y: 0}];
const SQ_Shape_Arr: Shape = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}];
const Line_Shape_Arr: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];

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
export function createTetris (centerPoint: Point): SquareGroup {
  const shape = shapes[getRandom(0, shapes.length)]
  const color = colors[getRandom(0, colors.length)]
  return new shape(centerPoint, color)
}