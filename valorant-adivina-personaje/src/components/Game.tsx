import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { Agent, GameState } from '../types/types';
import AgentCard from './AgentCard';
import ClueDisplay from './ClueDisplay';
import ScoreBoard from './ScoreBoard';
import AgentSelector from './AgentSelector';

const Game: FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentAgent: null,
    cluesUsed: 1, // 👈 Empieza en 1 (primera pista gratuita)
    score: 0,
    gameStatus: 'playing',
    selectedAgent: '',
    availableAgents: [],
    incorrectGuesses: 0
  });

  const [allAgents, setAllAgents] = useState<Agent[]>([]);

  // Fetch agents from Valorant API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const playableAgents = data.data.filter((agent: Agent) => 
          agent.isPlayableCharacter && agent.fullPortrait
        );
        setAllAgents(playableAgents);
        selectRandomAgent(playableAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const selectRandomAgent = (agents: Agent[]) => {
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    setGameState(prev => ({
      ...prev,
      currentAgent: randomAgent,
      cluesUsed: 1, // 👈 Siempre empieza con 1 pista
      gameStatus: 'playing',
      selectedAgent: '',
      availableAgents: agents,
      incorrectGuesses: 0
    }));
  };

  const getNextClue = () => {
    if (!gameState.currentAgent) return null;

    const clues = [
      `Rol: ${gameState.currentAgent.role.displayName}`, // 👈 Pista 1 (gratuita)
      `Habilidad 1: ${gameState.currentAgent.abilities[0]?.displayName || 'Desconocida'}`, // Pista 2
      `Habilidad 2: ${gameState.currentAgent.abilities[1]?.displayName || 'Desconocida'}`, // Pista 3
      `Descripción: ${gameState.currentAgent.description.substring(0, 100)}...`, // Pista 4
      `Habilidad definitiva: ${gameState.currentAgent.abilities[3]?.displayName || 'Desconocida'}` // Pista 5
    ];

    // 👇 Aseguramos que siempre haya al menos una pista disponible
    return clues[gameState.cluesUsed - 1] || clues[clues.length - 1];
  };

  const useClue = () => {
    // 👇 No permitir más de 5 pistas en total
    if (gameState.cluesUsed >= 5) return;
    
    setGameState(prev => ({
      ...prev,
      cluesUsed: prev.cluesUsed + 1
    }));
  };

  const handleGuess = (agentName: string) => {
    if (!gameState.currentAgent || gameState.gameStatus !== 'playing') return;

    if (agentName === gameState.currentAgent.displayName) {
      // 👇 Cálculo de puntos - la primera pista NO penaliza
      const basePoints = Math.max(100 - (Math.max(0, gameState.cluesUsed - 1) * 20), 10);
      const penalty = gameState.incorrectGuesses * 10;
      const finalPoints = Math.max(basePoints - penalty, 0);
      
      setGameState(prev => ({
        ...prev,
        gameStatus: 'won',
        score: prev.score + finalPoints,
        selectedAgent: agentName
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedAgent: agentName,
        incorrectGuesses: prev.incorrectGuesses + 1,
        score: Math.max(prev.score - 10, 0)
      }));
    }
  };

  const nextRound = () => {
    selectRandomAgent(allAgents);
  };

  const currentClue = getNextClue();

  return (
    <div className="game-container">
      <ScoreBoard 
        score={gameState.score}
        cluesUsed={gameState.cluesUsed}
        gameStatus={gameState.gameStatus}
        incorrectGuesses={gameState.incorrectGuesses}
      />

      {gameState.currentAgent && (
        <>
          <ClueDisplay 
            clue={currentClue}
            cluesUsed={gameState.cluesUsed}
            onUseClue={useClue}
            gameStatus={gameState.gameStatus}
            incorrectGuesses={gameState.incorrectGuesses}
          />

          <AgentSelector
            agents={allAgents}
            selectedAgent={gameState.selectedAgent}
            onSelectAgent={handleGuess}
            gameStatus={gameState.gameStatus}
            incorrectGuesses={gameState.incorrectGuesses}
          />

          {gameState.gameStatus !== 'playing' && (
            <AgentCard 
              agent={gameState.currentAgent}
              revealed={true}
              pointsEarned={
                gameState.gameStatus === 'won' 
                  ? Math.max(
                      100 - (Math.max(0, gameState.cluesUsed - 1) * 20) - (gameState.incorrectGuesses * 10), 
                      0
                    )
                  : 0
              }
            />
          )}

          {gameState.gameStatus !== 'playing' && (
            <div className="next-round-container">
              <button onClick={nextRound} className="next-round-btn">
                Siguiente Agente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game;