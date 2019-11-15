require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const users = require('./data/users')()
const tasks = require('./data/tasks')()
const { registerUser, authenticateUser, retrieveUser, createTask, listTasks } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('./utils/errors')
const jwt = require('jsonwebtoken')
const api = express()
const { argv: [, , port], env: { SECRET, PORT = port || 9090 } } = process
const jsonBodyParser = bodyParser.json()
const tokenVerifier = require('./utils/token/token-verifier')(SECRET)


api.post('/users', jsonBodyParser, (req, res) => {
    debugger
    const { body: { name, surname, email, username, password } } = req
    try {
        registerUser(name, surname, email, username, password)
            .then(() => res.json({ message: 'user registered succesessfully' }))
            .catch(error => {
                if (error instanceof ConflictError)
                    return res.status(409).json({ message: error.message })
                res.status(500).json({ message: error.message })
            })

    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req
    debugger
    try {
        debugger
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                if (error instanceof CredentialsError)
                    return res.status(401).json({ message: error.message })
                res.status(500).json({ message: error.message })
            })

    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.get('/users', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json({ user }))
            .catch(error => {
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message: error.message })
                res.status(500).json({ message: error.message })
            })

    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})


api.post('/tasks', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { title, description } } = req
        debugger
        createTask(id, title, description)
            .then(id => { debugger; return res.status(201).json({ id }) })
            .catch(error => {
                debugger
                if (error instanceof NotFoundError) return res.status(404), json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }

})

api.get('/tasks', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listTasks(id)
            .then(tasks => res.json(tasks))
            .catch(error => {
                if (error instanceof NotFoundError) return res.send(404).json({ message })

                res.status(500).json({ message })

            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

Promise.all([users.load(), tasks.load()])
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))