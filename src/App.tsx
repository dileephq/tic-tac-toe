import './App.css'
import { useState } from 'react'
import { value } from 'happy-dom/lib/PropertySymbol.d.ts.js'

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
  message?: string
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

type InitialSteps = {
  currentPlayer: 'X' | 'O'
  title: string
  snapshot: (string | undefined)[]
}

// snapshot
const initialSteps: InitialSteps[] = [
  {
    currentPlayer: 'X',
    title: 'Go to Game start',
    snapshot: Array.from({ length: 9 }, () => undefined),
  },
]

type GameStage = 'won' | 'drawn' | 'inPlay'

function App() {
  const [steps, setSteps] = useState([initialSteps[0].title])

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    initialSteps[0].currentPlayer,
  )

  const [board, setBoard] = useState<(string | undefined)[]>(
    initialSteps[0].snapshot,
  )

  const [isWon, setIsWon] = useState(false)

  const onStepClicked = (message: string) => {
    const step = initialSteps.find(
      (step) => step.title === message,
    ) as InitialSteps

    if (step.title === initialSteps[0].title) {
      reset()
      return
    }
    setBoard(step.snapshot)
    setCurrentPlayer(step.currentPlayer === 'X' ? 'O' : 'X')
    const indexOfStep = steps.indexOf(step.title)
    setSteps((steps) => steps.slice(0, indexOfStep + 1))
  }

  const reset = () => {
    setSteps([initialSteps[0].title])
    setCurrentPlayer(initialSteps[0].currentPlayer)
    setBoard(initialSteps[0].snapshot)
    setIsWon(false)
  }

  const onPlayerMove = (index: number) => {
    // if board filled  > final, drawn

    if (isWon || board[index] !== undefined) {
      return
    }
    const tempBoard = board.map((s, i) => (i === index ? currentPlayer : s))
    setBoard(tempBoard)

    if (!tempBoard.includes(undefined)) {
    }

    const step = `Go to step #${steps.length}`
    setSteps((steps) => [...steps, step])

    initialSteps.push({
      currentPlayer: currentPlayer,
      title: step,
      snapshot: tempBoard,
    })

    if (checkWinner(tempBoard, currentPlayer)) {
      setIsWon(true)
      return
    }

    setCurrentPlayer((c) => (c === 'X' ? 'O' : 'X'))
  }

  return (
    <div className="game ">
      <div>
        <h1
          className="status"
          style={{ backgroundColor: isWon ? 'yellow' : '' }}
        >
          {isWon
            ? `${currentPlayer} has won!`
            : `Next player: ${currentPlayer}`}
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
