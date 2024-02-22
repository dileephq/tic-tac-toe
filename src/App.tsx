import './App.css'
import { useState } from 'react'

type GameStepProps = {
  message: string
}
function GameStep({ message }: GameStepProps) {
  const handleClick = () => {
    console.log('clicked')
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
  title: string
  snapshot: (string | undefined)[]
}

// snapshot
const initialSteps: InitialSteps[] = [
  {
    title: 'Go to Game start',
    snapshot: Array.from({ length: 9 }, () => undefined),
  },
]

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
      console.log('Current player has won')
      return true
    }
  }

  return false
}

function App() {
  const [steps, setSteps] = useState([initialSteps[0].title])

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')

  const [playerSelections, setPlayerSelections] = useState<
    (string | undefined)[]
  >(initialSteps[0].snapshot)

  const [isWon, setIsWon] = useState(false)

  const onPlayerMove = (index: number) => {
    const tempArray = playerSelections.map((s, i) =>
      i === index ? currentPlayer : s,
    )
    setPlayerSelections(tempArray)

    const step = `Go to step #${steps.length}`
    setSteps((steps) => [...steps, step])

    initialSteps.push({
      title: step,
      snapshot: tempArray,
    })

    if (checkWinner(tempArray, currentPlayer)) {
      setIsWon(true)
      return
    } else {
      console.log('No winner yet.')
    }

    setCurrentPlayer((c) => (c === 'X' ? 'O' : 'X'))
  }

  return (
    <div className="game ">
      <div>
        <h1 className="status">
          {isWon
            ? `${currentPlayer} has won!`
            : `Next player: ${currentPlayer}`}
        </h1>
        <div>
          <Square
            onPlayerMove={() => onPlayerMove(0)}
            message={playerSelections[0]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(1)}
            message={playerSelections[1]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(2)}
            message={playerSelections[2]}
          />
        </div>
        <div>
          <Square
            onPlayerMove={() => onPlayerMove(3)}
            message={playerSelections[3]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(4)}
            message={playerSelections[4]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(5)}
            message={playerSelections[5]}
          />
        </div>
        <div>
          <Square
            onPlayerMove={() => onPlayerMove(6)}
            message={playerSelections[6]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(7)}
            message={playerSelections[7]}
          />
          <Square
            onPlayerMove={() => onPlayerMove(8)}
            message={playerSelections[8]}
          />
        </div>
      </div>
      <div className="game-info">
        <ol style={{ listStyle: 'auto' }}>
          {steps.map((step, index) => (
            <GameStep key={index} message={step} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default App
