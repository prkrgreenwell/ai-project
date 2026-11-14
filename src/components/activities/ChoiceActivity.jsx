import { useState } from 'react';

// Used by both the good/bad sorting activity and the AI-role matching activity.
// Each item has a `correct` option value; `options` are the buttons to choose from.
export default function ChoiceActivity({ activity, completed, onComplete }) {
  const { items, options } = activity;
  const [answers, setAnswers] = useState(() => items.map((it) => (completed ? it.correct : null)));
  const [results, setResults] = useState(() => items.map(() => (completed ? true : null)));

  const allAnswered = answers.every(Boolean);
  const allRight = results.every((r) => r === true);
  const wrong = results.filter((r) => r === false).length;

  const pick = (i, value) => {
    setAnswers((a) => a.map((x, j) => (j === i ? value : x)));
    setResults((r) => r.map((x, j) => (j === i ? null : x)));
  };
  const check = () => {
    const r = items.map((it, i) => answers[i] === it.correct);
    setResults(r);
    if (r.every(Boolean)) onComplete();
  };

  return (
    <div className="activity">
      <span className="tag">{activity.tag}</span>
      <h1>{activity.title}</h1>
      <p>{activity.intro}</p>

      {items.map((it, i) => (
        <div key={i} className={`item${results[i] === true ? ' right' : results[i] === false ? ' wrong' : ''}`}>
          <p className="item-text">{it.text}</p>
          <div className="opts" role="radiogroup" aria-label={`Answer for item ${i + 1}`}>
            {options.map((o) => (
              <button key={o.value} type="button" role="radio" aria-checked={answers[i] === o.value}
                className={`opt${answers[i] === o.value ? ' on' : ''}`} onClick={() => pick(i, o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          {results[i] !== null && <p className="why">{results[i] ? '\u2713 ' : '\u2717 Not quite. '}{it.why}</p>}
        </div>
      ))}

      <div className="actions">
        <button className="btn" type="button" disabled={!allAnswered || allRight} onClick={check}>Check answers</button>
        <span className="status">
          {allRight ? 'All correct. You can continue.' : wrong ? `${wrong} to fix. Change your answers and check again.` : !allAnswered ? 'Answer every item to check.' : ''}
        </span>
      </div>
    </div>
  );
}
