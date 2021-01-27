// 枚举约束 棋子类型
export enum ChessType {
  none,
  red,
  black
}
// 下一个棋子类型
export enum NextChess {
  red = ChessType.red,
  black = ChessType.black
}
// 游戏状态
export enum GameStatus {
  gaming,
  redWin,
  blackWin,
  equal
}