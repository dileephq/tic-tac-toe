import './App.css'

function App() {
  return (
    <div className="game ">
      <div>
        <h1 className="status">Next player: X</h1>
        <div>
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
        <div>
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
        <div>
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
      </div>
      <div className="game-info">
        <ol style={{ listStyle: 'auto' }}>
          <li className="game-step">Go to Game start</li>
          <li className="game-step">Go to move #1</li>
          <li className="game-step">Go to move #2</li>
          <li className="game-step">Go to move #3</li>
          <li className="game-step">Go to move #3</li>
          <li className="game-step">Go to move #3</li>
          <li className="game-step">Go to move #3</li>
          <li className="game-step">Go to move #3</li>
          <li className="game-step">Go to move #3</li>
        </ol>
      </div>
    </div>
  )
}

export default App
