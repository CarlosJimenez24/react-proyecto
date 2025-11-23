import React from 'react';

interface ClueDisplayProps {
  clue: string | null;
  cluesUsed: number;
  onUseClue: () => void;
  gameStatus: string;
  incorrectGuesses: number;
}

const ClueDisplay: React.FC<ClueDisplayProps> = ({ 
  clue, 
  cluesUsed, 
  onUseClue, 
  gameStatus,
  incorrectGuesses
}) => {
  // 👇 Calculamos pistas adicionales (excluyendo la primera gratuita)
  const additionalClues = Math.max(0, cluesUsed - 1);

  return (
    <div className="clue-display">
      <h3>Pistas Disponibles</h3>
      
      {/* 👇 Mensaje especial para la primera pista */}
      {cluesUsed === 1 && (
        <div className="free-clue-banner">
          🎁 <strong>Pista inicial gratuita</strong> - ¡No afecta tu puntuación!
        </div>
      )}
      
      <div className="clue-content">
        <div className="clue-text">
          <strong>Pista {cluesUsed}:</strong> {clue}
        </div>
      </div>
      
      {gameStatus === 'playing' && (
        <button 
          onClick={onUseClue}
          disabled={cluesUsed >= 5} // 👈 Máximo 5 pistas en total
          className="clue-btn"
        >
          {cluesUsed === 1 ? 'Obtener Segunda Pista' : `Obtener Pista ${cluesUsed + 1}`} 
          ({cluesUsed}/5 total)
        </button>
      )}

      <div className="points-info">
        <small>
          💡 <strong>Sistema de puntos:</strong>
        </small>
        <br />
        <small>
          • Puntos base: 100 puntos
        </small>
        <br />
        <small>
          • Pista inicial: <strong>GRATUITA</strong> (0 penalización)
        </small>
        <br />
        <small>
          • Pistas adicionales: -20 puntos cada una
        </small>
        <br />
        <small>
          • Fallos: -10 puntos cada uno
        </small>
        <br />
        <small>
          • Puntuación mínima: 0 puntos
        </small>
        {additionalClues > 0 && (
          <>
            <br />
            <small className="current-penalty">
              • Penalización actual: -{additionalClues * 20} puntos (por {additionalClues} pista(s) adicional(es))
            </small>
          </>
        )}
        {incorrectGuesses > 0 && (
          <>
            <br />
            <small className="current-fails">
              • Fallos actuales: {incorrectGuesses} (-{incorrectGuesses * 10} puntos)
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default ClueDisplay;