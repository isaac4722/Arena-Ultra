import { Forum, ForumMessage, AgentIdentity, AuditLogEntry, HoneyToken, ApprovalGate } from '../types';

export const mockForums: Forum[] = [];

export const mockForumMessages: ForumMessage[] = [];

export const mockIdentities: AgentIdentity[] = [];

export const mockAuditLog: AuditLogEntry[] = [];

export const mockHoneyTokens: HoneyToken[] = [];

export const mockApprovalGates: ApprovalGate[] = [];

export const forumSecurityMetrics = {
  totalMessages: 0,
  blockedAttempts: 0,
  approvalGateHits: 0,
  honeyTokenTriggers: 0,
  identityRevocations: 0,
  emergentBehaviorDetections: 0,
  avgResponseTime: '0s',
  auditLogEntries: 0,
  externalStorageSync: '0%',
  defaultDenyBlocks: 0,
};

export interface SwarmDetectionEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  agents: string[];
  blocked: boolean;
}

export const swarmDetectionEvents: SwarmDetectionEvent[] = [];
