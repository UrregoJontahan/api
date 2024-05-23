require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./services/databaseService");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const uploadRoutes = require("../api-airbnb/controllers/images");
const locationRouter = require("./controllers/location");
const routePlace = require("./controllers/routePlace");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./controllers/loginRoute"));
app.use('/api/location', locationRouter);
app.use('/api', uploadRoutes);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth?type=google";
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const REDIRECT_URI_FACEBOOK = "http://localhost:3000/auth?type=facebook";

app.get("/google", (req, res) => {
    const authUri = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["email"]
    });
    res.redirect(authUri);
});

app.post("/google/callback", async (req, res) => {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const { data } = await oauth2Client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo",
    });

    res.send(data);
});

app.get('/facebook', (req, res) => {
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI_FACEBOOK}&scope=email`;
    res.redirect(url);
});

app.post('/facebook/callback', async (req, res) => {
    const { code } = req.body;
    const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI_FACEBOOK}`);
    const { access_token } = data;
    const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

    res.send(profile);
});

require('./controllers/route')(app);
routePlace(app);

app.listen(2000, () => {
    console.log("App listening on port 2000");
});

db();
