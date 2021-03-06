import GameConfig from "../config/GameConfig";
import { Square } from "../square/Square";
import { SquareGroup } from "../square/SquareGroup";
import { MoveDirection, Point, Shape } from "../types/types";

function isPoint (target: any): target is Point {
  if(typeof target.x === 'undefined') {
    return false
  }
  return true
}

/**
 * 该类中提供一系列的函数，根据游戏规则判断各种情况
 */
export class TetrisRules {
  /**
   * 判断某个形状的方块，是否能够移动到目标位置
   */
  static canMove (shape: Shape, targetPoint: Point, existTetris: Square[]): boolean {
    // 假设，中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })
    // 边界判断
    let result = targetSquarePoints.some(p => {
      // 是否超出了边界
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1
    })
    if (result) return false

    // 判断是否与已有方块重叠
    result = targetSquarePoints.some(point => existTetris.some( sq => sq.point.x === point.x && sq.point.y === point.y))
    if (result) return false
    return true
  }

  /**
   * 移动
   */
  static move (tetris: SquareGroup, targetPoint: Point, existTetris: Square[]): boolean
  static move (tetris: SquareGroup, Direction: MoveDirection, existTetris: Square[]): boolean
  static move (tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection, existTetris: Square[]) {
    if (isPoint(targetPointOrDirection)) {
      if (this.canMove(tetris.shape, targetPointOrDirection, existTetris)) {
        tetris.centerPoint = targetPointOrDirection
        return true
      }
      return false
    } else {
      const direction = targetPointOrDirection
      let targetPoint
      if (direction === MoveDirection.down) {
        targetPoint = {
          x: tetris.centerPoint.x,
          y: tetris.centerPoint.y + 1
        }
      } else if (direction === MoveDirection.left) {
        targetPoint = {
          x: tetris.centerPoint.x - 1,
          y: tetris.centerPoint.y
        }
      } else {
        targetPoint = {
          x: tetris.centerPoint.x + 1,
          y: tetris.centerPoint.y
        }
      }
      return this.move(tetris, targetPoint, existTetris)
    }
  }
  /**
   * 将当前方块移动到目标方向的终点
   * @param tetris
   * @param direction
   */
  static moveDirectly (tetris: SquareGroup, direction: MoveDirection, existTetris: Square[]) {
    while (this.move(tetris, direction, existTetris)) {}
  }
  /**
   * 是否可以旋转
   * @param tetris
   */
  static isRotate (tetris: SquareGroup, existTetris: Square[]): boolean {
    const newShape = tetris.rotateShape() // 得到旋转之后新的坐标
    if (this.canMove(newShape, tetris.centerPoint, existTetris)) {
      tetris.rotate()
      return true
    }
    return false
  }

}

