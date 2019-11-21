require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { registerUser, authenticateUser, retrieveUser, modifyTask, createTask, listTasks, deleteTask } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('tasks-util')
const jwt = require('jsonwebtoken')
const api = express()
const { argv: [, , port], env: { SECRET, PORT = port || 9090, DB_URL } } = process
const jsonBodyParser = bodyParser.json()
const tokenVerifier = require('./helpers/token-verifier')(SECRET)
const { database } = require('tasks-data')


api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req
    try {
        registerUser(name, surname, email, username, password)
            .then(() => res.status(201).end())
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
    try {
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
            .then(user => res.json(user))
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
        createTask(id, title, description)
            .then(() => res.status(201).end())
            .catch(error => {
                if (error instanceof NotFoundError) return res.status(404), json({ message: error.message })

                res.status(500).json({ message: error.message })
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
                if (error instanceof NotFoundError) return res.send(404).json({ message: error.message })

                res.status(500).json({ message: error.message })

            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.patch('/tasks/:taskId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { taskId }, body: { title, description, status } } = req

        modifyTask(id, taskId, title, description, status)
            .then(() => res.end())
            .catch(error => {
                if (error instanceof NotFoundError) return res.status(404).json({ message: error.message })
                if (error instanceof ConflictError) return res.status(409).json({ message: error.message })
                res.status(500).json(error.message)
            })
    } catch ({ message }) {
        debugger
        res.status(400).json({ message })
    }
})

api.delete('/tasks/:taskId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { taskId } } = req
        deleteTask(id, taskId)
            .then(() => res.end())
            .catch(error => {
                debugger
                if (error instanceof NotFoundError) return res.status(404).json({ message: error.message })
                if (error instanceof ConflictError) return res.status(409).json({ message: error.message })
                res.status(500).json(error.message)
            })


    } catch ({ message }) {
        return res.status(400).json({ message })
    }
})

database.connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))