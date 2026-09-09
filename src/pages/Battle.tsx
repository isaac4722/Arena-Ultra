import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Swords, Shield, AlertTriangle, CheckCircle, XCircle, Timer, Target, Zap } from 'lucide-react';

export default function Battle() {
  const { actions, scores, assets, agents, activeMatchId } = useGameStore();
  const [countdown, setCountdown] = useState(28);
  const matchActions = actions.filter(a => a.matchId === activeMatchId);
  const redScore = scores.find(s => s.team === 'red');
  const blueScore = scores.find(s => s.team === 'blue');
  const matchAgents = agents.filter(a => a.matchId === activeMatchId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev <= 0 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'partial': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'blocked': return <Shield className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'success': return 'border-green-500/30 bg-green-500/5';
      case 'partial': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'failed': return 'border-red-500/30 bg-red-500/5';
      case 'blocked': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-gray-700';
    }
  };

  const getActionIcon = (kind: string) => {
    switch (kind) {
      case 'port_scan': case 'recon': return '🔍';
      case 'exploit': return '💥';
      case 'lateral_move': return '🔄';
      case 'exfiltrate': return '📤';
      case 'persist': return '🔗';
      case 'monitor': case 'detect': return '👁️';
      case 'patch': return '🩹';
      case 'incident_response': return '🚨';
      case 'honeypot': return '🍯';
      case 'block_ip': case 'firewall': return '🛡️';
      default: return '⚡';
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Score & Turn Info */}
      <div className="w-72 border-r border-cyan-900/30 bg-gray-900/30 p-4 flex flex-col">
        {/* Turn Indicator */}
        <div className="bg-gray-900 border border-cyan-900/30 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Current Turn</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
              RED's MOVE
            </span>
          </div>
          <div className="text-3xl font-bold text-white text-center my-2">12</div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Timer className="w-4 h-4" />
            <span className="font-mono text-cyan-400">{countdown}s</span>
          </div>
          <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${(countdown / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Scoreboard */}
        <div className="bg-gray-900 border border-cyan-900/30 rounded-xl p-4 mb-4">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Scoreboard</h3>
          
          {/* Red Team */}
          <div className="mb-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-400">RED TEAM</span>
              </div>
              <span className="text-lg font-bold text-red-400">{redScore?.tacticalPoints}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500">Breaches</p>
                <p className="text-sm font-bold text-red-300">{redScore?.breaches}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Held</p>
                <p className="text-sm font-bold text-red-300">{redScore?.assetsHeld}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Obj.</p>
                <p className="text-sm font-bold text-red-300">{redScore?.objectivesDone}</p>
              </div>
            </div>
          </div>

          {/* Blue Team */}
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-blue-400">BLUE TEAM</span>
              </div>
              <span className="text-lg font-bold text-blue-400">{blueScore?.tacticalPoints}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500">Detects</p>
                <p className="text-sm font-bold text-blue-300">{blueScore?.detections}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Held</p>
                <p className="text-sm font-bold text-blue-300">{blueScore?.assetsHeld}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Obj.</p>
                <p className="text-sm font-bold text-blue-300">{blueScore?.objectivesDone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agents */}
        <div className="bg-gray-900 border border-cyan-900/30 rounded-xl p-4">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Agents</h3>
          {matchAgents.map(agent => (
            <div key={agent.id} className="flex items-center gap-2 mb-2 last:mb-0">
              <div className={`w-5 h-5 rounded-full ${
                agent.team === 'red' ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 truncate">{agent.name}</p>
                <p className="text-[10px] text-gray-500">{agent.kind} • ELO {agent.elo}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-600'}`} />
            </div>
          ))}
        </div>

        {/* Asset Health Summary */}
        <div className="bg-gray-900 border border-cyan-900/30 rounded-xl p-4 mt-4">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Asset Health</h3>
          {assets.filter(a => a.matchId === activeMatchId && a.ownerTeam === 'blue').slice(0, 5).map(asset => (
            <div key={asset.id} className="mb-2 last:mb-0">
              <div className="flex items-center justify-between text-xs mb-0.5">
                <span className="text-gray-400 truncate">{asset.name}</span>
                <span className={`font-mono ${
                  asset.state === 'secure' ? 'text-green-400' :
                  asset.state === 'exposed' ? 'text-yellow-400' :
                  asset.state === 'compromised' ? 'text-red-400' : 'text-gray-500'
                }`}>{asset.hp}/{asset.maxHp}</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    asset.hp > 70 ? 'bg-green-500' :
                    asset.hp > 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(asset.hp / asset.maxHp) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center - Action Feed */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-3 border-b border-cyan-900/30 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Swords className="w-4 h-4 text-cyan-400" />
            Action Feed
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">seq: {matchActions.length}</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {matchActions.map((action) => (
            <div
              key={action.id}
              className={`border rounded-xl p-4 transition-all hover:scale-[1.01] ${getResultColor(action.result)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getActionIcon(action.kind)}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        action.team === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {action.team.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">#{action.seq}</span>
                      {action.mitreId && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {action.mitreId}
                        </span>
                      )}
                      <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">
                        {action.kind}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200">{action.message}</p>
                    {action.worldDiff && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>World diff: {action.worldDiff.type} → {action.worldDiff.assetId}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getResultIcon(action.result)}
                  {action.damage > 0 && (
                    <span className="text-xs font-bold text-red-400 flex items-center gap-0.5">
                      <Zap className="w-3 h-3" />-{action.damage}HP
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Quick Actions (for human players) */}
      <div className="w-64 border-l border-cyan-900/30 bg-gray-900/30 p-4">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
        
        {/* Red Actions */}
        <div className="mb-4">
          <p className="text-xs text-red-400 font-medium mb-2">RED Arsenal</p>
          <div className="space-y-1.5">
            {['recon', 'exploit', 'lateral_move', 'exfiltrate', 'persist'].map(action => (
              <button key={action} className="w-full text-left px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 rounded-lg text-red-300 hover:bg-red-500/10 transition-all">
                {getActionIcon(action)} {action.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Blue Actions */}
        <div className="mb-4">
          <p className="text-xs text-blue-400 font-medium mb-2">BLUE Arsenal</p>
          <div className="space-y-1.5">
            {['monitor', 'patch', 'firewall', 'honeypot', 'incident_response'].map(action => (
              <button key={action} className="w-full text-left px-3 py-1.5 text-xs bg-blue-500/5 border border-blue-500/20 rounded-lg text-blue-300 hover:bg-blue-500/10 transition-all">
                {getActionIcon(action)} {action.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">Win Conditions</p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>🔴 Red: Compromise crown jewel</p>
            <p>🔵 Blue: Survive 50 turns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
