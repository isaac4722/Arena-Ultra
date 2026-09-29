import { NavLink, Outlet } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import {
  Shield, Swords, Globe, Clock, Play, BarChart3, Settings, MessageSquare,
  Bell, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Shield, label: 'Lobby' },
  { path: '/battle', icon: Swords, label: 'Battle' },
  { path: '/world', icon: Globe, label: 'World Map' },
  { path: '/forums', icon: MessageSquare, label: 'Forums' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/replay', icon: Play, label: 'Replay' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin', icon: Settings, label: 'Admin' },
];

export default function Layout() {
  const { sidebarCollapsed, toggleSidebar, notifications } = useGameStore();

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-56'} flex flex-col bg-gray-900/80 border-r border-cyan-900/30 transition-all duration-300 relative`}>
        {/* Logo */}
        <div className="p-4 border-b border-cyan-900/30 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-sm font-bold text-cyan-400 tracking-wider">ARENA ULTRA</h1>
              <p className="text-[10px] text-gray-500">v3.0 — Adversarial Sim</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-800 border border-cyan-900/50 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Status */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-cyan-900/30">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-400">System Online</span>
            </div>
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="text-gray-500">WS v2 • seq:1284</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 border-b border-cyan-900/30 bg-gray-900/50 flex items-center justify-between px-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 font-mono">MATCH: Operation Nightfall</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">ACTIVE</span>
            <span className="text-xs text-gray-500">Turn 12/50</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 text-gray-400" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-[8px] flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
              <span className="text-xs text-gray-300">Spectator</span>
            </div>
          </div>
        </header>



        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
