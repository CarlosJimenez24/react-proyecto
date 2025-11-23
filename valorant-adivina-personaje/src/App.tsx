import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎯 Valorant Agent Guessing Game</h1>
        <p>¿Puedes adivinar el agente con la menor cantidad de pistas?</p>
      </header>
      <Game />
    </div>
  );
}

export default App;