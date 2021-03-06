// 单一职能原则：每个类只做跟它相关的一件事
// 开闭原则：系统中的类，应该对扩展开放，对修改关闭


// 基于以上两个原则，系统中使用如下模式：
// 数据-界面分离模式
import $ from 'jquery'
import { TetrisRules } from './core/TetrisRules'
// import { SquareGroup } from './core/SquareGroup'
import { createTetris } from './core/TetrisType'
import { MoveDirection } from './core/types'
import { SquarePageViewer } from './core/viewer/SquarePageViewer'

const tetris = createTetris({x: 3, y: 2})

tetris.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})


// 继承显示接口
// class SquareConsoleIViewer implements IViewer {
//   constructor(private _square: Square) {
//     this._square = _square
//   }
//   show(): void {
//     console.log(this._square.point, this._square.color)
//   }
//   remove(): void {
//     console.log('remove')
//   }
// }

// const square = new Square({ x: 3, y: 4}, 'red')

// square.viewer = new SquarePageViewer(square, $('#root'))

// square.point = {
//   x: 4,
//   y: 4
// }

$('#down').click(() => {
  const targetPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y + 1
  }
  if (TetrisRules.canMove(tetris.shape, targetPoint)) {
    tetris.centerPoint = {
      x: tetris.centerPoint.x,
      y: tetris.centerPoint.y + 1
    }
  }

  console.log(tetris.centerPoint)
  console.log(tetris.squares)
})

$(document).keydown((event) => {
  // 上
  if (event.keyCode === 38) {
    tetris.rotateTransform(90)
    console.log(tetris.centerPoint)
    console.log(tetris.squares)
  }
  // 下
  if (event.keyCode === 40) {
    TetrisRules.moveDirectly(tetris, MoveDirection.down)
  }
  // 左
  if (event.keyCode === 37) {
    TetrisRules.move(tetris, MoveDirection.left)
  }
  // 右
  if (event.keyCode === 39) {
    TetrisRules.move(tetris, MoveDirection.right)
  }
})

