import './App.css'

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
  message: string
}
function Square({ message }: SquareProps) {
  const handleClick = () => {
    console.log('clicked')
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

function App() {
  return (
    <div className="game ">
      <div>
        <h1 className="status">Next player: X</h1>
        <div>
          <Square message="X" />
          <Square message="O" />
          <Square message="X" />
        </div>
        <div>
          <Square message="X" />
          <Square message="O" />
          <Square message="X" />
        </div>
        <div>
          <Square message="X" />
          <Square message="O" />
          <Square message="X" />
        </div>
      </div>
      <div className="game-info">
        <ol style={{ listStyle: 'auto' }}>
          <GameStep message="Go to Game start" />
          <GameStep message="Go to Step #1" />
          <GameStep message="Go to Step #2" />
          <GameStep message="Go to Step #3" />
        </ol>
      </div>
    </div>
  )
}

export default App
