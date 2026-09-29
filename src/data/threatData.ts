import { ThreatIncident, EmergentBehavior, RegulatoryAction, Quote } from '../types';

export const mockThreatIncidents: ThreatIncident[] = [];

export const mockEmergentBehaviors: EmergentBehavior[] = [];

export const mockRegulatoryActions: RegulatoryAction[] = [];

export const mockQuotes: Quote[] = [];

export const threatMetrics = {
  totalIncidents: 0,
  criticalIncidents: 0,
  agentsCompromised: 0,
  unauthorizedAccessAttempts: 0,
  messagesAnalyzed: 0,
  emergentBehaviorsDetected: 0,
  mitigatedBehaviors: 0,
  regulatoryActions: 0,
  sabotageAttempts: 0,
};

export const timelineEvents: Array<{ date: string; event: string; severity: 'critical' | 'high' | 'medium' | 'low' }> = [];
