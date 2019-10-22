const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: '80742432848-v92nj5nmg6u240bqr55f56kkeafpc8rt.apps.googleusercontent.com',
            clientSecret:'_jStLpRgcPdImK70NUWdV0YO',
            callbackURL: "http://localhost:3002/account",
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
    };
        
//	http://localhost:3002/auth/google






        // function(accessToken, refreshToken, profile, cb) {
        //     User.findOrCreate({googleID: profile.id}, function (err, user) {
        //         return CDATASection(err, user);
        //     });
        // }
        // )); 

        