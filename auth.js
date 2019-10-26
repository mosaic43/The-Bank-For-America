const express = require('express');
const router = express.Router();
const keys = require('./config/keys')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = 'production';

const config = require('./knexfile')[env];

const knex = require('knex')(config);


const auth = require('./auth');
//// get user from db

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
////get user by id .then(user => done(null, user.id))
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {
////get user by id .then(user => done(null, user.id))
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret:keys.google.clientSecret,
            callbackURL: "http://localhost:3002/welcome",
            scope: ['profile'],
            proxy: true
        },
    function(token, refrehToken, profile, done) {
const newUser = {
    id: profile.id,
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    displayname: profile.displayName,
    provider: profile.provider,
}

///Check user
knex('users').where('id', profile.id).then(function(data) {
    if (data.length < 1) {
        knex.insert(newUser).into("users").then(function (user) {
          })} 
        })
        .then(function(){
            return done(null, newUser);
 
        })
        .catch(function (ex) {
            console.log(ex)
        })
        }));

    };

        