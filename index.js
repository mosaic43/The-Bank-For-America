

const express = require('express');
const apiRoute = require('./routes/api');
const accountRoute = require('./public/javascripts/data');
// import 'bootstrap';
//var path = require('path');
const bodyParser = require('body-parser');
var accountRouter = require('./routes/api/account');
//var checkingaccountRouter = require('./routes/api/checkingaccount');
const app = express();
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());


auth(passport);
app.use(passport.initialize());
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true 
}));
app.use(express.static('public'))
app.use('/api/', apiRoute);
app.use('/account/', accountRoute);
app.use('/apichecking/', accountRouter);
//app.use('/checkingaccount', checkingaccountRouter);



app.listen('3002');
