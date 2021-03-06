import { Square } from "./Square";
import { Point, Shape } from "./types";


/**
 * 小方块组合类
 */
export class SquareGroup {
  private _squares: Square[]

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
    // 根据中心点的变更，更新其他小方块对象的坐标
    this._shape.forEach( (p, i) => {
      this._squares[i].point = {x: this._centerPoint.x + p.x, y: this._centerPoint.y + p.y}
    })
  }

  /**
   * 形状围绕中心点旋转变换
   */
  public rotateTransform (deg: number) {
    this._shape.forEach((sq, i) => {
      this._squares[i].point = {
        x: Math.floor(sq.x * Math.cos(deg) - sq.y * Math.sin(deg)),
        y: Math.floor(sq.x * Math.sin(deg) + sq.y * Math.cos(deg))
      }
    })
  }
}




