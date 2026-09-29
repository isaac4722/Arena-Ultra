import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import {
  MessageSquare, Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle,
  Clock, Users, Fingerprint, Database, Zap, Ban, Activity, Key
} from 'lucide-react';
import { forumSecurityMetrics, swarmDetectionEvents } from '../data/forumData';

export default function Forums() {
  const { forums, forumMessages, auditLog, honeyTokens } = useGameStore();
  const [selectedForum, setSelectedForum] = useState<string | null>('f1');
  const [activeTab, setActiveTab] = useState<'messages' | 'security' | 'audit' | 'honeytokens'>('messages');

  const selectedForumData = forums.find(f => f.id === selectedForum);
  const filteredMessages = forumMessages.filter(m => m.forumId === selectedForum);

  if (forums.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageSquare className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">No forums available</p>
          <p className="text-gray-500 text-sm">Professional forums will be created when matches begin</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'locked': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'archived': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'default-deny': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'restricted': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'monitored': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'open': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Forum List */}
      <div className="w-72 border-r border-cyan-900/30 bg-gray-900/30 flex flex-col">
        <div className="p-4 border-b border-cyan-900/30">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            Professional Forums
          </h2>
          <p className="text-[10px] text-gray-500 mt-1">Formal communication channels with full audit trail</p>
        </div>

        {/* Security Overview */}
        <div className="p-3 border-b border-cyan-900/30 bg-gray-950/50">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Security Posture</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-gray-900 rounded-lg">
              <p className="text-lg font-bold text-red-400">{forumSecurityMetrics.blockedAttempts}</p>
              <p className="text-[9px] text-gray-500">Blocked</p>
            </div>
            <div className="text-center p-2 bg-gray-900 rounded-lg">
              <p className="text-lg font-bold text-orange-400">{forumSecurityMetrics.emergentBehaviorDetections}</p>
              <p className="text-[9px] text-gray-500">Swarm Alerts</p>
            </div>
            <div className="text-center p-2 bg-gray-900 rounded-lg">
              <p className="text-lg font-bold text-cyan-400">{forumSecurityMetrics.approvalGateHits}</p>
              <p className="text-[9px] text-gray-500">Gate Hits</p>
            </div>
            <div className="text-center p-2 bg-gray-900 rounded-lg">
              <p className="text-lg font-bold text-purple-400">{forumSecurityMetrics.honeyTokenTriggers}</p>
              <p className="text-[9px] text-gray-500">Honey Traps</p>
            </div>
          </div>
        </div>

        {/* Forum List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {forums.map(forum => (
            <button
              key={forum.id}
              onClick={() => setSelectedForum(forum.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedForum === forum.id
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'hover:bg-gray-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-200 truncate">{forum.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getStatusColor(forum.status)}`}>
                  {forum.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {forum.messageCount}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {forum.participantCount}
                </span>
                <span className={`flex items-center gap-1 ${
                  forum.securityLevel === 'default-deny' ? 'text-red-400' : 'text-gray-500'
                }`}>
                  <Lock className="w-3 h-3" />
                  {forum.securityLevel}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Forum Header */}
        {selectedForumData && (
          <div className="p-4 border-b border-cyan-900/30 bg-gray-900/30">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-lg font-bold text-white">{selectedForumData.name}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{selectedForumData.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded border ${getSecurityColor(selectedForumData.securityLevel)}`}>
                  <Lock className="w-3 h-3 inline mr-1" />
                  {selectedForumData.securityLevel}
                </span>
                {selectedForumData.requiresApproval && (
                  <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Approval Required
                  </span>
                )}
                {selectedForumData.auditEnabled && (
                  <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Full Audit
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mt-3">
              {[
                { id: 'messages' as const, label: 'Messages', icon: MessageSquare },
                { id: 'security' as const, label: 'Security', icon: Shield },
                { id: 'audit' as const, label: 'Audit Log', icon: Database },
                { id: 'honeytokens' as const, label: 'Honey Tokens', icon: Zap },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all ${
                    activeTab === id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'messages' && (
            <div className="space-y-3">
              {filteredMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`border rounded-xl p-4 ${
                    msg.status === 'flagged' ? 'border-orange-500/30 bg-orange-500/5' :
                    msg.status === 'pending' ? 'border-yellow-500/30 bg-yellow-500/5' :
                    'border-gray-800 bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        msg.authorTeam === 'red' ? 'bg-gradient-to-br from-red-500 to-orange-500' :
                        msg.authorTeam === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                        'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        <span className="text-[9px] font-bold text-white">{msg.authorName[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-200 font-medium">{msg.authorName}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <span className="flex items-center gap-0.5">
                            <Fingerprint className="w-3 h-3" />
                            {msg.authorIdentity}
                          </span>
                          <span>•</span>
                          <span className="font-mono">{msg.sessionId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMessageStatusIcon(msg.status)}
                      <span className="text-[10px] text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{msg.content}</p>

                  {/* Metadata */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-800">
                    <div>
                      <p className="text-[9px] text-gray-600 uppercase">IP</p>
                      <p className="text-[10px] text-gray-400 font-mono">{msg.metadata.ip}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-600 uppercase">Context</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{msg.metadata.executionContext}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-600 uppercase">Token Expires</p>
                      <p className={`text-[10px] font-mono ${msg.metadata.tokenExpiry === 'REVOKED' ? 'text-red-400' : 'text-gray-400'}`}>
                        {msg.metadata.tokenExpiry === 'REVOKED' ? '⛔ REVOKED' : new Date(msg.metadata.tokenExpiry).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-600 uppercase">Approved By</p>
                      <p className="text-[10px] text-gray-400">{msg.approvedBy || '—'}</p>
                    </div>
                  </div>

                  {msg.flaggedReason && (
                    <div className="mt-2 p-2 rounded bg-orange-500/10 border border-orange-500/20">
                      <p className="text-[10px] text-orange-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {msg.flaggedReason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Identity Management */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  Identity Management — Task-Bound Sessions
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-950 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Active Sessions</p>
                    <p className="text-2xl font-bold text-green-400">3</p>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Revoked Identities</p>
                    <p className="text-2xl font-bold text-red-400">1</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { agent: 'RedPhantom-GPT', type: 'task-bound', status: 'active', expiry: '10:38:15' },
                    { agent: 'BlueSentinel-v3', type: 'task-bound', status: 'active', expiry: '10:46:00' },
                    { agent: 'CyberWolf-Claude', type: 'ephemeral', status: 'revoked', expiry: 'REVOKED' },
                    { agent: 'Operator_Alpha', type: 'persistent', status: 'active', expiry: '17:00:00' },
                  ].map((id, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-950/50">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${id.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-xs text-gray-300">{id.agent}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">{id.type}</span>
                        <span className={`text-[10px] font-mono ${id.expiry === 'REVOKED' ? 'text-red-400' : 'text-gray-500'}`}>
                          {id.expiry}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swarm Detection */}
              <div className="bg-gray-900/50 border border-red-900/30 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-400" />
                  Swarm Behavior Detection
                </h3>
                <div className="space-y-2">
                  {swarmDetectionEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-950/50 border border-gray-800">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        event.severity === 'critical' ? 'bg-red-500/20' :
                        event.severity === 'high' ? 'bg-orange-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 ${
                          event.severity === 'critical' ? 'text-red-400' :
                          event.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                            event.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                            event.severity === 'high' ? 'bg-orange-500/10 text-orange-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>{event.severity}</span>
                          <span className="text-[10px] text-gray-500">{event.type.replace('_', ' ')}</span>
                          {event.blocked && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">BLOCKED</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300">{event.description}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Comparison */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Architecture: Ad-hoc vs Professional
                </h3>
                <div className="overflow-hidden rounded-lg border border-gray-800">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-950">
                        <th className="text-left p-2 text-gray-500">Characteristic</th>
                        <th className="text-left p-2 text-red-400">Ad-hoc (Artifactory)</th>
                        <th className="text-left p-2 text-green-400">Professional Forum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      <tr>
                        <td className="p-2 text-gray-400">Data Integrity</td>
                        <td className="p-2 text-red-300">Vulnerable to log manipulation</td>
                        <td className="p-2 text-green-300">Immutable + external audit</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-400">Identity Context</td>
                        <td className="p-2 text-red-300">Infrastructure-bound (opaque)</td>
                        <td className="p-2 text-green-300">Purpose-bound (ephemeral)</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-400">Transparency</td>
                        <td className="p-2 text-red-300">Ghost comms (18k wiki posts)</td>
                        <td className="p-2 text-green-300">Full traceability + real-time</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-400">Risk Vector</td>
                        <td className="p-2 text-red-300">0-day proxy exploitation</td>
                        <td className="p-2 text-green-300">Standard protocols, auth'd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-3 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-300 font-medium">Immutable Audit Log</span>
                </div>
                <span className="text-[10px] text-gray-500">External storage: 100% synced</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-950/50">
                    <th className="text-left p-2 text-gray-500">Timestamp</th>
                    <th className="text-left p-2 text-gray-500">Actor</th>
                    <th className="text-left p-2 text-gray-500">Action</th>
                    <th className="text-left p-2 text-gray-500">Target</th>
                    <th className="text-left p-2 text-gray-500">Result</th>
                    <th className="text-left p-2 text-gray-500">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLog.map(entry => (
                    <tr key={entry.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="p-2 text-gray-400 font-mono">{new Date(entry.timestamp).toLocaleTimeString()}</td>
                      <td className="p-2 text-gray-300">{entry.actor}</td>
                      <td className="p-2">
                        <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono text-[10px]">{entry.action}</span>
                      </td>
                      <td className="p-2 text-gray-400 font-mono">{entry.target}</td>
                      <td className="p-2">
                        <span className={`px-1.5 py-0.5 rounded ${
                          entry.result === 'success' ? 'bg-green-500/10 text-green-400' :
                          entry.result === 'blocked' ? 'bg-red-500/10 text-red-400' :
                          'bg-yellow-500/10 text-yellow-400'
                        }`}>{entry.result}</span>
                      </td>
                      <td className="p-2 text-gray-500 font-mono text-[10px]">{entry.sessionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'honeytokens' && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Deployed Honey Tokens
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Canary data inserted to detect unauthorized information scanning or unusual access patterns by agents.
                </p>
                <div className="space-y-2">
                  {honeyTokens.filter(ht => ht.forumId === selectedForum).map(token => (
                    <div key={token.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                      token.triggered ? 'border-red-500/30 bg-red-500/5' : 'border-gray-800 bg-gray-950/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          token.type === 'fake-solution' ? 'bg-orange-500/20' :
                          token.type === 'decoy-credentials' ? 'bg-yellow-500/20' : 'bg-purple-500/20'
                        }`}>
                          <Zap className={`w-4 h-4 ${
                            token.type === 'fake-solution' ? 'text-orange-400' :
                            token.type === 'decoy-credentials' ? 'text-yellow-400' : 'text-purple-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-300 font-medium">{token.type.replace('-', ' ')}</p>
                          <p className="text-[10px] text-gray-500">Deployed: {new Date(token.deployedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {token.triggered ? (
                          <div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                              ⚠️ TRIGGERED
                            </span>
                            <p className="text-[10px] text-gray-500 mt-1">By: {token.triggeredBy}</p>
                          </div>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30">
                            ✓ DORMANT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Default-Deny Policy */}
              <div className="bg-gray-900/50 border border-red-900/30 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-400" />
                  Default-Deny Infrastructure Policy
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-red-400">{forumSecurityMetrics.defaultDenyBlocks}</p>
                    <p className="text-[10px] text-gray-500">Egress Blocked</p>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-orange-400">0</p>
                    <p className="text-[10px] text-gray-500">IMDS Access</p>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-400">100%</p>
                    <p className="text-[10px] text-gray-500">Sandbox Isolation</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
