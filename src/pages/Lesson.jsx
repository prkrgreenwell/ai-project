import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ReadingStep from '../components/ReadingStep.jsx';
import ActivityStep from '../components/ActivityStep.jsx';
import { useProgress } from '../hooks/useProgress.js';

export default function Lesson({ module, lesson, stepNumber }) {
  const navigate = useNavigate();
  const { done, complete } = useProgress(lesson.id);

  const total = lesson.steps.length;
  const index = Math.min(Math.max(stepNumber, 1), total) - 1;
  const step = lesson.steps[index];
  const isActivity = step.type !== 'reading';
  const stepDone = isActivity && done.includes(step.id);

  // Furthest step the learner may open: up to the first unfinished activity.
  const firstOpen = lesson.steps.findIndex((s) => s.type !== 'reading' && !done.includes(s.id));
  const maxIndex = firstOpen === -1 ? total - 1 : firstOpen;

  const go = (n) => navigate(`/module/${module.slug}/${n}`);
  useEffect(() => { window.scrollTo(0, 0); }, [index]);

  if (index > maxIndex) return <Navigate to={`/module/${module.slug}/${maxIndex + 1}`} replace />;

  const canAdvance = !isActivity || stepDone;
  const isLast = index === total - 1;

  return (
    <div className="lesson">
      <div className="topbar">
        <Link to="/">&larr; All modules</Link>
        <span className="crumb">{module.title} &rsaquo; Part {step.section} of {lesson.sections}</span>
        <span className="prog">Step {index + 1} of {total}</span>
      </div>

      <nav className="stepper" aria-label="Lesson steps">
        {lesson.steps.map((s, i) => {
          const act = s.type !== 'reading';
          const finished = act ? done.includes(s.id) : i < maxIndex;
          const locked = i > maxIndex;
          const cls = ['stepdot', act ? 'act' : '', finished ? 'done' : '', locked ? 'locked' : '', i === index ? 'current' : ''].join(' ');
          return (
            <span key={i} className="stepwrap">
              {i > 0 && s.section !== lesson.steps[i - 1].section && <span className="stepgap" />}
              <button type="button" className={cls} disabled={locked} aria-current={i === index ? 'step' : undefined}
                title={`${act ? 'Activity: ' : ''}${s.title}${locked ? ' (locked)' : ''}`} onClick={() => go(i + 1)}>
                {locked ? '\u{1F512}' : finished ? '\u2713' : act ? '\u2605' : i + 1}
              </button>
            </span>
          );
        })}
      </nav>

      <div className="stepbody">
        {isActivity
          ? <ActivityStep key={step.id} activity={step} completed={stepDone} onComplete={() => complete(step.id)} />
          : <ReadingStep step={step} />}
      </div>

      <div className="lessonnav">
        <button className="btn ghost" type="button" disabled={index === 0} onClick={() => go(index)}>&larr; Back</button>
        <span className="toast">{isActivity && !stepDone ? 'Complete this activity to continue.' : step.title}</span>
        {isLast
          ? <button className="btn" type="button" disabled={!canAdvance} onClick={() => navigate('/')}>Finish module</button>
          : <button className="btn" type="button" disabled={!canAdvance} onClick={() => go(index + 2)}>Next &rarr;</button>}
      </div>
    </div>
  );
}
