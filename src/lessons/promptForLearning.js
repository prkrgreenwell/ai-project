// All content for this lesson lives here. Copy this file to make a new lesson.
export default {
  label: 'Lesson 1 of 3 (demo)',
  title: 'Ask to Understand, Not Just to Answer',
  intro: 'How you word a prompt shapes what you learn. A vague request gets a quick answer. A well-built one gets an explanation you can use, and a way to check that you understood it.',
  habits: [
    ['Give context.', 'Say who you are and where you’re stuck.'],
    ['Ask for an explanation.', 'Request steps or an example, not only a definition.'],
    ['Ask to be checked.', 'Invite a practice question or quiz.'],
    ['Set a boundary.', 'Ask for hints so you still do the thinking.'],
  ],
  task: 'You’re in an intro statistics course and standard deviation isn’t clicking. In the chat, write a prompt that helps you learn it, not just copy a definition. Revise and resend until the feedback shows all four habits.',
  hint: 'Try: “I’m a first-year student new to statistics. Explain standard deviation step by step with a small example, then quiz me with one question. Give me hints instead of the full answer.”',
  greeting: 'Hi! I’m a practice assistant. Follow the task on the left and type your prompt below.',
  labels: { ctx: 'Gave context', exp: 'Asked for an explanation', chk: 'Asked to be checked', bnd: 'Set a boundary' },
  rules: {
    ctx: /\b(i['’]?m|i am|i['’]?ve|my|student|beginner|first[- ]year|intro|class|course|new to|struggl|stuck)\b/i,
    exp: /\b(explain|step|example|walk me|break (it )?down|plain|simple|analog)/i,
    chk: /\b(quiz|check|test me|practice|question|ask me|see if i)/i,
    bnd: /\b(hint|don['’]?t (just )?(give|tell)|do not (just )?(give|tell)|instead of|without (giving|telling)|let me try)/i,
  },
  // Simulated reply; swap for a real model call later.
  reply(hit) {
    const p = [];
    p.push(hit.ctx ? 'Thanks for the background. Since you’re building this up from the basics, I’ll keep it simple.' : 'Here’s a general answer, since I don’t know your background.');
    p.push('<strong>Standard deviation</strong> measures how spread out a set of numbers is around its average.');
    p.push(hit.exp ? '<strong>Example:</strong> Scores of 70, 75, 80 and scores of 50, 75, 100 both average 75. The second set is more spread out, so its standard deviation is larger.' : '<em>You didn’t ask for steps or an example, so this stays a bare definition.</em>');
    if (hit.bnd) p.push('<strong>Hint:</strong> Start by finding how far each score is from 75. What do you notice?');
    if (hit.chk) p.push('<strong>Check yourself:</strong> If every score in a set is identical, what is the standard deviation?');
    return p;
  },
};
