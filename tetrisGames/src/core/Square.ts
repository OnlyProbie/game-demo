// 传统面向对象语言，书写类的属性时，通常会进行如下操作
// 1 对类的所有属性进行私有化
// 2 通过向外暴露的公共方法提供对属性的访问

import { Point, IViewer } from './types'

/**
 * 小方块
 * 处理自己的数据，知道什么时候显示
 */
export class Square {
  private _viewer?: IViewer // 显示者
  // private _point: Point 逻辑坐标
  // private _color: string 方块颜色
  constructor (private _point: Point, private _color: string) {
    this._point = _point
    this._color = _color
  }

  public get viewer () {
    return this._viewer
  }

  public set viewer (v) {
    this._viewer = v
    // 显示者有值直接调用
    if (v) {
      v.show()
    }
  }

  public get point () {
    return this._point
  }

  public set point (val: Point) {
    this._point = val
    // 如果有显示者，就展示
    if (this._viewer) {
      this._viewer.show()
    }
  }

  public get color () {
    return this._color
  }

}

