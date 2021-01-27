import { ChessType } from '../../types/enums'
import { ChessComp } from '../ChessComp/ChessComp'
import './BoardComp.css'

interface IProps {
  chesses: ChessType[],
  isGameOver?: boolean,
  onClick?: (index: number) => void
}

const BoardComp: React.FC<IProps> = function (props: IProps) {
  const isGameOver = props.isGameOver!
  console.log('123123')
  const ChessList = props.chesses.map((type, i) =>
    <ChessComp type={type} key={i}
      onClick={() => {
        if (props.onClick && !isGameOver) {
          props.onClick(i)
        }
      }}
    />
  )

  console.log(ChessList)

  return (
    <div className="board">
      { ChessList }
    </div>
  )
}

BoardComp.defaultProps = {
  isGameOver: false
}

export { BoardComp }