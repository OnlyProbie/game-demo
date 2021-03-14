// 单一职能原则：每个类只做跟它相关的一件事
// 开闭原则：系统中的类，应该对扩展开放，对修改关闭

// 基于以上两个原则，系统中使用如下模式：
// 数据-界面分离模式
import $ from 'jquery'
import { Game } from './core/game/Game'
import { TetrisRules } from './core/tetris/TetrisRules'
// import { SquareGroup } from './core/SquareGroup'
import { createTetris } from './core/tetris/TetrisType'
import { MoveDirection } from './core/types/types'
import { GamePageViewer } from './core/viewer/GamePageViewer'
import { SquarePageViewer } from './core/viewer/SquarePageViewer'

// 创建一个以某个坐标为中心点随机方块
// const tetris = createTetris({x: 3, y: 2})

// 使形状展示在界面上
// tetris.squares.forEach(sq => {
//   sq.viewer = new SquarePageViewer(sq, $('#root'))
// })

var g = new Game(new GamePageViewer())

g.start()


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

// 操作
// $(document).keydown((event) => {
//   // 上
//   if (event.keyCode === 38) {
//     // const newTet = tetris.rotate()
//     TetrisRules.isRotate(tetris)
//     // console.log(tetris.shape)
//     // console.log(newTet)
//   }
//   // 下
//   if (event.keyCode === 40) {
//     TetrisRules.move(tetris, MoveDirection.down)
//   }
//   // 左
//   if (event.keyCode === 37) {
//     TetrisRules.move(tetris, MoveDirection.left)
//   }
//   // 右
//   if (event.keyCode === 39) {
//     TetrisRules.move(tetris, MoveDirection.right)
//   }
// })


$('#btn_start').click( () => {
  g.start()
})
$('#btn_pause').click( () => {
  g.pause()
})
$('#btn_left').click( () => {
  g.control_left()
})
$('#btn_right').click( () => {
  g.control_right()
})
$('#btn_down').click( () => {
  g.control_down()
})
$('#btn_rotate').click( () => {
  g.control_rotate()
})

