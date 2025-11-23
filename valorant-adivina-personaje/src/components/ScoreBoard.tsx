import React from 'react';

interface ScoreBoardProps {
  score: number;
  cluesUsed: number;
  gameStatus: string;
  incorrectGuesses: number; // 👈 Nueva prop
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  score, 
  cluesUsed, 
  gameStatus, 
  incorrectGuesses // 👈 Nueva prop
}) => {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="label">Puntuación:</span>
        <span className="value">{score} pts</span>
      </div>
      <div className="score-item">
        <span className="label">Pistas usadas:</span>
        <span className="value">{cluesUsed}</span>
      </div>
      <div className="score-item">
        <span className="label">Fallos:</span>
        <span className="value incorrect">{incorrectGuesses}</span> {/* 👈 Nuevo item */}
      </div>
      <div className="score-item">
        <span className="label">Estado:</span>
        <span className={`status ${gameStatus}`}>
          {gameStatus === 'playing' ? 'Jugando' : 
           gameStatus === 'won' ? '¡Ganado!' : 'Perdido'}
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;