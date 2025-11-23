import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { Agent, GameState } from '../types/types';
import AgentCard from './AgentCard';
import ClueDisplay from './ClueDisplay';
import ScoreBoard from './ScoreBoard';
import AgentSelector from './AgentSelector';

const Game: FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentAgent: null,
    cluesUsed: 0,
    score: 0,
    gameStatus: 'playing',
    selectedAgent: '',
    availableAgents: []
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
      cluesUsed: 0,
      gameStatus: 'playing',
      selectedAgent: '',
      availableAgents: agents
    }));
  };

  const getNextClue = () => {
    if (!gameState.currentAgent) return null;

    const clues = [
      `Rol: ${gameState.currentAgent.role.displayName}`,
      `Habilidad 1: ${gameState.currentAgent.abilities[0]?.displayName || 'Desconocida'}`,
      `Habilidad 2: ${gameState.currentAgent.abilities[1]?.displayName || 'Desconocida'}`,
      `Descripción: ${gameState.currentAgent.description.substring(0, 100)}...`,
      `Habilidad definitiva: ${gameState.currentAgent.abilities[3]?.displayName || 'Desconocida'}`
    ];

    return clues[gameState.cluesUsed] || 'No hay más pistas disponibles';
  };

  const useClue = () => {
    setGameState(prev => ({
      ...prev,
      cluesUsed: prev.cluesUsed + 1
    }));
  };

  const handleGuess = (agentName: string) => {
    if (!gameState.currentAgent) return;

    if (agentName === gameState.currentAgent.displayName) {
      const points = Math.max(100 - (gameState.cluesUsed * 20), 10);
      setGameState(prev => ({
        ...prev,
        gameStatus: 'won',
        score: prev.score + points,
        selectedAgent: agentName
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedAgent: agentName
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
      />

      {gameState.currentAgent && (
        <>
          <ClueDisplay 
            clue={currentClue}
            cluesUsed={gameState.cluesUsed}
            onUseClue={useClue}
            gameStatus={gameState.gameStatus}
          />

          <AgentSelector
            agents={allAgents}
            selectedAgent={gameState.selectedAgent}
            onSelectAgent={handleGuess}
            gameStatus={gameState.gameStatus}
          />

          {gameState.gameStatus !== 'playing' && (
            <AgentCard 
              agent={gameState.currentAgent}
              revealed={true}
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