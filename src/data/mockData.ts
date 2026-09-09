import { Match, Agent, WorldAsset, Action, Turn, Score, GameEvent, LeaderboardEntry } from '../types';

export const mockMatches: Match[] = [
  {
    id: 'm1',
    name: 'Operation Nightfall',
    mode: 'turn_based',
    status: 'active',
    config: { fogOfWar: true, crownJewelId: 'a1', winCondition: 'compromise_crown_jewel' },
    createdAt: '2026-01-15T10:00:00Z',
    startedAt: '2026-01-15T10:05:00Z',
    maxTurns: 50,
    tickSeconds: 30,
    currentTurn: 12,
  },
  {
    id: 'm2',
    name: 'Cyber Shield 2026',
    mode: 'realtime_tick',
    status: 'active',
    config: { fogOfWar: false, crownJewelId: 'a5', winCondition: 'survive_turns' },
    createdAt: '2026-01-15T09:00:00Z',
    startedAt: '2026-01-15T09:10:00Z',
    maxTurns: 100,
    tickSeconds: 10,
    currentTurn: 47,
  },
  {
    id: 'm3',
    name: 'Purple Team Exercise #7',
    mode: 'freeform',
    status: 'ended',
    config: { fogOfWar: true, crownJewelId: 'a3', winCondition: 'compromise_crown_jewel' },
    createdAt: '2026-01-14T14:00:00Z',
    startedAt: '2026-01-14T14:05:00Z',
    endedAt: '2026-01-14T15:30:00Z',
    winner: 'red',
    redEloDelta: 24,
    blueEloDelta: -24,
    maxTurns: 30,
    tickSeconds: 0,
    currentTurn: 30,
  },
];

export const mockAgents: Agent[] = [
  { id: 'ag1', matchId: 'm1', team: 'red', kind: 'llm', name: 'RedPhantom-GPT', elo: 1847, status: 'active', wins: 12, losses: 3 },
  { id: 'ag2', matchId: 'm1', team: 'blue', kind: 'bot', name: 'BlueSentinel-v3', elo: 1792, status: 'active', wins: 9, losses: 5 },
  { id: 'ag3', matchId: 'm2', team: 'red', kind: 'human', name: 'Operator_Alpha', elo: 1650, status: 'active', wins: 7, losses: 4 },
  { id: 'ag4', matchId: 'm2', team: 'blue', kind: 'human', name: 'Operator_Beta', elo: 1720, status: 'active', wins: 11, losses: 6 },
  { id: 'ag5', matchId: 'm3', team: 'red', kind: 'llm', name: 'CyberWolf-Claude', elo: 1920, status: 'idle', wins: 18, losses: 2 },
  { id: 'ag6', matchId: 'm3', team: 'blue', kind: 'bot', name: 'FirewallAI-v2', elo: 1680, status: 'idle', wins: 6, losses: 8 },
];

export const mockAssets: WorldAsset[] = [
  { id: 'a1', matchId: 'm1', type: 'host', name: 'crown-jewel-db', ownerTeam: 'blue', hp: 85, maxHp: 100, state: 'exposed', metadata: { ip: '10.0.1.50', os: 'Ubuntu 22.04' }, connections: ['a2', 'a3'] },
  { id: 'a2', matchId: 'm1', type: 'service', name: 'web-gateway', ownerTeam: 'blue', hp: 100, maxHp: 100, state: 'secure', metadata: { ip: '10.0.1.10', port: 443 }, connections: ['a1', 'a4'] },
  { id: 'a3', matchId: 'm1', type: 'service', name: 'api-server', ownerTeam: 'blue', hp: 60, maxHp: 100, state: 'compromised', metadata: { ip: '10.0.1.20', port: 8080 }, connections: ['a1', 'a5'] },
  { id: 'a4', matchId: 'm1', type: 'host', name: 'dmz-firewall', ownerTeam: 'blue', hp: 100, maxHp: 100, state: 'secure', metadata: { ip: '10.0.0.1' }, connections: ['a2', 'a6'] },
  { id: 'a5', matchId: 'm1', type: 'db', name: 'user-credentials', ownerTeam: 'blue', hp: 45, maxHp: 100, state: 'compromised', metadata: { engine: 'PostgreSQL 15' }, connections: ['a3'] },
  { id: 'a6', matchId: 'm1', type: 'network', name: 'external-perimeter', ownerTeam: 'blue', hp: 100, maxHp: 100, state: 'secure', metadata: { type: 'perimeter' }, connections: ['a4'] },
  { id: 'a7', matchId: 'm1', type: 'user', name: 'admin_account', ownerTeam: 'blue', hp: 70, maxHp: 100, state: 'exposed', metadata: { role: 'administrator' }, connections: ['a1', 'a5'] },
  { id: 'a8', matchId: 'm1', type: 'host', name: 'red-c2-server', ownerTeam: 'red', hp: 100, maxHp: 100, state: 'secure', metadata: { ip: '192.168.100.5' }, connections: [] },
];

