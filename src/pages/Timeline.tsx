import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Clock, ChevronDown, ChevronRight, Filter, Search } from 'lucide-react';

export default function Timeline() {
  const { actions, activeMatchId } = useGameStore();
  const matchActions = actions.filter(a => a.matchId === activeMatchId);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterTeam, setFilterTeam] = useState<'all' | 'red' | 'blue'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActions = matchActions.filter(a => {
    if (filterTeam !== 'all' && a.team !== filterTeam) return false;
    if (searchQuery && !a.message.toLowerCase().includes(searchQuery.toLowerCase()) && !a.kind.includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (matchActions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Clock className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">No events recorded</p>
          <p className="text-gray-500 text-sm">Timeline events will appear during active matches</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Clock className="w-7 h-7 text-cyan-400" />
            Event Timeline
          </h1>
          <p className="text-gray-500 text-sm mt-1">Chronological view of all match events with payload inspection</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          <Filter className="w-3.5 h-3.5 text-gray-500 ml-2" />
          {(['all', 'red', 'blue'] as const).map(team => (
            <button
              key={team}
              onClick={() => setFilterTeam(team)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                filterTeam === team
                  ? team === 'red' ? 'bg-red-500/20 text-red-400' :
                    team === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {team.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

        <div className="space-y-3">
          {filteredActions.map((action, index) => {
            const isExpanded = expandedId === action.id;
            return (
              <div key={action.id} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 ${
                  action.team === 'red' ? 'bg-red-500/20 border-red-500' : 'bg-blue-500/20 border-blue-500'
                }`} />
                
                {/* Card */}
                <div
                  className={`bg-gray-900/50 border rounded-xl transition-all cursor-pointer ${
                    isExpanded ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/5' : 'border-gray-800 hover:border-gray-700'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : action.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                          #{action.seq}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          action.team === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {action.team.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-300">{action.kind}</span>
                        {action.mitreId && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {action.mitreId}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {new Date(action.timestamp).toLocaleTimeString()}
                        </span>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{action.message}</p>
                    
                    {/* Result badge */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        action.result === 'success' ? 'bg-green-500/10 text-green-400' :
                        action.result === 'partial' ? 'bg-yellow-500/10 text-yellow-400' :
                        action.result === 'blocked' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {action.result}
                      </span>
                      {action.damage > 0 && (
                        <span className="text-xs text-red-400">-{action.damage} HP</span>
                      )}
                    </div>
                  </div>

                  {/* Expanded payload */}
                  {isExpanded && (
                    <div className="border-t border-gray-800 p-4 bg-gray-950/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Payload</h4>
                          <pre className="text-xs text-gray-400 bg-gray-900 rounded-lg p-3 overflow-x-auto font-mono">
                            {JSON.stringify(action.payload, null, 2)}
                          </pre>
                        </div>
                        {action.worldDiff && (
                          <div>
                            <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">World Diff</h4>
                            <pre className="text-xs text-gray-400 bg-gray-900 rounded-lg p-3 overflow-x-auto font-mono">
                              {JSON.stringify(action.worldDiff, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span>Agent: {action.agentId}</span>
                        <span>Valid: {action.valid ? '✓' : '✗'}</span>
                        {action.invalidReason && <span className="text-red-400">{action.invalidReason}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">No events match your filters</p>
        </div>
      )}
    </div>
  );
}
