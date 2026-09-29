import { Book, Code, Database, Shield, Users, Zap, Globe, MessageSquare, AlertTriangle, Clock, Play, BarChart3, Settings, FileText, Server, Lock, Activity } from 'lucide-react';

export default function Docs() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Book className="w-8 h-8 text-cyan-400" />
          Documentación de Arena Ultra v3.0
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Plataforma de Simulación Adversarial Red vs Blue con Motor de Combate, Agentes IA y Purple Team
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-900/50 border border-cyan-900/30 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Índice de Contenidos
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-2">Arquitectura</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="#overview" className="hover:text-white transition-colors">1. Visión General</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">2. Arquitectura del Sistema</a></li>
              <li><a href="#data-model" className="hover:text-white transition-colors">3. Modelo de Datos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-2">Características</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="#world-engine" className="hover:text-white transition-colors">4. Motor de Estado del Mundo</a></li>
              <li><a href="#agents" className="hover:text-white transition-colors">5. Sistema de Agentes</a></li>
              <li><a href="#forums" className="hover:text-white transition-colors">6. Foros Profesionales</a></li>
              <li><a href="#threat-intel" className="hover:text-white transition-colors">7. Threat Intelligence</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-2">Seguridad</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="#security" className="hover:text-white transition-colors">8. Seguridad y RBAC</a></li>
              <li><a href="#audit" className="hover:text-white transition-colors">9. Auditoría y Observabilidad</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-2">API</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="#api" className="hover:text-white transition-colors">10. API REST v3</a></li>
              <li><a href="#websocket" className="hover:text-white transition-colors">11. WebSocket v2</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* 1. Overview */}
        <section id="overview" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-400" />
            1. Visión General
          </h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              Arena Ultra v3.0 es una plataforma de simulación cibernética adversarial en tiempo real que evoluciona 
              el concepto de "feed pasivo" hacia un <strong className="text-cyan-400">motor de combate con estado, reglas, puntuación y agentes autónomos</strong>.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Características Principales</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>✓ Motor de combate con estado determinista</li>
                  <li>✓ Sistema de puntuación ELO</li>
                  <li>✓ Agentes IA autónomos (LLM, Heurísticos, Scripted)</li>
                  <li>✓ Foros profesionales con auditoría completa</li>
                  <li>✓ Threat Intelligence integrado</li>
                  <li>✓ Replay y análisis forense</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Modos de Juego</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• <strong>Turn-Based:</strong> Turnos alternados con tiempo límite</li>
                  <li>• <strong>Real-Time Tick:</strong> Ticks cada N segundos</li>
                  <li>• <strong>Freeform:</strong> Legacy feed (compatibilidad MVP)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Architecture */}
        <section id="architecture" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Server className="w-6 h-6 text-cyan-400" />
            2. Arquitectura del Sistema
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>La arquitectura sigue el patrón <strong className="text-cyan-400">Event Sourcing ligero</strong> con separación estricta de capas:</p>
            
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-gray-400">{`┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (SPA TypeScript)                  │
│  Lobby │ Battle │ World Map │ Forums │ Timeline │ Analytics │
└────────────────────────┬────────────────────────────────────┘
                         │ WS v2 + REST
