import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const TASKS_ENABLED = String(process.env.TASKS_ENABLED || 'true').toLowerCase() === 'true';

app.use(cors());
app.use(express.json());

// Basic endpoints
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/hello', (req, res) => {
  const name = (req.query.name || 'world').toString();
  res.json({ message: `Hello, ${name}` });
});

app.get('/joke', async (_req, res) => {
  try {
    const r = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart');
    const j = await r.json();
    if (j.type === 'twopart') return res.json({ setup: j.setup, punchline: j.delivery });
  } catch {}
  res.json({ setup: 'Fallback setup', punchline: 'Fallback punchline' });
});

// In-memory CRUD (toggleable)
if (TASKS_ENABLED) {
  let nextId = 1;
  /** @type {{id:number,text:string,done:boolean}[]} */
  const tasks = [];

  app.get('/tasks', (_req, res) => res.json({ tasks }));

  app.post('/tasks', (req, res) => {
    const { text } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Invalid body: {text} is required' });
    }
    const task = { id: nextId++, text: text.trim(), done: false };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const { text, done } = req.body || {};
    if (typeof text === 'string') task.text = text.trim();
    if (typeof done === 'boolean') task.done = done;
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });
    const [removed] = tasks.splice(idx, 1);
    res.json(removed);
  });
}

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`Server running on :${PORT} (tasks=${TASKS_ENABLED})`));
