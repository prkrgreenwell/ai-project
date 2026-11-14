import { useState } from 'react';

export default function LessonPane({ lesson }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <section className="lessonpane" aria-label="Lesson space">
      <span className="tag">{lesson.tag}</span>
      <h2>{lesson.title}</h2>
      <p>{lesson.intro}</p>
      <h3>Four habits of a learning prompt</h3>
      <ul>
        {lesson.habits.map(([b, t]) => <li key={b}><strong>{b}</strong> {t}</li>)}
      </ul>
      <h3>Your scenario</h3>
      <div className="task">{lesson.task}</div>
      <button className="btn ghost" type="button" onClick={() => setShowHint(!showHint)}>
        {showHint ? 'Hide hint' : 'Show a hint'}
      </button>
      <p className={`hint${showHint ? ' show' : ''}`}>{lesson.hint}</p>
    </section>
  );
}
