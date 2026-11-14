// One "reading" step: title, paragraphs, optional bullets and callout.
export default function ReadingStep({ step }) {
  return (
    <article className="reading">
      <span className="tag">{step.tag}</span>
      <h1>{step.title}</h1>
      {step.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      {step.bullets && <ul>{step.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
      {step.callout && <div className="callout"><strong>{step.callout.title}</strong> {step.callout.text}</div>}
    </article>
  );
}
