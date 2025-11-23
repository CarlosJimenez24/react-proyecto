import type { FC } from 'react';
import type { Agent } from '../types/types';

interface AgentCardProps {
  agent: Agent;
  revealed: boolean;
}

const AgentCard: FC<AgentCardProps> = ({ agent, revealed }) => {
  return (
    <div className={`agent-card ${revealed ? 'revealed' : 'hidden'}`}>
      {revealed ? (
        <>
          <div className="agent-portrait">
            <img src={agent.fullPortrait} alt={agent.displayName} />
          </div>
          <div className="agent-info">
            <h2>{agent.displayName}</h2>
            <p className="agent-role">Rol: {agent.role.displayName}</p>
            <p className="agent-description">{agent.description}</p>
            <div className="agent-abilities">
              <h4>Habilidades:</h4>
              {agent.abilities.map((ability, index) => (
                <div key={index} className="ability">
                  <img src={ability.displayIcon} alt={ability.displayName} />
                  <span>{ability.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="agent-hidden">
          <div className="silhouette">?</div>
          <p>¡Adivina el agente!</p>
        </div>
      )}
    </div>
  );
};

export default AgentCard;