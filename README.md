# Responsible AI Use Modules

React + Vite, multi-page via react-router (hash routing, so it works on any static host).

    npm install
    npm run dev       # local dev server
    npm run build     # static site in dist/

## Structure
- `src/styles/`  base.css (tokens, dark mode), home.css, lesson.css
- `src/data/modules.jsx`  the six module cards; set `lesson` to link a module to a lesson
- `src/lessons/`  one file per lesson (content, rules, simulated reply); register in index.js
- `src/pages/`  Home, ModulePage (router), Lesson
- `src/components/`  ModuleCard, LessonPane, ChatPane
