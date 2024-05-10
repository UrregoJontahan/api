const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./services/databaseService");


const app = express();

app.use(bodyParser.json())
app.use(cors())
require('./controllers/route')(app)
require("./controllers/routePlace")(app)

app.use("/users",require("./controllers/loginRoute"))

app.listen(2000,()=>{
    console.log("app listening o port 2000")
})

db()