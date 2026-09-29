import { create } from 'zustand';
import { Match, Agent, WorldAsset, Action, Score, GameEvent, Forum, ForumMessage, AuditLogEntry, HoneyToken, ThreatIncident, EmergentBehavior, RegulatoryAction, Quote } from '../types';
import { mockMatches, mockAgents, mockAssets, mockActions, mockScores, mockEvents } from '../data/mockData';
import { mockForums, mockForumMessages, mockAuditLog, mockHoneyTokens } from '../data/forumData';
import { mockThreatIncidents, mockEmergentBehaviors, mockRegulatoryActions, mockQuotes } from '../data/threatData';

interface GameState {
  // Data
  matches: Match[];
  agents: Agent[];
  assets: WorldAsset[];
  actions: Action[];
  scores: Score[];
  events: GameEvent[];
  forums: Forum[];
  forumMessages: ForumMessage[];
  auditLog: AuditLogEntry[];
  honeyTokens: HoneyToken[];
  threatIncidents: ThreatIncident[];
  emergentBehaviors: EmergentBehavior[];
  regulatoryActions: RegulatoryAction[];
  quotes: Quote[];
  
  // UI State
  activeMatchId: string;
  selectedAssetId: string | null;
  isReplayMode: boolean;
  replaySpeed: number;
  replayPosition: number;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  
  // Actions
  setActiveMatch: (id: string) => void;
  selectAsset: (id: string | null) => void;
  setReplayMode: (mode: boolean) => void;
  setReplaySpeed: (speed: number) => void;
  setReplayPosition: (pos: number) => void;
  toggleSidebar: () => void;
  addNotification: (n: Notification) => void;
  dismissNotification: (id: string) => void;
  getActiveMatch: () => Match | undefined;
  getMatchAssets: (matchId: string) => WorldAsset[];
  getMatchActions: (matchId: string) => Action[];
  getMatchAgents: (matchId: string) => Agent[];
}

interface Notification {
  id: string;
  type: 'attack' | 'defense' | 'system' | 'alert';
  message: string;
  timestamp: string;
  team?: 'red' | 'blue';
}

export const useGameStore = create<GameState>((set, get) => ({
  matches: mockMatches,
  agents: mockAgents,
  assets: mockAssets,
  actions: mockActions,
  scores: mockScores,
  events: mockEvents,
  forums: mockForums,
  forumMessages: mockForumMessages,
  auditLog: mockAuditLog,
  honeyTokens: mockHoneyTokens,
  threatIncidents: mockThreatIncidents,
  emergentBehaviors: mockEmergentBehaviors,
  regulatoryActions: mockRegulatoryActions,
  quotes: mockQuotes,
  
  activeMatchId: 'm1',
  selectedAssetId: null,
  isReplayMode: false,
  replaySpeed: 1,
  replayPosition: 0,
  sidebarCollapsed: false,
  notifications: [
    { id: 'n1', type: 'attack', message: 'API Server compromised via SQL injection', timestamp: '2026-01-15T10:10:00Z', team: 'red' },
    { id: 'n2', type: 'alert', message: 'Lateral movement detected: api-server → user-credentials', timestamp: '2026-01-15T10:11:00Z', team: 'red' },
    { id: 'n3', type: 'defense', message: 'Anomaly detection triggered on api-server', timestamp: '2026-01-15T10:12:00Z', team: 'blue' },
  ],
  
  setActiveMatch: (id) => set({ activeMatchId: id }),
  selectAsset: (id) => set({ selectedAssetId: id }),
  setReplayMode: (mode) => set({ isReplayMode: mode }),
  setReplaySpeed: (speed) => set({ replaySpeed: speed }),
  setReplayPosition: (pos) => set({ replayPosition: pos }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  addNotification: (n) => set((s) => ({ notifications: [n, ...s.notifications].slice(0, 20) })),
  dismissNotification: (id) => set((s) => ({ notifications: s.notifications.filter(n => n.id !== id) })),
  
  getActiveMatch: () => get().matches.find(m => m.id === get().activeMatchId),
  getMatchAssets: (matchId) => get().assets.filter(a => a.matchId === matchId),
  getMatchActions: (matchId) => get().actions.filter(a => a.matchId === matchId),
  getMatchAgents: (matchId) => get().agents.filter(a => a.matchId === matchId),
}));
