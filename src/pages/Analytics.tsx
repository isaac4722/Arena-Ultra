import { BarChart3, TrendingUp, Shield, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyticsData } from '../data/mockData';

export default function Analytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-cyan-400" />
          Match Analytics
        </h1>
        <p className="text-gray-500 text-sm mt-1">Performance metrics, detection rates, and MITRE technique analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Actions', value: '12', icon: Target, color: 'cyan', change: '+3 last turn' },
          { label: 'Detection Rate', value: '85%', icon: TrendingUp, color: 'green', change: '+5% vs avg' },
          { label: 'Assets Compromised', value: '2/7', icon: Shield, color: 'red', change: '29% of total' },
          { label: 'Avg Turn Time', value: '42s', icon: BarChart3, color: 'purple', change: '-8s vs baseline' },
        ].map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 text-${color}-400/50`} />
              <span className="text-xs text-gray-500">{change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Actions per Minute */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Actions per Minute by Team</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData.actionsPerMinute}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} />
              <YAxis stroke="#6b7280" fontSize={10} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="red" stroke="#ef4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} name="Red Team" />
              <Area type="monotone" dataKey="blue" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" strokeWidth={2} name="Blue Team" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Detection Rate Over Time */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Detection Rate Over Turns</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analyticsData.detectionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="turn" stroke="#6b7280" fontSize={10} />
              <YAxis stroke="#6b7280" fontSize={10} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="Detection %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* HP Aggregated */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Aggregate HP by Team</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData.hpAggregated}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="turn" stroke="#6b7280" fontSize={10} />
              <YAxis stroke="#6b7280" fontSize={10} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="red" stroke="#ef4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} name="Red HP" />
              <Area type="monotone" dataKey="blue" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" strokeWidth={2} name="Blue HP" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MITRE Technique Heatmap */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">MITRE ATT&CK Technique Usage</h3>
          <div className="space-y-3">
            {analyticsData.mitreHeatmap.map(({ technique, count, severity }) => (
              <div key={technique} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono w-12">{technique}</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all ${
                      severity === 'critical' ? 'bg-gradient-to-r from-red-600 to-red-400' :
                      severity === 'high' ? 'bg-gradient-to-r from-orange-600 to-orange-400' :
                      severity === 'medium' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                      'bg-gradient-to-r from-green-600 to-green-400'
                    }`}
                    style={{ width: `${(count / 5) * 100}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">{count}x</span>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                  severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                  severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-green-500/10 text-green-400'
                }`}>{severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Win Rate by Bot Type */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Win Rate by Agent Type</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            { type: 'LLM (Red)', winRate: 85 },
            { type: 'Heuristic (Red)', winRate: 62 },
            { type: 'Human (Red)', winRate: 64 },
            { type: 'LLM (Blue)', winRate: 72 },
            { type: 'Heuristic (Blue)', winRate: 43 },
            { type: 'Human (Blue)', winRate: 65 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="type" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={10} unit="%" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Bar dataKey="winRate" fill="rgba(6,182,212,0.5)" radius={[4, 4, 0, 0]} name="Win Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