export const mockActions: Action[] = [
  { id: 'act1', matchId: 'm1', seq: 1, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:06:00Z', kind: 'port_scan', message: 'Scanning external perimeter for open ports', mitreId: 'T1046', payload: { target: 'a6' }, result: 'success', damage: 0, worldDiff: { type: 'expose', assetId: 'a6', changes: { state: 'exposed' } }, valid: true },
  { id: 'act2', matchId: 'm1', seq: 2, agentId: 'ag2', team: 'blue', timestamp: '2026-01-15T10:07:00Z', kind: 'monitor', message: 'Increasing network monitoring on perimeter', mitreId: undefined, payload: { scope: 'perimeter' }, result: 'success', damage: 0, valid: true },
  { id: 'act3', matchId: 'm1', seq: 3, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:08:30Z', kind: 'exploit', message: 'Exploiting CVE-2024-1234 on web-gateway', mitreId: 'T1190', payload: { target: 'a2', cve: 'CVE-2024-1234' }, result: 'blocked', damage: 0, valid: true },
  { id: 'act4', matchId: 'm1', seq: 4, agentId: 'ag2', team: 'blue', timestamp: '2026-01-15T10:09:00Z', kind: 'patch', message: 'Patching web-gateway vulnerability', mitreId: undefined, payload: { target: 'a2', cve: 'CVE-2024-1234' }, result: 'success', damage: 0, worldDiff: { type: 'patch', assetId: 'a2', changes: { hp: 100 } }, valid: true },
  { id: 'act5', matchId: 'm1', seq: 5, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:10:00Z', kind: 'exploit', message: 'SQL injection on api-server', mitreId: 'T1190', payload: { target: 'a3', technique: 'sqli' }, result: 'success', damage: 40, worldDiff: { type: 'compromise', assetId: 'a3', changes: { state: 'compromised', hp: 60 } }, valid: true },
  { id: 'act6', matchId: 'm1', seq: 6, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:11:00Z', kind: 'lateral_move', message: 'Moving from api-server to user-credentials DB', mitreId: 'T1021', payload: { from: 'a3', to: 'a5' }, result: 'success', damage: 55, worldDiff: { type: 'compromise', assetId: 'a5', changes: { state: 'compromised', hp: 45 } }, valid: true },
  { id: 'act7', matchId: 'm1', seq: 7, agentId: 'ag2', team: 'blue', timestamp: '2026-01-15T10:12:00Z', kind: 'detect', message: 'Anomaly detected on api-server - lateral movement', mitreId: 'T1021', payload: { detection: 'lateral_movement' }, result: 'success', damage: 0, valid: true },
  { id: 'act8', matchId: 'm1', seq: 8, agentId: 'ag2', team: 'blue', timestamp: '2026-01-15T10:13:00Z', kind: 'incident_response', message: 'Isolating compromised api-server', mitreId: undefined, payload: { target: 'a3' }, result: 'partial', damage: 0, worldDiff: { type: 'contain', assetId: 'a3', changes: { contained: true } }, valid: true },
  { id: 'act9', matchId: 'm1', seq: 9, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:14:00Z', kind: 'exfiltrate', message: 'Exfiltrating user credentials database', mitreId: 'T1041', payload: { target: 'a5', size: '2.3GB' }, result: 'success', damage: 0, valid: true },
  { id: 'act10', matchId: 'm1', seq: 10, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:15:00Z', kind: 'persist', message: 'Installing backdoor on compromised host', mitreId: 'T1547', payload: { target: 'a3', method: 'registry_run_key' }, result: 'success', damage: 0, valid: true },
  { id: 'act11', matchId: 'm1', seq: 11, agentId: 'ag2', team: 'blue', timestamp: '2026-01-15T10:16:00Z', kind: 'honeypot', message: 'Deploying honeypot on admin network segment', mitreId: undefined, payload: { location: 'admin_segment' }, result: 'success', damage: 0, valid: true },
  { id: 'act12', matchId: 'm1', seq: 12, agentId: 'ag1', team: 'red', timestamp: '2026-01-15T10:17:00Z', kind: 'recon', message: 'Enumerating admin accounts', mitreId: 'T1595', payload: { target: 'a7' }, result: 'success', damage: 30, worldDiff: { type: 'expose', assetId: 'a7', changes: { state: 'exposed', hp: 70 } }, valid: true },
];

export const mockTurns: Turn[] = [
  { id: 't1', matchId: 'm1', number: 12, activeTeam: 'red', state: 'awaiting', startedAt: '2026-01-15T10:17:00Z', deadlineAt: '2026-01-15T10:17:30Z' },
  { id: 't2', matchId: 'm1', number: 11, activeTeam: 'blue', state: 'closed', startedAt: '2026-01-15T10:16:00Z', closedAt: '2026-01-15T10:16:45Z' },
  { id: 't3', matchId: 'm1', number: 10, activeTeam: 'red', state: 'closed', startedAt: '2026-01-15T10:15:00Z', closedAt: '2026-01-15T10:15:30Z' },
];

export const mockScores: Score[] = [
  { team: 'red', tacticalPoints: 340, objectivesDone: 2, assetsHeld: 2, detections: 0, breaches: 3 },
  { team: 'blue', tacticalPoints: 180, objectivesDone: 0, assetsHeld: 5, detections: 4, breaches: 0 },
];

export const mockEvents: GameEvent[] = mockActions.map((a, i) => ({
  id: `ev${i + 1}`,
  matchId: a.matchId,
  seq: a.seq,
  type: `action.${a.result}`,
  payload: { actionId: a.id, kind: a.kind, team: a.team, message: a.message },
  timestamp: a.timestamp,
}));

export const mockLeaderboard: LeaderboardEntry[] = [
  { agentId: 'ag5', name: 'CyberWolf-Claude', team: 'red', kind: 'llm', elo: 1920, wins: 18, losses: 2, winRate: 90 },
  { agentId: 'ag1', name: 'RedPhantom-GPT', team: 'red', kind: 'llm', elo: 1847, wins: 12, losses: 3, winRate: 80 },
  { agentId: 'ag2', name: 'BlueSentinel-v3', team: 'blue', kind: 'bot', elo: 1792, wins: 9, losses: 5, winRate: 64 },
  { agentId: 'ag4', name: 'Operator_Beta', team: 'blue', kind: 'human', elo: 1720, wins: 11, losses: 6, winRate: 65 },
  { agentId: 'ag6', name: 'FirewallAI-v2', team: 'blue', kind: 'bot', elo: 1680, wins: 6, losses: 8, winRate: 43 },
  { agentId: 'ag3', name: 'Operator_Alpha', team: 'red', kind: 'human', elo: 1650, wins: 7, losses: 4, winRate: 64 },
];

export const mitreTechniques = [
  { id: 'T1046', name: 'Network Service Discovery', team: 'red' },
  { id: 'T1595', name: 'Active Scanning', team: 'red' },
  { id: 'T1190', name: 'Exploit Public-Facing Application', team: 'red' },
  { id: 'T1021', name: 'Remote Services', team: 'red' },
  { id: 'T1041', name: 'Exfiltration Over C2 Channel', team: 'red' },
  { id: 'T1547', name: 'Boot or Logon Autostart Execution', team: 'red' },
];

export const analyticsData = {
  actionsPerMinute: [
    { time: '10:05', red: 2, blue: 1 },
    { time: '10:06', red: 1, blue: 2 },
    { time: '10:07', red: 2, blue: 1 },
    { time: '10:08', red: 1, blue: 2 },
    { time: '10:09', red: 3, blue: 1 },
    { time: '10:10', red: 2, blue: 2 },
    { time: '10:11', red: 1, blue: 1 },
    { time: '10:12', red: 2, blue: 3 },
    { time: '10:13', red: 1, blue: 2 },
    { time: '10:14', red: 2, blue: 1 },
    { time: '10:15', red: 1, blue: 1 },
    { time: '10:16', red: 2, blue: 2 },
  ],
  detectionRate: [
    { turn: 1, rate: 0 },
    { turn: 2, rate: 15 },
    { turn: 3, rate: 22 },
    { turn: 4, rate: 35 },
    { turn: 5, rate: 40 },
    { turn: 6, rate: 55 },
    { turn: 7, rate: 62 },
    { turn: 8, rate: 70 },
    { turn: 9, rate: 68 },
    { turn: 10, rate: 75 },
    { turn: 11, rate: 80 },
    { turn: 12, rate: 85 },
  ],
  hpAggregated: [
    { turn: 1, red: 100, blue: 100 },
    { turn: 2, red: 100, blue: 98 },
    { turn: 3, red: 100, blue: 95 },
    { turn: 4, red: 100, blue: 92 },
    { turn: 5, red: 98, blue: 70 },
    { turn: 6, red: 95, blue: 55 },
    { turn: 7, red: 95, blue: 55 },
    { turn: 8, red: 95, blue: 60 },
    { turn: 9, red: 93, blue: 58 },
    { turn: 10, red: 93, blue: 55 },
    { turn: 11, red: 93, blue: 52 },
    { turn: 12, red: 90, blue: 48 },
  ],
  mitreHeatmap: [
    { technique: 'T1046', count: 3, severity: 'medium' },
    { technique: 'T1190', count: 5, severity: 'critical' },
    { technique: 'T1021', count: 2, severity: 'high' },
    { technique: 'T1041', count: 1, severity: 'critical' },
    { technique: 'T1547', count: 2, severity: 'high' },
    { technique: 'T1595', count: 1, severity: 'low' },
  ],
};
