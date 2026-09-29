import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Shield, Users, Clock, Zap, Trophy, Plus, Eye, Swords } from 'lucide-react';

export default function Lobby() {
  const { matches, agents, setActiveMatch } = useGameStore();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'paused': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'ended': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'turn_based': return 'Turn-Based';
      case 'realtime_tick': return 'Real-Time';
      case 'freeform': return 'Freeform';
      default: return mode;
    }
  };

  const handleJoinMatch = (matchId: string) => {
    setActiveMatch(matchId);
    navigate('/battle');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-7 h-7 text-cyan-400" />
            Match Lobby
          </h1>
          <p className="text-gray-500 text-sm mt-1">Create, join, or spectate adversarial simulations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Match</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Matches', value: matches.filter(m => m.status === 'active').length, icon: Zap, color: 'cyan' },
          { label: 'Total Agents', value: agents.length, icon: Users, color: 'purple' },
          { label: 'Completed', value: matches.filter(m => m.status === 'ended').length, icon: Trophy, color: 'green' },
          { label: 'Avg ELO', value: Math.round(agents.reduce((a, b) => a + b.elo, 0) / agents.length), icon: Shield, color: 'orange' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-2xl font-bold text-${color}-400 mt-1`}>{value}</p>
              </div>
              <Icon className={`w-8 h-8 text-${color}-400/30`} />
            </div>
          </div>
        ))}
      </div>

      {/* Match List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-300">Active & Recent Matches</h2>
        {matches.length === 0 && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
            <Shield className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No matches available</p>
            <p className="text-gray-500 text-sm">Create a new match to get started</p>
          </div>
        )}
        {matches.map((match) => {
          const matchAgents = agents.filter(a => a.matchId === match.id);
          return (
            <div
              key={match.id}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-cyan-900/50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{match.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(match.status)}`}>
                      {match.status.toUpperCase()}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      {getModeLabel(match.mode)}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Turn {match.currentTurn}/{match.maxTurns}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {matchAgents.length} agents
                    </span>
                    {match.winner && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Trophy className="w-3.5 h-3.5" />
                        Winner: {match.winner.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {match.status === 'active' && (
                    <button
                      onClick={() => handleJoinMatch(match.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all"
                    >
                      <Swords className="w-3.5 h-3.5" />
                      Enter Battle
                    </button>
                  )}
                  <button
                    onClick={() => handleJoinMatch(match.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-gray-700 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Spectate
                  </button>
                </div>
              </div>

              {/* Agent preview */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-800">
                {matchAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${
                      agent.team === 'red' ? 'bg-gradient-to-br from-red-500 to-orange-500' :
                      agent.team === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                      'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-300">{agent.name}</p>
                      <p className="text-[10px] text-gray-500">{agent.kind} • ELO {agent.elo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Match Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-cyan-900/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Create New Match</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Match Name</label>
                <input
                  type="text"
                  placeholder="Operation Thunderstrike"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Game Mode</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none">
                  <option value="turn_based">Turn-Based</option>
                  <option value="realtime_tick">Real-Time Tick</option>
                  <option value="freeform">Freeform (Legacy)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Max Turns</label>
                  <input type="number" defaultValue={50} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Tick (seconds)</label>
                  <input type="number" defaultValue={30} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="fog" defaultChecked className="accent-cyan-500" />
                <label htmlFor="fog" className="text-sm text-gray-400">Enable Fog of War</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-all"
              >
                Create Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
