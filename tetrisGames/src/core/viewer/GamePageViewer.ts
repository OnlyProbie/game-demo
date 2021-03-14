import { SquareGroup } from "../square/SquareGroup";
import { GameViewer } from "../types/types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

// 游戏方块显示和移除
export class GamePageViewer implements GameViewer {
  showNextTetris(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $('#next'))
    })
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer!.remove()
      sq.viewer = new SquarePageViewer(sq, $('#panel'))
    })
  }

}