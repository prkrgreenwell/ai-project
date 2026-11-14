import { useRef, useState } from 'react';

// Write plan answers -> self-grade with a rubric -> generate a copy/paste prompt for an AI.
export default function PlanActivity({ activity, completed, onComplete }) {
  const { fields, rubric, levels } = activity;
  const [ans, setAns] = useState({});
  const [rate, setRate] = useState({});
  const [out, setOut] = useState('');
  const [copied, setCopied] = useState(false);
  const outRef = useRef(null);

  const ready = fields.every((f) => (ans[f.id] || '').trim().length >= 10) && rubric.every((r) => rate[r.id]);

  function generate() {
    const plan = fields.map((f, i) => `${i + 1}. ${f.label}\nMy answer: ${ans[f.id].trim()}`).join('\n\n');
    const rub = rubric.map((r) => `- ${r.name}: ${r.strong}\n  My self-score: ${rate[r.id]} (${levels[rate[r.id] - 1]})`).join('\n');
    setOut(
`You are a supportive instructor. I wrote a plan for using AI to help me learn, and I graded it myself with a rubric. Please evaluate it.

## My AI learning plan
${plan}

## Rubric (1 = ${levels[0]}, 2 = ${levels[1]}, 3 = ${levels[2]}, 4 = ${levels[3]})
${rub}

## What I want from you
1. Score each rubric criterion from 1 to 4 and give one or two sentences of evidence from my plan.
2. Tell me where you agree or disagree with my self-scores, and why.
3. Give me a total score out of ${rubric.length * 4}.
4. Name one thing I did well and the two most important improvements.
5. Do not rewrite my plan. Ask me questions or give hints so I do the revising myself.`);
    setCopied(false);
    onComplete();
  }

  async function copy() {
    try { await navigator.clipboard.writeText(out); }
    catch { outRef.current?.select(); document.execCommand('copy'); }
    setCopied(true);
  }

  return (
    <div className="activity">
      <span className="tag">{activity.tag}</span>
      <h1>{activity.title}</h1>
      <p>{activity.intro}</p>
      {completed && !out && <p className="banner">You’ve completed this activity. You can generate your prompt again below.</p>}

      <h2 className="step-h">1. Write your plan</h2>
      {fields.map((f) => (
        <label key={f.id} className="field">
          <span>{f.label}</span>
          <textarea rows={3} value={ans[f.id] || ''} onChange={(e) => setAns({ ...ans, [f.id]: e.target.value })} />
        </label>
      ))}

      <h2 className="step-h">2. Grade yourself with the rubric</h2>
      {rubric.map((r) => (
        <div key={r.id} className="rubric-row">
          <strong>{r.name}</strong>
          <p>Strong looks like: {r.strong}</p>
          <div className="opts" role="radiogroup" aria-label={`Self-score for ${r.name}`}>
            {levels.map((lv, i) => (
              <button key={lv} type="button" role="radio" aria-checked={rate[r.id] === i + 1}
                className={`opt${rate[r.id] === i + 1 ? ' on' : ''}`} onClick={() => setRate({ ...rate, [r.id]: i + 1 })}>
                {i + 1} &middot; {lv}
              </button>
            ))}
          </div>
        </div>
      ))}

      <h2 className="step-h">3. Get feedback from your own AI</h2>
      <div className="actions">
        <button className="btn" type="button" disabled={!ready} onClick={generate}>Generate my prompt</button>
        <span className="status">{ready ? '' : 'Answer every question (at least a sentence) and score every rubric row.'}</span>
      </div>
      {out && (
        <>
          <p>Copy this prompt and paste it into your own AI assistant to get feedback and a score.</p>
          <textarea ref={outRef} className="generated" readOnly rows={16} value={out} />
          <div className="actions"><button className="btn" type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy prompt'}</button></div>
        </>
      )}
    </div>
  );
}
