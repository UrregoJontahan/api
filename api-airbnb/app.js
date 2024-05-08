const express = require("express");
const db =  require("./service/databaseService")

const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json())
require('./routes')(app)


app.listen(2000,()=>{
    console.log("app listening o port 2000")
})

db()