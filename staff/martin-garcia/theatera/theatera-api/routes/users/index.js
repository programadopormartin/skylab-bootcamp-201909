const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrievePersonalInfo,
    retrieveCompleteUser,
    retrieveSummaryUser,
    saveProfileImage,
    loadProfileImageUrl,
    loadProfileImage,
    checkFriendRequest,
    createExperienceItem,
    removeExperienceItem,
    createSkillItem,
    removeSkillItem,
    retrieveConnections,
    retrieveFriendRequests,
    retrieveNews,
    updateUser,

} = require('../../logic')
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

router.get('/retrievesummaryuser/:id', tokenVerifier, (req, res) => {
    try {
        const { params: { id } } = req

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


router.get('/completeuser/:id', tokenVerifier, (req, res) => {
    try {
        const { params: { id } } = req

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


router.get('/personalinfo/:id', tokenVerifier, (req, res) => {
    try {
        const { params: { id } } = req

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


router.post('/upload/:id', tokenVerifier, (req, res) => {

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


router.get('/profileimage/:id', tokenVerifier, async(req, res) => {

    const { params: { id } } = req
    const stream = await loadProfileImage(id)
    res.setHeader('Content-Type', 'image/jpeg')
    return stream.pipe(res)
})

router.get('/profileimageUrl/:id', tokenVerifier, async(req, res) => {

    const { params: { id } } = req
    const imageUrl = await loadProfileImageUrl(id)
    res.json({ imageUrl })
})

router.get('/checkfriendrequests/:receiverid', tokenVerifier, async(req, res) => {
    try {
        const { id, params: { receiverid } } = req

        checkFriendRequest(id, receiverid)
            .then(result => res.json(result))
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


router.post('/createexperienceitem', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { title, endDate, startDate, body, type } } = req

        createExperienceItem(id, title, body, startDate, endDate, type)
            .then(id => res.status(201).json({ id }))
            .catch(error => {
                const { message } = error
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.delete('/removeexperienceitem/:expId', tokenVerifier, (req, res) => {
    try {
        debugger

        const { id, params: { expId } } = req

        removeExperienceItem(id, expId)
            .then(id => res.status(202).json({ id }))
            .catch(error => {
                const { message } = error
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


router.post('/createskillitem', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { skill } } = req

        createSkillItem(id, skill)
            .then(skill => res.status(201).json({ skill }))
            .catch(error => {
                const { message } = error
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


router.delete('/removeskillitem', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        debugger
        const { id } = req
        const { body: { skill } } = req

        removeSkillItem(id, skill)
            .then(skill => res.status(202).json({ skill }))
            .catch(error => {
                const { message } = error
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


router.get('/retrievefriendrequests', tokenVerifier, (req, res) => {
    try {
        const { id } = req
        debugger
        retrieveFriendRequests(id)
            .then(fRequests => res.status(201).json({ fRequests }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})



router.get('/retrieveconnections', tokenVerifier, (req, res) => {
    try {
        const { id } = req
        retrieveConnections(id)
            .then(connections => res.json(connections))
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


router.get('/retrieveconnections', tokenVerifier, (req, res) => {
    try {
        const { id } = req
        retrieveConnections(id)
            .then(connections => res.json(connections))
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


router.get('/retrievenews', tokenVerifier, (req, res) => {
    try {
        debugger
        const { id } = req
        retrieveNews(id)
            .then(news => res.json(news))
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



router.patch('/modifyuser', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: {data} } = req
        debugger
        updateUser(id, data)
            .then(() =>
                res.end()
            )
            .catch(error => {
                debugger
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message }) 
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

module.exports = router