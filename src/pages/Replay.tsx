import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, SkipBack, SkipForward, FastForward, Download, Share2 } from 'lucide-react';

export default function Replay() {
  const { actions, activeMatchId } = useGameStore();
  const matchActions = actions.filter(a => a.matchId === activeMatchId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= matchActions.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, speed, matchActions.length]);

  const currentAction = matchActions[currentStep];
  const progress = matchActions.length > 0 ? ((currentStep + 1) / matchActions.length) * 100 : 0;

  if (matchActions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Play className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">No replay data available</p>
          <p className="text-gray-500 text-sm">Replays will be available after matches are completed</p>
        </div>
      </div>
    );
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Play className="w-7 h-7 text-cyan-400" />
            Match Replay
          </h1>
          <p className="text-gray-500 text-sm mt-1">Replay match events with playback controls</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-gray-700 transition-all">
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-gray-700 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gray-900 border border-cyan-900/30 rounded-2xl p-6 mb-6">
        {/* Progress bar */}
        <div className="relative mb-4">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step markers */}
          <div className="absolute top-0 left-0 right-0 h-2 flex">
            {matchActions.map((_, i) => (
              <div
                key={i}
                className="flex-1 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleStepClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 transition-all"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => { setCurrentStep(matchActions.length - 1); setIsPlaying(false); }}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 transition-all"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 font-mono">
              Step {currentStep + 1} / {matchActions.length}
            </span>
            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              {[0.5, 1, 2, 4].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    speed === s ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {s}x
                </button>
              ))}
              <FastForward className="w-3 h-3 text-gray-500 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Event Display */}
      {currentAction && (
        <div className="bg-gray-900 border border-cyan-900/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
              currentAction.team === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {currentAction.team.toUpperCase()} TEAM
            </span>
            <span className="text-sm text-gray-300 font-medium">{currentAction.kind}</span>
            {currentAction.mitreId && (
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                MITRE {currentAction.mitreId}
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
              currentAction.result === 'success' ? 'bg-green-500/10 text-green-400' :
              currentAction.result === 'partial' ? 'bg-yellow-500/10 text-yellow-400' :
              currentAction.result === 'blocked' ? 'bg-blue-500/10 text-blue-400' :
              'bg-red-500/10 text-red-400'
            }`}>
              {currentAction.result.toUpperCase()}
            </span>
          </div>
          
          <p className="text-lg text-white mb-4">{currentAction.message}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-950 rounded-lg p-4">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Payload</h4>
              <pre className="text-xs text-cyan-400 font-mono">
                {JSON.stringify(currentAction.payload, null, 2)}
              </pre>
            </div>
            {currentAction.worldDiff && (
              <div className="bg-gray-950 rounded-lg p-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">World State Change</h4>
                <pre className="text-xs text-purple-400 font-mono">
                  {JSON.stringify(currentAction.worldDiff, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Strip */}
      <div className="bg-gray-900 border border-cyan-900/30 rounded-2xl p-4">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Event Sequence</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {matchActions.map((action, i) => (
            <button
              key={action.id}
              onClick={() => handleStepClick(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono transition-all ${
                i === currentStep
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 scale-110'
                  : i < currentStep
                  ? 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                  : 'bg-gray-900 text-gray-600 hover:bg-gray-800'
              } ${action.team === 'red' ? 'border-b-2 border-b-red-500/50' : 'border-b-2 border-b-blue-500/50'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
