// The whole module lives here, as an ordered list of `steps`.
//   type 'reading'                     a page of text (placeholder lorem ipsum)
//   type 'sort' | 'roles'              choice activities (ChoiceActivity.jsx)
//   type 'scenario'                    write a prompt in the practice chat
//   type 'plan'                        build a plan, self-grade, generate a prompt
// Each activity needs a unique `id`; finishing it unlocks the steps after it.

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];
const reading = (section, title, extra = {}) => ({
  type: 'reading', section, tag: `Part ${section} \u00b7 Lesson`, title, paragraphs: lorem, ...extra,
});

const habits = [
  ['Give context.', 'Say who you are and where you’re stuck.'],
  ['Ask for an explanation.', 'Request steps or an example, not only a definition.'],
  ['Ask to be checked.', 'Invite a practice question or quiz.'],
  ['Set a boundary.', 'Ask for hints so you still do the thinking.'],
];

export default {
  id: 'prompt-for-learning',
  sections: 4,
  steps: [
    // ---------- Part 1: good vs bad prompts ----------
    reading(1, 'What Makes a Prompt Good?', { bullets: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor'] }),
    reading(1, 'Spotting Weak Prompts', { callout: { title: 'Key idea:', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } }),
    {
      type: 'sort', id: 'sort', section: 1, tag: 'Part 1 \u00b7 Activity', title: 'Good Prompt or Bad Prompt?',
      intro: 'Decide whether each prompt would help a student learn. Check your answers when you’re done; you can change any you miss.',
      options: [{ value: 'good', label: 'Good prompt' }, { value: 'bad', label: 'Bad prompt' }],
      items: [
        { text: 'Explain photosynthesis.', correct: 'bad', why: 'It’s vague: no context, no level, and no goal for what you want to understand.' },
        { text: 'I’m a first-year nursing student. Explain how the heart pumps blood in plain language, then quiz me with three questions.', correct: 'good', why: 'It gives context, asks for an explanation, and asks to be checked.' },
        { text: 'Write my five-page essay on the Civil War so I can turn it in.', correct: 'bad', why: 'It hands off the thinking and the work, which raises academic integrity concerns.' },
        { text: 'Give me hints, not the answer, for the derivative of x\u00b2 sin(x). Let me try each step, then check my work.', correct: 'good', why: 'It sets a boundary so you do the thinking, and it asks for a check.' },
        { text: 'Tell me everything about World War II.', correct: 'bad', why: 'It’s far too broad to produce something focused or useful for learning.' },
        { text: 'I have a bio exam Friday and I mix up mitosis and meiosis. Make a comparison table, then ask me practice questions one at a time.', correct: 'good', why: 'It states the situation and the problem, and asks for practice instead of just information.' },
      ],
    },

    // ---------- Part 2: AI roles ----------
    reading(2, 'AI Can Play Different Roles', { bullets: ['Quiz maker', 'Flashcard maker', 'Tutor', 'Study planner'] }),
    reading(2, 'Matching Roles to Goals', { callout: { title: 'Key idea:', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } }),
    {
      type: 'roles', id: 'roles', section: 2, tag: 'Part 2 \u00b7 Activity', title: 'Pick the Right Role',
      intro: 'For each situation, choose the role you would ask the AI to play.',
      options: ['Quiz maker', 'Flashcard maker', 'Tutor', 'Study planner', 'Writing coach', 'Summarizer'].map((r) => ({ value: r, label: r })),
      items: [
        { text: 'You finished reading a chapter and want to find out what you actually remember.', correct: 'Quiz maker', why: 'A quiz maker tests recall so you can see what you know.' },
        { text: 'You need to memorize 40 vocabulary terms for a Spanish exam.', correct: 'Flashcard maker', why: 'Flashcards suit memorizing many short facts through repetition.' },
        { text: 'You don’t see why a proof works and want to be walked through it with guiding questions.', correct: 'Tutor', why: 'A tutor explains step by step and asks questions to build understanding.' },
        { text: 'You have three exams and two papers due in the next two weeks and feel overwhelmed.', correct: 'Study planner', why: 'A study planner turns deadlines and available time into a schedule.' },
        { text: 'You wrote a draft and want feedback on clarity, without the AI rewriting it for you.', correct: 'Writing coach', why: 'A writing coach gives feedback and questions while the writing stays yours.' },
      ],
    },

    // ---------- Part 3: write a prompt for a scenario ----------
    reading(3, 'Writing a Prompt from a Scenario', { callout: { title: 'Key idea:', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } }),
    reading(3, 'Four Habits of a Learning Prompt', { bullets: habits.map(([b]) => b.replace('.', '')) }),
    {
      type: 'scenario', id: 'scenario', section: 3, tag: 'Part 3 \u00b7 Activity', title: 'Write a Prompt for This Scenario',
      intro: 'Use what you’ve learned. Write a prompt in the chat that applies all four habits. Revise and resend until the feedback shows all four.',
      habits,
      task: 'You’re in an intro chemistry course. Your exam is Friday and stoichiometry isn’t clicking. Write a prompt that helps you learn it rather than just get the answers.',
      hint: 'Try: “I’m a first-year chemistry student and stoichiometry confuses me. Explain it step by step with a small example, then quiz me with one question. Give me hints instead of the full answer.”',
      greeting: 'Hi! I’m a practice assistant. Read the scenario on the left and type your prompt below.',
      labels: { ctx: 'Gave context', exp: 'Asked for an explanation', chk: 'Asked to be checked', bnd: 'Set a boundary' },
      rules: {
        ctx: /\b(i['’]?m|i am|i['’]?ve|my|student|beginner|first[- ]year|intro|class|course|new to|struggl|stuck|confus)\b/i,
        exp: /\b(explain|step|example|walk me|break (it )?down|plain|simple|analog)/i,
        chk: /\b(quiz|check|test me|practice|question|ask me|see if i)/i,
        bnd: /\b(hint|don['’]?t (just )?(give|tell)|do not (just )?(give|tell)|instead of|without (giving|telling)|let me try)/i,
      },
      // Simulated reply; swap for a real model call later.
      reply(hit) {
        const p = [];
        p.push(hit.ctx ? 'Thanks for the background. Since you’re building this up from the basics, I’ll keep it simple.' : 'Here’s a general answer, since I don’t know your background.');
        p.push('<strong>Stoichiometry</strong> uses a balanced chemical equation to work out how much of each substance reacts or is made.');
        p.push(hit.exp ? '<strong>Example:</strong> In 2H\u2082 + O\u2082 \u2192 2H\u2082O, every 2 moles of H\u2082 react with 1 mole of O\u2082 to make 2 moles of water.' : '<em>You didn’t ask for steps or an example, so this stays a bare definition.</em>');
        if (hit.bnd) p.push('<strong>Hint:</strong> Start with the balanced equation. What is the ratio of H\u2082 to O\u2082?');
        if (hit.chk) p.push('<strong>Check yourself:</strong> If you have 6 moles of H\u2082, how many moles of O\u2082 will react?');
        return p;
      },
    },

    // ---------- Part 4: AI learning plan + rubric + generated prompt ----------
    reading(4, 'Planning Your Learning with AI', { bullets: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor'] }),
    reading(4, 'Using a Rubric to Self-Assess', { callout: { title: 'Key idea:', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } }),
    {
      type: 'plan', id: 'plan', section: 4, tag: 'Part 4 \u00b7 Activity', title: 'Build Your AI Learning Plan',
      intro: 'Answer the questions to build a plan, grade it yourself with the rubric, then generate a prompt to paste into your own AI assistant for feedback and a score.',
      levels: ['Not yet', 'Developing', 'Proficient', 'Strong'],
      fields: [
        { id: 'goal', label: 'What do you want to learn or achieve, and by when?' },
        { id: 'context', label: 'What course or topic is this for, and what is your current level or where are you stuck?' },
        { id: 'time', label: 'How much time can you study each week, and when?' },
        { id: 'roles', label: 'Which roles will you ask AI to play (for example tutor, quiz maker, flashcard maker), and for which parts of your plan?' },
        { id: 'bounds', label: 'What will you do yourself, without AI, and how will you stay within your course’s AI policy?' },
        { id: 'check', label: 'How will you check your understanding and verify what the AI tells you?' },
      ],
      rubric: [
        { id: 'goal', name: 'Clear goal', strong: 'A specific goal with a deadline.' },
        { id: 'context', name: 'Context and level', strong: 'Names the course, current level, and specific trouble spots.' },
        { id: 'time', name: 'Realistic schedule', strong: 'Gives time per week and when, matched to the goal.' },
        { id: 'roles', name: 'Fitting AI roles', strong: 'Matches each part of the plan to a useful AI role.' },
        { id: 'bounds', name: 'Boundaries and integrity', strong: 'Keeps the thinking with the learner and respects course policy.' },
        { id: 'check', name: 'Checking understanding', strong: 'Includes ways to test understanding and verify AI output.' },
      ],
    },
  ],
};
