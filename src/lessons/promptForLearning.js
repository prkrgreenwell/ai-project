// Prompt for Learning: 5 screens. `gated: true` screens must be finished before moving on.
//   type 'roles'      reference: role buttons + details card
//   type 'table'      reference: role -> goal table
//   type 'pick'       activity: choose a role for 3 scenarios
//   type 'fill'       activity: fill 3 blanks in a prompt
//   type 'takeaways'  summary + "plan your next use"
// Left-column `blocks`: string = paragraph (**bold** ok), {goal}, {h}, {ol}, {ul}, {remember}.

export default {
  id: "prompt-for-learning",
  steps: [
    {
      type: "roles",
      id: "roles",
      title: "What’s AI’s role?",
      blocks: [
        {
          goal: "By the end of this module, you’ll be able to write AI prompts that support your learning by **clearly defining the AI’s role.**",
        },
        "Assigning an AI tool a role tells the tool what kind of help to give you. It could act as a Tutor, Quiz maker, Idea partner, or Critique partner.",
        "Explore the roles in the reference panel to learn more about each of them.",
      ],
    },
    {
      type: "table",
      id: "table",
      title: "When should I use each AI role?",
      blocks: [
        "**Start with what you want to learn or practice.** Then choose an AI role that gives you the kind of help you need while you do the thinking yourself.",
        "AI can support your learning in many ways. It can explain a confusing idea, help you explore possibilities, give feedback on a draft, or create questions for you to practice with. The role you give it depends on what you want to learn.",
      ],
    },
    {
      type: "pick",
      id: "pick-role",
      gated: true,
      title: "Choose an AI role",
      blocks: [
        "Read the scenario and choose the role that gives you the kind of help you need. Think about what you want to practice and what you’ll do yourself.",
      ],
      scenarios: [
        {
          text: "You finished reading a chapter and want to find out what you can remember without looking back at your notes.",
          options: [
            "Tutor",
            "Quiz maker",
            "Example generator",
            "Reflection partner",
          ],
          correct: "Quiz maker",
          fits: "Answer questions about the chapter from memory first. Then check your answers against the reading.",
          hint: "Which role can give you questions to answer from memory?",
        },
        {
          text: "You’re reviewing a proof for math class. One step doesn’t make sense, and you want someone to ask guiding questions so you can work through the reasoning.",
          options: [
            "Comparison tool",
            "Practice coach",
            "Tutor",
            "Example generator",
          ],
          correct: "Tutor",
          fits: "A tutor can ask guiding questions about the step you’re stuck on. Use those questions to explain the reasoning in your own words.",
          hint: "Which role can ask guiding questions about the step you’re stuck on?",
        },
        {
          text: "You wrote a paragraph for a history assignment. Before revising it yourself, you want help spotting where your evidence falls short of supporting your claim.",
          options: [
            "Critique partner",
            "Idea partner",
            "Tutor",
            "Comparison tool",
          ],
          correct: "Critique partner",
          fits: "A critique partner can point out where your evidence falls short. Then you decide how to revise the paragraph yourself.",
          hint: "Which role can spot gaps in a draft so you can decide what to revise?",
        },
      ],
    },
    {
      type: "fill",
      id: "fill-prompt",
      gated: true,
      title: "How do we write this into a prompt?",
      blocks: [
        "Start with what you’ll practice yourself. Then name the AI role that fits your goal and ask for specific help.",
        { h: "Build your prompt in three parts" },
        {
          ol: [
            "Say what you’ll do yourself.",
            "Name the AI role that fits your goal.",
            "Tell AI what to do and when to respond.",
          ],
        },
        "Use a follow-up question if you need clarification after AI responds.",
      ],
      intro:
        "You’re studying photosynthesis. You want to explain how it works in your own words and get help spotting gaps in your understanding.",
      lines: [
        { pre: "I’ll ", post: "." },
        { pre: "Act as ", post: "." },
        { pre: "After I share my explanation, ", post: "." },
      ],
      blanks: [
        {
          question: "What will you do yourself?",
          correct: 0,
          options: [
            "explain photosynthesis in my own words",
            "read an explanation written by AI",
          ],
          hint: "Start with what you’ll practice yourself. The thinking stays with you.",
        },
        {
          question: "Which role fits your goal?",
          correct: 1,
          options: ["a quiz maker", "a tutor"],
          hint: "You want help spotting gaps in your explanation. Which role asks guiding questions?",
        },
        {
          question: "What specific help will you ask for?",
          correct: 0,
          options: [
            "ask one guiding question about a gap, then wait for my reply",
            "rewrite my explanation as a model answer",
          ],
          hint: "Which request leaves the thinking, and the first attempt, to you?",
        },
      ],
      closing:
        "You make the first attempt. AI asks a guiding question so you can work through the gap yourself.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      title: "Key takeaways",
      blocks: [
        "Choose an AI role that gives you a chance to practice the skill you want to learn.",
        {
          ul: [
            "Start with the skill you want to practice. Decide what you’ll do yourself.",
            "In your prompt, name AI’s role and ask for specific help.",
            "Try it yourself first. Ask a follow-up question about what’s still unclear.",
          ],
        },
        {
          remember: [
            "AI does the practice for you \u2192 Low learning value",
            "AI creates opportunities for you to practice \u2192 Potential high learning value",
          ],
        },
      ],
    },
  ],
};
