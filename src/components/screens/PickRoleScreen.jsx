import { useState } from 'react';
import TwoPane from '../TwoPane.jsx';

// Three scenarios; pick the role that fits. Finishing all three completes the step.
export default function PickRoleScreen({ step, completed, onComplete }) {
  const { scenarios } = step;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(!!completed);
  const sc = scenarios[i];
  const ok = picked !== null && picked === sc.correct;

  const next = () => {
    if (i < scenarios.length - 1) { setI(i + 1); setPicked(null); }
    else { setDone(true); onComplete(); }
  };

  return (
    <TwoPane step={step} label="Workspace">
      {done ? (
        <>
          <h3 className="rp-title">All scenarios complete</h3>
          <p>You matched a role to each situation. Use <strong>Next</strong> to continue.</p>
          <ul>{scenarios.map((s, k) => <li key={k}>Scenario {k + 1}: <strong>{s.correct}</strong></li>)}</ul>
        </>
      ) : (
        <>
          <h3 className="rp-title">Scenario {i + 1} of {scenarios.length}</h3>
          <div className="scard">
            <p>{sc.text}</p>
            <div className="pills">
              {sc.options.map((o) => (
                <button key={o} type="button" disabled={picked !== null} className={`pill${picked === o ? ' on' : ''}`}
                  onClick={() => setPicked(o)}>{o}</button>
              ))}
            </div>
          </div>
          {picked !== null && (
            <div className={`fbcard ${ok ? 'ok' : 'try'}`} role="status">
              <h4>{ok ? `${picked} fits` : 'Try another role'}</h4>
              <p>{ok ? sc.fits : sc.hint}</p>
              <button type="button" className="btn" onClick={ok ? next : () => setPicked(null)}>
                {ok ? (i < scenarios.length - 1 ? 'Next \u2192' : 'Done') : 'Try again'}
              </button>
            </div>
          )}
          <p className="caption">Scenario {i + 1} of {scenarios.length}</p>
        </>
      )}
    </TwoPane>
  );
}
