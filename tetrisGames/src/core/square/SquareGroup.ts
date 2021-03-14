import { Square } from "./Square";
import { Point, Shape } from "../types/types";
import GameConfig from '../config/GameConfig';


/**
 * 小方块组合类
 */
export class SquareGroup {
  private _squares: Square[]
  protected _isClockwise: boolean = GameConfig.isClockwise || true // 方块形状旋转方向是否是顺时针

  constructor (
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    // 设置小方块数组
    // 设置中心小方块，其他方块相对中心小方块定位
    // 所以只需要定位到中心方块的位置，其他小方块位置也就确定了
    const arr: Square[] = []
    this._shape.forEach( p => {
      const sq = new Square({x: this._centerPoint.x + p.x, y: this._centerPoint.y + p.y}, this._color)
      arr.push(sq)
    })
    this._squares = arr
  }

  public get squares () {
    return this._squares
  }

  public get shape () {
    return this._shape
  }

  public get centerPoint (): Point {
    return this._centerPoint
  }

  // 控制所有方块时，只需要控制中心小方块就可以
  // 其他小方块依据中心方块进行变化
  public set centerPoint (val: Point) {
    this._centerPoint = val
    this.setSquarePoints()
  }
  // 根据中心点的变更，更新其他小方块对象的坐标
  private setSquarePoints () {
    this._shape.forEach( (p, i) => {
      this._squares[i].point = {x: this._centerPoint.x + p.x, y: this._centerPoint.y + p.y}
    })
  }

  /**
   * 形状围绕中心点旋转变换
   */
  public rotateShape (): Shape {
    return this._shape.map(point => {
      const newPoint: Point = {
        x: this._isClockwise ? -point.y : point.y,
        y: this._isClockwise ? point.x : -point.x
      }
      return newPoint
    })
    // return this._shape
  }

  public rotate () {
    const newShape = this.rotateShape()
    this._shape = newShape
    this.setSquarePoints()
  }

}




