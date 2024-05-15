const passportFacebook= require("passport")
const FacebookStrategy = require("passport-facebook").Strategy;

passportFacebook.use(new FacebookStrategy({
    clientID:process.env.ClIENT_FACEBOOK,
    clientSecret: process.env.ClIENT_FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/',
    profileFileds:["id", "displayName", "name", "gender", "email"]
},
(accessToken, refreshToken, profile, done) => {

    const req = profile.request;
    const code = req.query.code;
    const scope = req.query.scope;
    const authuser = req.query.authuser;
    const prompt = req.query.prompt;

    return done(null, profile)
}
))

module.exports = passportFacebook
