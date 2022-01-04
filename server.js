const express = require('express')
const { render } = require('ejs')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


//set port
const port = 3000

//express app
const app = express()

//register view engine
app.set('view engine','ejs')

//parsing data & static files
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('views'))
app.use(express.static('scripts'))


//configuring MongoDBstore
const store = new MongoDBStore ({
    uri: 'mongodb+srv://TamNguyen:funnytam1999@cluster0.cmadf.mongodb.net/Book-Management?retryWrites=true&w=majority',
    collection : 'sessions'
});

//session
app.use(session ({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhhhhh',
    store: store,
    cookie: {
        maxAge:1000 * 60 * 60 * 2
    }
}))

//routes
app.use(routes)

//connecting to mongodb
const dbURI = 'mongodb+srv://TamNguyen:funnytam1999@cluster0.cmadf.mongodb.net/Book-Management?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(port,() => {console.log('server connected to port '+ port)}))
.catch((err)=> console.log(err))





