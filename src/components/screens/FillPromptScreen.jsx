import { useState } from 'react';
import TwoPane from '../TwoPane.jsx';

// Fill three blanks in a prompt, one at a time. The last correct choice completes the step.
export default function FillPromptScreen({ step, completed, onComplete }) {
  const { blanks, lines } = step;
  const [idx, setIdx] = useState(completed ? blanks.length : 0);
  const [hint, setHint] = useState(null);
  const finished = idx >= blanks.length;

  const choose = (k) => {
    if (k !== blanks[idx].correct) { setHint(blanks[idx].hint); return; }
    setHint(null);
    setIdx(idx + 1);
    if (idx + 1 >= blanks.length) onComplete();
  };

  return (
    <TwoPane step={step} label="Workspace">
      <h3 className="rp-title">{finished ? 'Your completed prompt' : 'Fill in the prompt'}</h3>
      <p>{step.intro}</p>
      <div className="promptbox">
        {lines.map((l, j) => (
          <p key={j}>{l.pre}{j < idx ? blanks[j].options[blanks[j].correct] : <span className="blank" />}{l.post}</p>
        ))}
      </div>
      {finished ? (
        <p>{step.closing}</p>
      ) : (
        <>
          <p><strong>{blanks[idx].question}</strong></p>
          <div className="pills one">
            {blanks[idx].options.map((o, k) => <button key={o} type="button" className="pill" onClick={() => choose(k)}>{o}</button>)}
          </div>
          {hint && <div className="fbcard try" role="status"><h4>Try another choice</h4><p>{hint}</p></div>}
          <p className="caption">Blank {idx + 1} of {blanks.length}</p>
        </>
      )}
    </TwoPane>
  );
}
