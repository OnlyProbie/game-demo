// 单一职能原则：每个类只做跟它相关的一件事
// 开闭原则：系统中的类，应该对扩展开放，对修改关闭


// 基于以上两个原则，系统中使用如下模式：
// 数据-界面分离模式

import { Square } from './core/Square'
import { IViewer } from './core/types'

// 继承显示接口
class SquareConsoleIViewer implements IViewer {
  constructor(private _square: Square) {
    this._square = _square
  }
  show(): void {
    console.log(this._square.point, this._square.color)
  }
  remove(): void {
    console.log('remove')
  }
}

const square = new Square({ x: 3, y: 4}, 'red')

square.viewer = new SquareConsoleIViewer(square)

square.viewer.show()
square.point = {
  x: 4,
  y: 4
}
