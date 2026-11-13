import { useEffect, useRef, useState } from 'react';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

export default function ChatPane({ lesson, onResult }) {
  const [msgs, setMsgs] = useState([{ role: 'ai', parts: [lesson.greeting] }]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [msgs]);

  const updateLast = (fn) => setMsgs((m) => { const c = m.slice(); c[c.length - 1] = fn(c[c.length - 1]); return c; });

  async function send() {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true); setText('');
    setMsgs((m) => [...m, { role: 'user', parts: [value], plain: true }, { role: 'ai', parts: [], typing: true }]);
    const hit = {}; let n = 0;
    for (const k of Object.keys(lesson.rules)) { hit[k] = lesson.rules[k].test(value); if (hit[k]) n++; }
    await wait(900);
    updateLast((a) => ({ ...a, typing: false }));
    for (const part of lesson.reply(hit)) {
      updateLast((a) => ({ ...a, parts: [...a.parts, part] }));
      await wait(450);
    }
    updateLast((a) => ({ ...a, feedback: { hit, n } }));
    onResult(n);
    setBusy(false);
  }

  return (
    <section className="chatpane" aria-label="AI practice chat">
      <div className="chathead">Practice AI <small>simulated demo</small></div>
      <div className="chat" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === 'ai' && <div className="avatar">AI</div>}
            <div className="bubble">
              {m.typing && <span className="typing"><span /><span /><span /></span>}
              {m.parts.map((p, j) => m.plain ? p : <p key={j} dangerouslySetInnerHTML={{ __html: p }} />)}
              {m.feedback && (
                <div className="fb">
                  <strong>Lesson feedback</strong>
                  {Object.keys(lesson.labels).map((k) => (
                    <div key={k} className={m.feedback.hit[k] ? 'ok' : 'miss'}>
                      <span>{m.feedback.hit[k] ? '\u2713' : '!'}</span><span>{lesson.labels[k]}</span>
                    </div>
                  ))}
                  <div className={m.feedback.n === 4 ? 'ok' : 'miss'}><span /><span>
                    {m.feedback.n === 4 ? 'Nice work: all four habits used.' : 'Revise your prompt to cover the items marked “!” and send it again.'}
                  </span></div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={end} />
      </div>
      <div className="composer">
        <div className="box">
          <textarea rows={2} value={text} placeholder="Message the practice AI…" aria-label="Your prompt"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
          <button className="send" type="button" aria-label="Send" disabled={busy} onClick={send}>
            <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </div>
        <div className="note">Responses are simulated. Press Enter to send, Shift+Enter for a new line.</div>
      </div>
    </section>
  );
}
