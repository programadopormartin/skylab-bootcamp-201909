require('dotenv').config()

const express = require('express')
const { name, version } = require('./package.json')
const { argv: [, , port], env: { PORT = port || 9000, DB_URL } } = process
const cors = require('./utils/cors')
const { database } = require('theatera-data')

const { users } = require('./routes')
const api = express()

api.use(cors)

api.options('*', cors, (req, res) => {
    res.end()
})

/* api.use('/users', users)
 */
database
    .connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up running on port ${PORT}`)))