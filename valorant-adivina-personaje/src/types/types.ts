export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  isPlayableCharacter?: boolean;
  background: string;
  role: {
    displayName: string;
  };
  abilities: Ability[];
}

export interface Ability {
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface GameState {
  currentAgent: Agent | null;
  cluesUsed: number;
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
  selectedAgent: string;
  availableAgents: Agent[];
}