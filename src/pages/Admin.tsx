import { useState } from 'react';
import { Settings, Users, Shield, Activity, Database, Lock, Eye, Trash2, Edit, Plus, Download } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { mockLeaderboard } from '../data/mockData';

export default function Admin() {
  const { agents, matches } = useGameStore();
  const [activeTab, setActiveTab] = useState<'agents' | 'audit' | 'system' | 'leaderboard'>('agents');

  const tabs = [
    { id: 'agents' as const, label: 'Agents', icon: Users },
    { id: 'audit' as const, label: 'Audit Log', icon: Shield },
    { id: 'system' as const, label: 'System', icon: Activity },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Settings },
  ];

  const auditEntries = [
    { id: '1', actor: 'admin', action: 'match.create', target: 'm1', ip: '10.0.0.1', timestamp: '2026-01-15T10:00:00Z' },
    { id: '2', actor: 'ag1', action: 'agent.join', target: 'm1', ip: '192.168.1.100', timestamp: '2026-01-15T10:01:00Z' },
    { id: '3', actor: 'ag2', action: 'agent.join', target: 'm1', ip: '192.168.1.101', timestamp: '2026-01-15T10:01:30Z' },
    { id: '4', actor: 'admin', action: 'match.start', target: 'm1', ip: '10.0.0.1', timestamp: '2026-01-15T10:05:00Z' },
    { id: '5', actor: 'system', action: 'rate_limit.hit', target: 'ag1', ip: '192.168.1.100', timestamp: '2026-01-15T10:08:00Z' },
    { id: '6', actor: 'admin', action: 'config.update', target: 'fog_of_war', ip: '10.0.0.1', timestamp: '2026-01-15T10:10:00Z' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="w-7 h-7 text-cyan-400" />
            Administration
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage agents, audit logs, system configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-gray-700 transition-all">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'agents' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-300">Registered Agents</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all">
              <Plus className="w-3.5 h-3.5" />
              Add Agent
            </button>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Agent</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Team</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">ELO</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">W/L</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(agent => (
                  <tr key={agent.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${
                          agent.team === 'red' ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`} />
                        <span className="text-sm text-gray-300">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        agent.team === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>{agent.team}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400">{agent.kind}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300 font-mono">{agent.elo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-400">{agent.wins}/{agent.losses}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-xs ${
                        agent.status === 'active' ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-600'}`} />
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-gray-700 text-gray-500 hover:text-gray-300 transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-gray-700 text-gray-500 hover:text-gray-300 transition-all">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Audit Log (Append-Only)</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Timestamp</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Actor</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Action</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Target</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">IP</th>
                </tr>
              </thead>
              <tbody>
                {auditEntries.map(entry => (
                  <tr key={entry.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{entry.actor}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 font-mono">{entry.action}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{entry.target}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">{entry.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="grid grid-cols-2 gap-6">
          {/* System Health */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              System Health
            </h3>
            <div className="space-y-3">
              {[
                { name: 'API Server', status: 'healthy', latency: '12ms' },
                { name: 'WebSocket Hub', status: 'healthy', latency: '3ms' },
                { name: 'SQLite (WAL)', status: 'healthy', latency: '8ms' },
                { name: 'Event Bus', status: 'healthy', latency: '1ms' },
                { name: 'Bot Worker Pool', status: 'healthy', latency: '45ms' },
                { name: 'LLM Provider', status: 'degraded', latency: '890ms' },
              ].map(service => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-sm text-gray-300">{service.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{service.latency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Security Config
            </h3>
            <div className="space-y-3">
              {[
                { label: 'JWT Algorithm', value: 'RS256' },
                { label: 'Rate Limit', value: '60 req/min' },
                { label: 'Max Payload Size', value: '1MB' },
                { label: 'Session Timeout', value: '30 min' },
                { label: 'TLS Version', value: '1.3' },
                { label: 'CORS Origins', value: 'strict' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database Stats */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              Database Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Total Matches', value: matches.length },
                { label: 'Total Events', value: '1,284' },
                { label: 'DB Size', value: '24.3 MB' },
                { label: 'WAL Size', value: '1.2 MB' },
                { label: 'Last Backup', value: '2 min ago' },
                { label: 'Connections', value: '3 active' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-sm text-gray-300 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Flags */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Feature Flags</h3>
            <div className="space-y-3">
              {[
                { name: 'Fog of War', enabled: true },
                { name: 'LLM Agents', enabled: true },
                { name: 'Replay Export', enabled: true },
                { name: 'Multi-Match', enabled: false },
                { name: 'Tournament Mode', enabled: false },
                { name: 'Purple Team Director', enabled: false },
              ].map(({ name, enabled }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{name}</span>
                  <div className={`w-8 h-4 rounded-full transition-all ${enabled ? 'bg-cyan-500' : 'bg-gray-700'} relative`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-[18px]' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Global ELO Leaderboard</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">#</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Agent</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Team</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">ELO</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">W/L</th>
                  <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((entry, i) => (
                  <tr key={entry.agentId} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-gray-500'}`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${
                          entry.team === 'red' ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`} />
                        <span className="text-sm text-gray-300">{entry.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        entry.team === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>{entry.team}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400">{entry.kind}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-cyan-400 font-mono font-bold">{entry.elo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-400">{entry.wins}W / {entry.losses}L</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${entry.winRate}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{entry.winRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
