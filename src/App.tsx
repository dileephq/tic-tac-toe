import './App.css'
import { useState } from 'react'

type GameStepProps = {
  message: string
  onStepClicked: (message: string) => void
}
function GameStep({ message, onStepClicked }: GameStepProps) {
  const handleClick = () => {
    onStepClicked(message)
  }
  return (
    <li onClick={handleClick} className="game-step">
      {message}
    </li>
  )
}

type SquareProps = {
  message: string
  onPlayerMove: () => void
}
function Square({ message, onPlayerMove }: SquareProps) {
  const handleClick = () => {
    onPlayerMove()
  }
  return (
    <div
      onClick={handleClick}
      className="square flex items-center justify-center"
    >
      <h2>{message}</h2>
    </div>
  )
}

type Snapshot = {
  step: number
  currentPlayer: 'X' | 'O'
  title: string
  snapshot: string[]
  gameStage: GameStage
}

const snapshots: Snapshot[] = [
  {
    step: 0,
    currentPlayer: 'X',
    title: 'Go to Game start',
    snapshot: Array.from({ length: 9 }, () => ''),
    gameStage: 'inPlay',
  },
]

type GameStage = 'won' | 'drawn' | 'inPlay'

function App() {
  const [steps, setSteps] = useState([snapshots[0].title])

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    snapshots[0].currentPlayer,
  )

  const [board, setBoard] = useState<string[]>(snapshots[0].snapshot)

  const [gameStage, setGameStage] = useState<GameStage>(snapshots[0].gameStage)

  const onStepClicked = (message: string) => {
    const stepSnapshot = snapshots.find(
      (step) => step.title === message,
    ) as Snapshot

    if (
      stepSnapshot.step === snapshots[0].step ||
      stepSnapshot.step === snapshots[9].step
    ) {
      setCurrentPlayer(stepSnapshot.currentPlayer)
    } else {
      setCurrentPlayer(stepSnapshot.currentPlayer === 'X' ? 'O' : 'X')
    }
    setBoard(stepSnapshot.snapshot)

    // const indexOfStep = steps.indexOf(stepSnapshot.title)
    // setSteps((steps) => steps.slice(0, indexOfStep + 1))
    // snapshots = snapshots.slice(0, indexOfStep + 1)
    // slice snapshots
    setGameStage(stepSnapshot.gameStage)
  }

  // const reset = () => {
  //   setSteps([snapshots[0].title])
  //   setCurrentPlayer(snapshots[0].currentPlayer)
  //   setBoard(snapshots[0].snapshot)
  //   setGameStage(snapshots[0].gameStage)
  // }

  const onPlayerMove = (index: number) => {
    if (['won', 'drawn'].includes(gameStage) || board[index] !== '') {
      return
    }
    const tempBoard = board.map((s, i) => (i === index ? currentPlayer : s))
    setBoard(tempBoard)

    const step = `Go to step #${steps.length}`
    setSteps((steps) => [...steps, step])

    const gameState: GameStage = checkWinner(tempBoard, currentPlayer)
      ? 'won'
      : !tempBoard.includes('')
        ? 'drawn'
        : 'inPlay'

    snapshots.push({
      step: steps.length,
      currentPlayer: currentPlayer,
      title: step,
      snapshot: tempBoard,
      gameStage: gameState,
    })

    if (gameState === 'drawn') {
      setGameStage('drawn')
      return
    } else if (gameState === 'won') {
      setGameStage('won')
      return
    } else {
      setGameStage('inPlay')
    }

    setCurrentPlayer((c) => (c === 'X' ? 'O' : 'X'))
  }

  const welcomeMessage =
    gameStage === 'drawn'
      ? `Drawn`
      : gameStage === 'won'
        ? `${currentPlayer} won!!!!`
        : `Next player: ${currentPlayer}`

  const messageBackground =
    gameStage === 'drawn' ? 'green' : gameStage === 'won' ? 'yellow' : ''

  return (
    <div className="game ">
      <div>
        <h1 className="status" style={{ backgroundColor: messageBackground }}>
          {welcomeMessage}
        </h1>
        <div>
          <Square onPlayerMove={() => onPlayerMove(0)} message={board[0]} />
          <Square onPlayerMove={() => onPlayerMove(1)} message={board[1]} />
          <Square onPlayerMove={() => onPlayerMove(2)} message={board[2]} />
        </div>
        <div>
          <Square onPlayerMove={() => onPlayerMove(3)} message={board[3]} />
          <Square onPlayerMove={() => onPlayerMove(4)} message={board[4]} />
          <Square onPlayerMove={() => onPlayerMove(5)} message={board[5]} />
        </div>
        <div>
          <Square onPlayerMove={() => onPlayerMove(6)} message={board[6]} />
          <Square onPlayerMove={() => onPlayerMove(7)} message={board[7]} />
          <Square onPlayerMove={() => onPlayerMove(8)} message={board[8]} />
        </div>
      </div>
      <div className="game-info">
        <ol style={{ listStyle: 'auto' }}>
          {steps.map((step, index) => (
            <GameStep
              onStepClicked={onStepClicked}
              key={index}
              message={step}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

function checkWinner(board: (string | undefined)[], currentPlayer: 'X' | 'O') {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const condition of winningConditions) {
    if (
      board[condition[0]] === currentPlayer &&
      board[condition[1]] === currentPlayer &&
      board[condition[2]] === currentPlayer
    ) {
      return true
    }
  }

  return false
}

export default App
