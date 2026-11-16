import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ScreenStep from "../components/ScreenStep.jsx";
import { useProgress } from "../hooks/useProgress.js";

export default function Lesson({ module, lesson, stepNumber }) {
  const navigate = useNavigate();
  const { done, complete } = useProgress(lesson.id);

  const total = lesson.steps.length;
  const index = Math.min(Math.max(stepNumber, 1), total) - 1;
  const step = lesson.steps[index];
  const stepDone = !!step.gated && done.includes(step.id);

  // Furthest screen the learner may open: up to the first unfinished gated screen.
  const firstOpen = lesson.steps.findIndex(
    (s) => s.gated && !done.includes(s.id),
  );
  const maxIndex = firstOpen === -1 ? total - 1 : firstOpen;

  const go = (n) => navigate(`/module/${module.slug}/${n}`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  if (index > maxIndex)
    return <Navigate to={`/module/${module.slug}/${maxIndex + 1}`} replace />;

  const canAdvance = !step.gated || stepDone;
  const isLast = index === total - 1;

  return (
    <div className="lesson">
      <div className="topbar">
        <Link to="/">&larr; All modules</Link>
        <span className="crumb">{module.title}</span>
        <span className="prog">
          Screen {index + 1} of {total}
        </span>
      </div>

      <nav className="stepper" aria-label="Screens">
        {lesson.steps.map((s, i) => {
          const finished = s.gated ? done.includes(s.id) : i < maxIndex;
          const locked = i > maxIndex;
          const cls = [
            "stepdot",
            s.gated ? "act" : "",
            finished ? "done" : "",
            locked ? "locked" : "",
            i === index ? "current" : "",
          ].join(" ");
          return (
            <span key={s.id} className="stepwrap">
              <button
                type="button"
                className={cls}
                disabled={locked}
                aria-current={i === index ? "step" : undefined}
                title={`${s.title}${locked ? " (locked)" : ""}`}
                onClick={() => go(i + 1)}
              >
                {locked ? "\u{1F512}" : finished ? "\u2713" : i + 1}
              </button>
            </span>
          );
        })}
      </nav>

      <div className="stepbody">
        <ScreenStep
          key={step.id}
          step={step}
          completed={stepDone}
          onComplete={() => complete(step.id)}
        />
      </div>

      <div className="lessonnav">
        <button
          className="btn ghost"
          type="button"
          disabled={index === 0}
          onClick={() => go(index)}
        >
          &larr; Back
        </button>
        <span className="toast">
          {step.gated && !stepDone
            ? "Complete this activity to continue."
            : step.title}
        </span>
        {isLast ? (
          <button className="btn" type="button" onClick={() => navigate("/")}>
            Finish
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            disabled={!canAdvance}
            onClick={() => go(index + 2)}
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