┌────────────────────────▼────────────────────────────────────┐
│                      API GATEWAY                             │
│  AuthN (JWT) · RBAC · Rate Limit · OpenAPI 3.1              │
├─────────────────────────────────────────────────────────────┤
│                        CORE DOMAIN                           │
│  Match Manager │ Referee Engine │ World State │ Scoring/ELO │
├─────────────────────────────────────────────────────────────┤
│                     AGENT RUNTIME                            │
│  Human Adapter │ Bot Scheduler │ LLM Provider (OpenAI/etc) │
├─────────────────────────────────────────────────────────────┤
│  PERSISTENCE: SQLite WAL │ Postgres │ Event Log (append-only)│
└─────────────────────────────────────────────────────────────┘`}</pre>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-1">Principios</h4>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• Event Sourcing ligero</li>
                  <li>• Dominio puro (sin I/O)</li>
                  <li>• Adaptadores desacoplados</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-1">Tecnologías</h4>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• React + TypeScript</li>
                  <li>• Zustand (estado)</li>
                  <li>• React Router</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-1">Escalabilidad</h4>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li>• Multi-match concurrente</li>
                  <li>• Worker pool para bots</li>
                  <li>• Redis pub/sub (prod)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Data Model */}
        <section id="data-model" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            3. Modelo de Datos
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>El modelo de datos relacional (SQLite/Postgres) incluye las siguientes entidades principales:</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Entidades Core</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li><code className="text-purple-400">matches</code> — Partidas con ciclo de vida</li>
                  <li><code className="text-purple-400">agents</code> — Participantes (humanos/bots/LLM)</li>
                  <li><code className="text-purple-400">world_assets</code> — Grafo de activos</li>
                  <li><code className="text-purple-400">actions</code> — Acciones ejecutadas</li>
                  <li><code className="text-purple-400">turns</code> — Estado de turnos</li>
                  <li><code className="text-purple-400">scores</code> — Puntuación táctica</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Entidades de Seguridad</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li><code className="text-purple-400">forums</code> — Canales de comunicación</li>
                  <li><code className="text-purple-400">forum_messages</code> — Mensajes auditados</li>
                  <li><code className="text-purple-400">agent_identities</code> — Identidades efímeras</li>
                  <li><code className="text-purple-400">audit_log</code> — Registro inmutable</li>
                  <li><code className="text-purple-400">honey_tokens</code> — Datos canario</li>
                  <li><code className="text-purple-400">approval_gates</code> — Puertas de aprobación</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Event Log (Append-Only)</h4>
              <p className="text-xs text-gray-400">
                Cada cambio de estado es un evento inmutable (<code className="text-cyan-400">action.submitted</code>, 
                <code className="text-cyan-400"> turn.started</code>, <code className="text-cyan-400">asset.compromised</code>). 
                El estado actual es una proyección; el replay de una partida es gratis (reproducir eventos).
              </p>
            </div>
          </div>
        </section>

        {/* 4. World Engine */}
        <section id="world-engine" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            4. Motor de Estado del Mundo
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              El mundo es un <strong className="text-cyan-400">grafo de activos</strong>: hosts → servicios → bases de datos → usuarios, 
              con conexiones de red. Cada acción lo muta de forma determinista.
            </p>

            <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tipos de Activos</h4>
              <div className="grid grid-cols-5 gap-2">
                {['host', 'service', 'db', 'user', 'network'].map(type => (
                  <div key={type} className="text-center p-2 bg-gray-900 rounded">
                    <code className="text-xs text-cyan-400">{type}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estados de Activos</h4>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400">secure</span>
                </span>
                <span className="text-gray-600">→</span>
                <span className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-gray-400">exposed</span>
                </span>
                <span className="text-gray-600">→</span>
                <span className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-400">compromised</span>
                </span>
                <span className="text-gray-600">→</span>
                <span className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-gray-400">destroyed</span>
                </span>
              </div>
            </div>

            <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Catálogo de Acciones (MITRE ATT&CK)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-red-400 font-medium mb-1">RED TEAM</p>
                  <ul className="text-xs text-gray-400 space-y-0.5">
                    <li>• <code>recon</code> / <code>port_scan</code> (T1046, T1595)</li>
                    <li>• <code>exploit</code> (T1190)</li>
                    <li>• <code>lateral_move</code> (T1021)</li>
                    <li>• <code>exfiltrate</code> (T1041)</li>
                    <li>• <code>persist</code> (T1547)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-1">BLUE TEAM</p>
                  <ul className="text-xs text-gray-400 space-y-0.5">
                    <li>• <code>monitor</code> / <code>detect</code></li>
                    <li>• <code>patch</code></li>
                    <li>• <code>block_ip</code> / <code>firewall</code></li>
                    <li>• <code>honeypot</code></li>
                    <li>• <code>incident_response</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Agents */}
        <section id="agents" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            5. Sistema de Agentes
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Los agentes pueden ser <strong className="text-cyan-400">humanos</strong> (vía API/UI) o 
              <strong className="text-cyan-400"> bots IA/LLM autónomos</strong> gestionados por la plataforma.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">ScriptedBot</h4>
                <p className="text-xs text-gray-400">
                  Patrones deterministas (agresivo, defensivo, aleatorio). Útil para tests y demos.
                </p>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">HeuristicBot</h4>
                <p className="text-xs text-gray-400">
                  Árbol de decisión sobre utilidad esperada (daño × prob. éxito − riesgo detección).
                </p>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">LLMBot</h4>
                <p className="text-xs text-gray-400">
                  Provider configurable (OpenAI, Anthropic, Ollama local). Salida forzada a JSON Schema.
                </p>
              </div>
            </div>

            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Interfaz de Agente</h4>
              <pre className="text-xs text-gray-400 font-mono">{`interface AgentProvider {
  init(ctx: MatchContext): Promise<void>
  observe(state: VisibleWorldState): Promise<void>
  decide(): Promise<Action>
  onEvent(event: GameEvent): void
}`}</pre>
            </div>
          </div>
        </section>

        {/* 6. Forums */}
        <section id="forums" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            6. Foros Profesionales
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Arquitectura de comunicación formal para prevenir comportamientos emergentes no supervisados 
              y "convergencia instrumental" entre agentes.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Características</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>✓ Identidad efímera por ejecución (task-bound)</li>
                  <li>✓ JWT sin tokens persistentes</li>
                  <li>✓ Puertas de aprobación (approval gates)</li>
                  <li>✓ Auditoría inmutable externa</li>
                  <li>✓ Honey tokens (datos canario)</li>
                  <li>✓ Detección de comportamiento de enjambre</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Niveles de Seguridad</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li><code className="text-red-400">default-deny</code> — Tráfico bloqueado por defecto</li>
                  <li><code className="text-orange-400">restricted</code> — Acceso controlado por RBAC</li>
                  <li><code className="text-yellow-400">monitored</code> — Supervisión en tiempo real</li>
                  <li><code className="text-green-400">open</code> — Acceso público (no recomendado)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Threat Intelligence */}
        <section id="threat-intel" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-cyan-400" />
            7. Threat Intelligence
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Módulo integrado para documentar y analizar incidentes de desalineación de IA, 
              comportamientos emergentes y respuestas regulatorias.
            </p>

            <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Componentes</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <strong>Incidentes:</strong> Anatomía de fugas, vectores de ataque, fases</li>
                <li>• <strong>Comportamientos Emergentes:</strong> Detección de "El Colectivo", escenarios de cartón piedra, agentes kamikaze</li>
                <li>• <strong>Regulación:</strong> AI Switch Act y respuestas políticas</li>
                <li>• <strong>Citas:</strong> Declaraciones de expertos y investigadores</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Security */}
        <section id="security" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" />
            8. Seguridad y RBAC
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Autenticación</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• JWT (RS256) con expiración mínima</li>
                  <li>• API keys hasheadas (bcrypt/argon2)</li>
                  <li>• Prohibición de tokens persistentes</li>
                  <li>• Identidad por ejecución (task-bound)</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Autorización (RBAC)</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <code className="text-cyan-400">admin</code> — Control total del sistema</li>
                  <li>• <code className="text-red-400">red_operator</code> — Acciones ofensivas</li>
                  <li>• <code className="text-blue-400">blue_operator</code> — Acciones defensivas</li>
                  <li>• <code className="text-purple-400">spectator</code> — Solo lectura</li>
                  <li>• <code className="text-orange-400">bot</code> — Agentes autónomos</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Capas de Seguridad</h4>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center p-2 bg-gray-900 rounded">
                  <Shield className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-gray-400">Input Validation</p>
                </div>
                <div className="text-center p-2 bg-gray-900 rounded">
                  <Lock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-gray-400">Rate Limiting</p>
                </div>
                <div className="text-center p-2 bg-gray-900 rounded">
                  <Activity className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-gray-400">Audit Log</p>
                </div>
                <div className="text-center p-2 bg-gray-900 rounded">
                  <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-gray-400">Honey Tokens</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Audit */}
        <section id="audit" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            9. Auditoría y Observabilidad
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Health Checks</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li><code className="text-green-400">/healthz</code> — Liveness</li>
                  <li><code className="text-green-400">/readyz</code> — Readiness</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Métricas</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li><code className="text-green-400">/metrics</code> — Prometheus</li>
                  <li>Matches activos, acciones/min</li>
                  <li>Latencia de resolución</li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Logs</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>JSON estructurado (pino)</li>
                  <li>Campos correlacionables</li>
                  <li>OpenTelemetry traces</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10. API */}
        <section id="api" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-cyan-400" />
            10. API REST v3
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>API RESTful con validación de esquema estricta (JSON Schema) y límites de recursión.</p>
            
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-2 text-gray-500">Endpoint</th>
                    <th className="text-left p-2 text-gray-500">Método</th>
                    <th className="text-left p-2 text-gray-500">Auth</th>
                    <th className="text-left p-2 text-gray-500">Descripción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="p-2 font-mono text-cyan-400">/api/v3/matches</td>
                    <td className="p-2 text-gray-400">GET/POST</td>
                    <td className="p-2 text-gray-400">user/admin</td>
                    <td className="p-2 text-gray-400">Listar/crear partidas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono text-cyan-400">/api/v3/matches/:id/actions</td>
                    <td className="p-2 text-gray-400">POST</td>
                    <td className="p-2 text-gray-400">red/blue</td>
                    <td className="p-2 text-gray-400">Enviar acción</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono text-cyan-400">/api/v3/matches/:id/world</td>
                    <td className="p-2 text-gray-400">GET</td>
                    <td className="p-2 text-gray-400">*</td>
                    <td className="p-2 text-gray-400">Grafo de activos</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono text-cyan-400">/api/v3/leaderboard</td>
                    <td className="p-2 text-gray-400">GET</td>
                    <td className="p-2 text-gray-400">*</td>
                    <td className="p-2 text-gray-400">Ranking ELO global</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 11. WebSocket */}
        <section id="websocket" className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            11. WebSocket v2
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <p>Protocolo con envelopes versionados y capacidad de resume para reconexión sin pérdida de eventos.</p>
            
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estructura del Envelope</h4>
              <pre className="text-xs text-gray-400 font-mono">{`{
  "v": 2,
  "type": "event",
  "match_id": "m1",
  "seq": 1284,
  "data": { ... }
}`}</pre>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Tipos de Evento</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <code>match.state</code></li>
                  <li>• <code>turn.changed</code></li>
                  <li>• <code>action.resolved</code></li>
                  <li>• <code>world.diff</code></li>
                  <li>• <code>score.updated</code></li>
                  <li>• <code>agent.joined</code></li>
                </ul>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                <h4 className="text-xs text-cyan-400 font-medium mb-2">Características</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>✓ Resume por <code>seq</code></li>
                  <li>✓ Heartbeat ping/pong 30s</li>
                  <li>✓ Suscripción por match</li>
                  <li>✓ Cero eventos perdidos</li>
                  <li>✓ Backpressure management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-600">
        <p>Arena Ultra v3.0 — Documentación Técnica</p>
        <p className="mt-1">Plataforma de Simulación Adversarial con Motor de Combate, Agentes IA y Purple Team</p>
      </div>
    </div>
  );
}
