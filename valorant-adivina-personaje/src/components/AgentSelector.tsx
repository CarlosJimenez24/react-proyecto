import type { FC } from 'react';
import { useState } from 'react';
import type { Agent } from '../types/types';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: string;
  onSelectAgent: (agentName: string) => void;
  gameStatus: string;
}

const AgentSelector: FC<AgentSelectorProps> = ({ 
  agents, 
  selectedAgent, 
  onSelectAgent, 
  gameStatus 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(agent =>
    agent.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agent-selector">
      <h3>Selecciona el Agente</h3>
      
      <input
        type="text"
        placeholder="Buscar agente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        disabled={gameStatus !== 'playing'}
      />

      <div className="agents-grid">
        {filteredAgents.map(agent => (
          <button
            key={agent.uuid}
            onClick={() => onSelectAgent(agent.displayName)}
            disabled={gameStatus !== 'playing'}
            className={`agent-option ${
              selectedAgent === agent.displayName ? 'selected' : ''
            } ${gameStatus !== 'playing' && 
               selectedAgent === agent.displayName ? 
               (gameStatus === 'won' ? 'correct' : 'incorrect') : ''}`}
          >
            <img src={agent.displayIcon} alt={agent.displayName} />
            <span>{agent.displayName}</span>
          </button>
        ))}
      </div>

      {selectedAgent && gameStatus === 'playing' && (
        <div className="guess-feedback">
          ❌ Incorrecto. ¡Sigue intentando o usa más pistas!
        </div>
      )}
    </div>
  );
};

export default AgentSelector;