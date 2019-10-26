
const express = require('express');
const apiRoute = require('./routes/api');
const auth = require('./auth');

 const accountRoute = require('./public/javascripts/data');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const transfers = require('./public/javascripts/transfers')

const index = require('./routes/index');
var accountRouter = require('./routes/api/account');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
//const config = require('../knexfile')[env];

const keys = require('./config/keys')
const app = express();

//////////Local Passport Middleware

app.use(passport.initialize());
app.use(passport.session())
require('./auth')(passport)
////////////

app.use(cookieSession({
    name: 'session',
    keys: [keys.session.cookieKey],
    maxAge: 24 * 60 * 60 * 60 * 1000,
}));
app.use(passport.session())
//initialize passport
//app.use()
app.use(cookieParser());
//////



app.engine('handlebars', exphbs ({
    defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true 
}));
app.use(express.static('public'))
app.use('/api/', apiRoute);
app.use('/', index);
app.use('/account/', accountRouter);
app.use('/apichecking/', accountRouter);

app.listen('3002');