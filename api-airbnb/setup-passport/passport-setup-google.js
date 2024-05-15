const passportGoogle = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passportGoogle.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/',
    profileFileds:["id", "displayName", "name", "gender"]
  },
  function (accessToken, refreshToken, profile, done){
    console.log(profile)
    return done(null, profile);
  }
));

passportGoogle.serializeUser((user, done) => {
  done(null, user);
  });
 passportGoogle.deserializeUser((obj, done) => {
  done(null, obj);
  });
