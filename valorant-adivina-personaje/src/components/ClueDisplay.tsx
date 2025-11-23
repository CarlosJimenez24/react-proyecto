import React from 'react';

interface ClueDisplayProps {
  clue: string | null;
  cluesUsed: number;
  onUseClue: () => void;
  gameStatus: string;
}

const ClueDisplay: React.FC<ClueDisplayProps> = ({ 
  clue, 
  cluesUsed, 
  onUseClue, 
  gameStatus 
}) => {
  return (
    <div className="clue-display">
      <h3>Pistas Disponibles</h3>
      <div className="clue-content">
        {cluesUsed === 0 ? (
          <p>¡Haz clic en "Obtener Pista" para comenzar!</p>
        ) : (
          <div className="clue-text">
            <strong>Pista {cluesUsed}:</strong> {clue}
          </div>
        )}
      </div>
      
      {gameStatus === 'playing' && (
        <button 
          onClick={onUseClue}
          disabled={!clue || cluesUsed >= 5}
          className="clue-btn"
        >
          {cluesUsed === 0 ? 'Obtener Primera Pista' : 'Obtener Siguiente Pista'} 
          ({cluesUsed}/5 usadas)
        </button>
      )}

      <div className="points-info">
        <small>
          Puntos máximos: 100 - (pistas usadas × 20)
        </small>
      </div>
    </div>
  );
};

export default ClueDisplay;