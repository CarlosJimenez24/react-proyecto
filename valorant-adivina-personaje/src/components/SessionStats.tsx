import type { FC } from 'react';
import type { GameState, GameSession } from '../types/types';

interface SessionStatsProps {
  gameState: GameState;
  ranking: GameSession[];
  onNewGame: () => void;
  onViewRanking: () => void;
}

const SessionStats: FC<SessionStatsProps> = ({ 
  gameState, 
  ranking, 
  onNewGame, 
  onViewRanking 
}) => {
  const currentSession = ranking[0]; // La sesión actual es la primera
  const playerRank = ranking.findIndex(session => session.id === currentSession?.id) + 1;
  const isTopScore = playerRank <= 3;
  const correctGuesses = gameState.currentRound;
  const accuracy = (correctGuesses / gameState.totalRounds) * 100;

  const calculateStars = (score: number) => {
    if (score >= 400) return 5;
    if (score >= 300) return 4;
    if (score >= 200) return 3;
    if (score >= 100) return 2;
    return 1;
  };

  const stars = calculateStars(gameState.sessionScore);

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-danger fw-bold mb-3">🎉 Partida Completada</h1>
            <div className="badge bg-danger fs-6">Sesión Finalizada</div>
          </div>

          {/* Main Stats Card */}
          <div className="card bg-dark border-danger shadow-lg mb-4">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <div className="text-warning display-4 fw-bold mb-2">
                  {gameState.sessionScore}
                </div>
                <div className="text-light fs-5">PUNTUACIÓN TOTAL</div>
              </div>

              {/* Stars */}
              <div className="mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`fs-1 ${i < stars ? 'text-warning' : 'text-secondary'}`}>
                    {i < stars ? '⭐' : '☆'}
                  </span>
                ))}
              </div>

              {/* Rank */}
              <div className="mb-3">
                <span className="badge bg-warning text-dark fs-6">
                  Posición #{playerRank} en Ranking
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card bg-dark border-info h-100">
                <div className="card-body text-center">
                  <div className="text-info fs-2">🎯</div>
                  <div className="text-light fs-3 fw-bold">{accuracy.toFixed(0)}%</div>
                  <div className="text-muted">Precisión</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-dark border-success h-100">
                <div className="card-body text-center">
                  <div className="text-success fs-2">🕵️</div>
                  <div className="text-light fs-3 fw-bold">{correctGuesses}/{gameState.totalRounds}</div>
                  <div className="text-muted">Agentes Adivinados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Score Celebration */}
          {isTopScore && (
            <div className="alert alert-warning text-center border-0 shadow mb-4">
              <div className="fs-4">🏆 ¡NUEVO RÉCORD EN EL TOP {playerRank}! 🏆</div>
            </div>
          )}

          {/* Progress */}
          <div className="card bg-dark border-light mb-4">
            <div className="card-body">
              <h5 className="text-light text-center mb-3">Progreso de la Partida</h5>
              <div className="progress mb-2" style={{height: '20px'}}>
                <div 
                  className="progress-bar bg-danger" 
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>0%</span>
                <span>{accuracy.toFixed(0)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="row g-3 mb-5">
            <div className="col-md-6">
              <button onClick={onNewGame} className="btn btn-danger btn-lg w-100 fw-bold py-3">
                🎮 Nueva Partida
              </button>
            </div>
            <div className="col-md-6">
              <button onClick={onViewRanking} className="btn btn-outline-light btn-lg w-100 py-3">
                🏆 Ver Ranking
              </button>
            </div>
          </div>

          {/* Top 3 Preview */}
          <div className="card bg-dark border-warning">
            <div className="card-header bg-warning text-dark text-center">
              <h5 className="mb-0 fw-bold">TOP 3 ACTUAL</h5>
            </div>
            <div className="card-body">
              {ranking.slice(0, 3).map((session, index) => (
                <div key={session.id} className={`d-flex justify-content-between align-items-center p-3 rounded ${index === 0 ? 'bg-warning bg-opacity-10' : ''}`}>
                  <div className="d-flex align-items-center">
                    <span className={`badge ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary' : 'bg-danger'} fs-6 me-3`}>
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-light fw-bold">{session.totalScore} pts</div>
                      <small className="text-muted">{session.correctGuesses}/{session.rounds} agentes</small>
                    </div>
                  </div>
                  <small className="text-muted">{session.date}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;