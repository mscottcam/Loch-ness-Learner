const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { User } = require('./models');
const { DATABASE_URL } = require('./config');
const mongoose = require('mongoose')
const { words } = require('./words')

const { algorithm, convertArray } = require('./linked-list');  


let secret = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

if (process.env.NODE_ENV != 'production') {
    secret = require('./secret');
}

const app = express();

const database = {
};

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID: secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
        (accessToken, refreshToken, profile, cb) => {
            // X Job 1: Set up Mongo/Mongoose, create a User model which store the
            // google id, and the access token
            // Job 2: Update this callback to either update or create the user
            // so it contains the correct access token
            // console.log('GOOGLE ID --------', profile.id)
            // console.log('ACCESS TOKEN ---------', accessToken)
 
            User
                .findOne({ googleId: profile.id })
                .then(user => {
                    if (user) {
                        user.accessToken = accessToken
                        return user.save()
                    } else {
                        User
                        .create({
                                googleId: profile.id,
                                accessToken,
                                words
                            })
                        .then(console.log('this worked!'))
                        .catch(err => {
                            console.error(err)
                        })
                    }
                })
            const user = {
                googleId: profile.id,
                accessToken: accessToken
            }
            return cb(null, user);
        }
    ));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // console.log('tokennnnnnnnnn', token)
            // console.log('accessTokennnnnnnnnnnnn', user.accessToken)
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
            User
                .findOne({accessToken: token})
                .then(user => {
                    if (!user) {
                        console.log('userrrrrrrrrrrrr', user)
                        return done(null, false);
                    } else {
                        console.log(user.accessToken)
                        return done(null, user);}
                })
                .catch(err => {
                    console.error(err)
                })
            // token = 'uguyf86f78g7g87g8o7t8'
            // console.log('TOKEN', token, '--------')
            // console.log('DATABASE ------------', database, '------->')
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, { expires: 0 });
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', { session: false }),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

// const algor = algorithm('q', 'a')
// console.log('6r36r836r8r3', algorithm())

app.get('/api/questions',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        // console.log('THIS IS THE REQUEST======================', req.user.googleId)
      // const algor = algorithm(question, answer)
        User
            .findOne({googleId: req.user.googleId})
            .then(user => {
                // console.log('ARRAYYYYYY????', user.words)
                const object = convertArray(user.words)
                const currentQuestion = object.question;
                // console.log('currentQuestion', currentQuestion)
                // const currentQuestion = object.question;
            //   

                return res.json([currentQuestion])
            })
    }
);

app.post('/api/questions/update', passport.authenticate('bearer', { session: false }),
    (req, res) => {
        User
            .findOneAndUpdate({googleId: req.user.googleId})
            .then(user => {
                const algor = algorithm(user.words[0].question, 'correct',
                    user.words[0].answer, user.score, user.words)
                user.score = algor.score
                console.log('USER SCORE>>>>>>>>>>>>>>>', user.score)
                return res.json(algor.question)
            })
            .catch(err => {
                console.log('Put failed!', err);
                res.status(500).json({ message: 'Internal error from PUT' });    
              });
    }
)

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(databaseUrl = DATABASE_URL, port = 3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err)
            }
            server = app.listen(port, () => {
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect()
                    reject(err)
                });
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};