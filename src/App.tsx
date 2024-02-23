import './App.css'
import { useState } from 'react'

type GameStepProps = {
  step: number
  onStepClicked: (step: number) => void
  currentStep: number
}
function GameStep({ step, onStepClicked, currentStep }: GameStepProps) {
  const handleClick = () => {
    onStepClicked(step)
  }
  return (
    <li
      onClick={handleClick}
      className="game-step"
      style={{ border: currentStep === step ? '2px dashed navy' : '' }}
    >
      {currentStep === step
        ? `You are at step #${step}`
        : step === 0
          ? 'Go to Game start'
          : `Go to step #${step}`}
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

type Player = 'X' | 'O'

type Snapshot = {
  step: number
  currentPlayer?: Player
  snapshot: string[]
  gameStage: GameStage
}

let snapshots: Snapshot[] = [
  {
    step: 0,
    snapshot: Array.from({ length: 9 }, () => ''),
    gameStage: 'inPlay',
  },
]

type GameStage = 'won' | 'drawn' | 'inPlay'

function App() {
  const [steps, setSteps] = useState([snapshots[0].step])
  const [currentStep, setCurrentStep] = useState(snapshots[0].step)

  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')

  const [board, setBoard] = useState<string[]>(snapshots[0].snapshot)

  const [gameStage, setGameStage] = useState<GameStage>(snapshots[0].gameStage)

  const onStepClicked = (step: number) => {
    // if (step === currentStep) {
    //   return
    // }
    setCurrentStep(step)
    const selectedSnapshot = snapshots.find(
      (snapshot) => snapshot.step === step,
    ) as Snapshot

    if (['won', 'drawn'].includes(selectedSnapshot.gameStage)) {
      setCurrentPlayer(selectedSnapshot.currentPlayer as Player)
    } else {
      if (selectedSnapshot.step === snapshots[0].step) {
        setCurrentPlayer('X')
      } else {
        setCurrentPlayer(selectedSnapshot.currentPlayer === 'X' ? 'O' : 'X')
      }
    }
    setBoard(selectedSnapshot.snapshot)
    setGameStage(selectedSnapshot.gameStage)
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

    const step = steps.length

    const gameState: GameStage = checkWinner(tempBoard, currentPlayer)
      ? 'won'
      : !tempBoard.includes('')
        ? 'drawn'
        : 'inPlay'

    if (currentStep < steps.length - 1) {
      // const selectedSnapshot = snapshots.find(
      //   (snapshot) => snapshot.step === currentStep,
      // ) as Snapshot
      // const indexOfStep = steps.indexOf(selectedSnapshot.step)
      const newSteps = steps.slice(0, currentStep + 2)
      setSteps(newSteps)
      snapshots = snapshots.slice(0, currentStep + 1)
      snapshots.push({
        step: currentStep + 1,
        currentPlayer: currentPlayer,
        snapshot: tempBoard,
        gameStage: gameState,
      })
      // setCurrentStep((step) => step + 1)
      setCurrentStep(currentStep + 1)
    } else {
      setSteps((steps) => [...steps, step])
      snapshots.push({
        step: step,
        currentPlayer: currentPlayer,
        snapshot: tempBoard,
        gameStage: gameState,
      })
      setCurrentStep(step)
    }

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
              currentStep={currentStep}
              onStepClicked={onStepClicked}
              key={index}
              step={step}
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
