
const express = require('express')
const app = express()
const {error} = require('./middleware/error')
const routes_user = require('./routes/user-routes')
const routes_movie = require('./routes/movie-routes')
const routes_comment = require('./routes/comment-routes')
const  {connect}  = require('./db/connect')

require('dotenv').config();
require("express-async-errors")
// require("mongoose").set("debug", true);




app.use(express.json())
app.use('/api/user', routes_user)
app.use('/api/movie', routes_movie)
app.use('/api/comment', routes_comment)
app.use(error)



connect(process.env.PORT,process.env.URL,app);














