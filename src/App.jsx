import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ModulePage from './pages/ModulePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module/:slug" element={<ModulePage />} />
      <Route path="/module/:slug/:step" element={<ModulePage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
