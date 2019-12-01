const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, retrievePersonalInfo, retrieveCompleteUser, retrieveSummaryUser, saveProfileImage, loadProfileImageUrl, loadProfileImage } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('theatera-util')
const Busboy = require('busboy')


const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
    const { body: { name, email, password, isCompany } } = req

    try {
        registerUser(name, email, password, isCompany)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveSummaryUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})


router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})


router.get('/completeuser', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveCompleteUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})


router.get('/personalinfo', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrievePersonalInfo(id)
            .then(personalInfo => res.json(personalInfo))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})


router.post('/upload/:id', (req, res) => {

    const { params: { id } } = req
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async(fieldname, file, filename, encoding, mimetype) => {
        filename = 'profile'
        await saveProfileImage(id, file, filename)
    })

    busboy.on('finish', () => {
        res.end("That's all folks!")
    })

    return req.pipe(busboy)
})


router.get('/profileimage/:id', async(req, res) => {

    const { params: { id } } = req
    const stream = await loadProfileImage(id)
    res.setHeader('Content-Type', 'image/jpeg')
    return stream.pipe(res)
})

router.get('/profileimageUrl/:id', async(req, res) => {

    const { params: { id } } = req
    const imageUrl = await loadProfileImageUrl(id)
    res.json({ imageUrl })
})

module.exports = router