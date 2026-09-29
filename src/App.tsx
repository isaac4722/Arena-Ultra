import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Lobby from './pages/Lobby';
import Battle from './pages/Battle';
import WorldMap from './pages/WorldMap';
import Forums from './pages/Forums';
import ThreatIntelligence from './pages/ThreatIntelligence';
import Timeline from './pages/Timeline';
import Replay from './pages/Replay';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';
import Docs from './pages/Docs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Lobby />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/world" element={<WorldMap />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/threats" element={<ThreatIntelligence />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/replay" element={<Replay />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
