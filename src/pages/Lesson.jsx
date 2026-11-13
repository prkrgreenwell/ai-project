import { useState } from 'react';
import { Link } from 'react-router-dom';
import LessonPane from '../components/LessonPane.jsx';
import ChatPane from '../components/ChatPane.jsx';

export default function Lesson({ module, lesson }) {
  const [best, setBest] = useState(0);
  const [done, setDone] = useState(false);
  const onResult = (n) => { setBest(n); if (n === 4) setDone(true); };
  return (
    <div className="lesson">
      <div className="topbar">
        <Link to="/">&larr; All modules</Link>
        <span className="crumb">{module.title} &rsaquo; {lesson.label}</span>
        <div className="prog">
          <span>{best} of 4 habits</span>
          <div className="meter"><span style={{ width: `${best * 25}%` }} /></div>
        </div>
        <button className="btn" type="button" disabled={!done}>Next lesson &rarr;</button>
      </div>
      <div className="panes">
        <LessonPane lesson={lesson} />
        <ChatPane lesson={lesson} onResult={onResult} />
      </div>
    </div>
  );
}
