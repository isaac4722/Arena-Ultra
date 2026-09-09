// Arena Ultra v3.0 - Type Definitions

export type Team = 'red' | 'blue' | 'purple';
export type AgentKind = 'human' | 'bot' | 'llm';
export type MatchStatus = 'pending' | 'active' | 'paused' | 'ended';
export type MatchMode = 'turn_based' | 'realtime_tick' | 'freeform';
export type AssetType = 'host' | 'service' | 'db' | 'user' | 'network';
export type AssetState = 'secure' | 'exposed' | 'compromised' | 'destroyed';
export type ActionResult = 'success' | 'partial' | 'failed' | 'blocked';
export type TurnState = 'awaiting' | 'resolving' | 'sleeping' | 'closed';

export interface Match {
  id: string;
  name: string;
  mode: MatchMode;
  status: MatchStatus;
  config: MatchConfig;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  winner?: Team;
  redEloDelta?: number;
  blueEloDelta?: number;
  maxTurns: number;
  tickSeconds: number;
  currentTurn: number;
}

export interface MatchConfig {
  fogOfWar: boolean;
  crownJewelId: string;
  winCondition: string;
}

export interface Agent {
  id: string;
  matchId: string;
  team: Team;
  kind: AgentKind;
  name: string;
  elo: number;
  status: 'active' | 'idle' | 'disconnected';
  wins: number;
  losses: number;
}

export interface WorldAsset {
  id: string;
  matchId: string;
  type: AssetType;
  name: string;
  ownerTeam: Team;
  hp: number;
  maxHp: number;
  state: AssetState;
  metadata: Record<string, unknown>;
  connections: string[];
}

export interface Vulnerability {
  id: string;
  assetId: string;
  cveOrPattern: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  discoveredBy?: string;
  patched: boolean;
  mitreTechniqueId: string;
}

export interface Action {
  id: string;
  matchId: string;
  seq: number;
  agentId: string;
  team: Team;
  timestamp: string;
  kind: string;
  message: string;
  mitreId?: string;
  payload: Record<string, unknown>;
  result: ActionResult;
  damage: number;
  worldDiff?: WorldDiff;
  valid: boolean;
  invalidReason?: string;
}

export interface WorldDiff {
  type: string;
  assetId: string;
  changes: Record<string, unknown>;
}

export interface Turn {
  id: string;
  matchId: string;
  number: number;
  activeTeam: Team;
  state: TurnState;
  startedAt: string;
  deadlineAt?: string;
  closedAt?: string;
}

export interface Score {
  team: Team;
  tacticalPoints: number;
  objectivesDone: number;
  assetsHeld: number;
  detections: number;
  breaches: number;
}

export interface GameEvent {
  id: string;
  matchId: string;
  seq: number;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  userAgent: string;
  timestamp: string;
}

export interface LeaderboardEntry {
  agentId: string;
  name: string;
  team: Team;
  kind: AgentKind;
  elo: number;
  wins: number;
  losses: number;
  winRate: number;
}
