require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./services/databaseService");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./setup-passport/passport-setup-google"); 
const passportFacebook = require("./setup-passport/passport-facebook")

const app = express();

app.use(session({
  secret: process.env.CLIENT_SECRET || process.env.ClIENT_FACEBOOK_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use("/users", require("./controllers/loginRoute"));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt:"consent" })
);

app.post("/auth/google",
  // const { code } = req.body;
  // console.log("Código recibido en el backend:", code);
  passport.authenticate('google', { scope: ['profile', 'email'], prompt:"consent" } )
);

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['profile', 'email'], prompt:"consent" })
);
  
require('./controllers/route')(app);
require("./controllers/routePlace")(app);

app.listen(2000, () => {
  console.log("App listening on port 2000");
});

db();
