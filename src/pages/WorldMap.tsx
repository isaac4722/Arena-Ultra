import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Globe, Info, AlertTriangle, Shield, Server, Database, Users, Wifi } from 'lucide-react';

export default function WorldMap() {
  const { assets, activeMatchId, selectedAssetId, selectAsset } = useGameStore();
  const matchAssets = assets.filter(a => a.matchId === activeMatchId);
  const selectedAsset = matchAssets.find(a => a.id === selectedAssetId);
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  if (matchAssets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Globe className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">No world state available</p>
          <p className="text-gray-500 text-sm">Assets will appear when a match is active</p>
        </div>
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'secure': return { fill: '#10b981', stroke: '#059669', glow: 'rgba(16,185,129,0.3)' };
      case 'exposed': return { fill: '#f59e0b', stroke: '#d97706', glow: 'rgba(245,158,11,0.3)' };
      case 'compromised': return { fill: '#ef4444', stroke: '#dc2626', glow: 'rgba(239,68,68,0.4)' };
      case 'destroyed': return { fill: '#6b7280', stroke: '#4b5563', glow: 'rgba(107,114,128,0.2)' };
      default: return { fill: '#6b7280', stroke: '#4b5563', glow: 'rgba(107,114,128,0.2)' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'host': return Server;
      case 'service': return Globe;
      case 'db': return Database;
      case 'user': return Users;
      case 'network': return Wifi;
      default: return Globe;
    }
  };

  // Node positions for the graph layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    'a6': { x: 100, y: 200 },  // external-perimeter
    'a4': { x: 250, y: 200 },  // dmz-firewall
    'a2': { x: 400, y: 120 },  // web-gateway
    'a3': { x: 400, y: 280 },  // api-server
    'a1': { x: 580, y: 200 },  // crown-jewel-db
    'a5': { x: 580, y: 340 },  // user-credentials
    'a7': { x: 720, y: 200 },  // admin_account
    'a8': { x: 100, y: 80 },   // red-c2-server
  };

  return (
    <div className="flex h-full">
      {/* Main Graph Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            World State Map
          </h2>
          <p className="text-xs text-gray-500 mt-1">Interactive asset graph • Click nodes for details</p>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 z-10 bg-gray-900/90 border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">Asset States</p>
          <div className="space-y-1.5">
            {[
              { state: 'secure', color: 'bg-green-500', label: 'Secure' },
              { state: 'exposed', color: 'bg-yellow-500', label: 'Exposed' },
              { state: 'compromised', color: 'bg-red-500', label: 'Compromised' },
              { state: 'destroyed', color: 'bg-gray-500', label: 'Destroyed' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Graph */}
        <svg className="w-full h-full" viewBox="0 0 850 450">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6,182,212,0.05)" strokeWidth="0.5" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="850" height="450" fill="url(#grid)" />

          {/* Connections */}
          {matchAssets.map(asset =>
            asset.connections.map(connId => {
              const from = nodePositions[asset.id];
              const to = nodePositions[connId];
              if (!from || !to) return null;
              const connAsset = matchAssets.find(a => a.id === connId);
              const isCompromised = asset.state === 'compromised' || connAsset?.state === 'compromised';
              return (
                <line
                  key={`${asset.id}-${connId}`}
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={isCompromised ? 'rgba(239,68,68,0.5)' : 'rgba(6,182,212,0.3)'}
                  strokeWidth={isCompromised ? 2 : 1.5}
                  strokeDasharray={isCompromised ? '5,5' : 'none'}
                  className="transition-all duration-500"
                />
              );
            })
          )}

          {/* Animated attack paths */}
          <line x1={100} y1={80} x2={100} y2={200} stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1={400} y1={280} x2={580} y2={340} stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
          </line>

          {/* Nodes */}
          {matchAssets.map(asset => {
            const pos = nodePositions[asset.id];
            if (!pos) return null;
            const colors = getStateColor(asset.state);
            const Icon = getTypeIcon(asset.type);
            const isSelected = selectedAssetId === asset.id;
            const isHovered = hoveredAsset === asset.id;
            const isCrownJewel = asset.id === 'a1';

            return (
              <g
                key={asset.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => selectAsset(asset.id)}
                onMouseEnter={() => setHoveredAsset(asset.id)}
                onMouseLeave={() => setHoveredAsset(null)}
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                {/* Glow effect */}
                <circle
                  r={isSelected || isHovered ? 32 : 26}
                  fill={colors.glow}
                  className="transition-all duration-300"
                />
                {/* Main circle */}
                <circle
                  r={24}
                  fill={colors.fill}
                  stroke={isSelected ? '#fff' : colors.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                  filter={isSelected ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />
                {/* Crown jewel indicator */}
                {isCrownJewel && (
                  <text x="0" y="-32" textAnchor="middle" fill="#fbbf24" fontSize="14">👑</text>
                )}
                {/* Icon */}
                <foreignObject x="-10" y="-10" width="20" height="20">
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </foreignObject>
                {/* Label */}
                <text x="0" y="40" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">
                  {asset.name}
                </text>
                {/* HP bar */}
                <rect x="-20" y="48" width="40" height="4" rx="2" fill="rgba(0,0,0,0.5)" />
                <rect
                  x="-20" y="48"
                  width={40 * (asset.hp / asset.maxHp)}
                  height="4" rx="2"
                  fill={asset.hp > 70 ? '#10b981' : asset.hp > 40 ? '#f59e0b' : '#ef4444'}
                />
                {/* Team indicator */}
                <circle
                  cx="18" cy="-18" r="5"
                  fill={asset.ownerTeam === 'red' ? '#ef4444' : '#3b82f6'}
                  stroke="#1f2937" strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Attack animation particles */}
          <circle r="3" fill="#ef4444" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path="M100,80 L100,200 L250,200 L400,280" />
          </circle>
          <circle r="3" fill="#ef4444" opacity="0.8">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M400,280 L580,340" begin="0.5s" />
          </circle>
        </svg>
      </div>

      {/* Right Panel - Asset Details */}
      <div className="w-80 border-l border-cyan-900/30 bg-gray-900/50 p-4 overflow-y-auto">
        {selectedAsset ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                selectedAsset.state === 'secure' ? 'bg-green-500/20' :
                selectedAsset.state === 'exposed' ? 'bg-yellow-500/20' :
                selectedAsset.state === 'compromised' ? 'bg-red-500/20' : 'bg-gray-500/20'
              }`}>
                {(() => { const Icon = getTypeIcon(selectedAsset.type); return <Icon className="w-4 h-4 text-white" />; })()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedAsset.name}</h3>
                <p className="text-xs text-gray-500">{selectedAsset.type} • {selectedAsset.ownerTeam}</p>
              </div>
            </div>

            {/* Status */}
            <div className={`p-3 rounded-lg border mb-4 ${
              selectedAsset.state === 'secure' ? 'bg-green-500/5 border-green-500/20' :
              selectedAsset.state === 'exposed' ? 'bg-yellow-500/5 border-yellow-500/20' :
              selectedAsset.state === 'compromised' ? 'bg-red-500/5 border-red-500/20' : 'bg-gray-500/5 border-gray-500/20'
            }`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${
                  selectedAsset.state === 'secure' ? 'text-green-400' :
                  selectedAsset.state === 'exposed' ? 'text-yellow-400' : 'text-red-400'
                }`} />
                <span className={`text-sm font-medium capitalize ${
                  selectedAsset.state === 'secure' ? 'text-green-400' :
                  selectedAsset.state === 'exposed' ? 'text-yellow-400' : 'text-red-400'
                }`}>{selectedAsset.state}</span>
              </div>
            </div>

            {/* HP */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Health Points</span>
                <span className="text-gray-300 font-mono">{selectedAsset.hp}/{selectedAsset.maxHp}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    selectedAsset.hp > 70 ? 'bg-green-500' :
                    selectedAsset.hp > 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(selectedAsset.hp / selectedAsset.maxHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="mb-4">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Metadata</h4>
              <div className="bg-gray-800/50 rounded-lg p-3 space-y-1.5">
                {Object.entries(selectedAsset.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-gray-500">{key}</span>
                    <span className="text-gray-300 font-mono">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connections */}
            <div className="mb-4">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Connections</h4>
              <div className="space-y-1.5">
                {selectedAsset.connections.map(connId => {
                  const connAsset = matchAssets.find(a => a.id === connId);
                  if (!connAsset) return null;
                  return (
                    <button
                      key={connId}
                      onClick={() => selectAsset(connId)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all text-left"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        connAsset.state === 'secure' ? 'bg-green-500' :
                        connAsset.state === 'exposed' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-gray-300">{connAsset.name}</span>
                      <span className="text-[10px] text-gray-500 ml-auto">{connAsset.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions on this asset */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Recent Actions</h4>
              <div className="space-y-1.5">
                {useGameStore.getState().actions
                  .filter(a => a.matchId === activeMatchId && 
                    (a.payload?.target === selectedAsset.id || a.payload?.from === selectedAsset.id || a.payload?.to === selectedAsset.id))
                  .slice(-3)
                  .map(action => (
                    <div key={action.id} className="p-2 rounded-lg bg-gray-800/30 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1 py-0.5 rounded ${
                          action.team === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>{action.team.toUpperCase()}</span>
                        <span className="text-gray-400">{action.kind}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Info className="w-12 h-12 text-gray-700 mb-3" />
            <p className="text-sm text-gray-500">Select an asset node to view details</p>
            <p className="text-xs text-gray-600 mt-1">Click on any node in the graph</p>
          </div>
        )}
      </div>
    </div>
  );
}
