// Link a module to a lesson by setting `lesson` to a key in src/lessons/index.js
const svg = (children) => <svg viewBox="0 0 24 24">{children}</svg>;

export const modules = [
  { slug: 'limits-of-ai', title: 'Limits of AI',
    icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>) },
  { slug: 'social-impacts', title: 'Social Impacts of AI',
    icon: svg(<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14.2c2.4.3 4 2.3 4 4.8" /></>) },
  { slug: 'academic-resources', title: 'Finding and Using Academic Resources',
    icon: svg(<><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5C4.7 20 4 19.3 4 18.5z" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" /></>) },
  { slug: 'academic-integrity', title: 'AI and Academic Integrity',
    icon: svg(<><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>) },
  { slug: 'verifying-ai-output', title: 'Verifying and Evaluating AI Output',
    icon: svg(<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.9-4.9" /><path d="M7.8 10.6l2 2 3.4-3.8" /></>) },
  { slug: 'prompt-for-learning', title: 'Prompt for Learning', lesson: 'prompt-for-learning',
    icon: svg(<><path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" /><path d="M9.5 10l-2 2 2 2M14.5 10l2 2-2 2" /></>) },
];
