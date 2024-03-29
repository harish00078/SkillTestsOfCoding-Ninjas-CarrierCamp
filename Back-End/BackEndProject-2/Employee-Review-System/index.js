const express = require('express');
const app = express();
const expressLayouts= require('express-ejs-layouts')

const port=8080;

//Used for Session Cookie
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');



const MongoStore = require('connect-mongo');


app.use(express.static('./assets'))
app.use(expressLayouts);
const db = require('./config/mongoose')

const flash = require('connect-flash');
const customMware = require('./config/notymiddleware');

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.use(express.static('./assets'));
app.use(expressLayouts);



//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//MongoStore is used to store the session cookie in the DB
app.use(session(
    {
        name: 'employee_review',
        //ToDO Change the secret before deployment
        secret:'test',
        saveUninitialized: false,
        resave: false,
        cookie:
        {
            maxAge: (1000 * 60 * 100)
        },    
        store: new MongoStore(
            {
                // mongoUrl:'mongodb://127.0.0.1:27017/employee_review', 
                mongoUrl:'mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/employee_review',
                autoRemove: 'disabled'
            
            },
            function(err){
                console.log(err ||  'connect-mongodb setup ok');
            }
        )
    }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes/index'))

app.listen(port,function(error)
{
    if(error)
    {
        console.log(`Error in runnin the server. Error is ${error}`)
    }

    console.log(`Server is up on the port : ${port}`)
})