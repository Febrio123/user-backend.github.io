const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { errorHandle, notFound } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')

//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads')))

//server
const rolesRoute = require('./routes/roles')
const userRoute = require('./routes/user')
const authRoute = require('./routes/authRouter')
const productRoute = require('./routes/product')
const profileRoute = require('./routes/profile')
const categoryRoute = require('./routes/category')
app.use('/auth', authRoute)
app.use('/roles', rolesRoute)
app.use('/user', userRoute)
app.use('/api/auth/product', productRoute)
app.use('/api/auth/category', categoryRoute)
app.use('/api/auth/profile', profileRoute)
app.use(notFound)
app.use(errorHandle)

//port
dotenv.config()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})