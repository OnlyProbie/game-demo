import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { MoveDirection, Point, Shape } from "./types";

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
  static canMove (shape: Shape, targetPoint: Point): boolean {
    // 假设，中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })
    // 边界判断
    const result = targetSquarePoints.some(p => {
      // 是否超出了边界
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1
    })
    if (result) {
      return false
    }
    return true
  }

  /**
   * 移动
   */
  static move (tetris: SquareGroup, targetPoint: Point): boolean
  static move (tetris: SquareGroup, Direction: MoveDirection): boolean
  static move (tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection) {
    if (isPoint(targetPointOrDirection)) {
      if (this.canMove(tetris.shape, targetPointOrDirection)) {
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
      return this.move(tetris, targetPoint)
    }
  }
  /**
   * 将当前方块移动到目标方向的终点
   * @param tetris
   * @param direction
   */
  static moveDirectly (tetris: SquareGroup, direction: MoveDirection) {
    while (this.move(tetris, direction)) {}
  }

}

