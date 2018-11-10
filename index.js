
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))

let persons = [
    {
        name: 'Arto Hellas',
        number: "040-123456",
        id: 1

    },
    {
        name: 'Martti Tienari',
        number: "040-123456",
        id: 2

    },
    {
        name: 'Arto Järvinen',
        number: "040-123456",
        id: 3

    },
    {
        name: 'Lea Kutvonen',
        number: "040-123456",
        id: 4

    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/info', (req, res) => {
    res.send(`
    <p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    <p>${new Date}</p>
    `)

})

app.get('/api/persons', (req, res) => {
    morgan('tiny', res)
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    morgan('tiny', res)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    morgan('tiny', res)
    res.status(204).end()

})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'Name missing' })
    }
    if (body.number === undefined) {
        return res.status(400).json({ error: 'Number missing' })
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ error: 'Name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }
    morgan('tiny', res)
    persons = persons.concat(person)
    res.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})