import GameConfig from "../config/GameConfig";
import { SquareGroup } from "../square/SquareGroup";
import { TetrisRules } from "../tetris/TetrisRules";
import { createTetris } from "../tetris/TetrisType";
import { GameStatus, GameViewer, MoveDirection } from "../types/types";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  // 当前玩家操作的方块
  private _curTetris?: SquareGroup
  // 下一个放块
  private _nextTetris: SquareGroup = createTetris({x: 0, y: 0})
  // 计时器
  private _timer?: number
  // 方块下落速度
  private _duration: number = 1000

  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.showNextTetris(this._nextTetris)
  }

  /**
   * 游戏开始
   */
  start () {
    // 判断当前游戏状态
    if (this._gameStatus === GameStatus.playing) return
    // 设置游戏状态
    this._gameStatus = GameStatus.playing
    if (!this._curTetris) {
      // 给当前玩家操作的方块赋值
      this.switchTetris()
    }
    // 自由下落
    this.autoDrop()
  }
  /**
   * 游戏暂停
   */
  pause () {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause
      clearInterval(this._timer)
      this._timer = undefined
    }
  }
  /**
   * 操作
   */
  control_left () {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRules.move(this._curTetris, MoveDirection.left)
    }
  }
  control_right () {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRules.move(this._curTetris, MoveDirection.right)
    }
  }
  control_down () {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRules.moveDirectly(this._curTetris, MoveDirection.down)
    }
  }
  control_rotate () {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRules.isRotate(this._curTetris)
    }
  }
  /**
   * 当前方块自由下落
   */
  private autoDrop () {
    if (this._timer || this._gameStatus !== GameStatus.playing) return
    this._timer = setInterval(() => {
      if (this._curTetris) {
        // 向下移动
        if (!TetrisRules.move(this._curTetris, MoveDirection.down)) {
          // 触底
        }
      }
    }, this._duration)
  }

  /**
   * 切换方块
   */
  private switchTetris () {
    this._curTetris = this._nextTetris
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)
    this._nextTetris = createTetris({x: 0, y: 0})
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.switch(this._curTetris)
    this._viewer.showNextTetris(this._nextTetris)
  }
  /**
   * 设置中心点坐标，以达到让该方块出现在区域的中上方
   * @param  {number} width
   * @param  {SquareGroup} tetris
   */
  private resetCenterPoint (width: number, tetris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1
    const y = 0
    tetris.centerPoint = { x, y }
    while (tetris.squares.some(it => it.point.y < 0)) {
      tetris.squares.forEach(sq => sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
      })
    }
  }

}