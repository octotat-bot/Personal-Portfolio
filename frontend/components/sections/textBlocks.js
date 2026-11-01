// revealAt is hero scroll progress (0–1). Label, name and role are in the
// first screen (0); the rest reveal as the sequence plays.
export const TEXT_BLOCKS = [
  {
    id: 'greeting',
    words: ['Open', 'to', 'remote', 'internships', '·', 'available', 'now'],
    style: 'label',
    revealAt: 0,
    staggerMs: 60,
  },
  {
    id: 'name',
    words: ['Mukund', 'Mangla'],
    style: 'name',
    revealAt: 0,
    staggerMs: 0,
  },
  {
    id: 'role',
    words: ['Full-stack', 'engineer', 'who', 'builds', 'LLM-powered', 'products'],
    style: 'role',
    revealAt: 0,
    staggerMs: 70,
  },
  {
    id: 'obsession',
    words: ['Obsessed', 'with', 'systems', 'that', 'actually', 'ship.'],
    style: 'obsession',
    revealAt: 0.55,
    staggerMs: 80,
  },
  {
    id: 'stack',
    words: ['Python · Node.js · TypeScript · React · Next.js · MongoDB · GenAI'],
    style: 'stack',
    revealAt: 0.75,
    staggerMs: 0,
  },
];
