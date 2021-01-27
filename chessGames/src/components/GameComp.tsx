import React from "react";
import { ChessType, GameStatus } from "../types/enums";
import { BoardComp } from "./BoardComp/BoardComp";
import { GameStatusComp } from "./GameStatusComp/GameStatusComp";

interface IState {
  chesses: ChessType[],
  gameStatus: GameStatus,
  nextChess: ChessType.red | ChessType.black
}

export class GameComp extends React.Component<{}, IState> {
  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }

  // 生命周期中执行初始化操作
  componentDidMount () {
    this.init()
  }

  /**
   * 初始化棋盘数据
   */
  init () {
    const arr: ChessType[] = []
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none)
    }
    // 初始化时需要将所有的数据都初始化
    this.setState({
      chesses: arr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }

  /**
   * 处理棋子的点击事件
   * 如果该函数运行说明：
   * 1. 游戏没有结束
   * 2. 点击的位置没有棋子
   * @param index
   */
  handleChessClick (index: number) {
    // this.state.chesses[index] = this.state.nextChess
    const chesses: ChessType[] = [...this.state.chesses]
    chesses[index] = this.state.nextChess
    this.setState(prevState => ({
      chesses,
      nextChess: prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameStatus: this.getStatus(chesses, index)
    }))
  }
  // 获取游戏状态
  // TODO 待优化的点：目前是写死的支持三格的棋盘，可考虑添加棋盘棋子个数配置
  getStatus (chesses: ChessType[], index: number): GameStatus {
    // 1、判断是否有一方已经获得胜利
    // 横向最小数计算
    const horMin = Math.floor(index / 3) * 3
    // 纵向最小数计算
    const verMin = index % 3
    if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2]) || // 横向
      (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6]) || // 纵向
      (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none) || (chesses[2] === chesses[4] && chesses[2] === chesses[6] && // 对角线
      chesses[2] !== ChessType.none) // 防止都为null 导致游戏结束
    ) {
      if (chesses[index] === ChessType.red) {
        return GameStatus.redWin
      } else {
        return GameStatus.blackWin
      }
    }
    // 2、判断是否平局
    // 看下棋盘中是否还包含空的棋子类型，如果没有则棋盘已经下完，平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal
    }
    // 3、游戏正在进行
    return GameStatus.gaming
  }

  render () {
    return (
      <div style={{textAlign:'center'}}>
        <GameStatusComp status={this.state.gameStatus} next={this.state.nextChess}/>
        <BoardComp
          chesses={this.state.chesses}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          onClick={this.handleChessClick.bind(this)}
        />
        <button onClick={() => {
          this.init()
        }}>重新开始</button>
      </div>
    )
  }
}


