import { useState } from 'react';
import TwoPane from '../TwoPane.jsx';
import { roles } from '../../data/roles.js';

// Screen 1 (type 'roles'): role buttons that open a details card.
// Screen 2 (type 'table'): role -> goal table.
export default function ReferenceScreen({ step }) {
  const [open, setOpen] = useState(null);
  const role = roles.find((r) => r.id === open);

  return (
    <TwoPane step={step} label="Reference">
      {step.type === 'roles' ? (
        <>
          <h3 className="rp-title">Roles AI can play</h3>
          {role && (
            <div className="detail">
              <div className="detail-head">
                <strong>{role.name}</strong>
                <button type="button" className="btn ghost small" onClick={() => setOpen(null)}>Close &times;</button>
              </div>
              <p>{role.desc}</p>
              <div className="example"><strong>Example prompt</strong><p>&ldquo;{role.example}&rdquo;</p></div>
            </div>
          )}
          <div className="rolegrid">
            {roles.map((r) => (
              <button key={r.id} type="button" className={`rolebtn${open === r.id ? ' on' : ''}`}
                aria-pressed={open === r.id} onClick={() => setOpen(r.id)}>{r.name}</button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="rp-title">Match the role to your goal</h3>
          <div className="rtable">
            {roles.map((r) => (
              <div key={r.id} className="rrow"><strong>{r.name}</strong><span aria-hidden="true">&rarr;</span><span>{r.goal}</span></div>
            ))}
          </div>
        </>
      )}
    </TwoPane>
  );
}
