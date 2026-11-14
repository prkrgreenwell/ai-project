import { Link, Navigate, useParams } from 'react-router-dom';
import { modules } from '../data/modules.jsx';
import { lessons } from '../lessons/index.js';
import Lesson from './Lesson.jsx';

export default function ModulePage() {
  const { slug, step } = useParams();
  const mod = modules.find((m) => m.slug === slug);
  const lesson = mod && lessons[mod.lesson];

  if (lesson && !step) return <Navigate to={`/module/${slug}/1`} replace />;
  if (lesson) return <Lesson module={mod} lesson={lesson} stepNumber={Number(step) || 1} />;

  return (
    <main className="soon">
      <span className="eyebrow">Coming soon</span>
      <h1>{mod ? mod.title : 'Module not found'}</h1>
      <p><Link to="/">&larr; Back to all modules</Link></p>
    </main>
  );
}
