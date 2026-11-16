// Shared two-column layout: lesson text on the left, a labeled panel (Reference / Workspace) on the right.

export function Rich({ text }) {
  // **bold** markers in lesson text become <strong>
  return text.split('**').map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : t));
}

function Blocks({ blocks = [] }) {
  return blocks.map((b, i) => {
    if (typeof b === 'string') return <p key={i}><Rich text={b} /></p>;
    if (b.goal) return <div key={i} className="goalbox"><strong>Module goal</strong><br /><Rich text={b.goal} /></div>;
    if (b.h) return <p key={i}><strong>{b.h}</strong></p>;
    if (b.ol) return <ol key={i}>{b.ol.map((x, j) => <li key={j}>{x}</li>)}</ol>;
    if (b.ul) return <ul key={i}>{b.ul.map((x, j) => <li key={j}>{x}</li>)}</ul>;
    if (b.remember) return <div key={i} className="remember"><strong>Remember!</strong>{b.remember.map((x, j) => <p key={j}>{x}</p>)}</div>;
    return null;
  });
}

export default function TwoPane({ step, label, children }) {
  return (
    <div className="panes">
      <section className="lessonpane" aria-label="Lesson">
        <h2>{step.title}</h2>
        <Blocks blocks={step.blocks} />
      </section>
      <section className="rightpane" aria-label={label}>
        <div className="panehead">{label}</div>
        <div className="panebody">{children}</div>
      </section>
    </div>
  );
}
