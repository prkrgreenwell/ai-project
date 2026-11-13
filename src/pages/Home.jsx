import ModuleCard from '../components/ModuleCard.jsx';
import { modules } from '../data/modules.jsx';

export default function Home() {
  return (
    <>
      <header className="intro">
        <span className="eyebrow">Responsible AI Use</span>
        <h1>Learn to Use AI Responsibly</h1>
        <p>Six short modules to help you understand what AI can and can’t do, and how to use it in ways that strengthen your learning instead of shortcutting it.</p>
        <div className="rule" />
      </header>
      <main className="modules">
        <div className="modules-inner">
          <div className="section-head">
            <span className="eyebrow">Learn &amp; Explore</span>
            <h2>Choose a Module</h2>
            <p>Start anywhere. Each module stands on its own.</p>
          </div>
          <div className="grid">
            {modules.map((m) => <ModuleCard key={m.slug} module={m} />)}
          </div>
        </div>
      </main>
    </>
  );
}
