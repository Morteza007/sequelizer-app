const express = require('express')
require('./src/db/squdb')
const User = require('./src/models/user')
const sequelize = require('./src/db/squdb')
const userRouter = require('./src/routers/user')

const app = express()
const port = 4000

app.use(express.json())
app.use(userRouter)
//app.use(taskRouter)

sequelize.sync({
    force: true
})

app.listen(port, () => {
    console.log('Server is up on port: ', port)
})
