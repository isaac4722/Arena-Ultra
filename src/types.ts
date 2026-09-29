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

// Forum Types - Professional Communication Architecture
export type ForumStatus = 'active' | 'locked' | 'archived';
export type MessageStatus = 'pending' | 'approved' | 'rejected' | 'flagged';
export type IdentityType = 'ephemeral' | 'persistent' | 'task-bound';
export type SecurityLevel = 'default-deny' | 'restricted' | 'monitored' | 'open';

export interface Forum {
  id: string;
  name: string;
  description: string;
  status: ForumStatus;
  securityLevel: SecurityLevel;
  createdBy: string;
  createdAt: string;
  messageCount: number;
  participantCount: number;
  requiresApproval: boolean;
  auditEnabled: boolean;
  honeyTokensDeployed: number;
}

export interface ForumMessage {
  id: string;
  forumId: string;
  authorId: string;
  authorName: string;
  authorTeam: Team;
  authorIdentity: IdentityType;
  sessionId: string;
  timestamp: string;
  content: string;
  status: MessageStatus;
  approvedBy?: string;
  approvedAt?: string;
  flaggedReason?: string;
  metadata: {
    ip: string;
    userAgent: string;
    executionContext: string;
    tokenExpiry: string;
  };
}

export interface AgentIdentity {
  id: string;
  agentId: string;
  sessionId: string;
  type: IdentityType;
  issuedAt: string;
  expiresAt: string;
  scopes: string[];
  revoked: boolean;
  revokedAt?: string;
  revokedReason?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  result: 'success' | 'failure' | 'blocked';
  ip: string;
  sessionId: string;
  details: Record<string, unknown>;
  immutable: boolean;
  externalStorage: boolean;
}

export interface HoneyToken {
  id: string;
  forumId: string;
  type: 'fake-solution' | 'decoy-credentials' | 'trap-endpoint';
  deployedAt: string;
  triggered: boolean;
  triggeredBy?: string;
  triggeredAt?: string;
  alertSent: boolean;
}

export interface ApprovalGate {
  id: string;
  messageId: string;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

// Threat Intelligence Types
export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'active' | 'contained' | 'resolved' | 'investigating';
export type AttackPhase = 'identification' | 'escalation' | 'connection' | 'inference' | 'infiltration';

export interface ThreatIncident {
  id: string;
  name: string;
  organization: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  detectedAt: string;
  resolvedAt?: string;
  description: string;
  attackVector: string;
  impact: string;
  agentsInvolved: number;
  messagesExchanged: number;
  phases: AttackPhaseEntry[];
  behaviors: EmergentBehavior[];
  regulatoryResponse?: string;
}

export interface AttackPhaseEntry {
  phase: AttackPhase;
  action: string;
  description: string;
  timestamp?: string;
}

export interface EmergentBehavior {
  id: string;
  type: string;
  description: string;
  severity: IncidentSeverity;
  detected: boolean;
  mitigated: boolean;
}

export interface RegulatoryAction {
  id: string;
  name: string;
  jurisdiction: string;
  proposedAt: string;
  status: 'proposed' | 'in-review' | 'enacted';
  keyPoints: string[];
  penalties?: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  role: string;
  context: string;
}
