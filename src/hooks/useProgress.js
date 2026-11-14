import { useCallback, useState } from 'react';

// Remembers which activities are finished, per lesson, in the browser (localStorage).
const KEY = 'rai-progress-v1';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export function useProgress(lessonId) {
  const [all, setAll] = useState(read);
  const done = all[lessonId] || [];

  const complete = useCallback((id) => {
    setAll((prev) => {
      const cur = prev[lessonId] || [];
      if (cur.includes(id)) return prev;
      const next = { ...prev, [lessonId]: [...cur, id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  }, [lessonId]);

  const reset = useCallback(() => {
    setAll((prev) => {
      const next = { ...prev, [lessonId]: [] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [lessonId]);

  return { done, complete, reset };
}
