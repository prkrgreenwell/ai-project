# Responsible AI Use Modules

React + Vite, multi-page via react-router (hash routing, works on any static host).

    npm install
    npm run dev       # local dev server
    npm run build     # static site in dist/

## Structure
- `src/data/modules.jsx`   the six module cards (set `lesson` to link a module to a lesson)
- `src/lessons/`           one file per module: an ordered list of steps (reading + activities)
- `src/pages/`             Home, ModulePage (routing), Lesson (stepper, locking, Back/Next)
- `src/components/`        ReadingStep, ActivityStep (picks the activity), LessonPane, ChatPane
- `src/components/activities/`  ChoiceActivity (sort + roles), PlanActivity (plan, rubric, generated prompt)
- `src/hooks/useProgress.js`    saves finished activities in localStorage
- `src/styles/`            base, home, lesson, reading (stepper/reading), activities

## Progress
Activities must be finished before later steps unlock. Progress is saved in the browser.
To reset while testing, run `localStorage.removeItem('rai-progress-v1')` in the browser console.
