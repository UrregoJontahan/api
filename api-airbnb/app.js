const express = require("express");
const cors = require("cors");
const db = require("./services/databaseService");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())
app.use(cors())
require('./controllers/route')(app)
require("./controllers/routePlace")(app)

app.listen(2000,()=>{
    console.log("app listening o port 2000")
})

db()