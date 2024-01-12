const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

app.get('/info', (req, res) => {
    const length = entries.length;
    const now = Date();
    res.send(`Phonebook has info for ${length} people<br/>${now}`);
});

app.get('/api/persons', (req, res) => {
    res.json(entries);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const entry = entries.find((e) => e.id === id);
    if (!entry) return res.status(404).send('Person not found');
    res.json(entry);
});

app.post('/api/persons', (req, res) => {
    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({ error: 'Content missing' });
    }
    if (entries.map((e) => e.name).includes(person.name)) {
        return res.status(400).json({ error: 'Name must be unique' });
    }
    person.id = Math.floor(Math.random() * 10000);
    entries = entries.concat(person);
    res.status(201).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    entries = entries.filter((e) => e.id !== id);
    res.send('Removed');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

let entries = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];
